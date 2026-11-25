/* PPE Loadout. Termidor HE round comes from the EPA label. The rest are fictional labels. */
var PPEGame = (function () {
  var GEAR = [['shirt', 'Long-sleeved shirt'], ['pants', 'Long pants'], ['shoes', 'Shoes and socks'], ['gloves', 'Waterproof gloves'], ['eyes', 'Protective eyewear'], ['resp', 'Particulate respirator'], ['boots', 'Chemical-resistant footwear'], ['apron', 'Chemical-resistant apron'], ['veil', 'Veil or hood']];
  var ROUNDS = [
    { job: 'Crawl space, rodding with Termidor HE', label: 'Long-sleeved shirt, long pants, shoes, socks, waterproof gloves. In non-ventilated spaces such as crawl spaces, add a particulate respirator as listed. In those spaces, or when rodding or sub-slab injecting, add protective eyewear.', real: true, need: ['shirt', 'pants', 'shoes', 'gloves', 'eyes', 'resp'], note: 'Crawl space work adds the respirator and the eyewear.' },
    { job: 'Yellowjacket nest under an eave, Ninefold Stinging Insect SOP', label: 'Full PPE: gloves, eye protection, long sleeves, veil or hood. Follow the product label as well.', real: true, need: ['shirt', 'pants', 'shoes', 'gloves', 'eyes', 'veil'], note: 'Your SOP adds the veil or hood. Plan your retreat path before you treat.' },
    { job: 'Outside perimeter spray, Mockingbird 2 SC', label: 'Applicators must wear long-sleeved shirt, long pants, shoes, socks and waterproof gloves.', need: ['shirt', 'pants', 'shoes', 'gloves'], note: 'The label sets the minimum. Anything more is your call.' },
    { job: 'Mixing concentrate, Mockingbird 40 WP', label: 'Mixers and loaders must wear long-sleeved shirt, long pants, shoes, socks, waterproof gloves, chemical-resistant apron and protective eyewear. Applicators: omit the apron.', need: ['shirt', 'pants', 'shoes', 'gloves', 'apron', 'eyes'], note: 'Mixing PPE can differ from application PPE. Concentrate is your highest exposure.' },
    { job: 'Loading a rig, Mockingbird 1 EC', label: 'Wear long-sleeved shirt, long pants, chemical-resistant footwear, waterproof gloves and protective eyewear.', need: ['shirt', 'pants', 'boots', 'gloves', 'eyes'], note: '"Shoes" and "chemical-resistant footwear" are not the same words.' }
  ];
  var S, root;
  function paint() {
    var r = ROUNDS[S.i];
    GK.frame(root, 'PPE Loadout', 'Round ' + (S.i + 1) + ' of ' + ROUNDS.length, S.score,
      '<p class="gs__prompt">' + esc(r.job) + '</p><article class="lbl">' + (r.real ? '' : '<div class="lbl__fake">Training label. Not a real product.</div>') + '<div class="lbl__row"><b>PPE:</b> ' + esc(r.label) + '</div></article>' +
      '<fieldset class="gear" id="pG"><legend class="field__k">Tap what you are wearing</legend>' + GEAR.map(function (g) { return '<label class="gear__i"><input type="checkbox" value="' + g[0] + '"><span>' + esc(g[1]) + '</span></label>'; }).join('') + '</fieldset>' +
      '<button class="btn btn--go btn--wide" id="pC" type="button">Check</button><div id="pF" aria-live="polite"></div>');
    $('#pC').addEventListener('click', function () {
      var on = $$('#pG input:checked').map(function (x) { return x.value; });
      var miss = r.need.filter(function (n) { return on.indexOf(n) < 0; }), extra = on.filter(function (n) { return r.need.indexOf(n) < 0; });
      var got = r.need.length - miss.length, pts = Math.max(0, got * 5 - miss.length * 5);
      S.score += pts; S.max += r.need.length * 5;
      if (miss.length) { var q = GK.linked('ppe'); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
      $$('#pG input').forEach(function (x) { x.disabled = true; x.parentNode.classList.toggle('is-need', r.need.indexOf(x.value) >= 0); });
      var names = function (l) { return l.map(function (id) { return GEAR.filter(function (g) { return g[0] === id; })[0][1]; }).join(', '); };
      $('#pC').hidden = true;
      $('#pF').innerHTML = GK.note(!miss.length, (miss.length ? '<b>Missing:</b> ' + esc(names(miss)) + '. ' : '<b>Label covered.</b> ') + (extra.length ? 'Extra gear is fine, though it adds heat: ' + esc(names(extra)) + '. ' : '') + esc(r.note)) + '<button class="btn btn--go btn--wide mt3" id="pN" type="button">Next</button>';
      $('#pN').addEventListener('click', function () { S.i++; S.i < ROUNDS.length ? paint() : finish(); }); $('#pN').focus();
    });
  }
  function finish() {
    var pct = Math.round(S.score / S.max * 100), pass = pct >= 80;
    GK.end(root, { game: 'ppe', title: 'PPE Loadout', score: S.score, pass: pass, head: pass ? 'Dressed for the label.' : 'Read the label again.', stats: [['Covered', pct + '%']], topics: ['ppe'], misses: S.misses, take: 'The label sets the minimum. Gloves come off last, washed first. Dizzy in full PPE? Stop, get out, get help, bring the label.', again: start });
  }
  function start() { S = { i: 0, score: 0, max: 0, misses: [] }; paint(); }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
