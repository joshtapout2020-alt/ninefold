/* Bug ID. Specimens are drawn in code so a right answer can light up the feature. */
var BugID = (function () {
  var B = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  var S1 = B.replace('fill="none"', 'fill="var(--paper)"');
  function g(f, s) { return '<g class="ft ft-' + f + '">' + s + '</g>'; }
  /* Wings fan out to the sides so the waist stays in plain view. Length is the tell. */
  function wing(angle, y, len) { return '<ellipse cx="100" cy="' + (y + len) + '" rx="13" ry="' + len + '" transform="rotate(' + angle + ' 100 ' + y + ')" ' + B + '/>'; }
  var ART = {
    termite: function () {
      var beads = ''; [[-1, 1], [1, 1]].forEach(function (d) { for (var i = 1; i < 8; i++) beads += '<circle cx="' + (100 + d[0] * (10 + i * 5)) + '" cy="' + (42 - i * 4) + '" r="2.2" fill="currentColor"/>'; });
      return g('antennae', beads) + g('wings', wing(58, 72, 48) + wing(-58, 72, 48) + wing(96, 80, 48) + wing(-96, 80, 48)) +
        '<ellipse cx="100" cy="50" rx="12" ry="11" ' + S1 + '/>' +
        g('waist', '<rect x="84" y="60" width="32" height="112" rx="15" ' + S1 + '/>');
    },
    ant: function () {
      return g('antennae', '<path d="M92 40 L70 34 L58 12M108 40 L130 34 L142 12" ' + B + '/>') + g('wings', wing(58, 72, 48) + wing(-58, 72, 48) + wing(100, 84, 26) + wing(-100, 84, 26)) +
        '<ellipse cx="100" cy="48" rx="13" ry="11" ' + S1 + '/><ellipse cx="100" cy="76" rx="13" ry="16" ' + S1 + '/>' +
        g('waist', '<path d="M100 92 L100 108" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>') +
        '<ellipse cx="100" cy="142" rx="19" ry="34" ' + S1 + '/>';
    },
    carpbee: function () {
      return '<ellipse cx="100" cy="46" rx="16" ry="14" fill="currentColor"/>' + '<ellipse cx="100" cy="80" rx="26" ry="24" ' + B + '/><path d="M82 66l6 8M92 62l4 10M108 62l-4 10M118 66l-6 8M80 82l8 2M120 82l-8 2" ' + B + '/>' +
        g('abdomen', '<ellipse cx="100" cy="138" rx="30" ry="38" fill="currentColor"/><path d="M84 118 Q92 112 98 116" fill="none" stroke="var(--ticket)" stroke-width="3" stroke-linecap="round"/>');
    },
    bumble: function () {
      var h = ''; for (var i = 0; i < 26; i++) { var a = i * 2.4, r = 6 + i * 1.1; h += '<path d="M' + (100 + Math.cos(a) * r * 1).toFixed(1) + ' ' + (138 + Math.sin(a) * r * 1.3).toFixed(1) + 'l3 6" ' + B.replace('"3"', '"2.4"') + '/>'; }
      return '<ellipse cx="100" cy="46" rx="16" ry="14" fill="currentColor"/>' + '<ellipse cx="100" cy="80" rx="26" ry="24" ' + B + '/><path d="M82 66l6 8M92 62l4 10M108 62l-4 10M118 66l-6 8M80 82l8 2M120 82l-8 2" ' + B + '/>' +
        g('abdomen', '<ellipse cx="100" cy="138" rx="30" ry="38" ' + B + '/>' + h);
    },
    native: function () { return g('head', '<path d="M72 62 H128 V134 Q128 150 100 150 Q72 150 72 134 Z" ' + B + '/>') + '<path d="M90 62 L84 20M110 62 L116 20" ' + B + '/><path d="M86 150v34M114 150v34" ' + B + '/>'; },
    formosan: function () { return g('head', '<path d="M100 54 C126 60 134 104 124 130 C118 148 82 148 76 130 C66 104 74 60 100 54 Z" ' + B + '/>') + '<path d="M92 56 L84 20M108 56 L116 20" ' + B + '/><path d="M86 146v38M114 146v38" ' + B + '/>'; }
  };
  /* Each card: art or a text clue, two IDs, the right one, then the feature that proves it. */
  var POOL = [
    { art: 'termite', a: ['Termite swarmer', 'Ant swarmer'], ans: 0, fts: ['Waist', 'Color', 'Size'], ft: 0, lit: 'waist', note: 'Broad waist, equal wings, straight antennae. Termite.', topic: 'swarmers-id' },
    { art: 'ant', a: ['Termite swarmer', 'Ant swarmer'], ans: 1, fts: ['Size', 'Waist', 'Color'], ft: 1, lit: 'waist', note: 'Pinched waist and elbowed antennae. Ant.', topic: 'swarmers-id' },
    { art: 'termite', a: ['Ant swarmer', 'Termite swarmer'], ans: 1, fts: ['Wings, equal length', 'Wings, front ones bigger', 'Legs'], ft: 0, lit: 'wings', note: 'Two pairs, equal length. Termite.', topic: 'swarmers-id' },
    { art: 'ant', a: ['Termite swarmer', 'Ant swarmer'], ans: 1, fts: ['Straight antennae', 'Elbowed antennae', 'Six legs'], ft: 1, lit: 'antennae', note: 'Elbowed antennae. Ant.', topic: 'swarmers-id' },
    { art: 'carpbee', a: ['Carpenter bee', 'Bumble bee'], ans: 0, fts: ['Shiny black abdomen', 'Hairy abdomen', 'Long wings'], ft: 0, lit: 'abdomen', note: 'Shiny black abdomen. Carpenter bee.', topic: 'other-wdi' },
    { art: 'bumble', a: ['Carpenter bee', 'Bumble bee'], ans: 1, fts: ['Shiny black abdomen', 'Hairy abdomen', 'Big head'], ft: 1, lit: 'abdomen', note: 'Fully hairy abdomen. Bumble bee.', topic: 'other-wdi' },
    { art: 'native', a: ['Native soldier', 'Formosan soldier'], ans: 0, fts: ['Rectangular head', 'Teardrop head', 'Long legs'], ft: 0, lit: 'head', note: 'Rectangular head. Native subterranean.', topic: 'termite-biology' },
    { art: 'formosan', a: ['Native soldier', 'Formosan soldier'], ans: 1, fts: ['Rectangular head', 'Teardrop head', 'Short jaws'], ft: 1, lit: 'head', note: 'Teardrop head. Send it through Extension.', topic: 'termite-biology' },
    { clue: 'Talc-like frass. Pinhead holes in new oak flooring.', a: ['Lyctid', 'Old house borer'], ans: 0, fts: ['Hardwood and talc', 'Softwood and pellets'], ft: 0, note: 'Lyctid: Like talc, Luxury hardwood.', topic: 'other-wdi' },
    { clue: 'Gritty frass. Small round holes in pine crawl space joists. Wood reads 18%.', a: ['Anobiid', 'Lyctid'], ans: 0, fts: ['Softwood in a damp crawl', 'New hardwood trim'], ft: 0, note: 'Anobiid: Attic to crawl, Any wood. Fix moisture first.', topic: 'other-wdi' },
    { clue: 'Oval holes about 3/8 inch in softwood framing of a newer home.', a: ['Powderpost beetle', 'Old house borer'], ans: 1, fts: ['Oval holes in softwood', 'Pinholes in hardwood'], ft: 0, note: 'Old house, young wood.', topic: 'other-wdi' },
    { clue: 'Galleries follow the grain and hold mud.', a: ['Carpenter ant', 'Subterranean termite'], ans: 1, fts: ['Mud and along the grain', 'Clean and across the grain'], ft: 0, note: 'Termites leave mud. Carpenter ant galleries are clean.', topic: 'other-wdi' },
    { clue: 'Clean, smooth galleries. Frass of shavings and insect parts under a damp window.', a: ['Carpenter ant', 'Subterranean termite'], ans: 0, fts: ['Shavings and clean galleries', 'Mud tubes'], ft: 0, note: 'They excavate, they don\'t eat wood. Find the nest, fix the moisture.', topic: 'other-wdi' },
    { clue: 'Perfectly round 1/2-inch hole under a fascia board, with yellow staining.', a: ['Carpenter bee', 'Carpenter ant'], ans: 0, fts: ['1/2-inch round hole', 'Trail of shavings'], ft: 0, note: 'Females cut round 1/2-inch holes, then turn along the surface.', topic: 'other-wdi' }
  ];
  var S, root, tm, reduced;
  function card() {
    var c = S.deck[S.i], left = S.left;
    GK.frame(root, 'Bug ID', 'Card ' + (S.i + 1) + ' of 10', S.score,
      '<div class="bugcard" id="bugCard">' + (c.art ? '<svg viewBox="0 0 200 200" class="bugart" role="img" aria-label="Specimen, top view">' + ART[c.art]() + '</svg>' : '<div class="ticket ticket__body"><span class="field__k">Field notes</span><p class="work__complaint mt1">' + esc(c.clue) + '</p></div>') + '</div>' +
      '<p class="gs__prompt">What is it?</p><div class="gs__row" id="bugA">' + c.a.map(function (x, i) { return '<button class="btn" type="button" data-i="' + i + '">' + esc(x) + '</button>'; }).join('') + '</div><div id="bugFb" aria-live="polite"></div>');
    var el = $('#bugCard'), sx = 0;
    el.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    el.addEventListener('pointerup', function (e) { var d = e.clientX - sx; if (Math.abs(d) > 50) { var b = $$('#bugA button')[d < 0 ? 0 : 1]; if (b) b.click(); } });
    $('#bugA').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || b.disabled) return;
      var good = +b.getAttribute('data-i') === c.ans;
      $$('#bugA button').forEach(function (x) { x.disabled = true; });
      if (good) { S.right++; S.streak++; S.score += 10 + Math.min(5, S.streak - 1); }
      else { S.streak = 0; var id = GK.linked(c.topic); if (id && S.misses.indexOf(id) < 0) S.misses.push(id); }
      if (!good) return show(c, false);
      $('#bugFb').innerHTML = '<p class="mt2"><b>Right. What told you?</b></p><div class="mixlist mt2" id="bugF">' + c.fts.map(function (f, i) { return '<button class="mixbtn" type="button" data-i="' + i + '">' + esc(f) + '</button>'; }).join('') + '</div>';
      $('#bugF').addEventListener('click', function (ev) {
        var f = ev.target.closest ? ev.target.closest('button') : null;
        if (!f) return;
        if (+f.getAttribute('data-i') === c.ft) S.score += 5;
        show(c, true);
      });
    });
  }
  function show(c, good) {
    if (c.lit) { var ft = $('.ft-' + c.lit, root); if (ft) ft.classList.add('is-lit'); }
    $('#bugFb').innerHTML = GK.note(good, esc(c.note)) + '<button class="btn btn--go btn--wide mt3" id="bugN" type="button">Next</button>';
    $('#bugN').addEventListener('click', function () { S.i++; S.i < 10 ? card() : finish(); }); $('#bugN').focus();
  }
  function finish() {
    GK.end(root, { game: 'bugid', title: 'Bug ID', score: S.score, pass: S.right >= 8, head: S.right >= 8 ? 'Sharp eyes.' : 'Back to the loupe.', stats: [['Right', S.right + ' of 10']], topics: ['swarmers-id', 'other-wdi'], misses: S.misses, take: 'B-E-S: Broad, Equal, Straight is a termite. Identify before you treat. Collect a sample when you can.', again: start });
  }
  function start() {
    var pair = shuffle(POOL.filter(function (c) { return c.topic === 'swarmers-id'; })).slice(0, 3);
    var rest = shuffle(POOL.filter(function (c) { return pair.indexOf(c) < 0; })).slice(0, 7);
    S = { deck: shuffle(pair.concat(rest)), i: 0, score: 0, right: 0, streak: 0, misses: [] };
    card();
  }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
