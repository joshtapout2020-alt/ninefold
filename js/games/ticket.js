/* Fill the Record. The required record fields from 2VAC5-680-65, and the Ninefold trap:
   the customer video is proof for the customer, not a compliance record. */
var TicketGame = (function () {
  var SRC = { label: 'Product label', log: 'What you mixed', cust: 'FieldRoutes account', card: 'Your cert card', walk: 'Your service notes', video: 'Apruv video' };
  var FIELDS = [
    ['Customer name, address, phone', 'cust'], ['Applicator name and certification number', 'card'], ['EPA registration number', 'label'],
    ['Product name, as on the label', 'label'], ['Amount of concentrate and diluent', 'log'], ['Site treated and principal pests', 'walk'],
    ['Area treated', 'walk'], ['Application equipment', 'walk'], ['Day, month, year', 'walk']
  ];
  var AUDITS = [
    { lines: ['R. Smith, 12 Oak St, Roanoke', 'Tech: Cert #00000', 'Oct 3, 2026', 'Foundation, ants', '2,400 sq ft', 'Mockingbird 2 SC, EPA 00000-000', 'Backpack sprayer'], miss: 'Concentrate and diluent amounts', opts: ['Concentrate and diluent amounts', 'Weather', 'Customer signature'] },
    { lines: ['T. Jones, 44 Elm Ave, Richmond', 'Tech: Cert #00000', 'Oct 4, 2026', 'Kitchen, roaches', '300 sq ft', 'Mockingbird 2 SC, 0.5 oz in 1 gal', 'Hand sprayer'], miss: 'EPA registration number', opts: ['Truck number', 'EPA registration number', 'Time of day'] },
    { lines: ['Sunny Cafe, 9 Bay Rd, Chesapeake', 'Oct 5, 2026', 'Kitchen, flies', '800 sq ft', 'Mockingbird 2 SC, EPA 00000-000', '0.5 oz in 1 gal', 'Hand sprayer'], miss: 'Applicator name and certification number', opts: ['Applicator name and certification number', 'Office phone', 'Invoice number'] }
  ];
  var S, root;
  function field() {
    var f = S.fields[S.i];
    GK.frame(root, 'Fill the Record', 'Field ' + (S.i + 1) + ' of ' + S.fields.length, S.score,
      '<article class="ticket"><div class="ticket__head"><span>Service record</span><span>Virginia</span></div><div class="ticket__body"><p class="field__k">Required field</p><p class="work__complaint">' + esc(f[0]) + '</p></div></article>' +
      '<p class="gs__prompt">Where do you get it?</p><div class="srcgrid" id="tS">' + Object.keys(SRC).map(function (k) { return '<button class="btn" type="button" data-k="' + k + '">' + esc(SRC[k]) + '</button>'; }).join('') + '</div><div id="tF" aria-live="polite"></div>');
    $('#tS').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || S.lock) return;
      S.lock = true;
      var k = b.getAttribute('data-k'), good = k === f[1];
      if (good) S.score += 10; else { var q = GK.linked('laws'); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
      $('#tF').innerHTML = GK.note(good, (k === 'video' ? 'The video is proof for the customer. It doesn\'t fill a record field. ' : '') + (good ? 'Right.' : 'That one comes from: ' + esc(SRC[f[1]]) + '.')) + '<button class="btn btn--go btn--wide mt3" id="tN" type="button">Next</button>';
      $('#tN').addEventListener('click', function () { S.lock = false; S.i++; S.i < S.fields.length ? field() : audit(0); }); $('#tN').focus();
    });
  }
  function audit(n) {
    var a = AUDITS[n];
    GK.frame(root, 'Fill the Record', 'Audit ' + (n + 1) + ' of 3', S.score,
      '<p class="gs__prompt">VDACS asks for this record. What is missing?</p><article class="ticket"><div class="ticket__head"><span>Finished record</span><span>Fictional</span></div><div class="ticket__body data small">' + a.lines.map(esc).join('<br>') + '</div></article>' +
      '<div class="mixlist" id="tA">' + a.opts.map(function (o) { return '<button class="mixbtn" type="button">' + esc(o) + '</button>'; }).join('') + '</div><div id="tF" aria-live="polite"></div>');
    $('#tA').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || S.lock) return; S.lock = true;
      var good = b.textContent === a.miss;
      if (good) S.score += 10; else { var q = GK.linked('laws'); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
      $('#tF').innerHTML = GK.note(good, 'Missing: ' + esc(a.miss) + '.') + '<button class="btn btn--go btn--wide mt3" id="tN" type="button">Next</button>';
      $('#tN').addEventListener('click', function () { S.lock = false; n + 1 < AUDITS.length ? audit(n + 1) : bonus(); }); $('#tN').focus();
    });
  }
  function bonus() {
    GK.frame(root, 'Fill the Record', 'Last one', S.score, '<p class="gs__prompt">The customer got the visit video, and it shows the whole treatment. Is that enough for the record?</p><div class="gs__row" id="tB"><button class="btn" type="button" data-a="n">No</button><button class="btn" type="button" data-a="y">Yes</button></div><div id="tF" aria-live="polite"></div>');
    $('#tB').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || S.lock) return; S.lock = true;
      var good = b.getAttribute('data-a') === 'n';
      if (good) S.score += 10;
      $('#tF').innerHTML = GK.note(good, 'No. Every field still goes on the record, kept 2 years.') + '<button class="btn btn--go btn--wide mt3" id="tN" type="button">See results</button>';
      $('#tN').addEventListener('click', finish); $('#tN').focus();
    });
  }
  function finish() {
    var max = (S.fields.length + AUDITS.length + 1) * 10, pct = Math.round(S.score / max * 100), pass = pct >= 70;
    GK.end(root, { game: 'ticket', title: 'Fill the Record', score: S.score, pass: pass, head: pass ? 'Records hold up.' : 'Run it again.', stats: [['Score', pct + '%']], topics: ['laws'], misses: S.misses, take: 'Who, Where, When, What, How much, How. Every application, kept 2 years. Show Proof is for the customer. The record is for the law.', again: start });
  }
  function start() { S = { i: 0, score: 0, misses: [], fields: shuffle(FIELDS), lock: false }; field(); }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
