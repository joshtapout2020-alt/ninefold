/* ======================= KEEP IT SUSPENDED =======================
   One simulation drives everything: the live gauge, the pass strip and the
   "if you'd walked away" comparison. Mass in the tank is conserved, so weak
   passes early really do leave the product behind for hot passes late.
   Behaviour notes for the build are in DESIGN.md, section Keep It Suspended.
   ================================================================= */
var KIS = (function () {
  /* act: 'settles' keeps moving or drops out. 'dissolves' mixes once and stays.
     k: settling speed. Product names are fictional on purpose. */
  var PRODUCTS = {
    wg: { name: 'Mockingbird 50 WG', code: 'WG', form: 'Water-dispersible granule', act: 'settles', k: .17, line: 'Maintain agitation during mixing and application.' },
    wp: { name: 'Mockingbird 40 WP', code: 'WP', form: 'Wettable powder', act: 'settles', k: .22, line: 'Use continuous agitation. Forms a suspension.' },
    fl: { name: 'Mockingbird 2 F', code: 'F', form: 'Flowable', act: 'settles', k: .13, line: 'Shake well. Agitate until completely dispersed.' },
    sg: { name: 'Mockingbird 20 SG', code: 'SG', form: 'Water-soluble granule', act: 'dissolves', k: 0, line: 'Agitate until dissolved. Forms a true solution.' },
    sp: { name: 'Mockingbird 70 SP', code: 'SP', form: 'Soluble powder', act: 'dissolves', k: 0, line: 'Agitate until dissolved. Forms a true solution.' }
  };
  var ORDER = ['wg', 'sg', 'wp', 'sp'];
  /* Rotates each game. At least one dissolver lands in the first two tanks. */
  function dealOrder() {
    var s = shuffle(['wg', 'wp', 'fl']).slice(0, 2), d = shuffle(['sg', 'sp']);
    return [s[0], d[0], s[1], d[1]];
  }
  /* Labels that aren't a simple either/or. research/formulations-mixing.md, the three traps. */
  var TRAPS = [
    { code: 'G', name: 'Mockingbird 2 G', form: 'Granule', line: 'Apply dry with a spreader. Do not mix with water.', a: 'neither', why: 'Neither. A granule goes on dry and never in a sprayer. G and WG are different things.' },
    { code: 'EC', name: 'Mockingbird 1 EC', form: 'Emulsifiable concentrate', line: 'Forms a milky emulsion in water. Maintain agitation.', a: 'neither', why: 'Neither. An emulsion is oil droplets in water. Milky, and it still needs agitation.' },
    { code: 'WSP', name: 'Mockingbird 75 WSP', form: 'Water-soluble packet', line: 'Drop the unopened packet in the tank. Contents form a suspension. Maintain agitation.', a: 'settles', why: 'It disperses. The packet melts. The powder may not. Read what is inside.' }
  ];
  var PASSES = 8, BAND_LO = .8, BAND_HI = 1.2, MAXC = 2;
  var SPRAY_SECS = { settles: 14, dissolves: 10 };
  /* WALES fallback order (VT BSE-351), used only when the label is silent. research/formulations-mixing.md */
  var MIX = [
    { t: 'Water in, about half full. Agitation on.', why: 'Partly fill, start agitation. Everything else needs water to mix into.' },
    { t: 'Dry products: WG and WP', why: 'Dry things that need to hydrate go in first.' },
    { t: 'Flowables', why: 'Liquid suspensions come after the dry products.' },
    { t: 'Emulsifiable concentrates (EC)', why: 'Oily things go in late.' },
    { t: 'Surfactants and adjuvants, then top off', why: 'Surfactants go in last.' }
  ];

  var S = null, raf = 0, last = 0, reduced = false, root = null, motionOn = false;

  function newTank(p) {
    return { act: p.act, k: p.k, T: SPRAY_SECS[p.act], L: 1, s: 1, q: 0, C: 1, t: 0, spraying: false };
  }
  /* One physics step. a is agitation, 0 to 1. Pure apart from `t`, so the walk-away ghost can reuse it. */
  function step(t, dt, a) {
    if (t.act === 'settles') {
      var held = Math.min(1, a * 1.7);
      var down = t.k * t.s * (1 - held) * dt;
      var up = 1.6 * a * t.q * dt;
      t.s += up - down; t.q += down - up;
    }
    if (t.spraying && t.L > .02) {
      var dL = Math.min(dt / t.T, t.L - .02);
      /* Pickup tube sits above the sludge. Near the end of the tank it draws the sludge in. */
      var pick = clamp((.3 - t.L) / .2, 0, 1);
      t.C = (t.s + pick * t.q) / t.L;
      t.s -= t.s / t.L * dL; t.q -= pick * t.q / t.L * dL; t.L -= dL; t.t += dt;
    }
    return t;
  }
  function passClass(c) { return c < BAND_LO ? 'weak' : c > BAND_HI ? 'hot' : 'ok'; }
  var PASSWORD = { weak: 'W', ok: 'OK', hot: 'H' };
  function ghost(p) {
    var t = newTank(p); t.spraying = true;
    var sum = [], n = [], i, dt = 1 / 30;
    while (t.L > .02) {
      step(t, dt, 0);
      i = Math.min(PASSES - 1, Math.floor((1 - t.L) * PASSES));
      sum[i] = (sum[i] || 0) + t.C; n[i] = (n[i] || 0) + 1;
    }
    var out = []; for (i = 0; i < PASSES; i++) out.push(n[i] ? sum[i] / n[i] : 1);
    return out;
  }

  /* ---- rendering helpers ---- */
  function stripHTML(values, showNow) {
    var h = '';
    for (var i = 0; i < PASSES; i++) {
      var v = values[i];
      if (v == null) h += '<span class="strip__cell' + (showNow === i ? ' is-now' : '') + '">' + (i + 1) + '</span>';
      else { var c = passClass(v); h += '<span class="strip__cell is-' + c + '">' + PASSWORD[c] + '</span>'; }
    }
    return h;
  }
  function stripText(values) {
    var c = { weak: 0, ok: 0, hot: 0 };
    values.forEach(function (v) { if (v != null) c[passClass(v)]++; });
    return c.ok + ' on rate, ' + c.weak + ' weak, ' + c.hot + ' hot';
  }
  function labelHTML(p, lit) {
    return '<article class="lbl" aria-label="Training label for ' + esc(p.name) + '">' +
      '<div class="lbl__fake">Training label. Not a real product.</div>' +
      '<div class="lbl__top"><div><div class="lbl__name">' + esc(p.name) + '</div><div class="lbl__type">' + esc(p.form) + '</div></div>' +
      '<div class="lbl__code">' + esc(p.code) + '</div></div>' +
      '<div class="lbl__row' + (lit ? ' is-lit' : '') + '"><b>Mixing:</b> ' + esc(p.line) + '</div>' +
      '<div class="lbl__foot">EPA REG. NO. 00000-000 (fictional)</div></article>';
  }
  function shell(inner) {
    root.innerHTML =
      '<div class="gs"><header class="gs__bar">' +
      '<a class="gs__back" href="#games" aria-label="Quit game"><svg aria-hidden="true"><use href="#i-left"/></svg></a>' +
      '<div><div class="gs__title">Keep It Suspended</div><div class="gs__round">' + roundLabel() + '</div></div>' +
      '<div class="gs__score" aria-label="Score ' + S.score + '"><small>Score</small>' + S.score + '</div></header>' +
      '<div class="gs__stage">' + inner + '</div></div>';
  }
  function roundLabel() {
    if (S.phase === 'intro') return CONFIG.gameTime;
    if (S.phase === 'mixorder') return 'Last stage: load the tank';
    if (S.phase === 'results') return 'Done';
    return 'Tank ' + (S.round + 1) + ' of ' + ORDER.length;
  }
  function product() { return PRODUCTS[ORDER[S.round]]; }

  /* ---- phases ---- */
  function intro() {
    S.phase = 'intro';
    var canShake = typeof window.DeviceMotionEvent !== 'undefined';
    shell(
      '<h1>Dissolve or disperse?</h1>' +
      '<p class="gs__prompt">That is the whole game. A granule can do either one. The words on the label tell you which.</p>' +
      '<div class="gs__note"><b>Disperses:</b> tiny solids hanging in the water. Stop moving it and it settles.<br><b>Dissolves:</b> a true solution. Agitate to dissolve it, then it stays mixed.</div>' +
      '<p>Read each label. Keep the gauge in the green while you spray eight passes.</p>' +
      '<p class="muted">Tap fast, hold, or drag the tank. Space bar or arrow keys work too.</p>' +
      '<button class="btn btn--go btn--wide" id="kisStart" type="button">Start</button>' +
      (canShake ? '<button class="btn btn--wide" id="kisShake" type="button">Use real phone shake</button>' : ''));
    $('#kisStart').addEventListener('click', sort);
    var sb = $('#kisShake');
    if (sb) sb.addEventListener('click', function () { enableMotion(sb); });
    $('#kisStart').focus();
  }
  function sort() {
    S.phase = 'sort'; S.tries = 0;
    var p = product();
    shell(
      '<p class="gs__prompt">Read the label. How does this one act in the tank?</p>' + labelHTML(p) +
      '<div class="gs__row" id="kisSort">' +
      '<button class="btn" type="button" data-a="settles">It disperses<small>Keep it moving</small></button>' +
      '<button class="btn" type="button" data-a="dissolves">It dissolves<small>Mix once</small></button></div>' +
      '<div id="kisSortFb" aria-live="polite"></div>');
    $('#kisSort').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      var good = b.getAttribute('data-a') === p.act;
      $$('#kisSort button').forEach(function (x) { x.disabled = true; });
      S.sortRight += good ? 1 : 0;
      if (good) S.score += 100; else S.misses.push(p.code);
      var fb = good
        ? '<div class="gs__note gs__note--good"><b>' + esc(p.code) + ' = ' + esc(p.form.toLowerCase()) + '.</b> ' + (p.act === 'settles' ? 'It never dissolves. Cloudy tank? Keep it moving.' : 'It dissolves. Clear tank? You can breathe. Check the label anyway.') + '</div>'
        : '<div class="gs__note gs__note--call"><b>Look again: ' + esc(p.code) + ' = ' + esc(p.form.toLowerCase()) + '.</b> ' + (p.act === 'settles' ? 'Tiny solids hanging in water. They settle as soon as the tank goes still.' : 'It goes into true solution, like sugar in tea. It won\'t settle back out.') + '</div>';
      $('#kisSortFb').innerHTML = fb + '<button class="btn btn--go btn--wide" style="margin-top:12px" id="kisRun" type="button">Mix the tank</button>';
      $('.lbl__row').classList.add('is-lit');
      $('#kisRun').addEventListener('click', run);
      $('#kisRun').focus();
    });
  }
  function run() {
    var p = product();
    S.phase = 'run'; S.tank = newTank(p);
    var t = S.tank; t.s = 0; t.q = 0;
    if (p.act === 'settles') t.q = 1;
    S.undissolved = p.act === 'dissolves' ? 1 : 0;
    S.mixed = false; S.a = 0; S.held = false; S.wasted = 0;
    S.sum = []; S.cnt = []; S.vals = new Array(PASSES); S.statusText = ''; S.readClass = ''; S.nowCell = -1; S.tally = '';
    shell(
      '<div class="kis-run">' +
      '<div class="kis-run__a"><div class="kis-rig">' +
      '<canvas class="kis-tank" id="kisTank" aria-label="Tank. Drag side to side to agitate." role="img"></canvas>' +
      '<div class="kis-side"><div id="kisGauge">' + gaugeSVG({ value: .5, band: [BAND_LO / MAXC, BAND_HI / MAXC], read: '1.0x', label: 'Strength at the nozzle' }) + '</div>' +
      '<div class="kis-read" id="kisRead"></div><div class="kis-tally" id="kisTally"></div></div></div></div>' +
      '<div><p class="kis-status" id="kisStatus" aria-live="polite"></p>' +
      '<div class="striplabel"><span>Pass 1</span><span>Pass ' + PASSES + '</span></div>' +
      '<div class="strip" id="kisStrip" aria-hidden="true">' + stripHTML(S.vals, -1) + '</div></div>' +
      '<button class="agitate" id="kisAgitate" type="button">Agitate<small>Tap fast, hold, or drag the tank</small></button>' +
      '</div>');
    status('Mix it in. ' + p.code + ' is sitting on the bottom.');
    wirePad($('#kisAgitate')); wirePad($('#kisTank'));
    $('#kisAgitate').focus();
    initParticles(); fitCanvas(); readColors();
    last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  }
  function status(s) { if (s !== S.statusText) { S.statusText = s; var el = $('#kisStatus'); if (el) el.textContent = s; } }

  function stroke() {
    if (S.phase !== 'run') return;
    S.a = Math.min(1, S.a + .3);
    if (S.mixed && S.tank.act === 'dissolves') { S.wasted++; S.flash = 1; }
  }
  function loop(ts) {
    if (!S || S.phase !== 'run') return;
    var dt = last ? Math.min(.05, (ts - last) / 1000) : .016; last = ts;
    tick(dt); draw(dt);
    raf = requestAnimationFrame(loop);
  }
  function tick(dt) {
    var t = S.tank, p = product();
    S.a *= Math.exp(-1.6 * dt);
    if (S.held) S.a = Math.max(S.a, .6);
    if (!S.mixed) {
      if (t.act === 'dissolves') { S.undissolved = Math.max(0, S.undissolved - 1.1 * S.a * dt); t.s = 1 - S.undissolved; }
      else step(t, dt, S.a);
      var ready = t.act === 'dissolves' ? S.undissolved <= 0 : t.s >= .93;
      if (ready) {
        S.mixed = true; t.spraying = true;
        if (t.act === 'dissolves') { t.s = 1; status('Dissolved. It stays that way. Hands off and spray.'); }
        else { status('Spraying. Keep it in the green.'); S.readClass = 'ok'; $('#kisRead').className = 'kis-read is-ok'; $('#kisRead').textContent = 'On rate'; }
      }
      return;
    }
    var i = Math.min(PASSES - 1, Math.floor((1 - t.L) * PASSES));
    step(t, dt, S.a);
    S.sum[i] = (S.sum[i] || 0) + t.C; S.cnt[i] = (S.cnt[i] || 0) + 1;
    var j = Math.min(PASSES - 1, Math.floor((1 - t.L) * PASSES));
    if (j !== i || t.L <= .021) { S.vals[i] = S.sum[i] / S.cnt[i]; $('#kisStrip').innerHTML = stripHTML(S.vals, j); }
    else if (S.nowCell !== i) { S.nowCell = i; $('#kisStrip').innerHTML = stripHTML(S.vals, i); }
    updateReadout();
    if (t.L <= .021) finishRun();
  }
  function updateReadout() {
    var t = S.tank, c = passClass(t.C);
    var g = $('#kisGauge .js-needle');
    if (g) g.setAttribute('transform', 'rotate(' + (-120 + 240 * clamp(t.C / MAXC, 0, 1)).toFixed(1) + ' 100 100)');
    var rd = $('#kisGauge .js-read'); if (rd) rd.textContent = (t.C >= MAXC ? '2x+' : t.C.toFixed(1) + 'x');
    if (c !== S.readClass) {
      S.readClass = c; var el = $('#kisRead');
      el.className = 'kis-read is-' + c; el.textContent = c === 'ok' ? 'On rate' : c === 'weak' ? 'Weak' : 'Hot';
      if (t.act === 'settles') status(c === 'ok' ? 'On rate. Keep it moving.' : c === 'weak' ? 'Weak. Product is dropping out. Agitate.' : 'Hot. The tube hit the sludge.');
    }
    var tally = t.act === 'dissolves' ? 'Wasted strokes: ' + S.wasted : '';
    if (tally !== S.tally) { S.tally = tally; $('#kisTally').textContent = tally; }
  }
  function finishRun() {
    cancelAnimationFrame(raf);
    var p = product(), okCount = 0, i;
    for (i = 0; i < PASSES; i++) {
      if (S.vals[i] == null) S.vals[i] = S.cnt[i] ? S.sum[i] / S.cnt[i] : 1;
      if (passClass(S.vals[i]) === 'ok') okCount++;
    }
    var pts = okCount * 25, hands = 0;
    if (p.act === 'dissolves') { hands = Math.max(0, 100 - S.wasted * 10); pts += hands; }
    S.score += pts; S.okTotal += okCount; S.wastedTotal += S.wasted;
    debrief(okCount, hands);
  }
  function debrief(okCount, hands) {
    var p = product(), g = ghost(p), msg, good = okCount >= 6, tone;
    S.phase = 'debrief';
    if (p.act === 'dissolves') {
      good = S.wasted <= 3;
      msg = S.wasted <= 3
        ? '<b>Clean run.</b> Once it dissolved, it took care of itself. No shaking needed.'
        : '<b>' + S.wasted + ' wasted strokes.</b> The strip below shows what happens with no shaking at all: nothing changes. It was already in solution.';
    } else if (good) {
      msg = '<b>Even coverage.</b> Keep ' + esc(p.code) + ' moving and every pass gets the same rate.';
    } else {
      msg = '<b>Settled tank: first shot thin, last shot hot.</b> Same jug, wrong rate both ways. That makes it a label problem too.';
    }
    tone = good ? 'gs__note--good' : 'gs__note--call';
    var isLast = S.round === ORDER.length - 1;
    shell(
      '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="stamp ' + (good ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span><span class="data">' + esc(p.name) + '</span></div>' +
      '<div class="gs__note ' + tone + '">' + msg + '</div>' +
      '<div><div class="striplabel"><span>Your tank</span><span>' + okCount + ' of ' + PASSES + ' on rate</span></div>' +
      '<div class="strip" role="img" aria-label="Your tank: ' + stripText(S.vals) + '">' + stripHTML(S.vals, -1) + '</div></div>' +
      '<div><div class="striplabel"><span>If you\'d walked away</span><span>No agitation</span></div>' +
      '<div class="strip" role="img" aria-label="With no agitation: ' + stripText(g) + '">' + stripHTML(g, -1) + '</div></div>' +
      '<p class="muted" style="font-size:var(--t-small)">W = weak. OK = on rate. H = hot.</p>' +
      '<button class="btn btn--go btn--wide" id="kisNext" type="button">' + (isLast ? 'Load the tank' : 'Next tank') + '</button>');
    $('#kisNext').addEventListener('click', function () {
      if (isLast) trap(0); else { S.round++; sort(); }
    });
    $('#kisNext').focus();
  }
  function trap(n) {
    S.phase = 'trap';
    var t = TRAPS[n];
    shell('<p class="gs__prompt">Trick label ' + (n + 1) + ' of ' + TRAPS.length + '. How does this one act?</p>' + labelHTML(t) +
      '<div class="mixlist" id="kisTrap"><button class="mixbtn" type="button" data-a="settles">It disperses</button><button class="mixbtn" type="button" data-a="dissolves">It dissolves</button><button class="mixbtn" type="button" data-a="neither">Neither</button></div><div id="kisTrapFb" aria-live="polite"></div>');
    $('#kisTrap').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || b.disabled) return;
      var good = b.getAttribute('data-a') === t.a;
      $$('#kisTrap button').forEach(function (x) { x.disabled = true; });
      if (good) S.score += 50; else S.misses.push(t.code);
      $('.lbl__row').classList.add('is-lit');
      $('#kisTrapFb').innerHTML = '<div class="gs__note ' + (good ? 'gs__note--good' : 'gs__note--call') + '">' + esc(t.why) + '</div><button class="btn btn--go btn--wide mt3" id="kisTrapN" type="button">Next</button>';
      $('#kisTrapN').addEventListener('click', function () { n + 1 < TRAPS.length ? trap(n + 1) : phone(0); });
      $('#kisTrapN').focus();
    });
  }
  /* The phone call. A sprayer sits, then the label overrides the rule of thumb. */
  function phone(n) {
    S.phase = 'phone';
    var P = [
      { ask: 'Your phone rings. A wettable powder tank sits for 15 minutes. How do you restart?', opts: ['Spray right away, it was mixed', 'Re-agitate until uniform, then spray', 'Add more product'], ans: 1, why: 'Settled tank: first shot thin, last shot hot. Re-agitate until uniform.', p: null },
      { ask: 'Same call, different tank. This one dissolved, and the label below says this. What do you do?', opts: ['Spray. Solutions never settle', 'Re-agitate, because the label says to', 'Dump the tank'], ans: 1, why: 'A solution normally stays mixed, but the label outranks the rule of thumb. The label wins.', p: { name: 'Mockingbird 20 SG', code: 'SG', form: 'Water-soluble granule', line: 'Agitate until dissolved. Re-agitate if spraying is interrupted.' } }
    ], q = P[n];
    shell('<p class="gs__prompt">' + esc(q.ask) + '</p>' + (q.p ? labelHTML(q.p, true) : '') + '<div class="mixlist" id="kisPh">' + q.opts.map(function (o, i) { return '<button class="mixbtn" type="button" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div><div id="kisPhFb" aria-live="polite"></div>');
    $('#kisPh').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || b.disabled) return;
      var good = +b.getAttribute('data-i') === q.ans;
      $$('#kisPh button').forEach(function (x) { x.disabled = true; });
      if (good) S.score += 50; else S.misses.push('phone');
      $('#kisPhFb').innerHTML = '<div class="gs__note ' + (good ? 'gs__note--good' : 'gs__note--call') + '">' + esc(q.why) + '</div><button class="btn btn--go btn--wide mt3" id="kisPhN" type="button">' + (n ? 'Load the tank' : 'Next') + '</button>';
      $('#kisPhN').addEventListener('click', function () { n ? mixorder() : phone(1); });
      $('#kisPhN').focus();
    });
  }
  function mixorder() {
    S.phase = 'mixorder'; S.mixStep = 0; S.mixWrong = 0;
    var shuffled = MIX.map(function (m, i) { return { m: m, i: i }; });
    for (var i = shuffled.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = x; }
    /* never start solved */
    if (shuffled[0].i === 0) { var y = shuffled[0]; shuffled[0] = shuffled[1]; shuffled[1] = y; }
    shell(
      '<p class="gs__prompt">Tank mix day. The label is silent on order. Tap what goes in next.</p>' +
      '<div class="mixlist" id="kisMix">' + shuffled.map(function (o) {
        return '<button class="mixbtn" type="button" data-i="' + o.i + '"><span class="mixbtn__n"></span><span>' + esc(o.m.t) + '</span></button>';
      }).join('') + '</div><div id="kisMixFb" aria-live="polite"></div>');
    $('#kisMix').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || b.disabled) return;
      var i = +b.getAttribute('data-i');
      if (i === S.mixStep) {
        b.disabled = true; $('.mixbtn__n', b).textContent = i + 1; S.mixStep++;
        $('#kisMixFb').innerHTML = '<div class="gs__note gs__note--good">' + esc(MIX[i].why) + '</div>';
        if (S.mixStep === MIX.length) {
          S.score += Math.max(0, 100 - S.mixWrong * 25);
          $('#kisMixFb').innerHTML += '<button class="btn btn--go btn--wide" style="margin-top:12px" id="kisEnd" type="button">See results</button>';
          $('#kisEnd').addEventListener('click', results); $('#kisEnd').focus();
        }
      } else {
        S.mixWrong++;
        $('#kisMixFb').innerHTML = '<div class="gs__note gs__note--call"><b>Not yet.</b> Something else goes in first. Think about what needs the most water to break up.</div>';
      }
    });
  }
  function results() {
    S.phase = 'results';
    var total = ORDER.length * PASSES, pct = Math.round(S.okTotal / total * 100);
    var pass = pct >= CONFIG.passLine && S.sortRight >= ORDER.length - 1;
    var linked = shuffle(questionsFor('core', 'formulations')).slice(0, S.misses.length).map(function (q) { return q.id; });
    Progress.report({ game: 'suspended', score: S.score, pass: pass, topics: ['formulations', 'handling'], misses: linked });
    var missed = S.misses.length ? '<div class="gs__note gs__note--call"><b>' + S.misses.length + ' sent to Callbacks.</b> You\'ll see this topic again.</div>' : '';
    shell(
      '<div><span class="stamp ' + (pass ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span></div>' +
      '<h2>' + (pass ? 'Good tank work.' : 'Run it again.') + '</h2>' +
      '<div class="resultgrid">' +
      '<div class="field"><span class="field__k">On rate</span><span class="field__v">' + pct + '%</span></div>' +
      '<div class="field"><span class="field__k">Labels</span><span class="field__v">' + S.sortRight + ' of ' + ORDER.length + '</span></div>' +
      '<div class="field"><span class="field__k">Wasted</span><span class="field__v">' + S.wastedTotal + '</span></div></div>' + missed +
      '<div class="gs__note"><b>Take this to the truck:</b> Dispersed products settle, so keep them moving. Soluble products dissolve once. If the label says agitate or re-agitate, do it. The label wins.</div>' +
      '<div class="gs__note"><b>On your truck:</b> Termidor HE is a suspension: shake well, then recirculate until dispersed. Optiguard Flex in your ant backpack gets agitated regularly. Sitting tank? Re-agitate before you spray.</div>' +
      '<button class="btn btn--go btn--wide" id="kisAgain" type="button">Run it again</button>' +
      '<a class="btn btn--wide" href="#home">Back to the route</a>');
    $('#kisAgain').addEventListener('click', start);
  }
  function start() {
    ORDER = dealOrder();
    S = { phase: 'intro', round: 0, score: 0, sortRight: 0, okTotal: 0, wastedTotal: 0, misses: [], a: 0 };
    sort();
  }

  /* ---- input ----
     Three routes in: tap (each press is a stroke), hold (steady agitation, the
     accessible path), drag (each change of direction is a stroke). */
  function wirePad(el) {
    var down = false, lastV = 0, dir = 0, timer = 0;
    function pos(e) { return e.clientX + e.clientY; }
    el.addEventListener('pointerdown', function (e) {
      down = true; lastV = pos(e); dir = 0; stroke();
      el.classList.add('is-down');
      try { el.setPointerCapture(e.pointerId); } catch (x) {}
      clearTimeout(timer); timer = setTimeout(function () { if (down) S.held = true; }, 300);
      e.preventDefault();
    });
    el.addEventListener('pointermove', function (e) {
      if (!down) return;
      var d = pos(e) - lastV;
      if (Math.abs(d) < 12) return;
      var nd = d > 0 ? 1 : -1;
      if (nd !== dir) { if (dir !== 0) stroke(); dir = nd; S.held = false; clearTimeout(timer); }
      lastV = pos(e);
    });
    function up() { down = false; if (S) S.held = false; clearTimeout(timer); el.classList.remove('is-down'); }
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }
  function onKey(e) {
    if (!S || S.phase !== 'run') return;
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      if (e.repeat) S.held = true; else stroke();
    }
  }
  function onKeyUp() { if (S) S.held = false; }

  /* Real shake is a bonus. iOS needs a tap for permission, and sandboxed frames
     get no events. Any failure just removes the button. */
  function enableMotion(btn) {
    function gone() { if (btn && btn.parentNode) btn.parentNode.removeChild(btn); }
    function listen() {
      var lastHit = 0, got = false;
      window.addEventListener('devicemotion', function (e) {
        var g = e.acceleration && e.acceleration.x !== null ? e.acceleration : e.accelerationIncludingGravity;
        if (!g) return;
        var m = Math.abs(g.x || 0) + Math.abs(g.y || 0) + Math.abs(g.z || 0);
        if (!got && (e.acceleration || e.accelerationIncludingGravity)) { got = true; motionOn = true; if (btn) btn.textContent = 'Phone shake is on'; }
        var now = Date.now();
        if (m > 28 && now - lastHit > 110) { lastHit = now; stroke(); }
      });
      setTimeout(function () { if (!got) gone(); }, 1500);
    }
    try {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission().then(function (r) { if (r === 'granted') listen(); else gone(); }, gone);
      } else listen();
    } catch (e) { gone(); }
  }

  /* ---- canvas tank ---- */
  var cv, ctx, W, H, colors = {}, parts = [], frame = 0, wob = 0;
  var N = 130;
  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    ['tank-wall', 'tank-fill', 'liquid', 'liquid-dose', 'particle', 'ink', 'rule-soft'].forEach(function (k) { colors[k] = cs.getPropertyValue('--' + k).trim(); });
  }
  function fitCanvas() {
    cv = $('#kisTank'); if (!cv) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1), r = cv.getBoundingClientRect();
    W = Math.max(10, r.width); H = Math.max(10, r.height);
    cv.width = W * dpr; cv.height = H * dpr;
    ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function initParticles() {
    parts = [];
    for (var i = 0; i < N; i++) parts.push({ u: Math.random(), v: Math.random(), x: Math.random(), y: 1, sp: Math.random() * 6.28, row: i });
  }
  function rr(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function draw(dt) {
    if (!ctx) return;
    frame++;
    if (frame % 30 === 0) readColors();
    if (reduced && frame % 6) return; /* calmer redraw, the sim keeps running */
    var t = S.tank, a = S.a;
    wob += dt * 34;
    var off = reduced ? 0 : Math.sin(wob) * a * 7;
    var tw = Math.min(W * .78, H * .78), tx = (W - tw) / 2 + off, ty = H * .13, th = H * .82;
    ctx.clearRect(0, 0, W, H);
    /* neck and cap */
    ctx.fillStyle = colors['tank-wall'];
    ctx.fillRect(tx + tw * .38, ty - H * .09, tw * .24, H * .1);
    /* wall */
    ctx.fillStyle = colors['tank-fill']; ctx.strokeStyle = colors['tank-wall']; ctx.lineWidth = 3;
    rr(tx, ty, tw, th, 12); ctx.fill();
    /* liquid clipped to tank */
    ctx.save(); rr(tx + 2, ty + 2, tw - 4, th - 4, 10); ctx.clip();
    var innerH = th - 4, lvl = clamp(t.L, 0, 1) * innerH * .9;
    var top = ty + 2 + innerH - lvl, wave = reduced ? 0 : Math.sin(wob * .5) * a * 5;
    var sus = t.L > .03 ? clamp(t.s / t.L, 0, 1.2) : 0;
    ctx.fillStyle = colors.liquid;
    ctx.beginPath(); ctx.moveTo(tx - 10, top + wave); ctx.lineTo(tx + tw + 10, top - wave); ctx.lineTo(tx + tw + 10, ty + th + 10); ctx.lineTo(tx - 10, ty + th + 10); ctx.closePath(); ctx.fill();
    /* A solution stays see-through. A suspension clouds up with whatever is off the bottom. */
    if (sus > 0) {
      ctx.globalAlpha = (t.act === 'dissolves' ? .22 : .8) * Math.min(1, sus);
      ctx.fillStyle = colors['liquid-dose']; ctx.fill(); ctx.globalAlpha = 1;
    }
    /* particles */
    var floorY = ty + th - 3, nUp, nDown;
    if (t.act === 'dissolves') { nUp = 0; nDown = Math.round(S.undissolved * N); }
    else { var scale = N; nUp = Math.round(clamp(t.s, 0, 1) * scale); nDown = Math.round(clamp(t.q, 0, 1) * scale); }
    var perRow = Math.max(8, Math.floor(tw / 7)), px = 6;
    ctx.fillStyle = colors.particle;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], tgtX, tgtY, vis = true;
      if (i < nUp) {
        p.sp += dt * (1.5 + a * 7);
        tgtX = tx + 8 + (tw - 16) * (p.u + Math.sin(p.sp) * .03);
        tgtY = top + 6 + (floorY - top - 12) * clamp(p.v + Math.cos(p.sp * .8) * .04, 0, 1);
      } else if (i < nUp + nDown) {
        var ri = i - nUp, col = ri % perRow, row = Math.floor(ri / perRow);
        tgtX = tx + 7 + (tw - 14) * ((col + .5) / perRow);
        tgtY = floorY - 4 - row * (px - 1);
      } else vis = false;
      if (!vis) continue;
      if (reduced || p.px === undefined) { p.px = tgtX; p.py = tgtY; }
      var ease = i < nUp ? .22 : .09;
      p.px += (tgtX - p.px) * ease; p.py += (tgtY - p.py) * ease;
      ctx.fillRect(p.px - px / 2, Math.min(p.py, floorY - 2), px, px);
    }
    ctx.restore();
    /* pickup tube: its foot sits above the sludge */
    ctx.strokeStyle = colors['tank-wall']; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(tx + tw * .72, ty - 2); ctx.lineTo(tx + tw * .72, ty + th * .84); ctx.stroke();
    /* wall on top */
    ctx.lineWidth = 3; rr(tx, ty, tw, th, 12); ctx.stroke();
    /* wasted stroke flash on a solution */
    if (S.flash) { S.flash = Math.max(0, S.flash - dt * 4); ctx.globalAlpha = S.flash * .25; ctx.fillStyle = colors.ink; rr(tx, ty, tw, th, 12); ctx.fill(); ctx.globalAlpha = 1; }
  }

  return {
    mount: function (el) {
      root = el;
      reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
      ORDER = dealOrder();
      S = { phase: 'intro', round: 0, score: 0, sortRight: 0, okTotal: 0, wastedTotal: 0, misses: [], a: 0 };
      document.addEventListener('keydown', onKey);
      document.addEventListener('keyup', onKeyUp);
      window.addEventListener('resize', onResize);
      intro();
    },
    unmount: function () {
      cancelAnimationFrame(raf); S = null; ctx = null;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
    },
    /* Exposed for balance testing and for the spec's numbers */
    ghost: function (id) { return ghost(PRODUCTS[id]); },
    labelHTML: function (id) { return labelHTML(PRODUCTS[id], true); }
  };
  function onResize() { if (S && S.phase === 'run') fitCanvas(); }
})();
