/* Tank Math. Formulas from research/core-content.md Module 12. Scratch pad is fine, the
   exam's calculator policy is not published. */
var MathGame = (function () {
  var JOBS = [
    { ask: 'Ant job. Optiguard Flex at 0.27 fl oz per gallon, per your SOP. You are filling a 4-gallon backpack.', unit: 'fl oz of product', answer: 1.08, step: .01, steps: ['4 x 0.27 = 1.08 fl oz'], topic: 'math' },
    { ask: 'Heavy ant infestation. Optiguard Flex at 0.54 fl oz per gallon. Same 4-gallon backpack.', unit: 'fl oz of product', answer: 2.16, step: .01, steps: ['4 x 0.54 = 2.16 fl oz'], topic: 'math' },
    { ask: 'Termite job. Termidor HE mixes at 79 oz per 50 gallons. You only need 30 gallons.', unit: 'oz of product', answer: 47.4, step: .1, steps: ['79 / 50 = 1.58 oz per gallon', '30 x 1.58 = 47.4 oz'], topic: 'math' },
    { ask: 'Label rate 1.5 fl oz per 1,000 sq ft. The yard is 60 x 50 ft.', unit: 'fl oz of product', answer: 4.5, step: .5, steps: ['60 x 50 = 3,000 sq ft', '3,000 / 1,000 = 3', '3 x 1.5 = 4.5 fl oz'], topic: 'math' },
    { ask: 'Calibration: you caught 24 fl oz over your 1,000 sq ft test time. How much does a 3-gallon tank cover?', unit: 'sq ft covered', answer: 16000, step: 1000, steps: ['3 x 128 = 384 fl oz in the tank', '384 / 24 = 16', '16 x 1,000 = 16,000 sq ft'], topic: 'equipment' }
  ];
  var S, root;
  function paint() {
    var j = JOBS[S.i];
    GK.frame(root, 'Tank Math', 'Job ' + (S.i + 1) + ' of ' + JOBS.length, S.score,
      '<article class="ticket"><div class="ticket__head"><span>The job</span><span>Show your math</span></div><div class="ticket__body"><p class="work__complaint">' + esc(j.ask) + '</p></div></article>' +
      '<div class="dial"><label class="field__k" for="mVal">' + esc(j.unit) + '</label><div class="dial__row"><button class="btn" id="mMinus" type="button" aria-label="Less">-</button><input class="input data" id="mVal" type="number" inputmode="decimal" step="any" value="0"><button class="btn" id="mPlus" type="button" aria-label="More">+</button></div></div>' +
      '<button class="btn btn--go btn--wide" id="mMix" type="button">Mix</button><div id="mFb" aria-live="polite"></div>');
    var v = $('#mVal');
    function bump(d) { v.value = Math.max(0, Math.round(((parseFloat(v.value) || 0) + d) * 100) / 100); }
    $('#mMinus').addEventListener('click', function () { bump(-j.step); });
    $('#mPlus').addEventListener('click', function () { bump(j.step); });
    $('#mMix').addEventListener('click', function () {
      var a = parseFloat(v.value) || 0, r = a / j.answer, off = Math.abs(r - 1);
      var exact = off < .012, close = off <= .05;
      S.score += exact ? 20 : close ? 10 : 0; if (exact) S.exact++;
      if (!exact) { var q = GK.linked(j.topic); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
      var word = exact ? 'On rate.' : close ? 'Close. Check your rounding.' : r > 1 ? 'Hot. ' + Math.round(r * 100) + '% of the target. Over label rate is a violation.' : 'Weak. ' + Math.round(r * 100) + '% of the target.';
      $('#mMix').hidden = true; $('.dial').hidden = true;
      $('#mFb').innerHTML = '<div class="gaugewrap">' + gaugeSVG({ value: clamp(r / 2, 0, 1), band: [.47, .53], read: (a ? r.toFixed(2) : '0') + 'x', label: 'Mix strength against target' }) + '</div>' +
        GK.note(exact || close, '<b>' + esc(word) + '</b><br>' + j.steps.map(esc).join('<br>')) + '<button class="btn btn--go btn--wide mt3" id="mN" type="button">Next</button>';
      $('#mN').addEventListener('click', function () { S.i++; S.i < JOBS.length ? paint() : finish(); }); $('#mN').focus();
    });
  }
  function finish() {
    var pass = S.exact >= 3;
    GK.end(root, { game: 'math', title: 'Tank Math', score: S.score, pass: pass, head: pass ? 'The math holds.' : 'Run the numbers again.', stats: [['Exact', S.exact + ' of ' + JOBS.length]], topics: ['math', 'equipment'], misses: S.misses, take: 'Units first. If the units don\'t cancel, the answer\'s wrong. On the job, the label table is the authority.', again: start });
  }
  function start() { S = { i: 0, score: 0, exact: 0, misses: [] }; paint(); }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
