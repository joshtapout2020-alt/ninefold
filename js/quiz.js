/* Quiz engine. Practice mode answers on the spot. Mock mode holds answers to the end. */
var Quiz = (function () {
  var timer = 0;
  function stop() { clearInterval(timer); timer = 0; document.removeEventListener('keydown', onKey); keyFn = null; }
  var keyFn = null;
  function onKey(e) { if (keyFn) keyFn(e); }
  function fmt(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }

  function choicesHTML(q, picked) {
    return '<ul class="choices" id="choices">' + q.choices.map(function (c, i) {
      return '<li><button class="choice' + (picked === i ? ' is-picked' : '') + '" type="button" data-i="' + i + '"><span class="choice__k">' + 'ABCD'[i] + '</span><span>' + esc(c) + '</span>' + icon('check') + '</button></li>';
    }).join('') + '</ul>';
  }
  function topicName(q) { var m = modById(q.module); return m ? m.title : (q.topicName || 'Field training'); }
  /* Right: say so, then why. Wrong: what you picked and why it's wrong, then the right answer and why. */
  function explain(q, picked) {
    var m = modById(q.module), good = picked === q.answer, L = 'ABCD';
    var not = q.whyNot && q.whyNot[picked];
    var head = good
      ? '<div class="verdict verdict--right" role="status">' + icon('check') + '<span><b>Right.</b> ' + L[q.answer] + ': ' + esc(q.choices[q.answer]) + '</span></div>'
      : '<div class="verdict verdict--miss" role="status">' + icon('x') + '<span><b>Not quite.</b> The answer is ' + L[q.answer] + ': ' + esc(q.choices[q.answer]) + '</span></div>';
    return head + '<div class="explain">' +
      (good ? '' : '<div class="explain__row explain__row--miss"><span class="explain__k">Why ' + L[picked] + ' is wrong</span><span><b>' + esc(q.choices[picked]) + '.</b> ' + esc(not || 'That is not what the rule or label says.') + '</span></div>') +
      '<div class="explain__row"><span class="explain__k">Why ' + L[q.answer] + ' is right</span><span>' + esc(q.explanation) + '</span></div>' +
      (m ? '<div class="explain__row"><span class="explain__k">On the truck</span><span>' + esc(m.truck) + '</span></div>' : '') +
      (q.source ? '<div class="explain__row"><span class="explain__k">Look it up</span><span class="muted">' + esc(q.source).replace(/\s*\[(verify|confirm)[^\]]*\]/gi, ' <span class="tag tag--sample">Confirm</span>') + '</span></div>' : '') + '</div>';
  }

  /* opts: el, title, qs, back, clock (soft seconds), graded, noCallback, onEnd(result) */
  function practice(opts) {
    var el = opts.el, qs = opts.qs.slice(), i = 0, right = 0, first = qs.length, retry = [], started = Date.now(), left = opts.clock || 0;
    stop();
    if (opts.clock) timer = setInterval(function () {
      left--; var t = $('#qTimer'); if (!t) return;
      t.textContent = fmt(left); if (left <= 0) { t.classList.add('is-low'); clearInterval(timer); }
    }, 1000);
    document.addEventListener('keydown', onKey);

    function paint() {
      var q = qs[i], isRetry = i >= first;
      el.innerHTML = '<div class="quizwrap"><section class="ticket">' +
        '<div class="ticket__head"><span>' + esc(opts.title) + '</span><span>' + (isRetry ? 'Second look' : (i + 1) + ' of ' + first) + '</span>' +
        (opts.clock ? '<span class="timer timer--sm' + (left <= 0 ? ' is-low' : '') + '" id="qTimer">' + fmt(left) + '</span>' : '') + '</div>' +
        '<div class="ticket__body"><p class="q__stem" id="stem">' + esc(q.question) + '</p>' + choicesHTML(q) + '<div id="fb" aria-live="polite"></div></div></section>' +
        '<aside class="ticket quizside"><div class="ticket__head"><span>Topic</span></div><div class="ticket__body"><b>' + esc(topicName(q)) + '</b><p class="muted small">Miss it and it comes back as a callback.</p></div></aside></div>';
      keyFn = function (e) {
        if (e.key >= '1' && e.key <= '4') { var b = $$('.choice', el)[+e.key - 1]; if (b) b.click(); }
      };
      $('#choices', el).addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.choice') : null;
        if (!b || b.disabled) return;
        var picked = +b.getAttribute('data-i'), good = picked === q.answer;
        $$('.choice', el).forEach(function (c, n) {
          c.disabled = true;
          if (n === q.answer) c.classList.add('is-right');
          else if (n === picked) { c.classList.add('is-miss'); $('use', c).setAttribute('href', '#i-x'); }
          else c.classList.add('is-dim');
        });
        if (!isRetry) {
          if (good) right++; else retry.push(q);
          if (opts.graded !== false) Progress.grade(q, good, { noCallback: opts.noCallback });
          else if (!good && !opts.noCallback) Callbacks.miss(q.id);
        }
        Callbacks.badge();
        var more = i + 1 < first || retry.length || i + 1 < qs.length;
        $('#fb', el).innerHTML = '<div class="mt4">' + explain(q, picked) + '</div>' +
          (good ? '' : '<p class="muted small mt2">' + (isRetry ? 'It stays in your callbacks.' : 'This one comes back later. That\'s how it sticks.') + '</p>') +
          '<button class="btn btn--go btn--wide mt4" id="qNext" type="button">' + (more ? 'Next' : 'See results') + '</button>';
        keyFn = function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); $('#qNext').click(); } };
        $('#qNext').addEventListener('click', function () {
          if (i + 1 === first && retry.length) { qs = qs.concat(retry); retry = []; }
          i++;
          if (i < qs.length) { paint(); try { window.scrollTo(0, 0); } catch (x) {} } else finish();
        });
      });
    }
    function finish() {
      stop(); Progress.addTime((Date.now() - started) / 1000);
      if (opts.onEnd) opts.onEnd({ right: right, total: first });
    }
    if (!qs.length) { el.innerHTML = '<p>No questions here yet.</p><a class="btn mt4" href="' + (opts.back || '#home') + '">Back</a>'; return; }
    paint();
  }

  /* Mock exam. All state lives in `nf.mock` so a locked phone or dropped signal loses nothing. */
  function mock(el, kind, st) {
    var cfg = CONFIG.mock[kind], left;
    stop();
    function save() { Store.set('mock', st); }
    function paint() {
      var q = NF.q[st.ids[st.i]], flagged = st.flags[st.i], n = st.ids.length;
      el.innerHTML = '<section class="ticket">' +
        '<div class="ticket__head"><span>' + esc(cfg.title) + ' mock</span><span>' + (st.i + 1) + ' of ' + n + '</span>' +
        (st.limit ? '<span class="timer timer--sm" id="qTimer">' + fmt(left) + '</span>' : '') + '</div>' +
        '<div class="ticket__body"><p class="q__stem">' + esc(q.question) + '</p>' + choicesHTML(q, st.ans[st.i]) +
        '<div class="mockbar mt4"><button class="btn" id="mPrev" type="button"' + (st.i ? '' : ' disabled') + '>Back</button>' +
        '<button class="btn" id="mFlag" type="button" aria-pressed="' + !!flagged + '">' + (flagged ? 'Flagged' : 'Flag') + '</button>' +
        '<button class="btn btn--ink" id="mNext" type="button">' + (st.i + 1 < n ? 'Next' : 'Review') + '</button></div></div></section>' +
        '<button class="btn btn--wide mt4" id="mEnd" type="button">Turn it in</button>';
      $('#choices', el).addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.choice') : null;
        if (!b) return;
        st.ans[st.i] = +b.getAttribute('data-i'); save();
        $$('.choice', el).forEach(function (c) { c.classList.toggle('is-picked', c === b); });
      });
      $('#mPrev', el).addEventListener('click', function () { st.i--; save(); paint(); });
      $('#mNext', el).addEventListener('click', function () { if (st.i + 1 < n) { st.i++; save(); paint(); } else review(); });
      $('#mFlag', el).addEventListener('click', function () { st.flags[st.i] = !st.flags[st.i]; save(); paint(); });
      $('#mEnd', el).addEventListener('click', review);
      keyFn = function (e) { if (e.key >= '1' && e.key <= '4') { var b = $$('.choice', el)[+e.key - 1]; if (b) b.click(); } };
    }
    function review() {
      var blanks = st.ids.filter(function (id, i) { return st.ans[i] == null; }).length;
      var cells = st.ids.map(function (id, i) {
        return '<button class="reviewcell' + (st.ans[i] == null ? ' is-blank' : '') + (st.flags[i] ? ' is-flag' : '') + '" type="button" data-i="' + i + '" aria-label="Question ' + (i + 1) + (st.ans[i] == null ? ', blank' : '') + (st.flags[i] ? ', flagged' : '') + '">' + (i + 1) + '</button>';
      }).join('');
      el.innerHTML = '<div class="pagehead"><h1>Check your work</h1><p>' + (blanks ? blanks + ' left blank. A blank counts as wrong.' : 'All answered.') + ' Tap a number to go back.</p></div>' +
        '<div class="reviewgrid">' + cells + '</div><button class="btn btn--go btn--wide mt4" id="mDone" type="button">Turn it in</button>' +
        '<div id="mConfirm"></div>';
      $('.reviewgrid', el).addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.reviewcell') : null;
        if (b) { st.i = +b.getAttribute('data-i'); save(); paint(); }
      });
      $('#mDone', el).addEventListener('click', finish);
    }
    function finish() {
      stop();
      var right = 0, topics = {}, misses = [], picks = {};
      st.ids.forEach(function (id, i) {
        var q = NF.q[id], good = st.ans[i] === q.answer;
        if (good) right++; else { misses.push(id); picks[id] = st.ans[i] == null ? -1 : st.ans[i]; }
        Progress.grade(q, good);
        var t = topics[q.module] || (topics[q.module] = { r: 0, n: 0 }); t.n++; if (good) t.r++;
      });
      var pct = Math.round(right / st.ids.length * 100);
      var res = { kind: kind, right: right, total: st.ids.length, pct: pct, topics: topics, misses: misses, picks: picks, on: new Date().toISOString().slice(0, 10) };
      var hist = Store.get('mockres', []); hist.unshift(res); Store.set('mockres', hist.slice(0, 10));
      Store.set('mock', null); Callbacks.badge();
      Progress.addTime((Date.now() - st.started) / 1000);
      go('mock/review/0', true);
    }
    if (st.limit) {
      left = st.limit - (Date.now() - st.started) / 1000;
      timer = setInterval(function () {
        left--; var t = $('#qTimer'); if (!t) return;
        t.textContent = fmt(left);
        if (left <= 300) t.classList.add('is-low');
        if (left <= 0) { clearInterval(timer); finish(); }
      }, 1000);
    }
    document.addEventListener('keydown', onKey);
    paint();
  }

  /* Spread questions evenly across topics. Virginia publishes no blueprint. */
  function sample(exam, count) {
    var mods = modsFor(exam).map(function (m) { return shuffle(questionsFor(exam, m.id)); }), out = [], i = 0;
    while (out.length < count && mods.some(function (l) { return l.length; })) {
      var l = mods[i++ % mods.length]; if (l.length) out.push(l.pop().id);
    }
    return shuffle(out);
  }

  /* Mock results: every miss, with what was picked and why. A blank counts as wrong. */
  function missReview(h) {
    return (h.misses || []).map(function (id, n) {
      var q = NF.q[id]; if (!q) return '';
      var p = h.picks ? h.picks[id] : undefined;
      var body = p == null || p < 0
        ? '<div class="verdict verdict--miss">' + icon('x') + '<span><b>Left blank.</b> The answer is ' + 'ABCD'[q.answer] + ': ' + esc(q.choices[q.answer]) + '</span></div><div class="explain"><div class="explain__row"><span class="explain__k">Why</span><span>' + esc(q.explanation) + '</span></div></div>'
        : explain(q, p);
      return '<details class="qa"><summary>' + (n + 1) + '. ' + esc(q.question) + '</summary><div class="qa__body">' + body + '</div></details>';
    }).join('');
  }

  return { practice: practice, mock: mock, sample: sample, stop: stop, fmt: fmt, missReview: missReview };
})();
