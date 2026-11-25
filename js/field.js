/* Bug of the Month and Seasonal training. The device date picks what is featured and that
   is all it does: every month and season stays open. Finishing training never moves a
   readiness gauge. These questions carry exam:'field', so misses go to the Field filter. */
var Field = (function () {
  /* A researched state brings its own pests, seasons, regions and calendar. Virginia is the default. */
  function fd() { var s = curState(); return s && s !== 'va' && NF.stateField && NF.stateField[s] || null; }
  function bugs() { return fd() ? fd().bugs : NF.bugs || []; }
  function seasons() { return fd() ? fd().seasons : (NF.seasons && NF.seasons.seasons) || []; }
  function regions() { return fd() ? fd().regions || {} : (NF.seasons && NF.seasons.regions) || {}; }
  function calData() { return fd() || NF.seasons; }
  function regKey() { var r = Store.get('region', null), keys = Object.keys(regions()); return keys.indexOf(r) >= 0 ? r : keys.indexOf('piedmont') >= 0 ? 'piedmont' : keys[0]; }
  function regShort(k) { return (regions()[k] && regions()[k].name || k).replace(/\s*\(.*$/, ''); }
  /* Only states without their own research fall back to Virginia timing, and they are told so. */
  function timingNote() { return isVA() || fd() ? '' : '<div class="gs__note mb3"><b>Based on Virginia timing.</b> The pests and how to handle them apply widely, but months, regions and frost dates may differ in ' + esc(stateName()) + '.</div>'; }
  function monthIdx(b) { return MONTHS_LONG.indexOf(b.month); }
  function bugFor(i) { return bugs().filter(function (b) { return monthIdx(b) === i; })[0]; }
  function mm(i) { return ('0' + (i + 1)).slice(-2); }
  function year() { return new Date().getFullYear(); }
  /* Research tags stay honest on screen, in plain words. */
  function clean(t) { return esc(t).replace(/\s*\(confirmed[^)]*\)/gi, '').replace(/\s*\[(verify|confirm)[^\]]*\]/gi, ' <span class="tag tag--sample">Confirm</span>'); }
  function ul(a) { return '<ul class="plain">' + a.map(function (x) { return '<li>' + clean(x) + '</li>'; }).join('') + '</ul>'; }
  var BUGART = '<svg viewBox="0 0 56 56" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4"><ellipse cx="28" cy="21" rx="7" ry="7"/><ellipse cx="28" cy="38" rx="9" ry="13"/><path d="M19 30 8 24M19 37H7M20 45 9 51M37 30l11-6M37 37h12M36 45l11 6M24 15 18 6M32 15l6-9"/></g></svg>';

  function botmKey(i) { return year() + '-' + (i + 1); }
  function seasonRec(k) { return Store.get('season', {})[year() + '-' + k]; }
  function doneThisYear() {
    var d = Store.get('botm', {}), n = 0;
    for (var i = 0; i < 12; i++) if (d[botmKey(i)] && d[botmKey(i)].done) n++;
    return n;
  }
  function strip() {
    var m = new Date().getMonth(), d = Store.get('botm', {});
    return '<div class="months mt1" role="img" aria-label="Twelve months. ' + doneThisYear() + ' done this year.">' + MONTHS.map(function (n, i) {
      var c = i === m ? ' class="is-now"' : d[botmKey(i)] && d[botmKey(i)].done ? ' class="is-done"' : '';
      return '<span' + c + '>' + n.charAt(0) + '</span>';
    }).join('') + '</div>';
  }
  function homeBug() {
    var m = new Date().getMonth(), b = bugFor(m); if (!b) return '';
    var done = (Store.get('botm', {})[botmKey(m)] || {}).done;
    return '<div><a class="botm" href="#bug/' + mm(m) + '" aria-label="Bug of the Month for ' + MONTHS_LONG[m] + ': ' + esc(b.commonName) + '. About 5 minutes."><span class="botm__page"><span class="botm__mon">' + MONTHS[m] + '</span><span class="botm__art">' + BUGART + '</span></span>' +
      '<span class="botm__main"><span class="field__k">Bug of the Month</span><span class="botm__title">' + esc(b.commonName) + '</span><span class="muted botm__sub">Quick briefing, then a short quiz.</span>' +
      '<span class="botm__meta"><span>5 min</span>' + (done ? '<span class="tag tag--pass">Done</span>' : '<span>Not done</span>') + '</span></span></a>' + strip() + '</div>';
  }
  function homeSeason() {
    var k = seasonKey(new Date().getMonth()), s = seasons().filter(function (x) { return x.key === k; })[0]; if (!s) return '';
    var done = (seasonRec(k) || {}).done;
    return '<a class="seasonstrip" href="#season/' + k + '"><span><b>' + esc(s.season) + ' on the route</b><small>' + clean(s.inspectionChanges[0]) + '</small></span>' + (done ? '<span class="tag tag--pass">Done</span>' : '<span class="data small">8 min</span>') + '</a>';
  }

  /* Shared six-panel briefing. Each panel: {h, html, ask}. */
  function panels(el, o) {
    var i = 0;
    var meet = o.meet, started = Date.now(), tick = 0;
    function paint() {
      clearInterval(tick);
      var p = o.panels[i], n = o.panels.length, last = i === n - 1;
      if (o.save) o.save(i);
      el.innerHTML = (meet ? '' : backLink(o.back, o.backLabel)) + timingNote() +
        '<div class="briefbar" aria-label="Panel ' + (i + 1) + ' of ' + n + '">' + o.panels.map(function (x, k) { return '<span class="' + (k < i ? 'is-done' : k === i ? 'is-now' : '') + '"></span>'; }).join('') + '</div>' +
        '<article class="ticket' + (meet ? ' meet' : '') + '"><div class="ticket__head"><span>' + esc(o.title) + '</span><span>' + (i + 1) + ' of ' + n + '</span>' + (meet ? '<span class="data" id="meetClock">0:00</span>' : '') + '</div>' +
        '<div class="ticket__body card"><h2>' + (i + 1) + '. ' + esc(p.h) + '</h2>' + p.html + '</div></article>' +
        (meet && p.ask ? '<div class="gs__note mt3"><b>Ask the room:</b> ' + esc(p.ask) + '</div>' : '') +
        '<div class="pair mt3"><button class="btn" id="bPrev" type="button"' + (i ? '' : ' disabled') + '>Back</button><button class="btn btn--go" id="bNext" type="button">' + (last ? (meet ? 'Finish' : 'Take the quiz') : 'Next') + '</button></div>' +
        (meet || o.noMeet ? '' : '<a class="backlink mt3" href="' + o.meetHref + '">Run this at a morning meeting</a>');
      $('#bPrev').addEventListener('click', function () { i--; paint(); });
      $('#bNext').addEventListener('click', function () { if (last) { meet ? go(o.back.slice(1), true) : go(o.quizHref.slice(1), true); } else { i++; paint(); try { window.scrollTo(0, 0); } catch (x) {} } });
      if (meet) tick = setInterval(function () { var c = $('#meetClock'); if (c) c.textContent = Quiz.fmt((Date.now() - started) / 1000); else clearInterval(tick); }, 1000);
    }
    if (meet) document.body.classList.add('in-game');
    paint();
  }
  function stamped(el, o) {
    var name = Store.get('name', ''), pass = o.pct >= 80;
    el.innerHTML = '<div class="stack"><article class="ticket ticket--raised"><div class="ticket__head"><span>' + esc(o.kind) + '</span><span>Show proof</span></div>' +
      '<div class="formrow"><div class="field"><span class="field__k">Tech</span><span class="field__v">' + esc(name || 'Add name in Settings') + '</span></div><div class="field"><span class="field__k">Date</span><span class="field__v">' + new Date().toISOString().slice(0, 10) + '</span></div></div>' +
      '<div class="formrow formrow--end"><div class="field"><span class="field__k">Training</span><span class="field__v">' + esc(o.title) + '</span></div><div class="field"><span class="field__k">Score</span><span class="field__v">' + o.right + ' of ' + o.total + '</span></div></div>' +
      '<div class="ticket__body"><span class="stamp ' + (pass ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span></div></article>' +
      (pass ? '' : '<a class="btn btn--go btn--wide" href="' + o.retry + '" data-force="1">Try the quiz again</a>') +
      (o.right < o.total ? '<p>' + (o.total - o.right) + ' missed ' + (o.total - o.right === 1 ? 'question is' : 'questions are') + ' in <a href="#callbacks/field">Callbacks, Field tab</a>. ' + (o.total - o.right === 1 ? 'It comes' : 'They come') + ' back tomorrow.</p>' : '') +
      '<p class="muted small">' + (Auth.me() ? 'Saved to your login.' : 'Tracked on this phone only. Show this screen to your manager.') + '</p><a class="btn btn--wide" href="' + o.back + '">' + esc(o.backLabel) + '</a></div>';
  }

  function bugView(el, a, b) {
    var i = a ? parseInt(a, 10) - 1 : new Date().getMonth(), bug = bugFor(i);
    if (!bug) return bugArchive(el);
    var base = '#bug/' + mm(i);
    if (b === 'quiz') {
      el.innerHTML = backLink(base, 'Back to the briefing') + '<div id="bq"></div>';
      return Quiz.practice({ el: $('#bq'), title: bug.commonName, qs: bug.quiz.map(function (q) { return NF.q[q.id]; }), onEnd: function (r) {
        var pct = Math.round(r.right / r.total * 100), d = Store.get('botm', {});
        d[botmKey(i)] = { quiz: r.right, of: r.total, on: new Date().toISOString().slice(0, 10), done: true }; Store.set('botm', d);
        stamped($('#bq'), { kind: 'Bug of the Month', title: MONTHS[i] + ': ' + bug.commonName, pct: pct, right: r.right, total: r.total, retry: base + '/quiz', back: '#bugs', backLabel: 'All 12 months' });
      } });
    }
    var P = [
      { h: 'ID it', ask: 'Who has seen one this month? Where?', html: '<p class="lead"><i>' + esc(bug.scientificName) + '</i></p><p>' + clean(bug.idFeatures) + '</p><p class="mt3"><b>Mixed up with:</b> ' + clean(bug.lookalikes) + '</p>' },
      { h: 'Why now', ask: 'Are we seeing this on the route yet?', html: '<p>' + clean(bug.biology) + '</p><p class="mt3"><b>Why ' + esc(bug.month) + ':</b> ' + clean(bug.whyThisMonth) + '</p><p class="muted small mt2">Timing confidence: ' + clean(bug.timingConfidence) + '</p>' },
      { h: 'Inspect', ask: 'What is the last place you found these?', html: '<b>Where to look</b>' + ul(bug.inspectionPoints) + '<b class="mt3 blockb">What invites it</b>' + ul(bug.conduciveConditions) },
      { h: 'Protect', ask: 'What would you do before reaching for a product?', html: '<p>' + clean(bug.ipmTreatment) + '</p><div class="gs__note mt3"><b>Safety and label:</b> ' + clean(bug.safetyNotes) + '</div>' },
      { h: 'Prove', ask: 'How would you say this in your own words?', html: '<p class="lead">"' + clean(bug.customerTalk) + '"</p><p class="mt3"><b>At Ninefold:</b> ' + clean(bug.ninefoldTie) + '</p><p class="muted small mt3">On the exam: ' + esc((bug.examTopics || []).join(', ') || 'Field knowledge. Not an exam topic.') + '</p>' }
    ];
    var meet = b === 'meet';
    panels(el, { title: MONTHS_LONG[i] + ': ' + bug.commonName, panels: P, meet: meet, back: '#bugs', backLabel: 'All 12 months', meetHref: base + '/meet', quizHref: base + '/quiz' });
  }

  function bugArchive(el) {
    var m = new Date().getMonth(), d = Store.get('botm', {}), rows = '';
    for (var k = 0; k < 12; k++) {
      var i = (m + k) % 12, b = bugFor(i); if (!b) continue;
      var done = d[botmKey(i)] && d[botmKey(i)].done;
      rows += listRow('#bug/' + mm(i), 'bug', MONTHS[i] + ': ' + b.commonName, k === 0 ? 'This month' : (b.scientificName || ''), done ? '<span class="tag tag--pass">Done</span>' : icon('chev', 'chev'));
    }
    el.innerHTML = backLink('#study/field', 'Field training') + pagehead('Bug of the Month', 'One pest a month. A short briefing and a quiz. All 12 stay open.') + timingNote() + '<nav class="list">' + rows + '</nav>';
  }

  function seasonView(el, a, b) {
    var k = a || seasonKey(new Date().getMonth()), s = seasons().filter(function (x) { return x.key === k; })[0];
    if (!s) return go('study/field', true);
    var base = '#season/' + k;
    if (b === 'quiz') {
      el.innerHTML = backLink(base, 'Back to the briefing') + '<div id="sq"></div>';
      return Quiz.practice({ el: $('#sq'), title: s.season, qs: s.quiz.map(function (q) { return NF.q[q.id]; }), onEnd: function (r) {
        var d = Store.get('season', {}); d[year() + '-' + k] = { quiz: r.right, of: r.total, on: new Date().toISOString().slice(0, 10), done: true }; Store.set('season', d);
        stamped($('#sq'), { kind: 'Seasonal training', title: s.season + ' ' + year(), pct: Math.round(r.right / r.total * 100), right: r.right, total: r.total, retry: base + '/quiz', back: '#season', backLabel: 'Back to seasonal training' });
      } });
    }
    if (!a) {
      el.innerHTML = backLink('#study/field', 'Field training') + pagehead('Seasonal training', 'What changes on the route. Start with the season you are in.') + timingNote() +
        '<nav class="list">' + ['spring', 'summer', 'fall', 'winter'].map(function (key) {
          var x = seasons().filter(function (y) { return y.key === key; })[0], rec = seasonRec(key);
          return listRow('#season/' + key, 'calendar', x.season + (key === k ? ' (now)' : ''), x.months, rec && rec.done ? '<span class="tag tag--pass">Done</span>' : icon('chev', 'chev'));
        }).join('') + '</nav><a class="btn btn--wide mt4" href="#calendar">Pest pressure calendar</a>';
      return;
    }
    var names = { rainRunoff: 'Rain and runoff', windDrift: 'Wind and drift', temperature: 'Temperature', pollinators: 'Pollinators', coldStorage: 'Cold storage', heatPpe: 'Heat and PPE', truckStorage: 'Truck storage' };
    var wl = Object.keys(s.weatherLabel).map(function (x) { return '<tr><th scope="row">' + esc(names[x] || x) + '</th><td>' + clean(s.weatherLabel[x]) + '</td></tr>'; }).join('');
    var reg = regKey(), regs = regions();
    var P = [
      { h: "What's moving", ask: 'What are you hearing from customers right now?', html: ul(s.pestPressure) },
      { h: 'Change on the route', ask: 'What will you do differently this week?', html: '<b>Inspections</b>' + ul(s.inspectionChanges) + '<b class="mt3 blockb">Treatments</b>' + ul(s.treatmentChanges) },
      { h: 'Weather and labels', ask: 'When did weather last change a job for you?', html: '<table class="tbl tbl--flush"><tbody>' + wl + '</tbody></table><p class="muted small mt3">The label overrides everything here.</p>' },
      { h: 'Your part of ' + (fd() || isVA() ? stateName() || 'Virginia' : 'Virginia'), ask: 'What is different at your branch?', html: Object.keys(regs).filter(function (r) { return s.regional && s.regional[r]; }).map(function (r) { return '<p class="' + (r === reg ? '' : 'muted') + ' mb3"><b>' + esc(regs[r].name) + ':</b> ' + clean(s.regional[r]) + '</p>'; }).join('') },
      { h: 'Customers will ask', ask: 'What is the hardest question you got this season?', html: s.customerQuestions.map(function (c) { return '<details class="qa"><summary>' + clean(c.q) + '</summary><p>' + clean(c.a) + '</p></details>'; }).join('') }
    ];
    panels(el, { title: s.season + ' on the route', panels: P, meet: b === 'meet', back: '#season', backLabel: 'All seasons', meetHref: base + '/meet', quizHref: base + '/quiz' });
  }

  function calendarView(el) {
    var d = calData(), cal = d.pressureCalendar || [], m = new Date().getMonth(), reg = regKey(), place = fd() ? stateName() : 'Virginia';
    function row(p) { return (p.regional && p.regional[reg]) || p.levels.statewide; }
    function short(n) { return n.replace(/\s*\(.*\)/, ''); }
    function draw() {
      var hot = cal.filter(function (p) { return row(p)[m] === 3; }).map(function (p) { return short(p.pest); });
      var rising = cal.filter(function (p) { return row(p)[(m + 1) % 12] > row(p)[m]; }).map(function (p) { return short(p.pest); });
      var head = MONTHS.map(function (n, i) { return '<th scope="col" class="m-' + seasonKey(i) + (i === m ? ' is-now' : '') + '"><abbr title="' + MONTHS_LONG[i] + '">' + n.charAt(0) + '</abbr></th>'; }).join('');
      var body = cal.map(function (p) {
        var r = row(p);
        return '<tr><th scope="row">' + esc(short(p.pest)) + '</th>' + r.map(function (v, i) {
          return '<td class="' + (i === m ? 'is-now' : '') + (v === 3 ? ' is-peak' : '') + '"><span class="bar bar--' + v + '"></span><span class="vh">' + MONTHS_LONG[i] + ': ' + ['no sourced pressure', 'minor', 'active', 'peak'][v] + '</span></td>';
        }).join('') + '</tr>';
      }).join('');
      $('#calWrap').innerHTML = '<p class="lead mb3">' + (hot.length ? 'This month, peak: ' + esc(hot.join(', ')) + '. ' : 'No charted pest at peak this month. ') + (rising.length ? 'Rising next: ' + esc(rising.join(', ')) + '.' : '') + '</p>' +
        '<div class="calwrap"><table class="cal"><caption class="vh">' + esc(place) + ' pest pressure by month</caption><thead><tr><th scope="col">Pest</th>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
        '<p class="small mt3"><span class="bar bar--1 bar--key"></span> minor <span class="bar bar--2 bar--key"></span> active <span class="bar bar--3 bar--key"></span> peak. Blank means no sourced pressure, not that the pest is absent.</p>';
    }
    var rk = Object.keys(regions());
    el.innerHTML = backLink('#study/field', 'Field training') + pagehead(place + ' pest pressure', 'Only what a source supports. A blank cell is fine.') + timingNote() +
      '<div class="seg" role="group" aria-label="Region" style="grid-template-columns:repeat(' + rk.length + ',1fr)">' + rk.map(function (r) { return '<button type="button" data-r="' + r + '" aria-pressed="' + (r === reg) + '">' + esc(regShort(r)) + '</button>'; }).join('') + '</div>' +
      '<div id="calWrap"></div>' +
      (fd() ? '<p class="gs__note mt3">Rows without regional numbers show statewide timing. Each source is listed below.</p>' : '<p class="gs__note mt3">Only the lone star tick has regional numbers, and those are an interpretation of "mostly east of the Blue Ridge". Every other row is statewide. Stink bug timing is from Penn State and powderpost beetle timing is from NC State, not Virginia.</p>') +
      '<details class="qa mt3"><summary>Why are some pests not charted?</summary><ul class="plain">' + (d.pressureCalendarExcluded || []).map(function (x) { return '<li><b>' + esc(x.pest) + ':</b> ' + esc(x.reason) + '</li>'; }).join('') + '</ul></details>' +
      '<details class="qa"><summary>Sources</summary><ul class="plain">' + cal.map(function (p) { return '<li>' + esc(short(p.pest)) + ': <a href="' + esc(p.source) + '" target="_blank" rel="noopener">' + esc(p.source.replace(/^https?:\/\//, '').slice(0, 44)) + '</a></li>'; }).join('') + '</ul></details>' +
      '<p class="muted small mt3">Peak timing varies by year, weather and site.</p>';
    $('.seg', el).addEventListener('click', function (e) {
      var r = e.target.getAttribute('data-r'); if (!r) return;
      reg = r; Store.set('region', r);
      $$('.seg button', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-r') === r)); });
      draw();
    });
    draw();
  }

  /* Every state's quizzes load up front. State ones carry their state so they only surface there. */
  function questions() {
    var out = [];
    function take(bs, ss, st) {
      (bs || []).forEach(function (b) { (b.quiz || []).forEach(function (q) { q.exam = 'field'; q.topicName = 'Bug of the Month'; if (st) q.state = st; out.push(q); }); });
      (ss || []).forEach(function (s) { (s.quiz || []).forEach(function (q) { q.exam = 'field'; q.topicName = 'Seasonal training'; if (st) q.state = st; out.push(q); }); });
    }
    take(NF.bugs, NF.seasons && NF.seasons.seasons, null);
    Object.keys(NF.stateField || {}).forEach(function (k) { take(NF.stateField[k].bugs, NF.stateField[k].seasons, k); });
    return out;
  }

  return { homeBug: homeBug, homeSeason: homeSeason, doneThisYear: doneThisYear, bugView: bugView, bugArchive: bugArchive, seasonView: seasonView, calendarView: calendarView, questions: questions, regions: regions, regShort: regShort, regKey: regKey, ownTiming: function () { return isVA() || !!fd(); } };
})();
