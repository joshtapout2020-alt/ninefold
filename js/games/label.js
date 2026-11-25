/* Read the Label. The product is fictional on purpose. */
var LabelGame = (function () {
  var L = { name: 'Mockingbird 2 SC', type: 'Insecticide. Suspension concentrate', sections: [
    { id: 'signal', title: 'Signal word', text: 'CAUTION. Keep out of reach of children.', what: 'the signal word' },
    { id: 'ingredients', title: 'Active ingredients', text: 'Mockingate 7.9%. Other ingredients 92.1%.', what: 'the ingredient statement' },
    { id: 'epa', title: 'Registration', text: 'EPA Reg. No. 00000-000. EPA Est. No. 00000-XX-000. (Both fictional.)', what: 'the registration numbers' },
    { id: 'firstaid', title: 'First aid', text: 'If on skin: remove clothing, rinse 15 to 20 minutes. If swallowed: call poison control. Do not induce vomiting unless told to. Have this label with you.', what: 'the first aid panel' },
    { id: 'hazard', title: 'Hazards to humans', text: 'Harmful if absorbed through skin. Avoid contact with eyes.', what: 'the human hazards statement' },
    { id: 'ppe', title: 'Personal protective equipment', text: 'Applicators must wear long-sleeved shirt, long pants, shoes, socks and waterproof gloves.', what: 'the PPE statement' },
    { id: 'env', title: 'Environmental hazards', text: 'Toxic to fish and aquatic invertebrates. Do not apply to water. Highly toxic to bees: do not apply to blooming plants if bees are foraging.', what: 'the environmental hazards' },
    { id: 'directions', title: 'Directions for use', text: 'It is a violation of federal law to use this product in a manner inconsistent with its labeling. Do not apply during rain. Keep people and pets out of treated areas until dry.', what: 'the directions for use' },
    { id: 'storage', title: 'Storage and disposal', text: 'Store in original container in a locked area. Triple rinse empty containers. Do not reuse.', what: 'storage and disposal' }
  ] };
  var PROMPTS = [
    { ask: 'How loud is this product? Find the signal word.', t: 'signal', topic: 'labels' },
    { ask: 'You need the number for the service record.', t: 'epa', topic: 'labels' },
    { ask: 'What must you wear?', t: 'ppe', topic: 'ppe' },
    { ask: 'A customer got it on their arm. Where do you look?', t: 'firstaid', topic: 'toxicity' },
    { ask: 'There is a koi pond by the patio. What do you read?', t: 'env', topic: 'environment' },
    { ask: 'Where does the empty jug go? Find it.', t: 'storage', topic: 'spills-disposal' },
    { ask: 'What is the active ingredient?', t: 'ingredients', topic: 'labels' },
    { ask: 'The customer asks when the dog can go back out.', t: 'directions', topic: 'labels' },
    { ask: 'Harder: the azaleas along the wall are blooming and bees are working them. Which panel stops you?', t: 'env', topic: 'environment' },
    { ask: 'Harder: rain is starting. Which panel tells you to wait?', t: 'directions', topic: 'environment' }
  ];
  var S, root;
  function paint() {
    var p = PROMPTS[S.i];
    S.tries = 0;
    GK.frame(root, 'Read the Label', 'Prompt ' + (S.i + 1) + ' of ' + PROMPTS.length, S.score,
      '<p class="gs__prompt" id="lblAsk">' + esc(p.ask) + '</p><div id="lblFb" aria-live="polite"></div>' +
      '<article class="lbl" aria-labelledby="lblAsk"><div class="lbl__fake">Training label. Not a real product.</div><div class="lbl__top"><div><div class="lbl__name">' + esc(L.name) + '</div><div class="lbl__type">' + esc(L.type) + '</div></div></div>' +
      '<div id="lblS">' + L.sections.map(function (s) { return '<button class="lblbtn" type="button" data-id="' + s.id + '"><b>' + esc(s.title) + '</b><span>' + esc(s.text) + '</span></button>'; }).join('') + '</div></article>');
    $('#lblS').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lblbtn') : null;
      if (!b || S.locked) return;
      var id = b.getAttribute('data-id'), s = L.sections.filter(function (x) { return x.id === id; })[0];
      if (id === p.t) {
        S.locked = true; S.score += S.tries ? 5 : 10; if (!S.tries) S.first++;
        b.classList.add('is-right');
        $('#lblFb').innerHTML = GK.note(true, 'Right there.') + '<button class="btn btn--go btn--wide mt2" id="lblN" type="button">Next</button>';
        $('#lblN').addEventListener('click', function () { S.locked = false; S.i++; S.i < PROMPTS.length ? paint() : finish(); });
        $('#lblN').focus(); try { window.scrollTo(0, 0); } catch (x) {}
      } else {
        S.tries++; b.classList.add('is-off');
        if (S.tries === 1) { var q = GK.linked(p.topic); if (q && S.misses.indexOf(q) < 0) S.misses.push(q); }
        $('#lblFb').innerHTML = GK.note(false, 'That\'s ' + esc(s.what) + '. Keep looking.'); try { window.scrollTo(0, 0); } catch (x) {}
      }
    });
  }
  function finish() {
    var pass = S.score >= 70;
    GK.end(root, { game: 'label', title: 'Read the Label', score: S.score, pass: pass, head: pass ? 'You know your way around a label.' : 'Run it again.', stats: [['First tap', S.first + ' of ' + PROMPTS.length]], topics: ['labels'], misses: S.misses, take: 'Read the label in your hand, not the one in your memory. Labels change.', again: start });
  }
  function start() { S = { i: 0, score: 0, first: 0, misses: [], locked: false }; paint(); }
  return { mount: function (el) { root = el; start(); }, unmount: function () { S = null; } };
})();
