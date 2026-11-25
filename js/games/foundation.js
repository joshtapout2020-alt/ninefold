/* Foundation Planner. Exam math and truck math side by side: the classic 4-gallon rate does
   not apply to Termidor HE (2 gal, and footings over 2 ft treat to a minimum of 2 ft).
   Figures from research/wdo-content.md, read from the EPA label accepted 2024-03-28. */
var FoundationGame = (function () {
  var JOBS = [
    { type: 'Monolithic slab', area: 'Chesapeake', w: 40, h: 30, depth: 2,
      q: 'How do you get to a continuous treated zone?', opts: ['Down-drill concrete at 12 to 18 inches, trench the soil, treat per the graph', 'Spray the living room floor', 'Treat below the footing'], ans: 0, why: 'Drill where concrete meets the foundation, trench where there is soil, and follow the graph. Never below the footing.' },
    { type: 'Crawl space', area: 'Richmond', w: 50, h: 30, depth: 3,
      q: 'What gets treated?', opts: ['The joists only', 'Soil along the foundation inside and out, piers and pipes, per the label', 'Attic insulation'], ans: 1, why: 'Foundation walls, piers and pipes. Accessible and inaccessible crawl spaces follow different label directions.' },
    { type: 'Hollow block', area: 'Roanoke', w: 40, h: 25, depth: 1,
      q: 'What is special about this foundation?', opts: ['Nothing', 'The voids can be a path, so they may need treatment per the label', 'It cannot get termites'], ans: 1, why: 'Hollow block voids are a known way in. Follow the label on void treatment.' }
  ];
  var S, root;
  function perim(j) { return 2 * (j.w + j.h); }
  function exam(j) { return perim(j) / 10 * 4 * j.depth; }
  function truck(j) { return perim(j) / 10 * 2 * Math.min(j.depth, 2); }
  function drawing(j) {
    return '<svg viewBox="0 0 240 150" class="plansvg" role="img" aria-label="Plan view, ' + j.w + ' by ' + j.h + ' feet"><rect x="40" y="30" width="160" height="90" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<g font-family="var(--font-data)" font-size="14" fill="currentColor" text-anchor="middle"><text x="120" y="20">' + j.w + ' ft</text><text x="20" y="80">' + j.h + ' ft</text></g></svg>';
  }
  function head(j, step) {
    return '<article class="ticket"><div class="ticket__head"><span>' + esc(j.type) + '</span><span>' + esc(j.area) + '</span></div><div class="formrow formrow--end"><div class="field"><span class="field__k">Size</span><span class="field__v">' + j.w + ' x ' + j.h + ' ft</span></div><div class="field"><span class="field__k">Footing</span><span class="field__v">' + j.depth + ' ft</span></div></div></article>';
  }
  function a1() {
    var j = JOBS[S.i];
    GK.frame(root, 'Foundation Planner', 'Job ' + (S.i + 1) + ' of 3: approach', S.score, head(j) + '<p class="gs__prompt">' + esc(j.q) + '</p><div class="mixlist" id="fA">' + j.opts.map(function (o, i) { return '<button class="mixbtn" type="button" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div><div id="fF" aria-live="polite"></div>');
    $('#fA').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || S.lock) return; S.lock = true;
      var good = +b.getAttribute('data-i') === j.ans;
      if (good) S.score += 30; else { var q = GK.linked('treatment'); if (q) S.misses.push(q); }
      $('#fF').innerHTML = GK.note(good, esc(j.why)) + '<button class="btn btn--go btn--wide mt3" id="fN" type="button">Measure it</button>';
      $('#fN').addEventListener('click', function () { S.lock = false; num('Measure the perimeter.', 'linear feet', perim(j), 30, a3, 'Perimeter = 2 x (' + j.w + ' + ' + j.h + ') = ' + perim(j) + ' lf', 'termite-math', drawing(j)); }); $('#fN').focus();
    });
  }
  function num(ask, unit, ans, pts, next, work, topic, art) {
    var j = JOBS[S.i];
    GK.frame(root, 'Foundation Planner', 'Job ' + (S.i + 1) + ' of 3', S.score, head(j) + (art || '') + '<p class="gs__prompt">' + esc(ask) + '</p><div class="dial"><label class="field__k" for="fV">' + esc(unit) + '</label><input class="input data" id="fV" type="number" inputmode="decimal" step="any"></div><button class="btn btn--go btn--wide" id="fC" type="button">Check</button><div id="fF" aria-live="polite"></div>');
    $('#fC').addEventListener('click', function () {
      var v = parseFloat($('#fV').value), good = Math.abs(v - ans) < .01;
      if (good) { S.score += pts; S.exact++; } else { var q = GK.linked(topic); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
      $('#fC').hidden = true;
      $('#fF').innerHTML = GK.note(good, esc(work)) + '<button class="btn btn--go btn--wide mt3" id="fN" type="button">Next</button>';
      $('#fN').addEventListener('click', next); $('#fN').focus();
    });
  }
  function a3() {
    var j = JOBS[S.i], lf = perim(j);
    num('For the exam: use the classic 4 gallons per 10 linear feet per foot of depth. How many gallons?', 'gallons', exam(j), 40, compare, '(' + lf + ' / 10) x 4 x ' + j.depth + ' = ' + exam(j) + ' gallons', 'termite-math');
  }
  function compare() {
    var j = JOBS[S.i], lf = perim(j), capped = j.depth > 2;
    GK.frame(root, 'Foundation Planner', 'Job ' + (S.i + 1) + ' of 3: compare', S.score, head(j) +
      '<div class="pair pair--top"><div class="ticket"><div class="ticket__head"><span>For the exam</span></div><div class="ticket__body"><p class="data big">' + exam(j) + ' gal</p><p class="small">(' + lf + ' / 10) x 4 x ' + j.depth + '</p></div></div>' +
      '<div class="ticket"><div class="ticket__head"><span>On the truck: Termidor HE</span></div><div class="ticket__body"><p class="data big">' + truck(j) + ' gal</p><p class="small">(' + lf + ' / 10) x 2 x ' + Math.min(j.depth, 2) + (capped ? '. Footing over 2 ft: treat to a minimum of 2 ft.' : '') + '</p><p class="small mt2">Product at 79 oz per 50 gal: ' + (Math.round(truck(j) * 79 / 50 * 10) / 10) + ' oz</p></div></div></div>' +
      GK.note(null, 'Same house, different number. The label on your truck is the law. If an exam question names a product, use that product\'s label.') +
      '<button class="btn btn--go btn--wide" id="fN" type="button">' + (S.i + 1 < JOBS.length ? 'Next job' : 'See results') + '</button>');
    $('#fN').addEventListener('click', function () { S.i++; S.i < JOBS.length ? a1() : finish(); }); $('#fN').focus();
  }
  function finish() {
    var pct = Math.round(S.score / 300 * 100), pass = pct >= 70;
    GK.end(root, { game: 'foundation', title: 'Foundation Planner', score: S.score, pass: pass, head: pass ? 'Plans hold up.' : 'Run the numbers again.', stats: [['Score', pct + '%']], topics: ['treatment', 'termite-math'], misses: S.misses, take: '4 is the textbook. 2 is Termidor HE, mixed at 79 oz per 50 gallons. Name the product, then do the math. Patch before you backfill, and give it 3 months.', again: start });
  }
  function start() { S = { i: 0, score: 0, exact: 0, misses: [], lock: false }; a1(); }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
