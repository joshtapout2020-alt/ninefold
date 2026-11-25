/* Shared game frame. Every game mounts into it and ends on a results screen. */
var GAMES = [
  { id: 'suspended', t: 'Keep It Suspended', d: 'Read the label. Shake what settles. Leave what dissolved.', ic: 'tank', mod: function () { return KIS; } },
  { id: 'bugid', t: 'Bug ID', d: 'Swarmer or flying ant? Wings, waist, antennae.', ic: 'bug', mod: function () { return BugID; } },
  { id: 'label', t: 'Read the Label', d: 'Find the signal word, PPE, first aid and more.', ic: 'book', mod: function () { return LabelGame; } },
  { id: 'spill', state: 'va', t: 'Spill Response', d: 'Put the steps in order before the clock runs out.', ic: 'clock', mod: function () { return SpillGame; } },
  { id: 'math', t: 'Tank Math', d: 'Dial in the mix. The gauge tells on you.', ic: 'gauge', mod: function () { return MathGame; } },
  { id: 'walk', t: 'Termite Inspection Walk', d: 'Find it. Then mark it on the graph.', ic: 'home', mod: function () { return WalkGame; } },
  { id: 'foundation', t: 'Foundation Planner', d: 'Slab, crawl, hollow block. The exam math and the truck math.', ic: 'home', mod: function () { return FoundationGame; } },
  { id: 'ppe', t: 'PPE Loadout', d: 'Dress the tech to match the label.', ic: 'exam', mod: function () { return PPEGame; } },
  { id: 'ticket', state: 'va', t: 'Fill the Record', d: 'What every service record needs. The video is not one of them.', ic: 'cards', mod: function () { return TicketGame; } }
];

var GK = {
  frame: function (root, title, round, score, inner) {
    root.innerHTML = '<div class="gs"><header class="gs__bar"><a class="gs__back" href="#games" aria-label="Quit game">' + icon('left') + '</a>' +
      '<div><div class="gs__title">' + esc(title) + '</div><div class="gs__round">' + esc(round) + '</div></div>' +
      '<div class="gs__score" aria-label="Score ' + score + '"><small>Score</small>' + score + '</div></header><div class="gs__stage">' + inner + '</div></div>';
  },
  note: function (good, html) { return '<div class="gs__note ' + (good === true ? 'gs__note--good' : good === false ? 'gs__note--call' : '') + '">' + html + '</div>'; },
  /* Finds a real question on the topic so a game miss lands in Callbacks. */
  linked: function (topic) {
    var l = shuffle(questionsFor(modById(topic).exam, topic));
    return l[0] ? l[0].id : null;
  },
  end: function (root, o) {
    Progress.report({ game: o.game, score: o.score, pass: o.pass, topics: o.topics, misses: o.misses });
    GK.frame(root, o.title, 'Done', o.score,
      '<div><span class="stamp ' + (o.pass ? 'stamp--pass">Pass' : 'stamp--call">Callback') + '</span></div><h2>' + esc(o.head) + '</h2>' +
      (o.stats ? '<div class="resultgrid" style="grid-template-columns:repeat(' + o.stats.length + ',1fr)">' + o.stats.map(function (s) { return '<div class="field"><span class="field__k">' + esc(s[0]) + '</span><span class="field__v">' + esc(s[1]) + '</span></div>'; }).join('') + '</div>' : '') +
      (o.misses && o.misses.length ? GK.note(false, '<b>' + o.misses.length + ' sent to Callbacks.</b> You\'ll see these again.') : '') +
      GK.note(null, '<b>Take this to the truck:</b> ' + esc(o.take)) +
      '<button class="btn btn--go btn--wide" id="gkAgain" type="button">Run it again</button><a class="btn btn--wide" href="#games">All games</a>');
    $('#gkAgain', root).addEventListener('click', o.again);
  }
};
