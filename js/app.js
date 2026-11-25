/* Views and router. Plain #hash tokens. Links also render directly, so routing
   still works if a sandboxed frame refuses to change location. */
var view = document.getElementById('view'), ROUTE = '', STUDY_TAB = null;

function pagehead(t, p) { return '<div class="pagehead"><h1>' + esc(t) + '</h1>' + (p ? '<p>' + esc(p) + '</p>' : '') + '</div>'; }
function backLink(href, label) { return '<a class="backlink" href="' + href + '">' + icon('left') + esc(label || 'Back') + '</a>'; }
function listRow(href, ic, title, sub, tail) {
  return '<a href="' + href + '">' + icon(ic) + '<span><b>' + esc(title) + '</b><small>' + esc(sub) + '</small></span>' + (tail || icon('chev', 'chev')) + '</a>';
}
function track() { return Store.get('track', null); }
/* Outside Virginia there is no researched exam track yet, so everyone sees Core and WDO. */
/* Lawn & Ornamental is its own test, on for everyone unless they turn it off in Settings. */
function lawnOn() { return Store.get('lawnTest', true) !== false; }
function examsForTrack() { return (!isVA() || track() === 'commercial' ? ['core', 'wdo'] : ['core']).concat(lawnOn() ? ['lawn'] : []); }
var EXAM_NAME = { core: 'Core', wdo: 'WDO 7B', lawn: 'Lawn & Ornamental' };
function examName(e) { return e === 'wdo' && !isVA() ? 'Wood-destroying' : EXAM_NAME[e]; }
function disclaimer() {
  var s = STATES[curState()];
  return isVA()
    ? '<p class="muted small">A study aid, not a replacement. Exam questions come from the manuals: Virginia Core Manual (456-210) and Management of Wood-Destroying Organisms (456-222). Rules shown are for Virginia.</p>'
    : s && s.ready
      ? '<p class="muted small">A study aid, not a replacement. ' + esc(s.name) + ' rules here were checked against state sources on ' + esc(s.data.verified || '') + '. Your state study manual and the ' + esc(s.agency) + ' are the authority.</p>'
      : '<p class="muted small">A study aid, not a replacement. ' + esc(stateName()) + ' exam rules have not been added yet, so this shows only material that applies in every state. Your state study manual is the authority.</p>';
}
/* Virginia manuals and code sections only make sense in Virginia. Elsewhere keep the label and
   federal references and point to the state manual. */
function lookItUp(ref) {
  if (isVA()) return ref;
  var keep = ref.split(/\.\s+/).filter(function (p) { return p && !/Virginia|2VAC5|456-2\d\d|VDACS/.test(p); });
  return ['Your ' + stateName() + ' study manual'].concat(keep).join('. ').replace(/\.?$/, '.');
}
/* Banner for states whose rules are not researched yet. */
function stateNote() {
  var s = curState();
  return s && !STATES[s].ready ? '<div class="gs__note gs__note--call"><b>' + esc(STATES[s].name) + ' rules are not added yet.</b> You will see labels, safety, pest biology and Ninefold SOPs, which apply in every state. For licensing, exams and state law, check with the ' + esc(STATES[s].agency) + ' and your manager.</div>' : '';
}

function gaugeCell(exam) {
  var n = Progress.attemptsFor(exam), v = Progress.readiness(exam), low = n < 30, sp = statePass(), pass = sp ? sp / 100 : null;
  return '<a class="gaugecell" href="#study/' + exam + '"><span class="gaugecell__name">' + examName(exam) + '</span>' +
    gaugeSVG({ value: low ? 0 : v / 100, passAt: pass, read: low ? '--' : v + '%', label: low ? 'Not enough answers yet' : 'Readiness ' + v + ' percent' + (pass ? ', pass line ' + CONFIG.passLine : '') }) +
    '<span class="gaugecell__note">' + esc(Progress.note(exam)) + '</span></a>';
}
function resumeTarget() {
  var id = Store.get('last', null), m = id && modById(id);
  if (m && forState(m) && !Stops.get(id).prove) return m;
  var list = NF.modules.filter(function (x) { return examsForTrack().indexOf(x.exam) >= 0 && forState(x); });
  return list.filter(function (x) { return !Stops.get(x.id).prove; })[0] || null;
}

var VIEWS = {
  home: function () {
    if (!curState() && track()) Store.set('state', 'va'); /* existing users were all Virginia */
    if (!curState() || (isVA() && !track())) return go('welcome', true);
    var r = resumeTarget(), exams = examsForTrack(), date = Store.get('testDate', ''), days = null;
    if (date) days = Math.ceil((new Date(date + 'T12:00:00') - Date.now()) / 864e5);
    var open = NF.modules.filter(function (m) { return exams.indexOf(m.exam) >= 0 && forState(m) && !Stops.get(m.id).prove; }).length;
    var due = Callbacks.due(null).length, coming = Callbacks.upcoming(null).length;
    var mod = r && '<p class="field__k" id="pick">' + (Stops.get(r.id).card || Stops.get(r.id).inspect ? 'Pick up where you left off' : 'Next stop') + '</p>' +
      '<h2 class="mt1 mb3">' + esc(r.title) + '</h2><p class="muted mb3">' + examName(r.exam) + '. ' + esc(r.goal) + '</p><div class="mb4">' + Stops.pips(r.id) + '</div>' +
      '<a class="btn btn--go btn--wide" href="#stop/' + r.exam + '/' + r.id + '">Keep going</a>';
    var urgent = days !== null && days >= 0 && days < 3
      ? '<div class="gs__note gs__note--call"><b>Test in ' + days + (days === 1 ? ' day.' : ' days.') + '</b> Skip new stops. Work your callbacks.</div>'
      : days !== null && days >= 0 && days <= 7 ? '<div class="gs__note"><b>Test in ' + days + ' days.</b> Time for a mock exam.</div>' : '';
    view.innerHTML = pagehead("Today's route") + '<div class="home"><div class="home__a stack">' + stateNote() + urgent +
      '<section class="ticket ticket--raised" aria-labelledby="pick"><div class="ticket__head"><span>Your study plan</span><span>' + esc(stateName()) + (isVA() ? ' · ' + (track() === 'commercial' ? 'Commercial' : 'Registered Tech') : '') + '</span></div>' +
      '<div class="formrow"><div class="field"><span class="field__k">Test date</span><span class="field__v">' + (days === null ? 'Not set' : days < 0 ? 'Passed' : days + ' days') + '</span></div>' +
      '<div class="field"><span class="field__k">This week</span><span class="field__v">' + Progress.weekMinutes() + ' min</span></div>' +
      '<div class="field"><span class="field__k">Open</span><span class="field__v">' + open + ' stops</span></div></div>' +
      '<div class="ticket__body">' + (mod || '<h2 class="mb3">Every stop stamped.</h2><p class="muted mb3">Now take a mock exam and work your callbacks.</p><a class="btn btn--go btn--wide" href="#mock">Mock exam</a>') + '</div></section>' +
      Field.homeBug() + Field.homeSeason() +
      '<a class="drill" href="#drill" aria-label="Quick drill. 5 questions, 2 minutes."><span><span class="drill__big">Quick drill</span><br><span>5 questions. 2 minutes. Good for between stops.</span></span><span class="drill__go">' + icon('next') + '</span></a>' +
      '</div><div class="home__b stack">' +
      '<section class="ticket" aria-label="Exam readiness"><div class="ticket__head"><span>Readiness</span><span>' + (statePass() ? 'Red tick = ' + statePass() + '% to pass' : 'No pass line yet') + '</span></div><div class="gauges' + (exams.length === 1 ? ' gauges--one' : exams.length === 3 ? ' gauges--three' : '') + '">' + exams.map(gaugeCell).join('') + '</div></section>' +
      '<section class="ticket"><div class="formrow formrow--end"><div class="field"><span class="field__k">Field training</span><span class="field__v">' + Field.doneThisYear() + ' of 12 months done</span></div></div></section>' +
      '<nav class="list" aria-label="Study tools">' +
      (Auth.isManager() ? listRow('#team', 'exam', 'Team', 'Add employees and see everyone\'s progress') : '') +
      listRow('#callbacks', 'back', 'Callbacks', due ? due + ' ' + (due === 1 ? 'miss' : 'misses') + ' due for another look' : coming ? 'Nothing due today. ' + coming + ' coming back soon.' : 'Nothing due right now') +
      listRow('#study/cond', 'exam', 'Conducive conditions', 'Real job photos. Spot what invites pests') +
      listRow('#game/suspended', 'tank', 'Keep It Suspended', 'Game. Who needs shaking, who doesn\'t.') +
      listRow('#calls', 'truck', 'Field calls', 'Service calls, start to finish') +
      listRow('#study/sops', 'exam', 'SOPs', 'Job checklists, general pest to bed bugs') +
      listRow('#cards', 'cards', 'Flashcards', 'Tap to flip, sort what you know') +
      listRow('#mock', 'exam', isVA() ? 'Mock exam' : 'Practice exam', isVA() ? 'Full practice run, 76% to pass' : 'General questions, not your state exam') +
      listRow('#info', 'book', 'Exam info', isVA() ? 'Which test, how to sign up, what it costs' : 'Who to contact in ' + stateName()) +
      listRow('#settings', 'theme', 'Settings', 'State, test date, track, your branch') +
      '</nav>' + (exams.indexOf('wdo') < 0 ? '<a class="backlink" href="#study/wdo">WDO 7B for your termite training' + icon('chev') + '</a>' : '') + disclaimer() + '</div></div>';
  },

  welcome: function () {
    document.body.classList.add('in-game');
    if (!curState()) {
      view.innerHTML = '<div class="welcome stack"><h1>Which state do you work in?</h1><p class="lead">Pesticide rules and exams are set by each state. You can change this any time in Settings.</p>' +
        '<div class="pick" id="pickState">' + Object.keys(STATES).map(function (k) {
          var s = STATES[k];
          return '<button class="pick__b" type="button" data-s="' + k + '"><b>' + esc(s.name) + '</b><span>' + (s.ready ? 'Full exam prep: state rules, exams and practice tests.' : 'General material only. State rules not added yet.') + '</span></button>';
        }).join('') + '</div></div>';
      $('#pickState').addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.pick__b') : null;
        if (!b) return;
        Store.set('state', b.getAttribute('data-s'));
        go(isVA() ? 'welcome' : 'home', true);
      });
      return;
    }
    view.innerHTML = '<div class="welcome stack"><h1>Which test are you studying for?</h1><p class="lead">You can change this any time in Settings.</p>' +
      '<div class="pick" id="pick">' +
      '<button class="pick__b" type="button" data-t="rt"><b>Registered Technician</b><span>New tech, after 40 hours of training. One 50-question exam built on the Core manual.</span></button>' +
      '<button class="pick__b" type="button" data-t="commercial"><b>Commercial Core + 7B</b><span>RT for a year or more, or equivalent. Core exam plus the WDO 7B category exam.</span></button>' +
      '<button class="pick__b" type="button" data-t="unsure"><b>Not sure</b><span>Show me how it works.</span></button></div>' +
      '<label class="checkrow"><input type="checkbox" id="pickLawn"' + (lawnOn() ? ' checked' : '') + '> Also studying for Lawn & Ornamental (categories 3A and 3B)</label><div id="pickFb" aria-live="polite"></div>' + disclaimer() + '</div>';
    $('#pickLawn').addEventListener('change', function (e) { Store.set('lawnTest', e.target.checked); });
    $('#pick').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.pick__b') : null;
      if (!b) return;
      var t = b.getAttribute('data-t');
      if (t === 'unsure') {
        $('#pickFb').innerHTML = '<div class="gs__note">New techs take the RT exam first: 50 questions, 76% to pass. After a year as an RT, you can sit Commercial Core plus a category exam like 7B. Start with RT unless your manager says different.</div><button class="btn btn--go btn--wide mt3" id="pickRT" type="button">Start with RT</button>';
        $('#pickRT').addEventListener('click', function () { Store.set('track', 'rt'); go('home', true); });
        return;
      }
      Store.set('track', t); go('home', true);
    });
  },

  study: function (tab) {
    STUDY_TAB = tab || STUDY_TAB || 'core';
    view.innerHTML = pagehead('Study', 'Every stop runs like a service visit. Inspect the facts. Protect with practice. Prove it on a short check.') + stateNote() +
      '<div class="seg seg--6" role="group" aria-label="Section">' + [['core', 'Core'], ['wdo', isVA() ? 'WDO 7B' : 'WDO'], ['lawn', 'Lawn & Orn.'], ['cond', 'Conditions'], ['field', 'Field'], ['sops', 'SOPs']].map(function (t) {
        return '<button type="button" data-t="' + t[0] + '" aria-pressed="' + (t[0] === STUDY_TAB) + '">' + t[1] + '</button>';
      }).join('') + '</div><div id="stops"></div>';
    function paint() {
      $$('.seg button', view).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-t') === STUDY_TAB)); });
      var el = $('#stops');
      if (STUDY_TAB === 'sops') { SOPs.list(el); return; }
      if (STUDY_TAB === 'cond') { Conditions.list(el); return; }
      var intro = STUDY_TAB === 'lawn' ? (lawnOn() ? '' : '<div class="gs__note gs__note--call mb3"><b>Lawn & Ornamental is turned off.</b> Turn it on in Settings to get its readiness gauge, mock exam and drills.</div>') +
        '<section class="ticket mb3"><div class="ticket__head"><span>Lawn & Ornamental test</span><span>' + (isVA() ? 'Categories 3A and 3B' : 'Category exam') + '</span></div><div class="ticket__body"><p>Weed control, lime, fertilizer, aeration, overseeding, and ornamental and turf pests. Work the stops, then take the mock exam.</p>' +
        '<p class="muted small mt2">' + (isVA() ? 'In Virginia, turf work for hire is category 3B and ornamentals are 3A; each is taken with the Core exam. Confirm with VDACS. ' : '') + 'Ninefold\'s lawn SOP is pending approval, so confirm products and rates with your manager.</p>' +
        '<div class="pair mt3"><a class="btn btn--go" href="#mock/lawn">Mock exam</a><a class="btn" href="#drill/lawn">Quick drill</a></div></div></section>' : '';
      if (STUDY_TAB === 'field') { el.innerHTML = '<nav class="list" aria-label="Field training">' +
        listRow('#bug', 'bug', 'Bug of the Month', 'One pest. Five minutes.') +
        listRow('#season', 'calendar', 'Seasonal training', 'What changes on the route this season') +
        listRow('#calendar', 'calendar', 'Pest pressure calendar', Field.ownTiming() ? 'The ' + (stateName() || 'Virginia') + ' year at a glance' : 'Based on Virginia timing') +
        listRow('#calls', 'truck', 'Field calls', 'Service calls, start to finish') + '</nav>'; return; }
      el.innerHTML = intro + '<p class="muted small mb3">' + Stops.doneCount(STUDY_TAB) + ' of ' + modsFor(STUDY_TAB).length + ' stops stamped.</p>' + modsFor(STUDY_TAB).map(function (m, i) {
        return '<a class="stop" href="#stop/' + m.exam + '/' + m.id + '"><span class="stop__no">' + (i + 1) + '</span><span class="stop__main"><span class="stop__title">' + esc(m.title) + '</span>' + Stops.pips(m.id) + '</span></a>';
      }).join('');
    }
    $('.seg', view).addEventListener('click', function (e) { var t = e.target.getAttribute('data-t'); if (t) { STUDY_TAB = t; paint(); } });
    paint();
  },

  stop: function (exam, id, phase) {
    var m = modById(id); if (!m || !forState(m)) return go('study', true);
    STUDY_TAB = exam; Store.set('last', id);
    phase = phase || Stops.phase(id);
    var tabs = '<div class="phase" role="group" aria-label="Phases">' + ['inspect', 'protect', 'prove'].map(function (p) {
      return '<a href="#stop/' + exam + '/' + id + '/' + p + '" class="' + (p === phase ? 'is-now' : '') + '"' + (p === phase ? ' aria-current="step"' : '') + '>' + cap(p) + '</a>';
    }).join('') + '</div>';
    var head = backLink('#study/' + exam, 'All stops') + '<div class="pagehead"><h1>' + esc(m.title) + '</h1><p>' + esc(m.goal) + '</p></div>' + tabs + '<div id="ph"></div>';
    view.innerHTML = head;
    var ph = $('#ph');
    if (phase === 'inspect') {
      /* Pair each card with its question before filtering, so state-only cards drop out together. */
      var allQ = NF.cardQuiz[id] || [];
      var cards = m.cards.map(function (c, n) { return { c: c, q: allQ[n] }; }).filter(function (x) { return forState(x.c); });
      var slides = cards.map(function (x) { return x.c; }).concat([{ h: 'Watch for', list: m.traps }, { h: 'Memory trick', b: m.aid, big: true, means: NF.aidWhy && NF.aidWhy[id] }, { h: 'On the truck', b: m.truck }]);
      var i = Math.min(Stops.get(id).card || 0, slides.length - 1);
      var paint = function () {
        var s = slides[i], last = i === slides.length - 1, cq = i < cards.length ? cards[i].q : null;
        var learn = '<h2>' + esc(s.h) + checkTag(s) + '</h2>' + (s.list ? '<ul class="plain">' + s.list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '<p class="' + (s.big ? 'aid' : 'lead') + '">' + esc(s.b) + '</p>') +
          (s.means ? '<p class="field__k mt2">What it means</p><p class="lead">' + esc(s.means) + '</p>' : '');
        /* A card with a question asks first and teaches after. Choices shuffle so position never gives it away. */
        var body = cq
          ? '<p class="q__stem" id="cStem">' + esc(cq[0]) + '</p><ul class="choices" id="cChoices" aria-labelledby="cStem">' + shuffle(cq[1].map(function (c, n) { return n; })).map(function (n, pos) {
              return '<li><button class="choice" type="button" data-i="' + n + '"><span class="choice__k">' + 'ABC'[pos] + '</span><span>' + esc(cq[1][n]) + '</span>' + icon('check') + '</button></li>';
            }).join('') + '</ul><div id="cFb" aria-live="polite"></div>'
          : learn;
        ph.innerHTML = '<article class="ticket"><div class="ticket__head"><span>Inspect</span><span>' + (i + 1) + ' of ' + slides.length + '</span></div><div class="ticket__body card">' + body + '</div></article>' +
          '<div class="pair mt3"><button class="btn" id="cPrev" type="button"' + (i ? '' : ' disabled') + '>Back</button><button class="btn btn--go" id="cNext" type="button"' + (cq ? ' disabled' : '') + '>' + (last ? 'Done' : 'Next') + '</button></div>' +
          '<p class="muted small mt3">Look it up: ' + esc(lookItUp(m.ref)) + '</p>';
        if (cq) $('#cChoices').addEventListener('click', function (e) {
          var b = e.target.closest ? e.target.closest('.choice') : null;
          if (!b || b.disabled) return;
          var p = +b.getAttribute('data-i'), good = p === cq[2], pick = b.querySelector('.choice__k').textContent;
          var key = $$('#cChoices .choice').filter(function (x) { return +x.getAttribute('data-i') === cq[2]; })[0].querySelector('.choice__k').textContent;
          $$('#cChoices .choice').forEach(function (x) {
            var n = +x.getAttribute('data-i'); x.disabled = true;
            if (n === cq[2]) x.classList.add('is-right');
            else if (n === p) { x.classList.add('is-miss'); $('use', x).setAttribute('href', '#i-x'); }
            else x.classList.add('is-dim');
          });
          $('#cFb').innerHTML = (good
            ? '<div class="verdict verdict--right" role="status">' + icon('check') + '<span><b>Right.</b> ' + esc(cq[1][cq[2]]) + '</span></div>'
            : '<div class="verdict verdict--miss" role="status">' + icon('x') + '<span><b>Not quite.</b> The answer is ' + key + ': ' + esc(cq[1][cq[2]]) + '</span></div>' +
              '<div class="explain mb3"><div class="explain__row explain__row--miss"><span class="explain__k">Why ' + pick + ' is wrong</span><span>' + esc(cq[3][p]) + '</span></div></div>') +
            '<div class="learn">' + learn + '</div>';
          $('#cNext').disabled = false; $('#cNext').focus();
        });
        $('#cPrev').addEventListener('click', function () { i--; Stops.set(id, { card: i }); paint(); });
        $('#cNext').addEventListener('click', function () {
          if (last) { Stops.set(id, { inspect: true, card: 0 }); go('stop/' + exam + '/' + id + '/protect', true); }
          else { i++; Stops.set(id, { card: i }); paint(); }
        });
      };
      paint();
    } else if (phase === 'protect') {
      var g = m.game && GAMES.filter(function (x) { return x.id === m.game; })[0];
      ph.innerHTML = '<div class="stack"><p class="lead">Practice it. Nothing here can hurt your score.</p>' +
        (g ? '<a class="btn btn--go btn--wide" id="pGame" href="#game/' + g.id + '">Play ' + esc(g.t) + '</a>' : '') +
        '<button class="btn btn--wide' + (g ? '' : ' btn--go') + '" id="pPractice" type="button">3 practice questions</button>' +
        '<a class="btn btn--wide" href="#stop/' + exam + '/' + id + '/prove">Skip to the check</a></div>';
      var pg = $('#pGame'); if (pg) pg.addEventListener('click', function () { Stops.set(id, { protect: true }); });
      $('#pPractice').addEventListener('click', function () {
        Quiz.practice({ el: ph, title: 'Practice', qs: shuffle(questionsFor(exam, id)).slice(0, 3), graded: false, noCallback: true, back: '#stop/' + exam + '/' + id,
          onEnd: function () { Stops.set(id, { protect: true }); go('stop/' + exam + '/' + id + '/prove', true); } });
      });
    } else {
      var qs = shuffle(questionsFor(exam, id)).slice(0, 5);
      ph.innerHTML = '<p class="lead mb3">Five questions. Get 4 right to stamp the stop.</p><button class="btn btn--go btn--wide" id="pStart" type="button">Start the check</button>';
      $('#pStart').addEventListener('click', function () {
        Quiz.practice({ el: ph, title: 'Prove it', qs: qs, onEnd: function (r) {
          var ok = r.right >= 4, s = Stops.get(id);
          Stops.set(id, { prove: s.prove || ok, inspect: true, protect: true, score: Math.max(s.score || 0, r.right) });
          var next = modsFor(exam).filter(function (x) { return !Stops.get(x.id).prove; })[0];
          ph.innerHTML = '<div class="stack"><span class="stamp ' + (ok ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span><h2>' + r.right + ' of ' + r.total + '</h2>' +
            '<p class="lead">' + (ok ? 'Stop stamped.' : 'Close it out on a second try. Misses are in your callbacks.') + '</p>' +
            (ok && next ? '<a class="btn btn--go btn--wide" href="#stop/' + exam + '/' + next.id + '">Next: ' + esc(next.title) + '</a>' : '') +
            (!ok ? '<a class="btn btn--go btn--wide" id="pAgain" href="#stop/' + exam + '/' + id + '/inspect">Review the cards</a>' : '') +
            '<a class="btn btn--wide" href="#study/' + exam + '">All stops</a></div>';
        } });
      });
    }
  },

  drill: function (exam) {
    var soon = (function () { var d = Store.get('testDate', ''); return d ? Math.ceil((new Date(d + 'T12:00:00') - Date.now()) / 864e5) : null; })();
    var ex = exam || null, pool = ex ? [ex] : examsForTrack();
    var picks = [], seen = {}, add = function (id) { if (id && !seen[id] && NF.q[id]) { seen[id] = 1; picks.push(NF.q[id]); } };
    var due = shuffle(Callbacks.due(soon !== null && soon < 14 ? 'exam' : null));
    due.slice(0, 2).forEach(add);
    var weak = []; pool.forEach(function (e) { weak = weak.concat(Progress.weakTopics(e)); });
    weak.sort(function (a, b) { return Progress.mastery(a.id) - Progress.mastery(b.id); });
    if (weak[0]) shuffle(questionsFor(weak[0].exam, weak[0].id)).slice(0, 2).forEach(function (q) { add(q.id); });
    var all = []; pool.forEach(function (e) { all = all.concat(questionsFor(e)); });
    shuffle(all).forEach(function (q) { if (picks.length < 5) add(q.id); });
    view.innerHTML = backLink('#home', 'Home') + '<div id="q"></div>';
    Quiz.practice({ el: $('#q'), title: 'Quick drill', qs: shuffle(picks), clock: 120, back: '#home', onEnd: function (r) {
      $('#q').innerHTML = '<div class="stack"><span class="stamp ' + (r.right >= 4 ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span><h2>' + r.right + ' of ' + r.total + '</h2>' +
        '<p class="lead">' + (r.right >= 4 ? 'Good stop. Back on the road.' : 'Misses are in your callbacks. They come back tomorrow.') + '</p>' +
        '<a class="btn btn--go btn--wide" href="#drill" data-force="1">Run another</a><a class="btn btn--wide" href="#home">Back to the route</a></div>';
    } });
  },

  mock: function (kind, arg) {
    if (kind === 'review') return mockReview(+arg || 0);
    if (kind && CONFIG.mock[kind]) return mockIntro(kind);
    var saved = Store.get('mock', null), hist = Store.get('mockres', []);
    view.innerHTML = pagehead(isVA() ? 'Mock exam' : 'Practice exam', isVA() ? 'One question at a time. Answers at the end. 76% to pass.' : STATES[curState()].ready ? stateName() + ' rules plus general questions. Practice sets, not the real exam.' : 'General questions that apply in every state. This is not the ' + stateName() + ' exam.') + stateNote() +
      (saved && mockKinds().indexOf(saved.kind) >= 0 ? '<a class="btn btn--go btn--wide mb4" href="#mock/' + saved.kind + '">Resume ' + esc(mockTitle(saved.kind)) + '</a>' : '') +
      '<nav class="list">' + mockKinds().map(function (k) {
        var c = CONFIG.mock[k];
        return listRow('#mock/' + k, 'exam', mockTitle(k), !isVA() ? 'Practice set of up to ' + c.count + ' questions' : c.official ? c.count + ' questions. The real length.' : 'Practice length. VDACS doesn\'t publish this.');
      }).join('') + '</nav>' +
      (hist.length ? '<h2 class="sectitle mt5">Past runs</h2><nav class="list">' + hist.map(function (h, i) {
        return listRow('#mock/review/' + i, 'exam', mockTitle(h.kind) + ': ' + h.pct + '%', h.on + '. ' + h.right + ' of ' + h.total);
      }).join('') + '</nav>' : '');
  },

  cards: function (deck) {
    if (!deck) {
      view.innerHTML = pagehead('Flashcards', 'Tap to flip. Got it, or see it again. These don\'t touch your readiness.') + '<nav class="list">' + NF.decks.filter(forState).map(function (d) {
        return listRow('#cards/' + d.id, 'cards', d.t, d.cards.length + ' cards');
      }).join('') + '</nav>';
      return;
    }
    var d = NF.decks.filter(function (x) { return x.id === deck; })[0]; if (!d || !forState(d)) return go('cards', true);
    var q = shuffle(d.cards), got = 0, total = q.length;
    view.innerHTML = backLink('#cards', 'All decks') + pagehead(d.t) + '<div id="fc"></div>';
    function paint() {
      if (!q.length) { $('#fc').innerHTML = '<div class="stack"><span class="stamp stamp--pass">Done</span><p class="lead">All ' + total + ' cards sorted.</p><a class="btn btn--go btn--wide" href="#cards/' + d.id + '" data-force="1">Run the deck again</a><a class="btn btn--wide" href="#cards">All decks</a></div>'; return; }
      var c = q[0];
      $('#fc').innerHTML = '<p class="data small mb2">' + got + ' of ' + total + ' got</p><button class="flash" type="button" id="flash" aria-pressed="false"><span class="flash__in">' +
        '<span class="flash__face flash__face--front"><span class="field__k">Front</span><span class="head flash__t">' + esc(c[0]) + '</span><span class="muted">Tap to flip</span></span>' +
        '<span class="flash__face flash__face--back"><span class="field__k">Back</span><span class="flash__a">' + esc(c[1]) + '</span></span></span></button>' +
        '<div class="pair mt3" id="fcBtns" hidden><button class="btn" id="fcAgain" type="button">Again</button><button class="btn btn--go" id="fcGot" type="button">Got it</button></div>';
      var f = $('#flash');
      f.addEventListener('click', function () { var on = f.classList.toggle('is-flipped'); f.setAttribute('aria-pressed', String(on)); $('#fcBtns').hidden = false; });
      $('#fcAgain').addEventListener('click', function () { q.push(q.shift()); paint(); });
      $('#fcGot').addEventListener('click', function () { q.shift(); got++; paint(); });
    }
    paint();
  },

  callbacks: function (tab) {
    var mode = tab === 'field' ? 'field' : 'exam';
    var field = mode === 'field', due = Callbacks.due(mode), later = Callbacks.upcoming(mode), cb = Callbacks.all(), t = today();
    var home = '#callbacks' + (field ? '/field' : '');
    function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
    function when(id) { var d = cb[id].due - t; return d <= 1 ? 'Tomorrow' : 'In ' + d + ' days'; }
    function from(q) { var m = modById(q.module); return m ? m.title : (q.topicName || 'Field training'); }
    function progress(id) { return !field && cb[id].stage >= 1 ? 'Right once. One more to clear.' : ''; }
    function tabLabel(m, name) {
      var d = Callbacks.due(m).length, w = Callbacks.upcoming(m).length;
      return name + (d ? ' <span class="seg__n seg__n--due">' + d + ' due</span>' : w ? ' <span class="seg__n">' + w + ' waiting</span>' : '');
    }
    var rule = field ? 'Get it right once to clear it.' : 'Get it right twice, a few days apart, to clear it.';
    var list = later.length ? '<section class="mt5" aria-labelledby="cbLater"><div class="cbhead"><h2 id="cbLater">Coming back</h2><span class="muted small">' + plural(later.length, 'question', 'questions') + '</span></div>' +
      '<div class="list">' + later.map(function (id) {
        var q = NF.q[id], p = progress(id);
        return '<div class="cbrow"><span><span class="cbrow__q">' + esc(q.question) + '</span><small>' + esc(from(q)) + (p ? ' · <span class="cbrow__p">' + p + '</span>' : '') + '</small></span><span class="tag">' + when(id) + '</span></div>';
      }).join('') + '</div><button class="btn btn--wide mt3" id="cbEarly" type="button">Practice these early</button></section>' : '';
    view.innerHTML = pagehead('Callbacks', 'Missed questions come back here until you get them right.') +
      '<div class="seg seg--2" id="cbTabs" role="group" aria-label="Callback type"></div>' +
      '<div id="cb"></div>';
    var el = $('#cb');
    function tabs() { $('#cbTabs').innerHTML = '<a href="#callbacks" aria-current="' + !field + '">' + tabLabel('exam', 'Exam') + '</a><a href="#callbacks/field" aria-current="' + field + '">' + tabLabel('field', 'Field') + '</a>'; }
    tabs();
    function run(ids) {
      var qs = shuffle(ids).slice(0, 10).map(function (id) { return NF.q[id]; });
      Quiz.practice({ el: el, title: 'Callback', qs: qs, back: home, onEnd: function (r) {
        var miss = r.total - r.right, left = Callbacks.due(mode).length + Callbacks.upcoming(mode).length;
        tabs();
        el.innerHTML = '<section class="ticket ticket--raised"><div class="ticket__body stack">' +
          '<span class="stamp ' + (miss ? 'stamp--call">Keep at it' : 'stamp--pass">Clean') + '</span>' +
          '<h2>' + r.right + ' of ' + r.total + ' right</h2>' +
          '<p class="muted">' + (miss ? plural(miss, 'miss goes', 'misses go') + ' back on the schedule. ' : '') + (left ? plural(left, 'question', 'questions') + ' still in ' + (field ? 'Field' : 'Exam') + ' callbacks.' : 'This list is clear.') + '</p>' +
          '<a class="btn btn--go btn--wide" href="' + home + '" data-force="1">Back to Callbacks</a></div></section>';
      } });
    }
    if (due.length) {
      var mins = Math.max(1, Math.round(Math.min(due.length, 10) * 20 / 60));
      el.innerHTML = '<section class="ticket ticket--raised"><div class="ticket__head"><span>Due today</span><span>About ' + mins + ' min</span></div>' +
        '<div class="ticket__body"><h2 class="cbbig">' + plural(due.length, 'question', 'questions') + '</h2><p class="muted mb4">' + rule + (due.length > 10 ? ' Ten at a time.' : '') + '</p>' +
        '<button class="btn btn--go btn--wide" id="cbGo" type="button">' + (due.length > 10 ? 'Start the first 10' : 'Start review') + '</button></div></section>' + list;
      $('#cbGo').addEventListener('click', function () { run(due); });
    } else if (later.length) {
      el.innerHTML = '<div class="gs__note"><b>Nothing due today.</b> The next one comes back ' + when(later[0]).toLowerCase() + '. ' + rule + '</div>' + list;
    } else {
      el.innerHTML = '<section class="ticket"><div class="ticket__body"><h2 class="mb2">All clear.</h2><p class="muted mb4">' +
        (field ? 'Missed Bug of the Month and Seasonal questions land here.' : 'Missed exam questions from Study, Drill and mock exams land here.') + '</p>' +
        '<a class="btn btn--go btn--wide" href="' + (field ? '#bug' : '#drill') + '">' + (field ? 'This month\'s bug' : 'Quick drill') + '</a></div></section>';
    }
    var early = $('#cbEarly');
    if (early) early.addEventListener('click', function () { run(later); });
  },

  calls: function (id) {
    if (!id) {
      view.innerHTML = pagehead('Field calls', 'Service calls walked through Inspect, Protect, Prove. All fictional.') + '<nav class="list">' + NF.calls.filter(forState).map(function (c) {
        return listRow('#calls/' + c.id, 'truck', c.title, c.area + '. ' + c.stop);
      }).join('') + '</nav>';
      return;
    }
    var c = NF.calls.filter(function (x) { return x.id === id; })[0]; if (!c || !forState(c)) return go('calls', true);
    var i = 0, right = 0;
    view.innerHTML = backLink('#calls', 'All calls') + '<div id="wo"></div>';
    function paint() {
      var s = c.steps[i];
      $('#wo').innerHTML = '<article class="ticket"><div class="ticket__head"><span>Service call</span><span>' + (i + 1) + ' of ' + c.steps.length + '</span></div>' +
        '<div class="formrow"><div class="field"><span class="field__k">Stop</span><span class="field__v">' + esc(c.stop) + '</span></div><div class="field"><span class="field__k">Area</span><span class="field__v">' + esc(c.area) + '</span></div></div>' +
        '<div class="ticket__body"><div class="phase phase--static" aria-label="Phase ' + s.phase + '">' + ['Inspect', 'Protect', 'Prove'].map(function (p) { return '<span class="' + (p === s.phase ? 'is-now' : '') + '">' + p + '</span>'; }).join('') + '</div>' +
        '<p class="work__complaint">' + esc(s.ask) + '</p><ul class="choices mt3" id="wc">' + shuffle(s.opts.map(function (o, n) { return n; })).map(function (n, pos) {
          return '<li><button class="choice" type="button" data-i="' + n + '"><span class="choice__k">' + 'ABCD'[pos] + '</span><span>' + esc(s.opts[n]) + '</span>' + icon('check') + '</button></li>';
        }).join('') + '</ul><div id="wf" aria-live="polite"></div></div></article>';
      $('#wc').addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.choice') : null;
        if (!b || b.disabled) return;
        var p = +b.getAttribute('data-i'), good = p === s.ans;
        if (good) right++;
        $$('.choice', $('#wc')).forEach(function (el) {
          var n = +el.getAttribute('data-i');
          el.disabled = true;
          if (n === s.ans) el.classList.add('is-right');
          else if (n === p) { el.classList.add('is-miss'); $('use', el).setAttribute('href', '#i-x'); }
          else el.classList.add('is-dim');
        });
        $('#wf').innerHTML = '<div class="gs__note mt3 ' + (good ? 'gs__note--good' : 'gs__note--call') + '">' + esc(s.why) + '</div><button class="btn btn--go btn--wide mt3" id="wNext" type="button">' + (i + 1 < c.steps.length ? 'Next' : 'Finish the call') + '</button>';
        $('#wNext').addEventListener('click', function () {
          i++;
          if (i < c.steps.length) return paint();
          var ok = right >= Math.ceil(c.steps.length * .75);
          Progress.report({ game: 'call-' + c.id, score: right, pass: ok });
          $('#wo').innerHTML = '<div class="stack"><span class="stamp ' + (ok ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span><h2>' + right + ' of ' + c.steps.length + ' calls right</h2><div class="gs__note"><b>Take this to the truck:</b> ' + esc(c.takeaway) + '</div><a class="btn btn--go btn--wide" href="#calls">Next call</a></div>';
        });
      });
    }
    paint();
  },

  games: function () {
    var best = Store.get('best', {});
    view.innerHTML = pagehead('Games', 'About two minutes each. Each one teaches something the exam tests.') + '<div class="list">' + GAMES.filter(forState).map(function (g) {
      var b = best[g.id];
      return listRow('#game/' + g.id, g.ic || 'gauge', g.t, g.d, b && b.pass ? '<span class="tag tag--pass">Pass</span>' : icon('chev', 'chev'));
    }).join('') + '</div>';
  },

  game: function (id) {
    var g = GAMES.filter(function (x) { return x.id === id; })[0]; if (!g || !forState(g)) return go('games', true);
    document.body.classList.add('in-game');
    view.innerHTML = '';
    ACTIVE_GAME = g.mod(); ACTIVE_GAME.mount(view);
  },

  info: function () {
    if (!isVA() && STATES[curState()].ready) {
      var sd = STATES[curState()].data;
      view.innerHTML = backLink('#home', 'Home') + pagehead('Exam info', sd.name + ' only. Checked against state sources on ' + (sd.verified || '') + '.') + '<div class="stack">' +
        (sd.tracks || []).map(function (t) {
          return '<section class="ticket"><div class="ticket__head"><span>' + esc(t.name) + '</span></div><div class="ticket__body stack"><p>' + esc(t.who) + '</p>' +
            (t.exams || []).map(function (e) { return '<p><b>' + esc(e.name) + ':</b> ' + (e.questions ? e.questions + ' questions' : 'question count not published') + ', ' + (typeof e.pass === 'number' ? e.pass + '% to pass' : 'pass mark not published') + (e.official ? '' : '. Not confirmed by the state') + '.</p>'; }).join('') + '</div></section>';
        }).join('') +
        (sd.examInfo || []).map(function (sec) {
          return '<section class="ticket"><div class="ticket__head"><span>' + esc(sec.title) + '</span></div><table class="tbl"><tbody>' + sec.rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></section>';
        }).join('') +
        ((sd.notPublished || []).length ? '<section class="ticket"><div class="ticket__head"><span>Not published</span></div><div class="ticket__body"><p>The state does not publish these, so we will not guess. Ask before test day:</p><ul class="plain">' + sd.notPublished.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></section>' : '') +
        '</div>' + disclaimer();
      return;
    }
    if (!isVA()) {
      var s = STATES[curState()];
      view.innerHTML = backLink('#home', 'Home') + pagehead('Exam info', s.name) + stateNote() +
        '<div class="ticket ticket__body stack"><p>Each state runs its own applicator certification, with its own exams, categories, pass marks and manuals. ' + esc(s.name) + ' details have not been researched for this site yet, so none are shown here. That way nothing you read is a guess.</p>' +
        '<p><b>Ask:</b> the ' + esc(s.agency) + ', and your branch manager.</p><p class="muted small">What still applies to you: label reading, formulations, toxicity, PPE, IPM, the environment, equipment, math, pest biology and the Ninefold SOPs.</p></div>' + disclaimer();
      return;
    }
    view.innerHTML = backLink('#home', 'Home') + pagehead('Exam info', 'Virginia only. Ninefold\'s other states have their own rules.') + NF.examInfo + disclaimer();
  },

  settings: function () {
    var t = track() || 'rt', st = curState() || 'va';
    view.innerHTML = backLink('#home', 'Home') + pagehead('Settings') + '<div class="stack">' +
      '<div class="ticket ticket__body stack"><label class="field__k" for="setState">State you work in</label><select class="input" id="setState">' + Object.keys(STATES).map(function (k) { return '<option value="' + k + '"' + (k === st ? ' selected' : '') + '>' + esc(STATES[k].name) + (STATES[k].ready ? '' : ' (general material only)') + '</option>'; }).join('') + '</select>' +
      (isVA() ? '<label class="field__k" for="setTrack">Test track</label><select class="input" id="setTrack"><option value="rt"' + (t === 'rt' ? ' selected' : '') + '>Registered Technician</option><option value="commercial"' + (t === 'commercial' ? ' selected' : '') + '>Commercial Core + 7B</option></select>' : '') +
      '<label class="checkrow"><input type="checkbox" id="setLawn"' + (lawnOn() ? ' checked' : '') + '> Lawn & Ornamental test: readiness gauge, mock exam and drills</label>' +
      '<label class="field__k" for="setDate">Test date</label><input class="input" id="setDate" type="date" value="' + esc(Store.get('testDate', '')) + '">' +
      '<label class="field__k" for="setName">Name for your training stamps (stays on this phone)</label><input class="input" id="setName" type="text" autocomplete="off" value="' + esc(Store.get('name', '')) + '">' +
      (Object.keys(Field.regions()).length > 1 ? '<label class="field__k" for="setRegion">Your branch area, for the pest calendar</label><select class="input" id="setRegion">' + Object.keys(Field.regions()).map(function (r) { return '<option value="' + r + '"' + (Field.regKey() === r ? ' selected' : '') + '>' + esc(Field.regions()[r].name) + '</option>'; }).join('') + '</select>' : '') + '</div>' +
      '<div class="ticket ticket__body"><h3 class="mb2">Reset progress</h3><p class="muted mb3">Clears all progress on this device.</p><button class="btn" id="setReset" type="button">Reset</button><div id="setConfirm"></div></div></div>';
    $('#setState').addEventListener('change', function (e) {
      Store.set('state', e.target.value);
      if (e.target.value === 'va' && !track()) Store.set('track', 'rt');
      go('settings', true);
    });
    var tr = $('#setTrack'); if (tr) tr.addEventListener('change', function (e) { Store.set('track', e.target.value); });
    $('#setLawn').addEventListener('change', function (e) { Store.set('lawnTest', e.target.checked); });
    var rg = $('#setRegion'); if (rg) rg.addEventListener('change', function (e) { Store.set('region', e.target.value); });
    $('#setDate').addEventListener('change', function (e) { Store.set('testDate', e.target.value); });
    $('#setName').addEventListener('input', function (e) { Store.set('name', e.target.value); });
    $('#setReset').addEventListener('click', function () {
      $('#setConfirm').innerHTML = '<p class="mt3 mb2"><b>This can\'t be undone.</b></p><button class="btn btn--go" id="setYes" type="button">Yes, clear it all</button>';
      $('#setYes').addEventListener('click', function () { Store.wipe(); Callbacks.badge(); go('welcome', true); });
    });
  },

  sop: function (id) { SOPs.view(view, id); },
  account: function () { Auth.accountView(); },
  team: function (id) { Auth.teamView(id); },
  bug: function (a, b) { Field.bugView(view, a, b); },
  bugs: function () { Field.bugArchive(view); },
  season: function (a, b) { Field.seasonView(view, a, b); },
  calendar: function () { Field.calendarView(view); },
  cond: function (a, b) { Conditions.route(view, a, b); }
};

/* The RT mock is a Virginia exam. Other states only get general practice sets. */
function mockKinds() { return Object.keys(CONFIG.mock).filter(function (k) { return (isVA() || k !== 'rt') && (k !== 'lawn' || lawnOn()); }); }
function mockTitle(k) { return isVA() || k === 'lawn' ? CONFIG.mock[k].title : (k === 'wdo' ? 'Wood-destroying practice' : 'Core practice'); }
function mockIntro(kind) {
  if (mockKinds().indexOf(kind) < 0) return go('mock', true);
  var c = CONFIG.mock[kind], saved = Store.get('mock', null);
  if (saved && saved.kind === kind) return Quiz.mock(view, kind, saved);
  view.innerHTML = backLink('#mock', 'All practice runs') + pagehead(mockTitle(kind) + (isVA() ? ' mock' : ''), !isVA() ? (STATES[curState()].ready ? stateName() + ' rules plus general questions. A practice set, not the real exam. See Exam info for its length and pass mark.' : 'General questions only. This is not the ' + stateName() + ' exam, and its length and pass mark are not known here.') : c.official ? c.count + ' questions. Pass at ' + Math.ceil(c.count * CONFIG.passLine / 100) + '. Both numbers are official.' : 'Practice length. VDACS doesn\'t publish the question count for this exam.') +
    '<div class="ticket ticket__body stack"><label class="checkrow"><input type="checkbox" id="mTimed" checked> Use a pacing timer (1 minute per question)</label>' +
    '<p class="muted small">No official time limit is published. This just helps you practice pace.</p>' +
    (Store.get('mock', null) ? '<p class="gs__note gs__note--call">Starting this replaces your unfinished mock.</p>' : '') +
    '<button class="btn btn--go btn--wide" id="mStart" type="button">Start</button></div>';
  $('#mStart').addEventListener('click', function () {
    var ids = Quiz.sample(c.exam, c.count);
    var st = { kind: kind, ids: ids, ans: {}, flags: {}, i: 0, started: Date.now(), limit: $('#mTimed').checked ? ids.length * CONFIG.secPerQuestion : 0 };
    Store.set('mock', st); Quiz.mock(view, kind, st);
  });
}
function mockReview(i) {
  var h = Store.get('mockres', [])[i]; if (!h) return go('mock', true);
  var ok = h.pct >= CONFIG.passLine;
  view.innerHTML = backLink('#mock', 'All practice runs') + '<div class="stack"><span class="stamp ' + (ok ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span>' +
    '<h1>' + h.pct + '%</h1><p class="lead">' + h.right + ' of ' + h.total + ' right. ' + (statePass() ? 'You need ' + statePass() + '%.' : 'Ask your manager what ' + esc(stateName()) + ' requires to pass.') + '</p>' +
    '<div class="ticket"><div class="ticket__head"><span>By topic</span></div><table class="tbl"><tbody>' + Object.keys(h.topics).map(function (t) {
      var x = h.topics[t], m = modById(t);
      return '<tr><th scope="row">' + esc(m ? m.title : t) + '</th><td class="data">' + x.r + ' of ' + x.n + '</td></tr>';
    }).join('') + '</tbody></table></div>' +
    (h.misses.length ? '<p class="gs__note gs__note--call">' + h.misses.length + ' misses went to Callbacks.</p><h2 class="sectitle">Review your misses</h2><p class="muted small">Tap a question to see what you picked, why it is wrong, and the right answer.</p>' + Quiz.missReview(h) : '') +
    '<p class="muted small">A practice score is not a promise. The real test comes from the manuals.</p>' +
    '<a class="btn btn--go btn--wide" href="#callbacks">Work the misses</a><a class="btn btn--wide" href="#home">Back to the route</a></div>';
}

var ACTIVE_GAME = null;
function render(force) {
  var raw = '';
  try { raw = (location.hash || '').slice(1); } catch (e) {}
  go(raw || 'home', force);
}
function go(route, force) {
  if (route === ROUTE && !force) return;
  ROUTE = route;
  Quiz.stop();
  if (ACTIVE_GAME) { ACTIVE_GAME.unmount(); ACTIVE_GAME = null; }
  document.body.classList.remove('in-game');
  var parts = route.split('/'), fn = VIEWS[parts[0]] || VIEWS.home;
  fn(parts[1], parts[2], parts[3]);
  var active = { game: 'games', stop: 'study', bug: 'study', bugs: 'study', season: 'study', calendar: 'study', calls: 'study', sop: 'study', cond: 'study', team: 'home', account: 'home' }[parts[0]] || parts[0];
  $$('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  Callbacks.badge();
  try { window.scrollTo(0, 0); } catch (e) {}
  try { view.focus({ preventScroll: true }); } catch (e) {}
}
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if (!a || a.classList.contains('skip')) return;
  e.preventDefault();
  var route = a.getAttribute('href').slice(1) || 'home';
  try { location.hash = route; } catch (x) {}
  go(route, a.hasAttribute('data-force'));
});
window.addEventListener('hashchange', function () { render(); });

document.getElementById('themeBtn').addEventListener('click', function () {
  var root = document.documentElement, cur = root.getAttribute('data-theme');
  if (!cur) cur = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var next = cur === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next); Store.set('theme', next);
});

/* Merge the banks once every script has loaded. Researched states add their own stop and questions. */
loadStates();
NF.questions = [].concat(
  (NF.questionsCore || []).map(function (q) { q.exam = 'core'; return tagState(q); }),
  (NF.questionsWdo || []).map(function (q) { q.exam = 'wdo'; return tagState(q); }),
  (NF.questionsLawn || []).map(function (q) { q.exam = 'lawn'; return q; }),
  stateQuestions(),
  Field.questions(),
  Conditions.questions()
);
indexQuestions();
/* With Supabase keys set, nothing renders until someone signs in. Without them, start right away. */
Auth.start(function () { render(true); });
