/* Spill Response. Tap the steps in order. Running out of time teaches, it doesn't end the game. */
var SpillGame = (function () {
  var STEPS = [
    { t: 'Grab the spill kit, put on PPE, keep people back', why: 'Protect yourself first. The spill kit rides on your truck.' },
    { t: 'Shut off the pump to stop the leak', why: 'Control. Stop the source.' },
    { t: 'Dike it with absorbent, away from the storm drain', why: 'Contain. Never hose it.' },
    { t: 'Scoop absorbent into a sealed, labeled container', why: 'Clean up.' },
    { t: 'Tell your manager, and make sure VDACS OPS gets a call', why: 'Call. Tell your manager right away. Phone notice to OPS is due no later than 48 hours.' },
    { t: 'File the written report', why: 'Within 10 working days of the first notice.' }
  ];
  var S, root, tm;
  function reset() { clearInterval(tm); }
  function intro() {
    GK.frame(root, 'Spill Response', CONFIG.gameTime, 0,
      '<h1>Hose split</h1><p class="gs__prompt">Chesapeake driveway. Dilution is heading for a storm drain. Tap each step in order.</p>' +
      '<label class="checkrow"><input type="checkbox" id="spClock" checked> Use the 45-second clock</label><button class="btn btn--go btn--wide" id="spGo" type="button">Start</button>');
    $('#spGo').addEventListener('click', function () { var c = $('#spClock').checked; S = { next: 0, wrong: 0, left: 45, clock: c, order: shuffle(STEPS.map(function (x, i) { return i; })), misses: [] }; paint(); if (c) tm = setInterval(tick, 1000); });
  }
  function tick() { S.left--; var t = $('#spT'); if (t) { t.textContent = Quiz.fmt(Math.max(0, S.left)); if (S.left <= 10) t.classList.add('is-low'); } if (S.left <= 0) clearInterval(tm); }
  function paint() {
    GK.frame(root, 'Spill Response', 'Step ' + Math.min(S.next + 1, STEPS.length) + ' of ' + STEPS.length, Math.max(0, 100 - S.wrong * 10),
      (S.clock ? '<span class="timer" id="spT">' + Quiz.fmt(Math.max(0, S.left)) + '</span>' : '') + '<p class="gs__prompt">What happens next?</p><div class="mixlist" id="spL">' + S.order.map(function (i) {
        var done = i < S.next;
        return '<button class="mixbtn" type="button" data-i="' + i + '"' + (done ? ' disabled' : '') + '><span class="mixbtn__n">' + (done ? i + 1 : '') + '</span><span>' + esc(STEPS[i].t) + '</span></button>';
      }).join('') + '</div><div id="spF" aria-live="polite"></div>');
    $('#spL').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b || b.disabled) return;
      var i = +b.getAttribute('data-i');
      if (i === S.next) {
        S.next++;
        if (S.next === STEPS.length) { clearInterval(tm); return follow(); }
        var w = STEPS[i].why; paint(); $('#spF').innerHTML = GK.note(true, esc(w));
      } else {
        S.wrong++; if (S.clock) S.left -= 3;
        b.classList.add('is-off');
        $('#spF').innerHTML = GK.note(false, 'Not yet. Something else comes first.');
      }
    });
  }
  function follow() {
    S.score = Math.max(0, 100 - S.wrong * 10) + (S.clock ? Math.max(0, Math.round(S.left / 45 * 20)) : 0);
    GK.frame(root, 'Spill Response', 'Last question', S.score, '<p class="gs__prompt">Nobody was hurt and it was a general-use product. Some reached the drain. Do you still report?</p><div class="mixlist" id="spQ">' +
      ['No. Only restricted-use spills count.', 'Yes. A threat to the environment is reportable either way.', 'Only if the customer complains.'].map(function (t, i) { return '<button class="mixbtn" type="button" data-i="' + i + '">' + esc(t) + '</button>'; }).join('') + '</div><div id="spF" aria-live="polite"></div>');
    $('#spQ').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.mixbtn') : null;
      if (!b) return;
      var good = b.getAttribute('data-i') === '1';
      if (good) S.score += 10; else { var q = GK.linked('spills-disposal'); if (q) S.misses.push(q); }
      $('#spF').innerHTML = GK.note(good, 'Virginia requires a report for any accident threatening people or the environment, whether or not a restricted-use product is involved.') + '<button class="btn btn--go btn--wide mt3" id="spE" type="button">See results</button>';
      $('#spE').addEventListener('click', function () {
        var pass = S.score >= 70;
        GK.end(root, { game: 'spill', title: 'Spill Response', score: S.score, pass: pass, head: pass ? 'Clean work.' : 'Run it again.', stats: [['Wrong taps', S.wrong]], topics: ['spills-disposal'], misses: S.misses, take: 'Control, Contain, Clean up, Call. Forty-eight to phone, ten to write.', again: intro });
      });
    });
  }
  return { mount: function (el) { root = el; intro(); }, unmount: function () { reset(); S = null; } };
})();
