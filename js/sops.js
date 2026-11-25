/* SOP library and job checklist. Checks last only while the page is open. */
var SOPs = (function () {
  function sopById(id) { return NF.sops.filter(function (s) { return s.id === id; })[0]; }
  function srcTag(s) { return s.src === 'ninefold' ? '<span class="tag tag--pass">Ninefold SOP</span>' : '<span class="tag tag--sample">Draft</span>'; }
  var DRAFT = '<div class="gs__note gs__note--call"><b>Draft.</b> Ninefold\'s SOP doc has no content for this yet, so this came from the public site and product labels. Not company policy until a manager approves it.</div>';

  function list(el) {
    /* On the hosted site SOPs load from the account after sign-in, not from the public files. */
    if (!NF.sops) { el.innerHTML = '<div class="ticket ticket__body"><h2 class="mb2">SOPs did not load.</h2><p class="muted">Check your connection, then reload. If it keeps happening, tell your manager the SOPs need to be uploaded.</p></div>'; return; }
    var read = Store.get('sopread', {});
    el.innerHTML = '<p class="muted mb3">Your job checklists. Condensed from the Service SOPs and Service Guidelines. The label always wins.</p>' +
      '<label class="field__k" for="sopFind">Find an SOP</label><input class="input mb3" id="sopFind" type="search" autocomplete="off" placeholder="Ants, rain, termite...">' +
      '<div id="sopList"></div>' + (NF.sopDoc ? '<a class="btn btn--wide mt4" href="' + NF.sopDoc + '" target="_blank" rel="noopener">Open the full SOP doc</a>' : '') +
      '<p class="muted small mt3">' + esc(NF.sopContacts) + '</p>';
    function paint(q) {
      q = (q || '').toLowerCase();
      var html = NF.sopCats.map(function (c) {
        var rows = NF.sops.filter(function (s) { return s.cat === c && (!q || (s.t + ' ' + s.covers).toLowerCase().indexOf(q) >= 0); });
        if (!rows.length) return '';
        return '<h2 class="sectitle mt4">' + esc(c) + '</h2><nav class="list" aria-label="' + esc(c) + ' SOPs">' + rows.map(function (s) {
          var tail = s.src === 'draft' ? '<span class="tag tag--sample">Draft</span>' : read[s.id] ? '<span class="tag tag--pass">Reviewed</span>' : icon('chev', 'chev');
          return '<a href="#sop/' + s.id + '">' + icon('exam') + '<span><b>' + esc(s.t) + '</b><small>' + esc(s.covers) + '</small></span>' + tail + '</a>';
        }).join('') + '</nav>';
      }).join('');
      $('#sopList').innerHTML = html || '<p class="muted">Nothing matches that.</p>';
    }
    $('#sopFind').addEventListener('input', function (e) { paint(e.target.value); });
    paint('');
  }

  function view(el, id) {
    var s = NF.sops && sopById(id); if (!s) return go('study/sops', true);
    STUDY_TAB = 'sops';
    var body = s.sections.map(function (g) {
      return '<section class="ticket sopsec"><div class="ticket__head"><span>' + esc(g.h) + '</span></div><div class="ticket__body">' + g.steps.map(function (t) {
        return '<label class="sopstep"><input type="checkbox"><span>' + esc(t) + '</span></label>';
      }).join('') + '</div></section>';
    }).join('');
    function block(title, items, cls) {
      return items && items.length ? '<section class="ticket ' + (cls || '') + '"><div class="ticket__head"><span>' + title + '</span></div><div class="ticket__body"><ul class="plain">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></section>' : '';
    }
    var chips = (s.topics || []).map(function (t) { return ['core', t]; }).concat((s.wdoTopics || []).map(function (t) { return ['wdo', t]; })).map(function (l) {
      var m = modById(l[1]); return m ? '<a class="chip" href="#stop/' + l[0] + '/' + m.id + '">' + esc(m.title) + '</a>' : '';
    }).join('') + (s.game ? '<a class="chip" href="#game/' + s.game + '">' + esc(GAMES.filter(function (g) { return g.id === s.game; })[0].t) + '</a>' : '');
    var links = (s.links || []).map(function (l) { return '<a class="chip" href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>'; }).join('');
    var read = Store.get('sopread', {})[id];
    el.innerHTML = backLink('#study/sops', 'All SOPs') + pagehead(s.t, s.covers) + '<div class="mb3">' + srcTag(s) + '</div>' + (s.src === 'draft' ? DRAFT : '') +
      (s.goal ? '<p class="lead mt3">' + esc(s.goal) + '</p>' : '') + '<div class="stack mt4">' + body +
      block('What to say', s.say) + block('Good to know', s.notes) + block('Escalate to your manager', s.escalate, 'sopstop') +
      (s.cat === 'Company' ? '' : '<section class="ticket"><div class="ticket__head"><span>Service record</span></div><div class="ticket__body"><p>' + esc(isVA() ? NF.sopRecord : STATES[curState()] && STATES[curState()].ready && STATES[curState()].data.sopRecord ? STATES[curState()].data.sopRecord : 'Record every application the way your state requires. ' + stateName() + ' record rules are not added here yet, so ask your manager. The Apruv video does not replace the service record.') + '</p></div></section>') +
      (links ? '<section><h2 class="sectitle">Open</h2><div class="chips">' + links + '</div></section>' : '') +
      (chips ? '<section><h2 class="sectitle">Study this</h2><div class="chips">' + chips + '</div></section>' : '') +
      '<div class="pair"><button class="btn" id="sopClear" type="button">Clear checks</button><button class="btn btn--go" id="sopRead" type="button">' + (read ? 'Reviewed ' + esc(read) : 'Mark reviewed') + '</button></div></div>';
    $('#sopClear').addEventListener('click', function () { $$('.sopstep input', el).forEach(function (c) { c.checked = false; }); });
    $('#sopRead').addEventListener('click', function (e) {
      var r = Store.get('sopread', {}), d = new Date().toISOString().slice(0, 10);
      r[id] = d; Store.set('sopread', r); e.target.textContent = 'Reviewed ' + d;
    });
  }
  return { list: list, view: view };
})();
