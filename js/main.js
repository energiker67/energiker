(function () {
  'use strict';

  var D = window.AG_DATA || {};
  var PROJ = { solar: 'Solar', fahrrad: 'Fahrrad', sonstiges: 'Sonstiges' };
  var root = document.documentElement;

  function $(id) { return document.getElementById(id); }
  function h(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  /* Design wechseln */
  var themeBtn = $('theme');
  function themeIcon() {
    var dark = root.dataset.theme === 'dark';
    themeBtn.textContent = dark ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', dark ? 'Helles Design einschalten' : 'Dunkles Design einschalten');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    themeIcon();
  });
  themeIcon();

  /* Menü Handy */
  var menuBtn = $('menu-btn');
  var nav = $('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  /* Diese Woche */
  var w = D.woche;
  if (w) {
    if (w.zeitraum) $('w-zeit').textContent = w.zeitraum;
    if (w.thema) $('w-thema').textContent = w.thema;
    (w.punkte || []).forEach(function (p) { $('w-punkte').appendChild(h('li', null, p)); });
  }

  /* Termine */
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var events = (D.termine || [])
    .map(function (t) { return { t: t, d: new Date(t.datum + 'T00:00:00') }; })
    .filter(function (x) { return !isNaN(x.d) && x.d >= today; })
    .sort(function (a, b) { return a.d - b.d; })
    .slice(0, 5);

  var evList = $('termine');
  if (!events.length) {
    evList.appendChild(h('li', 'muted', 'Aktuell sind keine Termine eingetragen.'));
  }
  events.forEach(function (x) {
    var li = h('li', 'event');
    var box = h('div', 'date');
    box.appendChild(h('strong', null, String(x.d.getDate())));
    box.appendChild(h('span', null, x.d.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '')));
    var info = h('div');
    info.appendChild(h('b', null, x.t.titel));
    var meta = [x.d.toLocaleDateString('de-DE', { weekday: 'long' }), x.t.zeit, x.t.ort].filter(Boolean).join(', ');
    info.appendChild(h('span', 'muted', meta));
    li.appendChild(box);
    li.appendChild(info);
    evList.appendChild(li);
  });

  /* Team */
  var team = D.team || [];
  var grid = $('team-grid');
  var filter = $('filter');
  var current = 'alle';

  $('team-count').textContent = team.length + ' Schülerinnen und Schüler arbeiten zurzeit bei uns mit.';

  function renderTeam() {
    grid.replaceChildren();
    team.filter(function (m) { return current === 'alle' || m.projekt === current; }).forEach(function (m) {
      var c = h('article', 'card member');
      c.appendChild(h('div', 'avatar', m.name.charAt(0)));
      var b = h('div');
      var top = h('div');
      top.appendChild(h('b', null, m.name));
      top.appendChild(h('span', 'klasse', m.klasse));
      b.appendChild(top);
      if (m.aufgabe) b.appendChild(h('p', 'task', m.aufgabe));
      b.appendChild(h('span', 'tag', PROJ[m.projekt] || m.projekt));
      c.appendChild(b);
      grid.appendChild(c);
    });
  }

  [['alle', 'Alle']].concat(Object.keys(PROJ).map(function (k) { return [k, PROJ[k]]; })).forEach(function (p) {
    var btn = h('button', 'chip', p[1]);
    btn.type = 'button';
    btn.setAttribute('aria-pressed', String(p[0] === current));
    btn.addEventListener('click', function () {
      current = p[0];
      Array.prototype.forEach.call(filter.children, function (c) { c.setAttribute('aria-pressed', String(c === btn)); });
      renderTeam();
    });
    filter.appendChild(btn);
  });
  renderTeam();

  /* To-Dos */
  var board = $('board');
  [['offen', 'Offen'], ['arbeit', 'In Arbeit'], ['erledigt', 'Erledigt']].forEach(function (c) {
    var items = (D.todos || []).filter(function (t) { return t.status === c[0]; });
    var col = h('div', 'col');
    var head = h('h3', null, c[1]);
    head.appendChild(h('span', 'count', String(items.length)));
    col.appendChild(head);
    items.forEach(function (t) {
      var it = h('div', 'todo ' + c[0]);
      it.appendChild(h('span', null, t.text));
      it.appendChild(h('span', 'tag', PROJ[t.projekt] || t.projekt));
      col.appendChild(it);
    });
    if (!items.length) col.appendChild(h('p', 'muted', 'Hier ist gerade nichts.'));
    board.appendChild(col);
  });

  /* Footer */
  $('year').textContent = new Date().getFullYear();
})();
