/* Shared helpers, storage, progress, callbacks and readiness. Loads first. */
window.NF = window.NF || {};

var Store = {
  get: function (k, d) { try { var v = localStorage.getItem('nf.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem('nf.' + k, JSON.stringify(v)); } catch (e) {} },
  wipe: function () {
    try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('nf.') === 0 && k !== 'nf.theme') localStorage.removeItem(k); }); } catch (e) {}
  }
};

var CONFIG = {
  passLine: 76,        /* VDACS/VTPP: 76% on all Virginia exams. research/exam-facts.md s5 */
  gameTime: 'about 2 min',
  mock: {
    rt:   { title: 'RT exam', exam: 'core', count: 50, official: true },
    core: { title: 'Commercial Core', exam: 'core', count: 50, official: false },
    wdo:  { title: 'WDO 7B', exam: 'wdo', count: 50, official: false },
    lawn: { title: 'Lawn & Ornamental', exam: 'lawn', count: 30, official: false }
  },
  secPerQuestion: 60   /* Practice pacing only. No official time limit is published. */
};

function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function icon(id, cls) { return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function today() { return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5); }
function checkTag(item) { return item && item.check ? ' <span class="tag tag--sample">Check the manual</span>' : ''; }

/* Sprayer gauge. Sweep is 240 degrees. `value` and band are 0 to 1 along the sweep. */
function gaugeSVG(opt) {
  var cx = 100, cy = 100, r = 78;
  function ang(v) { return -120 + 240 * v; }
  function pt(rad, a) { var t = a * Math.PI / 180; return (cx + rad * Math.sin(t)).toFixed(1) + ' ' + (cy - rad * Math.cos(t)).toFixed(1); }
  function arc(a, b) { return 'M' + pt(r, ang(a)) + ' A' + r + ' ' + r + ' 0 ' + ((b - a) * 240 > 180 ? 1 : 0) + ' 1 ' + pt(r, ang(b)); }
  var ticks = '';
  for (var i = 0; i <= 10; i++) {
    var a = ang(i / 10);
    ticks += '<path class="g-tick" d="M' + pt(i % 5 ? 64 : 58, a) + ' L' + pt(70, a) + '" stroke-width="' + (i % 5 ? 2 : 3) + '"/>';
  }
  var pass = opt.passAt == null ? '' : '<path class="g-pass" d="M' + pt(54, ang(opt.passAt)) + ' L' + pt(92, ang(opt.passAt)) + '" stroke-width="5"/>';
  var band = opt.band ? '<path class="g-band" fill="none" stroke-width="14" d="' + arc(opt.band[0], opt.band[1]) + '"/>' : '';
  return '<svg class="gauge" viewBox="0 0 200 168" role="img" aria-label="' + esc(opt.label || '') + '">' +
    '<path class="g-track" fill="none" stroke-width="14" d="' + arc(0, 1) + '"/>' + band + ticks + pass +
    '<g class="js-needle" transform="rotate(' + ang(opt.value).toFixed(1) + ' 100 100)"><path class="g-needle" stroke-width="5" stroke-linecap="round" d="M100 112 L100 40"/></g>' +
    '<circle class="g-hub" cx="100" cy="100" r="9"/>' +
    '<text class="js-read" x="100" y="156" text-anchor="middle" font-size="26" font-weight="600">' + esc(opt.read || '') + '</text></svg>';
}

/* ---- States. Only the states Ninefold works in. `ready` means that state's rules and exam
   facts have been researched. Others get only the general material, never guessed rules. ---- */
var STATES = {
  va: { name: 'Virginia', agency: 'Virginia Department of Agriculture and Consumer Services (VDACS), Office of Pesticide Services', ready: true },
  al: { name: 'Alabama', agency: 'Alabama Department of Agriculture and Industries', ready: false },
  pa: { name: 'Pennsylvania', agency: 'Pennsylvania Department of Agriculture', ready: false },
  ut: { name: 'Utah', agency: 'Utah Department of Agriculture and Food', ready: false }
};
/* Researched states arrive as NF.stateData[code]. Each one adds its own Laws stop, questions,
   flashcard deck and exam info, and is marked ready. Virginia's content lives in the main files. */
function loadStates() {
  var sd = NF.stateData || {};
  Object.keys(sd).forEach(function (k) {
    var d = sd[k], s = STATES[k]; if (!s || !d || !d.laws) return;
    var id = 'laws-' + k;
    s.ready = true; s.data = d; if (d.agency) s.agency = d.agency;
    NF.modules.unshift({ id: id, exam: 'core', state: k, title: d.laws.title || 'Laws and rules', goal: d.laws.goal, ref: d.laws.ref, cards: d.laws.cards, traps: d.laws.traps || [], aid: d.laws.aid, truck: d.laws.truck, game: null });
    NF.aidWhy[id] = d.laws.aidWhy; NF.cardQuiz[id] = d.laws.cardQuiz || [];
    if (d.deck) NF.decks.push({ id: 'state-' + k, state: k, t: d.deck.t, cards: d.deck.cards });
  });
}
/* State questions are tagged to that state and filed under its Laws stop or the matching topic. */
function stateQuestions() {
  var sd = NF.stateData || {}, out = [];
  Object.keys(sd).forEach(function (k) {
    (sd[k].questions || []).forEach(function (q) {
      q.state = k; q.exam = q.exam === 'wdo' ? 'wdo' : 'core';
      if (!modById(q.module) || q.module === 'laws') q.module = q.exam === 'wdo' ? (modById(q.module) ? q.module : 'treatment') : 'laws-' + k;
      out.push(q);
    });
  });
  return out;
}
/* A pass mark only shows when the state publishes one. */
function statePass() {
  if (isVA()) return CONFIG.passLine;
  var d = STATES[curState()] && STATES[curState()].data, p = null;
  ((d && d.tracks) || []).forEach(function (t) { (t.exams || []).forEach(function (e) { if (p === null && typeof e.pass === 'number') p = e.pass; }); });
  return p;
}
function curState() { var s = Store.get('state', null); return STATES[s] ? s : null; }
function stateName() { var s = curState(); return s ? STATES[s].name : ''; }
function isVA() { return curState() === 'va'; }
/* Anything tagged with a state shows only for that state. Untagged means it applies anywhere. */
function forState(x) { return !x || !x.state || x.state === (curState() || 'va'); }
/* Questions that test Virginia law or Virginia exam facts. */
var VA_PATTERN = /Virginia|VDACS|2VAC5|§\s?3\.2|Registered Technician|\bRTs?\b|Category 60|\b7B\b|\b7C\b|\b7A\b|76%|\bOPS\b|Pesticide Control Board|business license|service container|landlord|48 hours|10 working days/i;
function tagState(q) {
  if (!q.state && VA_PATTERN.test([q.question, q.explanation, q.source].concat(q.choices || []).join(' '))) q.state = 'va';
  return q;
}

/* ---- Question lookup ---- */
NF.q = {};
function indexQuestions() {
  (NF.questions || []).forEach(function (q) { NF.q[q.id] = q; });
}
function modById(id) { return NF.modules.filter(function (m) { return m.id === id; })[0]; }
function modsFor(exam) { return NF.modules.filter(function (m) { return m.exam === exam && forState(m); }); }
function questionsFor(exam, topic) {
  return (NF.questions || []).filter(function (q) { return q.exam === exam && (!topic || q.module === topic) && forState(q); });
}

/* ---- Progress ----
   Attempts feed readiness. Each topic keeps its last 10 graded answers. */
var Progress = {
  grade: function (q, right, opts) {
    opts = opts || {};
    if (q.module && modById(q.module)) {
      var att = Store.get('att', {});
      var list = att[q.module] || [];
      list.push(right ? 1 : 0);
      att[q.module] = list.slice(-10);
      Store.set('att', att);
      var n = Store.get('graded', 0); Store.set('graded', n + 1);
    }
    if (!opts.noCallback) Callbacks.answer(q.id, right, q);
  },
  report: function (r) {
    var best = Store.get('best', {});
    var b = best[r.game] || { score: 0, plays: 0, pass: false };
    b.score = Math.max(b.score, r.score || 0); b.plays++; b.pass = b.pass || !!r.pass;
    best[r.game] = b; Store.set('best', best);
    (r.misses || []).forEach(function (id) { if (NF.q[id]) Callbacks.miss(id); });
  },
  mastery: function (topic) {
    var list = Store.get('att', {})[topic] || [];
    if (!list.length) return 0;
    return list.reduce(function (a, b) { return a + b; }, 0) / Math.max(list.length, 5);
  },
  /* Even weights: Virginia publishes no blueprint. Untouched topics count 0. */
  readiness: function (exam) {
    var mods = modsFor(exam), sum = 0;
    mods.forEach(function (m) { sum += Progress.mastery(m.id); });
    return Math.round(sum / mods.length * 100);
  },
  weakTopics: function (exam) {
    var att = Store.get('att', {});
    return modsFor(exam).filter(function (m) { return (att[m.id] || []).length && Progress.mastery(m.id) < CONFIG.passLine / 100; });
  },
  attemptsFor: function (exam) {
    var att = Store.get('att', {}), n = 0;
    modsFor(exam).forEach(function (m) { n += (att[m.id] || []).length; });
    return n;
  },
  note: function (exam) {
    var n = Progress.attemptsFor(exam), r = Progress.readiness(exam), w = Progress.weakTopics(exam).length;
    if (n < 30) return 'Keep going. ' + (30 - n) + ' more to get a reading.';
    if (r >= CONFIG.passLine) return w ? 'Over the line. ' + w + ' weak topics left.' : 'Over the line. Try a mock.';
    return 'Close work. ' + w + ' weak ' + (w === 1 ? 'topic.' : 'topics.');
  },
  addTime: function (sec) {
    var w = Store.get('week', { n: 0, sec: 0 }), now = Math.floor(today() / 7);
    if (w.n !== now) w = { n: now, sec: 0 };
    w.sec += sec; Store.set('week', w);
  },
  weekMinutes: function () {
    var w = Store.get('week', { n: 0, sec: 0 });
    return w.n === Math.floor(today() / 7) ? Math.round(w.sec / 60) : 0;
  }
};

/* ---- Callbacks ----
   Miss: due tomorrow. Right once: due in 3 days. Right twice: cleared.
   Field-only misses clear after one right answer. */
var Callbacks = {
  all: function () { return Store.get('cb', {}); },
  miss: function (id) {
    var cb = Callbacks.all();
    cb[id] = { stage: 0, due: today() + 1 };
    Store.set('cb', cb);
  },
  answer: function (id, right, q) {
    var cb = Callbacks.all(), item = cb[id];
    if (!right) { cb[id] = { stage: 0, due: today() + 1 }; }
    else if (item) {
      if (item.stage >= 1 || (q && q.exam === 'field')) delete cb[id];
      else cb[id] = { stage: 1, due: today() + 3 };
    }
    Store.set('cb', cb);
  },
  due: function (filter) {
    var cb = Callbacks.all(), t = today();
    return Object.keys(cb).filter(function (id) {
      if (!NF.q[id] || cb[id].due > t || !forState(NF.q[id])) return false;
      var field = NF.q[id].exam === 'field';
      return filter === 'field' ? field : filter === 'exam' ? !field : true;
    });
  },
  /* Misses not due yet, soonest first, for the "Coming back" list. */
  upcoming: function (filter) {
    var cb = Callbacks.all(), t = today();
    return Object.keys(cb).filter(function (id) {
      if (!NF.q[id] || cb[id].due <= t || !forState(NF.q[id])) return false;
      var field = NF.q[id].exam === 'field';
      return filter === 'field' ? field : filter === 'exam' ? !field : true;
    }).sort(function (a, b) { return cb[a].due - cb[b].due; });
  },
  waiting: function () { return Object.keys(Callbacks.all()).filter(function (id) { return NF.q[id]; }).length; },
  badge: function () {
    var n = Callbacks.due(null).length, el = $('#cbBadge');
    if (!el) return;
    el.hidden = !n; el.textContent = n; el.setAttribute('aria-label', n + ' waiting');
  }
};

/* ---- Stops: Inspect, Protect, Prove ---- */
var Stops = {
  get: function (id) { return Store.get('stops', {})[id] || { card: 0, inspect: false, protect: false, prove: false, score: null }; },
  set: function (id, patch) {
    var all = Store.get('stops', {}), s = all[id] || { card: 0, inspect: false, protect: false, prove: false, score: null };
    Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
    all[id] = s; Store.set('stops', all); Store.set('last', id);
  },
  phase: function (id) { var s = Stops.get(id); return !s.inspect ? 'inspect' : !s.protect ? 'protect' : 'prove'; },
  doneCount: function (exam) { return modsFor(exam).filter(function (m) { return Stops.get(m.id).prove; }).length; },
  pips: function (id) {
    var s = Stops.get(id), now = s.prove ? '' : Stops.phase(id);
    return '<span class="pips">' + [['inspect', 'Inspect'], ['protect', 'Protect'], ['prove', 'Prove']].map(function (p) {
      var c = s[p[0]] ? ' is-done' : now === p[0] ? ' is-now' : '';
      return '<span class="pip' + c + '">' + p[1] + '</span>';
    }).join('') + '</span>';
  }
};

/* ---- Field training dates ---- */
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function seasonKey(m) { return m < 2 || m === 11 ? 'winter' : m < 5 ? 'spring' : m < 8 ? 'summer' : 'fall'; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
