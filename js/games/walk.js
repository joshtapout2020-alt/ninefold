/* Termite Inspection Walk. Find conditions on a house section, then mark them on a plan.
   Symbols are a practice key, not a copy of any report form. */
var WalkGame = (function () {
  var SPOTS = [
    { id: 'tube', x: 196, y: 262, r: 26, name: 'Mud tube on the foundation', why: 'Visible evidence. Break it open. Empty doesn\'t mean gone.', label: 'Mud tube on the foundation wall' },
    { id: 'post', x: 92, y: 300, r: 26, name: 'Deck post set in soil', why: 'Wood-to-soil contact gives termites a free ride.', label: 'Deck post in the soil' },
    { id: 'wood', x: 500, y: 276, r: 28, name: 'Firewood on the foundation', why: 'Food against the house. Move it away.', label: 'Firewood stacked against the wall' },
    { id: 'mulch', x: 420, y: 258, r: 24, name: 'Mulch over the sill line', why: 'A contributor. Keep it back and below the siding.', label: 'Mulch piled against the siding' },
    { id: 'gutter', x: 470, y: 66, r: 24, name: 'Leaking gutter', why: 'Water on the wall. Fix moisture first.', label: 'Leaking gutter' },
    { id: 'pipe', x: 318, y: 214, r: 24, name: 'Dripping trap in the crawl', why: 'Moisture can feed an aerial colony. Fix the source.', label: 'Dripping pipe in the crawl space' },
    { id: 'soil', x: 262, y: 296, r: 26, name: 'Bare, damp crawl soil', why: 'Moisture source. A vapor barrier goes over the soil.', label: 'Bare damp soil in the crawl space' },
    { id: 'form', x: 372, y: 286, r: 24, name: 'Form board left in place', why: 'Scrap wood in contact with soil is a food source.', label: 'Form board left in the crawl' }
  ];
  var MARKS = [
    { id: 'T', t: 'Tube', spot: 'rear', ask: 'Mud tube on the rear foundation wall' },
    { id: 'M', t: 'Moisture', spot: 'crawl', ask: 'Damp soil in the middle of the crawl' },
    { id: 'W', t: 'Wood contact', spot: 'left', ask: 'Deck post in soil on the left side' },
    { id: 'C', t: 'Stored wood', spot: 'right', ask: 'Firewood along the right side' }
  ];
  /* Every object is named, so the job is spotting what is wrong with it. */
  var TAGS = [[92, 160, 'Deck'], [470, 58, 'Gutter'], [500, 250, 'Firewood'], [426, 232, 'Mulch'], [352, 214, 'Pipe'], [372, 280, 'Board'], [262, 288, 'Soil'], [214, 240, 'Wall']];
  var SC = '<svg viewBox="30 20 520 322" class="walkart" id="wkArt" role="group" aria-label="House cross section"><defs><pattern id="sl" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="currentColor" stroke-width="1"/></pattern></defs>' +
    '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round">' +
    '<path d="M130 120 L300 28 L470 120"/><path d="M150 120 V190 H450 V120"/><path d="M150 120 H450"/>' +
    '<path d="M150 190 H450 M150 200 H450"/><path d="M168 200 V280 M182 200 V280 M418 200 V280 M432 200 V280"/>' +
    '<path d="M160 280 H190 V296 H160 Z M410 280 H440 V296 H410 Z"/>' +
    '<path d="M30 250 H168 M432 250 H556"/><path d="M182 306 H418"/>' +
    '<path d="M60 170 H150 M60 170 V180 H150"/><path d="M86 180 V306 M98 180 V306"/>' +
    '<path d="M300 200 V226 Q300 234 312 234 H326 V214"/>' +
    '<path d="M440 76 H500 V88 H440Z"/><path d="M498 88 V120"/>' +
    '<path d="M450 262 Q452 240 470 262"/><path d="M360 300 H400 V290 H360 Z"/>' +
    '<rect x="470" y="256" width="58" height="36"/><path d="M470 268 H528 M470 280 H528 M490 256 V292 M510 256 V292"/>' +
    '<path d="M196 200 Q200 232 192 280" stroke-width="7" stroke-dasharray="1 8" stroke-linecap="round"/>' +
    '</g><rect x="0" y="306" width="560" height="34" fill="url(#sl)"/><rect x="182" y="288" width="236" height="18" fill="url(#sl)"/><path d="M396 250 Q424 214 452 250 Z" fill="currentColor"/>' +
    '<g fill="var(--liquid-dose)"><path d="M462 92c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z"/><path d="M478 112c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z"/><path d="M462 136c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z"/><path d="M318 240c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z"/><path d="M318 266c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13z"/></g>' +
    '<g font-family="var(--font-data)" font-size="15" font-weight="600" fill="currentColor" text-anchor="middle"><text x="300" y="160">Living space</text>' +
    TAGS.map(function (t) { return '<text x="' + t[0] + '" y="' + t[1] + '">' + t[2] + '</text>'; }).join('') + '</g><g id="wkMarks"></g></svg>';
  var S, root, tm;
  function intro() {
    GK.frame(root, 'Termite Inspection Walk', CONFIG.gameTime, 0,
      '<h1>Walk the house</h1><p class="gs__prompt">Eight problems. Find at least six. Water, Wood, Way in.</p>' +
      '<label class="checkrow"><input type="checkbox" id="wkClock" checked> Use the 60-second clock</label><label class="checkrow"><input type="checkbox" id="wkList"> Use a list instead of the drawing</label>' +
      '<button class="btn btn--go btn--wide" id="wkGo" type="button">Start</button>');
    $('#wkGo').addEventListener('click', function () {
      S = { found: {}, wrong: 0, left: 60, clock: $('#wkClock').checked, list: $('#wkList').checked, score: 0, misses: [], marks: 0 };
      walk(); if (S.clock) tm = setInterval(function () { S.left--; var t = $('#wkT'); if (t) t.textContent = Quiz.fmt(Math.max(0, S.left)); if (S.left <= 0) { clearInterval(tm); toGraph(); } }, 1000);
    });
  }
  function count() { return Object.keys(S.found).length; }
  function walk() {
    var decoys = [{ id: 'd1', label: 'Fresh paint on the siding' }, { id: 'd2', label: 'Clean, dry gravel at the walk' }];
    var body = S.list
      ? '<div class="mixlist" id="wkL">' + shuffle(SPOTS.concat(decoys)).map(function (s) { return '<button class="mixbtn" type="button" data-id="' + s.id + '"' + (S.found[s.id] ? ' disabled' : '') + '>' + esc(s.label) + '</button>'; }).join('') + '</div>'
      : SC;
    GK.frame(root, 'Termite Inspection Walk', 'Found ' + count() + ' of 8', S.score,
      (S.clock ? '<span class="timer" id="wkT">' + Quiz.fmt(Math.max(0, S.left)) + '</span>' : '') + '<p class="gs__prompt">Tap every problem you see.</p>' + body +
      '<div id="wkF" aria-live="polite"></div><button class="btn btn--wide" id="wkDone" type="button">Done walking</button>');
    $('#wkDone').addEventListener('click', toGraph);
    if (S.list) {
      $('#wkL').addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.mixbtn') : null;
        if (!b || b.disabled) return;
        var s = SPOTS.filter(function (x) { return x.id === b.getAttribute('data-id'); })[0];
        s ? hit(s) : miss();
      });
    } else {
      var art = $('#wkArt');
      Object.keys(S.found).forEach(mark);
      art.addEventListener('click', function (e) {
        var pt = art.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        var p = pt.matrixTransform(art.getScreenCTM().inverse());
        var s = SPOTS.filter(function (x) { return !S.found[x.id] && Math.pow(x.x - p.x, 2) + Math.pow(x.y - p.y, 2) <= x.r * x.r * 1.5; })[0];
        s ? hit(s) : miss();
      });
    }
  }
  function mark(id) {
    var s = SPOTS.filter(function (x) { return x.id === id; })[0], g = $('#wkMarks');
    if (g) g.innerHTML += '<circle cx="' + s.x + '" cy="' + s.y + '" r="' + s.r + '" fill="none" stroke="var(--pass)" stroke-width="4"/>';
  }
  function hit(s) {
    S.found[s.id] = 1; S.score += 10; walk();
    $('#wkF').innerHTML = GK.note(true, '<b>' + esc(s.name) + '.</b> ' + esc(s.why));
    if (count() === SPOTS.length) { clearInterval(tm); }
  }
  function miss() { S.wrong++; S.score = Math.max(0, S.score - 2); var f = $('#wkF'); if (f) f.innerHTML = GK.note(false, 'Nothing wrong there. Look again.'); }
  function toGraph() {
    clearInterval(tm); S.step = 0; S.sym = null;
    if (count() < 6) { var q = GK.linked('conducive'); if (q) S.misses.push(q); }
    graph();
  }
  function graph(msg) {
    var m = MARKS[S.step];
    var zones = [['rear', 'Rear wall'], ['left', 'Left side'], ['crawl', 'Crawl, center'], ['right', 'Right side'], ['front', 'Front wall']];
    GK.frame(root, 'Inspection Walk: graph', 'Mark ' + (S.step + 1) + ' of ' + MARKS.length, S.score,
      '<p class="gs__prompt">' + esc(m.ask) + '</p><p class="muted small">Pick the symbol, then tap the spot on the plan. Practice key only. Use your company\'s form on the job.</p>' +
      '<div class="symbols" id="wkS">' + MARKS.map(function (x) { return '<button class="btn" type="button" data-s="' + x.id + '" aria-pressed="' + (S.sym === x.id) + '"><b>' + x.id + '</b> ' + esc(x.t) + '</button>'; }).join('') + '</div>' +
      '<div class="plan" id="wkP">' + zones.map(function (z) { return '<button class="plan__z plan__z--' + z[0] + '" type="button" data-z="' + z[0] + '">' + esc(z[1]) + '</button>'; }).join('') + '</div><div id="wkF" aria-live="polite">' + (msg || '') + '</div>');
    $('#wkS').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (b) { S.sym = b.getAttribute('data-s'); $$('#wkS button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); } });
    $('#wkP').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      if (!S.sym) { $('#wkF').innerHTML = GK.note(false, 'Pick a symbol first.'); return; }
      var good = S.sym === m.id && b.getAttribute('data-z') === m.spot;
      if (good) { S.score += 10; S.marks++; }
      S.step++; S.sym = null;
      var note = GK.note(good, good ? 'Marked.' : 'That one goes as ' + m.id + ' at ' + m.spot + '.');
      if (S.step < MARKS.length) graph(note); else finish();
    });
  }
  function finish() {
    var pass = count() >= 6 && S.marks >= 3;
    GK.end(root, { game: 'walk', title: 'Termite Inspection Walk', score: S.score, pass: pass, head: pass ? 'Good eyes. Good notes.' : 'Walk it again.', stats: [['Found', count() + ' of 8'], ['Marked', S.marks + ' of 4']], topics: ['conducive', 'inspection'], misses: S.misses, take: 'See it, say it, sign it. Don\'t guess it. Treatment doesn\'t remove a conducive condition.', again: intro });
  }
  return { mount: function (el) { root = el; intro(); }, unmount: function () { clearInterval(tm); S = null; } };
})();
