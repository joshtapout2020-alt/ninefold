/* Conducive conditions: real job photos. Spot what is conducive, then learn why.
   Data: data/conditions.js. Results live in nf.cond as { id: { right, of, on } }. */
var Conditions = (function () {
  function all() { return NF.conditions || []; }
  function done() { return Store.get('cond', {}); }
  function byId(id) { return all().filter(function (c) { return c.id === id; })[0]; }

  function topics() { return NF.conditionTopics || []; }
  function topicById(id) { return topics().filter(function (t) { return t.id === id; })[0]; }
  function readMap() { return Store.get('condRead', {}); }
  function allQs() { return (NF.conditionQs || []).concat(NF.conditionTopicQs || []); }

  /* Study tab content: field guide by area, then photo practice, then the checklist and quiz. */
  function list(el) {
    var d = done(), rd = readMap(), n = all().filter(function (c) { return d[c.id]; }).length, nr = topics().filter(function (t) { return rd[t.id]; }).length;
    el.innerHTML = '<section class="ticket mb3"><div class="ticket__head"><span>Conducive conditions</span><span>Field guide</span></div><div class="ticket__body">' +
      '<p>What invites pests, how to find it, and what to tell the customer. Learn each condition, practice on real Ninefold job photos, then use the walk-around on your next stop.</p>' +
      '<div class="condstats mt3"><span><b>' + nr + '</b> of ' + topics().length + ' topics read</span><span><b>' + n + '</b> of ' + all().length + ' photos worked</span></div>' +
      '<div class="pair mt3"><a class="btn btn--go" href="#cond/walk">Walk-around checklist</a><a class="btn" href="#cond/quiz">Quick check</a></div></div></section>' +
      (NF.conditionAreas || []).map(function (a) {
        var ts = topics().filter(function (t) { return t.area === a.id; });
        return '<h2 class="sectitle">' + esc(a.t) + '</h2><p class="muted small mb2">' + esc(a.sub) + '</p><nav class="list mb4" aria-label="' + esc(a.t) + '">' + ts.map(function (t) {
          return listRow('#cond/t/' + t.id, 'exam', t.t, t.pests.slice(0, 3).join(', ') + (t.pests.length > 3 ? ' and more' : ''), rd[t.id] ? '<span class="tag tag--pass">Read</span>' : icon('chev', 'chev'));
        }).join('') + '</nav>';
      }).join('') +
      '<h2 class="sectitle">Photo practice</h2><p class="muted small mb2">Real job photos. Tap everything conducive you can see.</p>' +
      '<div class="condgrid">' + all().map(function (c) {
        var r = d[c.id];
        return '<a class="condcard" href="#cond/' + c.id + '"><img src="' + c.img + '" alt="" loading="lazy"><span class="condcard__body"><b>' + esc(c.t) + '</b><small>' + esc(c.where) + '</small>' +
          (r ? '<span class="tag ' + (r.right === r.of ? 'tag--pass' : '') + '">' + r.right + ' of ' + r.of + '</span>' : '<span class="tag">New</span>') + '</span></a>';
      }).join('') + '</div>';
  }

  /* One condition, in full. */
  function topicView(el, id) {
    var t = topicById(id); if (!t) return go('study/cond', true);
    var rd = readMap(); if (!rd[t.id]) { rd[t.id] = new Date().toISOString().slice(0, 10); Store.set('condRead', rd); }
    var area = (NF.conditionAreas || []).filter(function (a) { return a.id === t.area; })[0];
    var i = topics().indexOf(t), next = topics()[(i + 1) % topics().length];
    var pics = (t.photos || []).map(function (pid) { return byId(pid); }).filter(Boolean);
    function sec(h, body) { return '<section class="ticket"><div class="ticket__head"><span>' + h + '</span></div><div class="ticket__body">' + body + '</div></section>'; }
    function ul(xs) { return '<ul class="plain">' + xs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
    el.innerHTML = backLink('#study/cond', 'Conducive conditions') + pagehead(t.t, area ? area.t : '') + '<div class="stack">' +
      sec('What it looks like', '<p class="lead">' + esc(t.look) + '</p>') +
      sec('Why it matters', '<p>' + esc(t.why) + '</p><div class="chips mt3">' + t.pests.map(function (p) { return '<span class="chip">' + esc(p) + '</span>'; }).join('') + '</div>') +
      sec('How to inspect', ul(t.inspect)) +
      (t.numbers && t.numbers.length ? '<section class="ticket"><div class="ticket__head"><span>The numbers</span></div><table class="tbl"><tbody>' + t.numbers.map(function (n) {
        return '<tr><th scope="row">' + esc(n[0]) + '</th><td>' + esc(n[1]) + (n[2] ? ' <span class="tag tag--sample">Confirm</span>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></section>' : '') +
      sec('What fixes it', ul(t.fix)) +
      sec('Tell the customer', '<p class="lead">' + esc(t.say) + '</p><p class="muted small mt2">A suggestion, not a script. Fixing it is usually the customer\'s job. Pointing it out is ours.</p>') +
      sec('On the record', '<p>' + esc(t.record) + '</p>') +
      (pics.length ? '<h2 class="sectitle">See it on the job</h2><div class="condgrid">' + pics.map(function (c) {
        return '<a class="condcard" href="#cond/' + c.id + '"><img src="' + c.img + '" alt="" loading="lazy"><span class="condcard__body"><b>' + esc(c.t) + '</b><small>Photo practice</small></span></a>';
      }).join('') + '</div>' : '') +
      '<div class="pair"><a class="btn" href="#cond/tq/' + t.id + '">Check yourself</a><a class="btn btn--go" href="#cond/t/' + next.id + '">Next: ' + esc(next.t) + '</a></div></div>';
  }

  /* A printable, tap-to-check walk-around built from every topic's inspection steps. */
  function walkView(el) {
    el.innerHTML = backLink('#study/cond', 'Conducive conditions') + pagehead('Walk-around checklist', 'Every conducive condition, in the order you walk a property. Checks clear when you leave this page.') +
      '<div class="stack">' + (NF.conditionAreas || []).map(function (a) {
        var ts = topics().filter(function (t) { return t.area === a.id; });
        return '<section class="ticket"><div class="ticket__head"><span>' + esc(a.t) + '</span><span>' + esc(a.sub) + '</span></div><div class="ticket__body">' + ts.map(function (t) {
          return '<h3 class="mt2 mb2"><a href="#cond/t/' + t.id + '">' + esc(t.t) + '</a></h3><ul class="walk">' + t.inspect.map(function (s) {
            return '<li><label class="checkrow"><input type="checkbox"> ' + esc(s) + '</label></li>';
          }).join('') + '</ul>';
        }).join('') + '</div></section>';
      }).join('') + '<p class="muted small">Found something? Photograph it, note it on the record, and tell the customer before you leave.</p></div>';
  }

  function topicQuiz(el, id) {
    var t = topicById(id); if (!t) return go('study/cond', true);
    el.innerHTML = backLink('#cond/t/' + t.id, t.t) + '<div id="ccq"></div>';
    var qs = (NF.conditionTopicQs || []).filter(function (q) { return q.topic === t.id; }).map(function (q) { return NF.q[q.id]; }).filter(Boolean);
    Quiz.practice({ el: $('#ccq'), title: t.t, qs: shuffle(qs), back: '#cond/t/' + t.id, onEnd: function (r) {
      $('#ccq').innerHTML = '<section class="ticket ticket--raised"><div class="ticket__body stack"><span class="stamp ' + (r.right === r.total ? 'stamp--pass">Clean' : 'stamp--call">Keep at it') + '</span><h2>' + r.right + ' of ' + r.total + ' right</h2>' +
        '<p class="muted">' + (r.right < r.total ? 'Misses are in Callbacks, Field tab.' : 'Every one right.') + '</p><a class="btn btn--go btn--wide" href="#cond/t/' + t.id + '">Back to ' + esc(t.t) + '</a><a class="btn btn--wide" href="#study/cond">All conditions</a></div></section>';
    } });
  }

  function photoView(el, id) {
    var c = byId(id); if (!c) return list(el);
    var order = shuffle(c.spots.map(function (s, i) { return i; })), picked = {};
    var imgs = [c.img].concat(c.more || []);
    el.innerHTML = backLink('#study/cond', 'Conducive conditions') + pagehead(c.t, c.where) +
      '<figure class="condfig"><img id="cImg" src="' + c.img + '" alt="' + esc(c.t) + '">' +
      (imgs.length > 1 ? '<div class="condthumbs" role="group" aria-label="More photos">' + imgs.map(function (src, i) {
        return '<button type="button" class="condthumb' + (i ? '' : ' is-on') + '" data-src="' + src + '" aria-label="Photo ' + (i + 1) + '"><img src="' + src + '" alt=""><span class="condthumb__n">' + (i + 1) + '</span></button>';
      }).join('') + '</div>' : '') + '<figcaption class="muted small">Tap the photo to see it full size.</figcaption></figure>' +
      '<section class="ticket ticket__body mt3"><p class="lead mb3">' + esc(c.ask) + '</p><ul class="spotlist" id="spots">' + order.map(function (i) {
        return '<li><button type="button" class="spot" data-i="' + i + '" aria-pressed="false"><span class="spot__box">' + icon('check') + '</span><span>' + esc(c.spots[i].t) + '</span></button></li>';
      }).join('') + '</ul><button class="btn btn--go btn--wide mt4" id="cCheck" type="button">Check my picks</button><div id="cFb" aria-live="polite"></div></section>';

    var img = $('#cImg');
    img.addEventListener('click', function () { window.open(img.getAttribute('src'), '_blank', 'noopener'); });
    $$('.condthumb', el).forEach(function (b) {
      b.addEventListener('click', function () {
        img.src = b.getAttribute('data-src');
        $$('.condthumb', el).forEach(function (x) { x.classList.toggle('is-on', x === b); });
      });
    });
    $('#spots').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.spot') : null;
      if (!b || b.disabled) return;
      var i = b.getAttribute('data-i'); picked[i] = !picked[i];
      b.setAttribute('aria-pressed', String(!!picked[i]));
    });
    $('#cCheck').addEventListener('click', function () {
      var right = 0;
      $$('.spot', el).forEach(function (b) {
        var i = +b.getAttribute('data-i'), s = c.spots[i], p = !!picked[i], ok = p === s.yes;
        if (ok) right++;
        b.disabled = true;
        b.classList.add(s.yes ? 'is-right' : p ? 'is-miss' : 'is-dim');
        if (s.yes && !p) b.classList.add('is-missed');
        b.insertAdjacentHTML('beforeend', '<span class="spot__why"><b>' + (s.yes ? (p ? 'Found it.' : 'Missed.') : (p ? 'Not this one.' : 'Right to skip.')) + '</b> ' + esc(s.why) + '</span>');
      });
      var of = c.spots.length, d = done();
      d[c.id] = { right: right, of: of, on: new Date().toISOString().slice(0, 10) }; Store.set('cond', d);
      var q = NF.q['cc-' + c.id];
      if (q) { if (right < of) Callbacks.miss(q.id); Callbacks.badge(); }
      $('#cCheck').remove();
      var next = all()[(all().indexOf(c) + 1) % all().length];
      $('#cFb').innerHTML = '<div class="verdict ' + (right === of ? 'verdict--right' : 'verdict--miss') + ' mt4" role="status">' + icon(right === of ? 'check' : 'x') + '<span><b>' + right + ' of ' + of + ' right.</b> ' + (right === of ? 'Sharp eyes.' : 'This photo\'s question is in Callbacks, Field tab.') + '</span></div>' +
        '<div class="explain mt3">' +
        '<div class="explain__row"><span class="explain__k">Invites</span><span>' + esc(c.invites) + '</span></div>' +
        '<div class="explain__row"><span class="explain__k">What fixes it</span><span>' + c.fix.map(esc).join('<br>') + '</span></div>' +
        '<div class="explain__row"><span class="explain__k">Tell the customer</span><span>' + esc(c.say) + '</span></div>' +
        '<div class="explain__row"><span class="explain__k">On the record</span><span>' + esc(c.record) + '</span></div></div>' +
        '<div class="pair mt4"><a class="btn" href="#cond/' + c.id + '" data-force="1">Try again</a><a class="btn btn--go" href="#cond/' + next.id + '">Next photo</a></div>';
    });
  }

  function quizView(el) {
    el.innerHTML = backLink('#study/cond', 'Conducive conditions') + '<div id="ccq"></div>';
    Quiz.practice({ el: $('#ccq'), title: 'Conducive conditions', qs: shuffle(allQs().map(function (q) { return NF.q[q.id]; }).filter(Boolean)).slice(0, 15), back: '#study/cond', onEnd: function (r) {
      $('#ccq').innerHTML = '<section class="ticket ticket--raised"><div class="ticket__body stack"><span class="stamp ' + (r.right === r.total ? 'stamp--pass">Clean' : 'stamp--call">Keep at it') + '</span><h2>' + r.right + ' of ' + r.total + ' right</h2>' +
        '<p class="muted">' + (r.right < r.total ? 'Misses are in Callbacks, Field tab.' : 'Every one right.') + '</p><a class="btn btn--go btn--wide" href="#study/cond">Back to the photos</a></div></section>';
    } });
  }

  function route(el, a, b) {
    if (!a || a === 'types') return go('study/cond', true);
    if (a === 'quiz') return quizView(el);
    if (a === 'walk') return walkView(el);
    if (a === 't') return topicView(el, b);
    if (a === 'tq') return topicQuiz(el, b);
    photoView(el, a);
  }

  /* Field-type questions so misses land in Callbacks, Field tab. */
  function questions() {
    return allQs().map(function (q) { q.exam = 'field'; q.topicName = 'Conducive conditions'; return q; });
  }
  function doneCount() { var d = done(); return all().filter(function (c) { return d[c.id]; }).length; }

  return { list: list, route: route, questions: questions, doneCount: doneCount };
})();
