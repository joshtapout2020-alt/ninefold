/* Sign-in, synced progress and the manager Team page. Active only when js/config.js has Supabase
   keys. Without them the site runs as before: no sign-in, progress on the device. */
var Auth = (function () {
  var cfg = window.NF_CONFIG || {}, sb = null, user = null, me = null, pushTimer = 0, recovering = false;
  function on() { return !!(cfg.supabaseUrl && cfg.supabaseAnonKey && (window.supabase || Auth._client)); }
  function client() { return Auth._client || sb || (sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)); }
  function isManager() { return !!(me && me.role === 'manager' && me.active); }

  /* ---- Progress sync. Every nf.* key except the theme rides in one row per person. ---- */
  function snapshot() {
    var o = {};
    try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('nf.') === 0 && k !== 'nf.theme') o[k] = localStorage.getItem(k); }); } catch (e) {}
    return o;
  }
  function restore(o) {
    try {
      Object.keys(localStorage).forEach(function (k) { if (k.indexOf('nf.') === 0 && k !== 'nf.theme') localStorage.removeItem(k); });
      Object.keys(o || {}).forEach(function (k) { localStorage.setItem(k, o[k]); });
    } catch (e) {}
  }
  /* What a manager sees. Worked out on the employee's device, where the progress lives. */
  function summary() {
    var exams = ['core', 'wdo', 'lawn'], s = { state: curState(), track: Store.get('track', null), readiness: {}, answered: {}, stops: 0, stopsTotal: 0 };
    exams.forEach(function (e) {
      s.readiness[e] = Progress.readiness(e); s.answered[e] = Progress.attemptsFor(e);
      s.stops += Stops.doneCount(e); s.stopsTotal += modsFor(e).length;
    });
    s.bugMonths = Field.doneThisYear();
    s.mock = (Store.get('mockres', [])[0] || null);
    if (s.mock) s.mock = { kind: s.mock.kind, pct: s.mock.pct, on: s.mock.on };
    s.callbacksDue = Callbacks.due('exam').length;
    s.sopsReviewed = Object.keys(Store.get('sopread', {})).length;
    s.condRead = Object.keys(Store.get('condRead', {})).length;
    s.condPhotos = Conditions.doneCount();
    s.weekMin = Progress.weekMinutes();
    s.testDate = Store.get('testDate', '');
    return s;
  }
  function push() {
    if (!user) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      var s; try { s = summary(); } catch (e) { s = {}; }
      client().from('progress').upsert({ user_id: user.id, data: snapshot(), summary: s, updated_at: new Date().toISOString() }).then(function () {}, function () {});
    }, 2500);
  }
  /* Every save on the device schedules an upload a moment later. */
  function hookStore() {
    var set = Store.set, wipe = Store.wipe;
    Store.set = function (k, v) { set(k, v); if (k !== 'theme') push(); };
    Store.wipe = function () { wipe(); push(); };
  }

  /* ---- Internal content. SOPs are not in the public files; they load after sign-in. ---- */
  function loadContent() {
    return client().from('content').select('key, body').then(function (r) {
      (r.data || []).forEach(function (row) {
        /* Rows are written only from the Supabase SQL editor, never by site users. */
        try { new Function(row.body)(); } catch (e) {}
      });
    }, function () {});
  }

  /* ---- Screens ---- */
  function shell(html) {
    document.body.classList.add('in-game');
    view.innerHTML = '<div class="welcome stack"><p class="brand__name">Ninefold Pest</p>' + html + '</div>';
  }
  function loginView(done, msg, good) {
    shell('<h1>Sign in</h1><p class="lead">Use your email and password. New here? Create an account with your branch code.</p>' +
      (msg ? '<div class="gs__note ' + (good ? 'gs__note--good' : 'gs__note--call') + '" role="alert">' + esc(msg) + '</div>' : '') +
      '<form class="ticket ticket__body stack" id="loginForm" novalidate>' +
      '<label class="field__k" for="loginEmail">Email</label><input class="input" id="loginEmail" type="email" autocomplete="username" required>' +
      '<label class="field__k" for="loginPass">Password</label><input class="input" id="loginPass" type="password" autocomplete="current-password" required>' +
      '<button class="btn btn--go btn--wide" id="loginGo" type="submit">Sign in</button>' +
      '<button class="btn btn--wide" id="loginForgot" type="button">Forgot password?</button><div id="loginFb" aria-live="polite"></div></form>' +
      '<section class="ticket ticket__body stack"><h2>New to Ninefold?</h2><p class="muted">Make your own login. You need your branch code from your manager.</p><button class="btn btn--wide" id="loginNew" type="button">Create an account</button></section>');
    $('#loginNew').addEventListener('click', function () { signupView(done); });
    $('#loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var em = $('#loginEmail').value.trim(), pw = $('#loginPass').value;
      if (!em || !pw) { $('#loginFb').innerHTML = '<p class="gs__note gs__note--call">Enter your email and password.</p>'; return; }
      $('#loginGo').disabled = true; $('#loginGo').textContent = 'Signing in...';
      client().auth.signInWithPassword({ email: em, password: pw }).then(function (r) {
        if (r.error) {
          $('#loginGo').disabled = false; $('#loginGo').textContent = 'Sign in';
          /* Supabase reports a turned-off login as banned. */
          $('#loginFb').innerHTML = '<p class="gs__note gs__note--call">' + (/banned/i.test(r.error.message) ? 'Your access is turned off. Ask your manager.' : 'That email and password did not match. Check both and try again.') + '</p>';
          return;
        }
        afterSignIn(r.data.user, done);
      });
    });
    $('#loginForgot').addEventListener('click', function () {
      var em = $('#loginEmail').value.trim();
      if (!em) { $('#loginFb').innerHTML = '<p class="gs__note gs__note--call">Type your email above first, then tap Forgot password.</p>'; return; }
      client().auth.resetPasswordForEmail(em, { redirectTo: location.href.split('#')[0] }).then(function () {
        $('#loginFb').innerHTML = '<p class="gs__note gs__note--good">If that email has a login, a reset link is on its way. Check your inbox.</p>';
      });
    });
  }
  /* Employees make their own login. The team code is checked by the database, not here. */
  function signupView(done) {
    shell('<h1>Create an account</h1><p class="lead">Your progress saves to this login, so it follows you to any phone or computer.</p>' +
      '<form class="ticket ticket__body stack" id="suForm" novalidate>' +
      '<label class="field__k" for="suName">Full name</label><input class="input" id="suName" autocomplete="name">' +
      '<label class="field__k" for="suEmail">Email</label><input class="input" id="suEmail" type="email" autocomplete="email">' +
      '<label class="field__k" for="suPass">Password, at least 10 characters</label><input class="input" id="suPass" type="password" autocomplete="new-password">' +
      '<label class="field__k" for="suCode">Branch code</label><input class="input data" id="suCode" autocomplete="off" autocapitalize="characters" placeholder="From your manager, like RIC-4K7P">' +
      '<p class="muted small">The code puts you in your branch. Ask your manager for it.</p>' +
      '<button class="btn btn--go btn--wide" id="suGo" type="submit">Create account</button>' +
      '<button class="btn btn--wide" id="suBack" type="button">I already have a login</button><div id="suFb" aria-live="polite"></div></form>');
    function say(t) { $('#suFb').innerHTML = '<p class="gs__note gs__note--call">' + t + '</p>'; }
    $('#suBack').addEventListener('click', function () { loginView(done); });
    $('#suForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#suName').value.trim(), em = $('#suEmail').value.trim(), pw = $('#suPass').value, code = $('#suCode').value.trim().toUpperCase();
      if (!name) return say('Enter your full name.');
      if (em.indexOf('@') < 1) return say('Enter a valid email.');
      if (pw.length < 10) return say('Use at least 10 characters for your password.');
      if (!code) return say('Enter your branch code from your manager.');
      $('#suGo').disabled = true; $('#suGo').textContent = 'Creating...';
      client().auth.signUp({ email: em, password: pw, options: { emailRedirectTo: location.href.split('#')[0], data: { full_name: name, code: code } } }).then(function (r) {
        $('#suGo').disabled = false; $('#suGo').textContent = 'Create account';
        if (r.error) {
          var m = r.error.message || '';
          if (/database error|team code/i.test(m)) return say('That branch code is not right. Check it with your manager.');
          if (/already registered|already exists/i.test(m)) return say('That email already has a login. Go back and sign in, or use Forgot password.');
          if (/password/i.test(m)) return say(esc(m));
          return say('Could not create the account: ' + esc(m));
        }
        /* Some setups make people confirm their email first. Others sign them straight in. */
        if (r.data && r.data.session) return afterSignIn(r.data.user, done);
        if (r.data && r.data.user && r.data.user.identities && !r.data.user.identities.length) return say('That email already has a login. Go back and sign in, or use Forgot password.');
        loginView(done, 'Account created. Check your email for a link to confirm it, then sign in here.', true);
      });
    });
  }

  function newPasswordView(done) {
    shell('<h1>Set a new password</h1><form class="ticket ticket__body stack" id="pwForm" novalidate>' +
      '<label class="field__k" for="pwNew">New password, at least 10 characters</label><input class="input" id="pwNew" type="password" autocomplete="new-password">' +
      '<button class="btn btn--go btn--wide" type="submit">Save password</button><div id="pwFb" aria-live="polite"></div></form>');
    $('#pwForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var pw = $('#pwNew').value;
      if (pw.length < 10) { $('#pwFb').innerHTML = '<p class="gs__note gs__note--call">Use at least 10 characters.</p>'; return; }
      client().auth.updateUser({ password: pw }).then(function (r) {
        if (r.error) { $('#pwFb').innerHTML = '<p class="gs__note gs__note--call">' + esc(r.error.message) + '</p>'; return; }
        recovering = false;
        try { history.replaceState(null, '', location.pathname); } catch (x) {}
        if (done) afterSignIn(r.data.user, done); else go('account', true);
      });
    });
  }

  function afterSignIn(u, done) {
    user = u;
    client().from('profiles').select('*').eq('id', u.id).single().then(function (r) {
      me = r.data;
      if (!me || !me.active) {
        client().auth.signOut();
        return loginView(done, !me ? 'This login is not set up yet. Ask your manager to add you.' : 'Your access is turned off. Ask your manager.');
      }
      return client().from('progress').select('data').eq('user_id', u.id).maybeSingle().then(function (p) {
        if (p.data && p.data.data && Object.keys(p.data.data).length) restore(p.data.data);
        if (me.state && !Store.get('state', null)) Store.set('state', me.state);
        if (me.full_name && !Store.get('name', '')) Store.set('name', me.full_name);
        return loadContent();
      }).then(function () {
        document.body.classList.remove('in-game');
        decorate(); done(); push();
      });
    });
  }

  /* Top bar shows the account button; managers get Team on the Home list. */
  function decorate() {
    var bar = $('.topbar');
    if (bar && !$('#acctBtn')) {
      var a = document.createElement('a');
      a.id = 'acctBtn'; a.className = 'iconbtn iconbtn--acct'; a.href = '#account';
      a.setAttribute('aria-label', 'Your account'); a.innerHTML = icon('home').replace('i-home', 'i-user');
      bar.insertBefore(a, $('#themeBtn'));
    }
  }

  function start(done) {
    if (!on()) return done();
    hookStore();
    /* A password reset link lands with tokens in the address. Supabase reads them, then we tidy up. */
    recovering = /type=recovery/.test(location.hash);
    client().auth.onAuthStateChange(function (ev) { if (ev === 'PASSWORD_RECOVERY') { recovering = true; newPasswordView(done); } });
    client().auth.getSession().then(function (r) {
      var s = r.data && r.data.session;
      if (recovering && s) return newPasswordView(done);
      if (/access_token=/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (x) {} }
      if (s) afterSignIn(s.user, done); else loginView(done);
    });
  }

  /* ---- Account page ---- */
  function accountView() {
    if (!on()) return go('settings', true);
    view.innerHTML = backLink('#home', 'Home') + pagehead('Your account') + '<div class="stack">' +
      '<div class="ticket"><div class="formrow formrow--end"><div class="field"><span class="field__k">Name</span><span class="field__v">' + esc(me.full_name || '') + '</span></div><div class="field"><span class="field__k">Role</span><span class="field__v">' + (isManager() ? 'Manager' : 'Employee') + '</span></div></div>' +
      '<div class="ticket__body"><p class="muted">' + esc(me.email) + (me.branch ? ' · ' + esc(me.branch) : '') + '</p></div></div>' +
      (isManager() ? '<a class="btn btn--go btn--wide" href="#team">Team</a>' : '') +
      '<button class="btn btn--wide" id="acPw" type="button">Change password</button>' +
      '<button class="btn btn--wide" id="acOut" type="button">Sign out</button>' +
      '<p class="muted small">Your progress saves to your account, so it follows you to any phone or computer.</p></div>';
    $('#acPw').addEventListener('click', function () { newPasswordView(null); });
    $('#acOut').addEventListener('click', function () {
      clearTimeout(pushTimer);
      var s; try { s = summary(); } catch (e) { s = {}; }
      client().from('progress').upsert({ user_id: user.id, data: snapshot(), summary: s, updated_at: new Date().toISOString() }).then(function () {
        return client().auth.signOut();
      }).then(function () { restore({}); location.reload(); });
    });
  }

  /* ---- Team page: managers only ---- */
  var BRANCHES = { va: ['Chesapeake', 'Richmond', 'Roanoke'], al: ['Birmingham', 'Huntsville'], pa: ['Allentown', 'Altoona', 'Pittston'], ut: ['Lindon', 'Riverdale'] };
  function ago(t) {
    if (!t) return 'Never';
    var d = Math.floor((Date.now() - new Date(t).getTime()) / 864e5);
    return d <= 0 ? 'Today' : d === 1 ? 'Yesterday' : d + ' days ago';
  }
  function pct(v, n) { return n >= 30 ? v + '%' : '--'; }
  function tempPassword() {
    var c = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789', out = '', a = new Uint32Array(12);
    try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < 12; i++) a[i] = Math.floor(Math.random() * 1e9); }
    for (var j = 0; j < 12; j++) out += c[a[j] % c.length];
    return out;
  }
  function callFn(body) {
    return client().functions.invoke('manage-employee', { body: body }).then(function (r) {
      if (r.error) {
        /* The function's own message is in the response body when it refused. */
        var ctx = r.error.context;
        if (ctx && ctx.json) return ctx.json().then(function (j) { throw new Error(j.error || r.error.message); }, function () { throw new Error(r.error.message); });
        throw new Error(r.error.message);
      }
      if (r.data && r.data.error) throw new Error(r.data.error);
      return r.data;
    });
  }
  function loadTeam() {
    return Promise.all([client().from('profiles').select('*').order('full_name'), client().from('progress').select('user_id, summary, updated_at')]).then(function (rs) {
      var prog = {}; (rs[1].data || []).forEach(function (p) { prog[p.user_id] = p; });
      return (rs[0].data || []).map(function (p) { p.progress = prog[p.id] || null; return p; });
    });
  }
  function teamView(id) {
    if (!isManager()) return go('home', true);
    if (id === 'new') return addView();
    if (id) return memberView(id);
    view.innerHTML = backLink('#home', 'Home') + pagehead('Team', 'Everyone\'s progress, updated as they study.') + '<div id="team"><p class="muted">Loading...</p></div>';
    loadTeam().then(function (people) {
      var filter = Store.get('teamFilter', 'all');
      var branches = {}; people.forEach(function (p) { if (p.branch) branches[p.branch] = 1; });
      function paint() {
        var list = people.filter(function (p) { return filter === 'all' || p.branch === filter; });
        var active = list.filter(function (p) { return p.active; }).length;
        $('#team').innerHTML = '<section class="ticket mb3"><div class="ticket__head"><span>Branch codes</span><span>For new sign-ups</span></div>' +
          '<div id="tcList"><p class="ticket__body muted">Loading...</p></div><div class="ticket__body"><p class="muted small">Give a new employee their branch\'s code. They tap Create an account on the sign-in page, and the code puts them in that branch. Replace a code any time: the old one stops working, and existing logins are not affected.</p><div id="tcFb" aria-live="polite"></div></div></section>' +
          '<a class="btn btn--go btn--wide mb3" href="#team/new">Add employee yourself</a>' +
          '<label class="field__k" for="tmFilter">Branch</label><select class="input mb3" id="tmFilter"><option value="all">All branches</option>' + Object.keys(branches).sort().map(function (b) { return '<option' + (b === filter ? ' selected' : '') + '>' + esc(b) + '</option>'; }).join('') + '</select>' +
          '<p class="muted small mb2">' + active + ' active of ' + list.length + '.</p>' +
          '<nav class="list" aria-label="Employees">' + list.map(function (p) {
            var s = (p.progress && p.progress.summary) || {}, r = s.readiness || {}, a = s.answered || {};
            var line = [p.branch || (STATES[p.state] ? STATES[p.state].name : ''), 'Core ' + pct(r.core || 0, a.core || 0), 'WDO ' + pct(r.wdo || 0, a.wdo || 0), 'Lawn ' + pct(r.lawn || 0, a.lawn || 0), (s.stops || 0) + ' stops', 'Active ' + ago(p.progress && p.progress.updated_at).toLowerCase()].filter(Boolean).join(' · ');
            return listRow('#team/' + p.id, p.role === 'manager' ? 'exam' : 'home', (p.full_name || p.email) + (p.active ? '' : ' (off)'), line);
          }).join('') + '</nav>' + (list.length ? '' : '<p class="muted mt3">Nobody here yet. Add your first employee.</p>');
        $('#tmFilter').addEventListener('change', function (e) { filter = e.target.value; Store.set('teamFilter', filter); paint(); });
        teamCode(filter);
      }
      paint();
    }, function () { $('#team').innerHTML = '<p class="gs__note gs__note--call">Could not load the team. Check your connection and try again.</p>'; });
  }
  /* Branch prefix plus 4 characters, like RIC-4K7P. No 0/O or 1/I, so codes read easily aloud. */
  function newCode(branch) {
    var c = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', out = '', a = new Uint32Array(4);
    try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < 4; i++) a[i] = Math.floor(Math.random() * 1e9); }
    for (var j = 0; j < 4; j++) out += c[a[j] % c.length];
    return branch.slice(0, 3).toUpperCase() + '-' + out;
  }
  function teamCode(filter) {
    var box = $('#tcList'); if (!box) return;
    function fb(good, t) { $('#tcFb').innerHTML = '<p class="gs__note ' + (good ? 'gs__note--good' : 'gs__note--call') + '">' + t + '</p>'; }
    client().from('branch_codes').select('branch, state, code').order('state').order('branch').then(function (r) {
      if (r.error || !r.data || !r.data.length) { box.innerHTML = ''; fb(false, 'Sign-up is not set up in the database yet. Run supabase/signup.sql.'); return; }
      var rows = r.data.filter(function (x) { return !filter || filter === 'all' || x.branch === filter; });
      if (!rows.length) rows = r.data;
      box.innerHTML = '<div class="codes">' + rows.map(function (x) {
        return '<div class="coderow"><span><b>' + esc(x.branch) + '</b><small>' + esc(STATES[x.state] ? STATES[x.state].name : x.state) + '</small></span>' +
          '<span class="data codev" data-b="' + esc(x.branch) + '">' + esc(x.code) + '</span>' +
          '<span class="coderow__btns"><button class="btn btn--sm" type="button" data-copy="' + esc(x.branch) + '">Copy</button><button class="btn btn--sm" type="button" data-new="' + esc(x.branch) + '">New</button></span></div>';
      }).join('') + '</div>';
      box.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
        var br = b.getAttribute('data-copy') || b.getAttribute('data-new');
        var cell = $$('.codev', box).filter(function (c) { return c.getAttribute('data-b') === br; })[0];
        if (b.hasAttribute('data-copy')) {
          (navigator.clipboard ? navigator.clipboard.writeText(cell.textContent) : Promise.reject()).then(function () { b.textContent = 'Copied'; }, function () { b.textContent = 'Select it'; });
          return;
        }
        if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = 'Sure?'; return; }
        var code = newCode(br);
        client().from('branch_codes').update({ code: code, updated_at: new Date().toISOString() }).eq('branch', br).then(function (u) {
          delete b.dataset.sure; b.textContent = 'New';
          if (u.error) return fb(false, esc(u.error.message));
          cell.textContent = code; fb(true, esc(br) + ' has a new code. The old one no longer works.');
        });
      });
    });
  }
  function stateOptions(sel) { return Object.keys(STATES).map(function (k) { return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + esc(STATES[k].name) + '</option>'; }).join(''); }
  function branchOptions(st, sel) { return (BRANCHES[st] || []).map(function (b) { return '<option' + (b === sel ? ' selected' : '') + '>' + esc(b) + '</option>'; }).join(''); }
  function addView() {
    var pw = tempPassword(), st = me.state || 'va';
    view.innerHTML = backLink('#team', 'Team') + pagehead('Add employee', 'They sign in with this email and the temporary password below.') +
      '<form class="ticket ticket__body stack" id="addForm" novalidate>' +
      '<label class="field__k" for="adName">Full name</label><input class="input" id="adName" autocomplete="off">' +
      '<label class="field__k" for="adEmail">Email</label><input class="input" id="adEmail" type="email" autocomplete="off">' +
      '<label class="field__k" for="adState">State</label><select class="input" id="adState">' + stateOptions(st) + '</select>' +
      '<label class="field__k" for="adBranch">Branch</label><select class="input" id="adBranch">' + branchOptions(st, me.branch) + '</select>' +
      '<label class="field__k" for="adRole">Role</label><select class="input" id="adRole"><option value="employee">Employee</option><option value="manager">Manager: can see the team and add people</option></select>' +
      '<label class="field__k" for="adPw">Temporary password</label><input class="input data" id="adPw" value="' + pw + '" autocomplete="off">' +
      '<button class="btn btn--go btn--wide" id="adGo" type="submit">Create login</button><div id="adFb" aria-live="polite"></div></form>';
    $('#adState').addEventListener('change', function (e) { $('#adBranch').innerHTML = branchOptions(e.target.value); });
    $('#addForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var b = { action: 'create', full_name: $('#adName').value.trim(), email: $('#adEmail').value.trim(), state: $('#adState').value, branch: $('#adBranch').value, role: $('#adRole').value, password: $('#adPw').value };
      if (!b.full_name || b.email.indexOf('@') < 1) { $('#adFb').innerHTML = '<p class="gs__note gs__note--call">Enter a name and a valid email.</p>'; return; }
      if (b.password.length < 10) { $('#adFb').innerHTML = '<p class="gs__note gs__note--call">The password needs at least 10 characters.</p>'; return; }
      $('#adGo').disabled = true; $('#adGo').textContent = 'Creating...';
      callFn(b).then(function () {
        view.innerHTML = backLink('#team', 'Team') + pagehead('Login created') + '<div class="ticket ticket__body stack"><p><b>' + esc(b.full_name) + '</b> can sign in now.</p>' +
          '<div class="formrow formrow--end"><div class="field"><span class="field__k">Email</span><span class="field__v">' + esc(b.email) + '</span></div><div class="field"><span class="field__k">Temporary password</span><span class="field__v data" id="newPw">' + esc(b.password) + '</span></div></div>' +
          '<button class="btn" id="cpPw" type="button">Copy password</button><p class="muted small">Give it to them in person or by text. They can change it under Your account. It is not shown again.</p>' +
          '<a class="btn btn--go btn--wide" href="#team">Back to Team</a></div>';
        $('#cpPw').addEventListener('click', function (ev) {
          var t = ev.target;
          (navigator.clipboard ? navigator.clipboard.writeText(b.password) : Promise.reject()).then(function () { t.textContent = 'Copied'; }, function () {
            var r = document.createRange(); r.selectNodeContents($('#newPw')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); t.textContent = 'Selected. Copy it now.';
          });
        });
      }, function (err) {
        $('#adGo').disabled = false; $('#adGo').textContent = 'Create login';
        $('#adFb').innerHTML = '<p class="gs__note gs__note--call">' + esc(err.message) + '</p>';
      });
    });
  }
  function memberView(id) {
    view.innerHTML = backLink('#team', 'Team') + '<div id="mb"><p class="muted">Loading...</p></div>';
    loadTeam().then(function (people) {
      var p = people.filter(function (x) { return x.id === id; })[0];
      if (!p) { $('#mb').innerHTML = '<p>That person is not on the team.</p>'; return; }
      var s = (p.progress && p.progress.summary) || {}, r = s.readiness || {}, a = s.answered || {};
      function f(k, v) { return '<div class="field"><span class="field__k">' + k + '</span><span class="field__v">' + esc(v) + '</span></div>'; }
      $('#mb').innerHTML = pagehead(p.full_name || p.email, p.email) + '<div class="stack">' +
        '<section class="ticket"><div class="ticket__head"><span>Progress</span><span>Updated ' + esc(ago(p.progress && p.progress.updated_at)) + '</span></div>' +
        '<div class="formrow">' + f('Core readiness', pct(r.core || 0, a.core || 0)) + f('WDO readiness', pct(r.wdo || 0, a.wdo || 0)) + f('Lawn readiness', pct(r.lawn || 0, a.lawn || 0)) + f('Stops stamped', (s.stops || 0) + ' of ' + (s.stopsTotal || 0)) + '</div>' +
        '<div class="formrow">' + f('Bug of the Month', (s.bugMonths || 0) + ' of 12') + f('Last mock', s.mock ? s.mock.pct + '% on ' + s.mock.on : 'None yet') + f('SOPs reviewed', String(s.sopsReviewed || 0)) + '</div>' +
        '<div class="formrow formrow--end">' + f('Conditions', (s.condRead || 0) + ' of ' + (NF.conditionTopics || []).length + ' topics, ' + (s.condPhotos || 0) + ' of ' + (NF.conditions || []).length + ' photos') + '</div><div class="formrow formrow--end">' + f('Callbacks due', String(s.callbacksDue || 0)) + f('This week', (s.weekMin || 0) + ' min') + f('Test date', s.testDate || 'Not set') + '</div>' +
        '<div class="ticket__body"><p class="muted small">Readiness shows "--" until they have answered 30 questions on that exam.</p></div></section>' +
        '<section class="ticket ticket__body stack"><h3>Details</h3>' +
        '<label class="field__k" for="mbState">State</label><select class="input" id="mbState">' + stateOptions(p.state || 'va') + '</select>' +
        '<label class="field__k" for="mbBranch">Branch</label><select class="input" id="mbBranch">' + branchOptions(p.state || 'va', p.branch) + '</select>' +
        '<label class="field__k" for="mbRole">Role</label><select class="input" id="mbRole"><option value="employee"' + (p.role === 'employee' ? ' selected' : '') + '>Employee</option><option value="manager"' + (p.role === 'manager' ? ' selected' : '') + '>Manager</option></select>' +
        '<button class="btn btn--go btn--wide" id="mbSave" type="button">Save details</button></section>' +
        '<section class="ticket ticket__body stack"><h3>Login</h3>' +
        '<button class="btn btn--wide" id="mbReset" type="button">Reset password</button>' +
        (p.id === user.id ? '' : '<button class="btn btn--wide" id="mbActive" type="button">' + (p.active ? 'Turn off access' : 'Turn access back on') + '</button>') +
        '<div id="mbFb" aria-live="polite"></div></section></div>';
      function say(good, t) { $('#mbFb').innerHTML = '<p class="gs__note ' + (good ? 'gs__note--good' : 'gs__note--call') + '">' + t + '</p>'; }
      $('#mbState').addEventListener('change', function (e) { $('#mbBranch').innerHTML = branchOptions(e.target.value); });
      $('#mbSave').addEventListener('click', function () {
        if (p.id === user.id && $('#mbRole').value !== 'manager') { say(false, 'You cannot remove your own manager role. Ask another manager.'); return; }
        client().from('profiles').update({ state: $('#mbState').value, branch: $('#mbBranch').value, role: $('#mbRole').value }).eq('id', p.id).then(function (r) {
          r.error ? say(false, esc(r.error.message)) : say(true, 'Saved.');
        });
      });
      $('#mbReset').addEventListener('click', function () {
        var pw = tempPassword();
        callFn({ action: 'reset', id: p.id, password: pw }).then(function () {
          say(true, 'New temporary password: <b class="data">' + esc(pw) + '</b>. Give it to them in person or by text. It is not shown again.');
        }, function (err) { say(false, esc(err.message)); });
      });
      var ab = $('#mbActive');
      if (ab) ab.addEventListener('click', function () {
        if (p.active && !ab.dataset.sure) { ab.dataset.sure = '1'; ab.textContent = 'Tap again to turn off access'; return; }
        callFn({ action: 'active', id: p.id, active: !p.active }).then(function () { go('team/' + p.id, true); }, function (err) { say(false, esc(err.message)); });
      });
    }, function () { $('#mb').innerHTML = '<p class="gs__note gs__note--call">Could not load this person. Check your connection.</p>'; });
  }

  return { on: on, start: start, isManager: isManager, accountView: accountView, teamView: teamView, me: function () { return me; } };
})();
