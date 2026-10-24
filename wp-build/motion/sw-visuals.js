/*
 * Smartwatch Solutions visuals: framework-free ports of the React site's decorative components,
 * for the WordPress / Elementor rebuild. Everything is keyed by CSS class (free Elementor cannot add
 * data attributes) and mounts itself on DOMContentLoaded; window.SWVisuals.mount(root) re-runs it.
 *
 *   .sw-viz-pipeline | .sw-viz-telemetry | .sw-viz-events | .sw-viz-integrations | .sw-viz-sensors
 *                          the five bento visuals (agent-bento-grid.tsx), stage included
 *   .sw-viz-dataops        the data-ops flow (DataOpsFlow.tsx)
 *   .sw-pixel-field        animated block-field backdrop (pixel-field.tsx)
 *   .sw-typing             typing effect on the text Elementor rendered (typing-text.tsx)
 *   .sw-highlight-grid     gliding highlight behind the active cell / tab (highlight-grid.tsx)
 *   .sw-cursor-card-host   hover preview cards for a.hero-word links (cursor-card.tsx)
 *
 * The bento and data-ops visuals carry their own decorative demo copy, as the React components do.
 * Typed text and cursor-card content come only from the DOM.
 */
(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function prefersReducedMotion() { return !!(mql && mql.matches); }

  /* ── Helpers ─────────────────────────────────────────── */

  function h(tag, cls, parent) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (parent) parent.appendChild(el);
    return el;
  }
  function svg(tag, attrs, parent) {
    var el = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function qsa(root, sel) {
    var out = [];
    if (root.matches && root.matches(sel)) out.push(root);
    each(root.querySelectorAll(sel), function (el) { out.push(el); });
    return out;
  }
  /** Where a visual goes: the boxed container's .e-con-inner when it has one, else the element. */
  function target(el) {
    for (var i = 0; i < el.children.length; i++) if (el.children[i].classList.contains('e-con-inner')) return el.children[i];
    return el;
  }

  /** Calls cb(true/false) as the element enters / leaves the screen (80px margin, like the originals). */
  function watchInView(el, cb) {
    if (typeof IntersectionObserver === 'undefined') { cb(true); return; }
    var io = new IntersectionObserver(function (entries) { cb(entries[entries.length - 1].isIntersecting); }, { rootMargin: '80px' });
    io.observe(el);
  }

  /** useTicker: counts 0…length-1 every `ms` while running; never ticks under reduced motion. */
  function ticker(length, ms, onTick) {
    var tick = 0, timer = null;
    return {
      get: function () { return tick; },
      run: function (running) {
        if (running && !timer && !prefersReducedMotion()) {
          timer = setInterval(function () { tick = (tick + 1) % length; onTick(tick); }, ms);
        } else if (!running && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
    };
  }

  /* ── Line icons (24px grid, stroke only) ───────────────── */

  var GLYPHS = {
    device: '<rect x="6" y="3" width="12" height="18" rx="3"/><path d="M10 7.5h4M12 17h.01"/>',
    cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.6a5 5 0 0 1-.5 9.9z"/>',
    database: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
    plug: '<path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0zM12 17v4"/>',
    pin: '<path d="M12 21.5s-6.5-5.6-6.5-11.5a6.5 6.5 0 0 1 13 0c0 5.9-6.5 11.5-6.5 11.5z"/><circle cx="12" cy="10" r="2.5"/>',
    engine: '<path d="M4 10v5M4 12.5h2M6 8.5h3V7h5v1.5h2.5l2 2H20v5h-1.5l-2 2H9l-3-3z"/>',
    thermo: '<path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z"/><path d="M12 9v6.5"/>',
    fuel: '<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M4 21h12M5 10h10M15 8l3 2.5V17a1.5 1.5 0 0 0 3 0V9l-3-3"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    spinner: '<path d="M12 3a9 9 0 1 1-9 9"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    minus: '<path d="M6 12h12"/>',
    ledger: '<path d="M6 3h12v18H6zM9.5 7.5h5M9.5 11h5M9.5 14.5h3"/>',
    card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14.5h4"/>',
    shield: '<path d="M12 3l8 3.5v5.5c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6.5z"/>',
    chat: '<path d="M4 5h16v10H9l-5 4z"/>',
  };

  function glyph(name, extra) {
    var wrap = document.createElement('span');
    wrap.innerHTML =
      '<svg class="sw-b-glyph' + (extra ? ' ' + extra : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + GLYPHS[name] + '</svg>';
    return wrap.firstChild;
  }

  /** The bento card's stage: the bordered, tinted box each visual sits in. */
  function stage(el, kind) {
    var st = h('div', 'sw-bento sw-b-stage sw-b-stage--' + kind);
    st.setAttribute('aria-hidden', 'true');
    target(el).appendChild(st);
    return st;
  }

  /* ── 1 · Device-to-cloud pipeline ─────────────────────── */

  var P_STEPS = ['device', 'gateway', 'platform', 'data', 'api', 'command'];
  var P_NODES = [
    { id: 'device', x: 50, y: 120, glyph: 'device', label: 'DEVICE', tone: 'deep' },
    { id: 'gateway', x: 125, y: 120, tone: 'amber' },
    { id: 'platform', x: 200, y: 120, glyph: 'cloud', label: 'CLOUD', tone: 'green' },
    { id: 'data', x: 280, y: 50, glyph: 'database', label: 'DATA', tone: 'sky' },
    { id: 'api', x: 280, y: 190, glyph: 'plug', label: 'API', tone: 'mint' },
  ];
  var P_WIRES = ['M 78 120 L 113 120', 'M 137 120 L 172 120', 'M 200 92 L 200 50 L 252 50', 'M 200 148 L 200 190 L 252 190'];
  var P_FLOWS = [
    { d: 'M 78 120 L 113 120', steps: ['device'], tone: 'deep' },
    { d: 'M 137 120 L 172 120', steps: ['platform'], tone: 'green' },
    { d: 'M 200 92 L 200 50 L 252 50', steps: ['data'], tone: 'sky' },
    { d: 'M 200 148 L 200 190 L 252 190', steps: ['api'], tone: 'mint' },
    { d: 'M 172 120 L 137 120', steps: ['command'], tone: 'deep' },
    { d: 'M 113 120 L 78 120', steps: ['command'], tone: 'deep' },
  ];
  var P_LIT = {
    device: ['device'], gateway: ['gateway'], platform: ['platform'],
    data: ['platform', 'data'], api: ['platform', 'api'], command: ['platform', 'gateway', 'device'],
  };

  function mountPipeline(el) {
    var st = stage(el, 'pipeline');
    var root = h('div', 'sw-b-pipeline', st);
    var s = svg('svg', { class: 'sw-b-pipelineSvg', viewBox: '12 14 304 212', preserveAspectRatio: 'xMidYMid meet' }, root);
    P_WIRES.forEach(function (d) { svg('path', { d: d, class: 'sw-b-wire' }, s); });
    var flows = svg('g', null, s);
    var nodeEls = {};
    P_NODES.forEach(function (n) {
      var box = !!n.glyph, size = box ? 56 : 24;
      var fo = svg('foreignObject', { x: n.x - size / 2, y: n.y - size / 2, width: size, height: size, class: 'sw-b-fo' }, s);
      var div;
      if (box) {
        div = h('div', 'sw-b-node sw-t-' + n.tone, fo);
        div.appendChild(glyph(n.glyph));
        h('span', null, div).textContent = n.label;
      } else {
        div = h('div', 'sw-b-router', fo);
        h('div', 'sw-b-routerSpin', div);
      }
      nodeEls[n.id] = { el: div, box: box };
    });
    function render(t) {
      var step = P_STEPS[t];
      root.setAttribute('data-step', step);
      // Every flow that lights up is drawn afresh, so its draw restarts (React keys them by step).
      while (flows.firstChild) flows.removeChild(flows.firstChild);
      P_FLOWS.forEach(function (f) {
        if (f.steps.indexOf(step) < 0) return;
        var g = svg('g', { class: 'sw-t-' + f.tone }, flows);
        svg('path', { d: f.d, pathLength: 1, class: 'sw-b-flowGlow' }, g);
        svg('path', { d: f.d, pathLength: 1, class: 'sw-b-flow' }, g);
      });
      P_NODES.forEach(function (n) {
        var lit = P_LIT[step].indexOf(n.id) >= 0, ne = nodeEls[n.id];
        ne.el.classList.toggle(ne.box ? 'sw-b-nodeLit' : 'sw-b-routerLit', lit);
      });
    }
    var tk = ticker(P_STEPS.length, 2000, render);
    render(0);
    watchInView(st, tk.run);
  }

  /* ── 2 · Telemetry volume ──────────────────────────────── */

  var METRICS = [
    { label: 'Messages/min', value: '18.6k', trend: '+6%', spark: 'M 0 18 L 16 11 L 32 14 L 48 4' },
    { label: 'Avg ingest', value: '240ms', trend: '-4%', spark: 'M 0 4 L 16 12 L 32 8 L 48 18' },
  ];
  var BARS = [48, 72, 58, 86, 64, 40, 34];
  var DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  function sparkPoints(d) {
    var n = d.replace(/[ML]/g, '').trim().split(/\s+/), pts = [];
    for (var i = 0; i < n.length; i += 2) pts.push([Number(n[i]), Number(n[i + 1])]);
    return pts;
  }

  function mountTelemetry(el) {
    var st = stage(el, 'telemetry');
    var root = h('div', 'sw-b-telemetry', st);
    var metrics = h('div', 'sw-b-metrics', root);
    var faces = [], cycled = 0, hovered = null;
    function paint() {
      var on = hovered === null ? cycled : hovered;
      faces.forEach(function (f, i) { f.classList.toggle('sw-b-metricLift', on === i); });
    }
    METRICS.forEach(function (m, i) {
      var box = h('div', 'sw-b-metric', metrics);
      h('div', 'sw-b-hatch', box);
      var face = h('div', 'sw-b-metricFace', box);
      faces.push(face);
      face.addEventListener('mouseenter', function () { hovered = i; paint(); });
      face.addEventListener('mouseleave', function () { hovered = null; paint(); });
      var copy = h('div', 'sw-b-metricCopy', face);
      h('span', 'sw-b-micro', copy).textContent = m.label;
      h('span', 'sw-b-metricValue', copy).textContent = m.value;
      var trend = h('span', 'sw-b-metricTrend', copy);
      var b = h('b', m.trend.charAt(0) === '+' ? 'sw-b-up' : 'sw-b-down', trend);
      b.textContent = m.trend;
      trend.appendChild(document.createTextNode(' vs last week'));
      var sp = svg('svg', { class: 'sw-b-spark', viewBox: '0 0 48 24' }, face);
      svg('path', { d: m.spark, pathLength: 1, class: 'sw-b-sparkLine' }, sp);
      sparkPoints(m.spark).forEach(function (p, idx) {
        var c = svg('circle', { cx: p[0], cy: p[1], r: '1.6', class: 'sw-b-sparkDot' }, sp);
        c.style.animationDelay = (0.5 + idx * 0.08) + 's';
      });
    });
    var bars = h('div', 'sw-b-bars', root);
    BARS.forEach(function (v, i) {
      var track = h('div', 'sw-b-barTrack sw-b-hatchBg', bars);
      var fill = h('div', 'sw-b-barFill', track);
      fill.style.setProperty('--h', v + '%');
      fill.style.setProperty('--hi', Math.min(95, v + 15) + '%');
      fill.style.setProperty('--lo', Math.max(12, v - 20) + '%');
      fill.style.animationDuration = (3 + (i % 3) * 0.8) + 's';
      fill.style.animationDelay = (i * 0.1) + 's';
    });
    var days = h('div', 'sw-b-days', root);
    DAYS.forEach(function (d) { h('span', null, days).textContent = d; });
    var tk = ticker(2, 3000, function (t) { cycled = t; paint(); });
    paint();
    watchInView(st, tk.run);
  }

  /* ── 3 · Device event stream ──────────────────────────── */

  var STATUS = {
    synced: { glyph: 'check', tone: 'sw-st-green' },
    live: { glyph: 'spinner', tone: 'sw-st-sky' },
    queued: { glyph: 'clock', tone: 'sw-st-amber' },
    idle: { glyph: 'minus', tone: 'sw-st-grey' },
  };
  var EVENTS = [
    { source: 'Tracker 0412', event: 'Ignition on, leaving Kampala depot', status: 'synced', t: '0.3s' },
    { source: 'Dashcam 88', event: 'Harsh-braking clip uploaded', status: 'synced', t: '1.8s' },
    { source: 'Fuel sensor', event: 'Tank level streaming from CAN bus', status: 'live', t: '2.6s' },
    { source: 'Reefer probe', event: 'Holding 4.1 \u00b0C, next reading queued', status: 'queued', t: '\u2014' },
    { source: 'Trailer tag', event: 'Parked, reporting every 6 hours', status: 'idle', t: '\u2014' },
  ];
  var STACK_Y = { '-2': -68, '-1': -38, '0': 0, '1': 38, '2': 68 };

  function mountEvents(el) {
    var st = stage(el, 'events');
    var root = h('div', 'sw-b-stream', st);
    var half = Math.floor(EVENTS.length / 2);
    var rows = EVENTS.map(function (e) {
      var row = h('div', 'sw-b-row', root);
      var card = h('div', 'sw-b-rowCard', row);
      var s = STATUS[e.status];
      var badge = h('span', 'sw-b-badge ' + s.tone, card);
      badge.appendChild(glyph(s.glyph, e.status === 'live' ? 'sw-b-spin' : ''));
      var text = h('div', 'sw-b-rowText', card);
      var head = h('div', 'sw-b-rowHead', text);
      h('span', 'sw-b-rowSource', head).textContent = e.source;
      h('span', 'sw-b-pill ' + s.tone, head).textContent = e.status;
      var ev = document.createElement('p');
      ev.className = 'sw-b-rowEvent';
      ev.textContent = e.event;
      var time = document.createElement('span');
      time.className = 'sw-b-rowTime';
      time.textContent = e.t;
      return { row: row, card: card, badge: badge, text: text, ev: ev, time: time };
    });
    var dotsBox = h('div', 'sw-b-dots', root);
    var dots = EVENTS.map(function () { return h('span', 'sw-b-dot', dotsBox); });
    function render(active) {
      rows.forEach(function (r, i) {
        // Signed slot: 0 is the front row, negative rows are upcoming, positive ones are past.
        var slot = i - active;
        if (slot > half) slot -= EVENTS.length;
        if (slot < -half) slot += EVENTS.length;
        var abs = Math.abs(slot), front = slot === 0;
        var y = STACK_Y[String(slot)];
        if (y === undefined) y = slot < 0 ? -150 : 150;
        r.row.style.zIndex = 30 - abs * 10;
        r.row.style.opacity = front ? 1 : abs === 1 ? 0.65 : 0.38;
        r.row.style.transform = 'translateY(' + y + 'px) scale(' + (front ? 1 : abs === 1 ? 0.93 : 0.87) + ')';
        r.card.classList.toggle('sw-b-rowFront', front);
        r.badge.classList.toggle('sw-b-badgeFront', front);
        if (front) {
          if (!r.ev.parentNode) r.text.appendChild(r.ev);
          if (!r.time.parentNode) r.card.appendChild(r.time);
        } else {
          if (r.ev.parentNode) r.ev.parentNode.removeChild(r.ev);
          if (r.time.parentNode) r.time.parentNode.removeChild(r.time);
        }
      });
      dots.forEach(function (d, i) { d.classList.toggle('sw-b-dotOn', i === active); });
    }
    var tk = ticker(EVENTS.length, 2400, render);
    render(0);
    watchInView(st, tk.run);
  }

  /* ── 4 · Integrations ─────────────────────────────────── */

  var CHANNELS = [
    { name: 'erp', label: 'ERP', glyph: 'ledger', tone: 'green', events: 342, fill: 88 },
    { name: 'fuel', label: 'Fuel cards', glyph: 'card', tone: 'sky', events: 218, fill: 56 },
    { name: 'insurer', label: 'Insurer', glyph: 'shield', tone: 'deep', events: 97, fill: 25 },
    { name: 'alerts', label: 'SMS & email', glyph: 'chat', tone: 'amber', events: 54, fill: 14 },
  ];
  var SYNC_LOG = [
    { ch: 'erp', line: 'Trip costs posted to ledger', t: '0.2s' },
    { ch: 'fuel', line: 'Card fill-ups matched to trips', t: '1.1s' },
    { ch: 'erp', line: 'Work orders synced from maintenance', t: '2.4s' },
    { ch: 'insurer', line: 'Driver scores shared for renewal', t: '4.0s' },
    { ch: 'alerts', line: 'Geofence exit sent to dispatcher', t: '5.8s' },
    { ch: 'fuel', line: 'Siphoning alert raised on KBX 212', t: '7.2s' },
  ];

  function mountIntegrations(el) {
    var st = stage(el, 'integrations');
    var root = h('div', 'sw-b-integrations', st);
    var chBox = h('div', 'sw-b-channels', root);
    h('p', 'sw-b-micro', chBox).textContent = 'Connected systems';
    var list = h('div', 'sw-b-channelList', chBox);
    var chEls = CHANNELS.map(function (c, i) {
      var row = h('div', 'sw-b-channel', list);
      var icon = h('span', 'sw-b-chIcon sw-t-' + c.tone, row);
      icon.appendChild(glyph(c.glyph));
      h('span', 'sw-b-chName', row).textContent = c.label;
      var track = h('span', 'sw-b-chTrack', row);
      var fill = h('span', 'sw-b-chFill sw-t-' + c.tone, track);
      fill.style.setProperty('--w', c.fill + '%');
      fill.style.animationDelay = (i * 0.1) + 's';
      var count = h('span', 'sw-b-chCount', row);
      count.appendChild(document.createTextNode(String(c.events)));
      return { c: c, row: row, fill: fill, count: count, scan: null, ping: null };
    });
    var live = h('div', 'sw-b-live', chBox);
    h('span', 'sw-b-liveDot', live);
    live.appendChild(document.createTextNode('Two-way sync active'));
    h('div', 'sw-b-divider', root);
    var log = h('div', 'sw-b-log', root);
    h('p', 'sw-b-micro', log).textContent = 'Sync log';
    var logList = h('div', 'sw-b-logList', log);
    function chOf(name) { for (var i = 0; i < CHANNELS.length; i++) if (CHANNELS[i].name === name) return CHANNELS[i]; }
    function render(tick) {
      var activeCh = SYNC_LOG[tick].ch;
      chEls.forEach(function (x) {
        var on = x.c.name === activeCh;
        x.row.classList.toggle('sw-b-channelOn', on);
        // The scan and the ping mount with the channel's turn and unmount after it, as in React.
        if (on && !x.scan) {
          x.scan = h('span', 'sw-b-scan', x.fill);
          x.ping = h('span', 'sw-b-ping sw-t-' + x.c.tone, x.count);
        } else if (!on && x.scan) {
          x.fill.removeChild(x.scan);
          x.count.removeChild(x.ping);
          x.scan = x.ping = null;
        }
      });
      // Every row is drawn afresh each tick (React keys them by tick), so each drops in again.
      while (logList.firstChild) logList.removeChild(logList.firstChild);
      [0, 1, 2, 3].forEach(function (o) {
        var q = SYNC_LOG[(tick - o + SYNC_LOG.length) % SYNC_LOG.length];
        var ch = chOf(q.ch);
        var row = h('div', 'sw-b-logRow', logList);
        row.style.opacity = [1, 0.8, 0.5, 0.25][o];
        var head = h('div', 'sw-b-logHead', row);
        h('span', 'sw-b-logTag sw-t-' + ch.tone, head).textContent = ch.label;
        h('span', 'sw-b-logTime', head).textContent = q.t;
        h('p', 'sw-b-logLine', row).textContent = q.line;
      });
    }
    var tk = ticker(SYNC_LOG.length, 2000, render);
    render(0);
    watchInView(st, tk.run);
  }

  /* ── 5 · IoT sensors ──────────────────────────────────── */

  var SENSORS = [
    { name: 'GPS', glyph: 'pin', tone: 'green', rate: 60, unit: 'every 1s' },
    { name: 'CAN bus', glyph: 'engine', tone: 'deep', rate: 42, unit: 'engine data' },
    { name: 'Temperature', glyph: 'thermo', tone: 'sky', rate: 12, unit: '\u00b10.5 \u00b0C' },
    { name: 'Fuel level', glyph: 'fuel', tone: 'amber', rate: 30, unit: '0.1 L steps' },
  ];

  function mountSensors(el) {
    var st = stage(el, 'sensors');
    var root = h('div', 'sw-b-sensors', st);
    var max = Math.max.apply(null, SENSORS.map(function (x) { return x.rate; }));
    SENSORS.forEach(function (t, i) {
      var card = h('div', 'sw-b-sensor', root);
      card.style.animationDelay = (i * 0.1) + 's';
      var top = h('div', 'sw-b-sensorTop', card);
      var icon = h('span', 'sw-b-chIcon sw-b-sensorIcon sw-t-' + t.tone, top);
      icon.appendChild(glyph(t.glyph));
      var rate = h('span', 'sw-b-sensorRate', top);
      h('b', null, rate).textContent = String(t.rate);
      h('span', 'sw-b-micro', rate).textContent = 'per min';
      var foot = h('div', 'sw-b-sensorFoot', card);
      var head = h('div', 'sw-b-sensorHead', foot);
      h('span', 'sw-b-sensorName', head).textContent = t.name;
      h('span', 'sw-b-sensorUnit', head).textContent = t.unit;
      var track = h('span', 'sw-b-chTrack', foot);
      var fill = h('span', 'sw-b-chFill sw-t-' + t.tone, track);
      fill.style.setProperty('--w', (t.rate / max) * 100 + '%');
      fill.style.animationDelay = (0.4 + i * 0.1) + 's';
    });
  }

  /* ── Data-ops flow ────────────────────────────────────── */

  var D_NODES = [
    { id: 'source', name: 'Data Source', kind: 'Input',
      glyph: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>' },
    { id: 'init', name: 'Init Attribute', kind: 'Compute',
      glyph: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>' },
    { id: 'branch', name: 'IF / THEN', kind: 'Branch',
      glyph: '<circle cx="6" cy="5" r="2.5"/><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 7.5v9M18 11.5c0 3-2.5 4.5-6 4.5H9"/>' },
    { id: 'action', name: 'Action', kind: 'Command', glyph: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>' },
    { id: 'output', name: 'Output', kind: 'Stream', glyph: '<path d="M3 7h12M3 12h13M3 17h12"/><path d="m18 9 4 3-4 3"/>' },
  ];
  var D_STEPS = [
    { lit: 'source', pass: 'true' },
    { lit: 'init', wire: 'w1', pass: 'true' },
    { lit: 'branch', wire: 'w2', pass: 'true' },
    { lit: 'action', wire: 'w3', pass: 'true' },
    { lit: 'output', wire: 'w4', pass: 'true' },
    { lit: 'source', pass: 'false' },
    { lit: 'init', wire: 'w1', pass: 'false' },
    { lit: 'branch', wire: 'w2', pass: 'false' },
    { lit: 'output', wire: 'w5', pass: 'false' },
  ];
  var READOUT = {
    'true': 'UBH 412K \u00b7 speed 84 km/h \u00b7 over the 80 limit \u2192 buzzer + alert sent',
    'false': 'UBH 412K \u00b7 speed 62 km/h \u00b7 within limit \u2192 logged',
  };
  var WIDE = {
    viewBox: '0 0 600 290',
    node: { w: 94, h: 84 },
    centers: { source: [70, 176], init: [185, 176], branch: [300, 176], action: [415, 176], output: [530, 176] },
    wires: { w1: 'M 117 176 L 138 176', w2: 'M 232 176 L 253 176', w3: 'M 347 176 L 368 176', w4: 'M 462 176 L 483 176',
      w5: 'M 300 134 C 300 64, 530 64, 530 134' },
    labels: [{ text: 'true', x: 357, y: 198, anchor: 'middle' }, { text: 'false', x: 415, y: 74, anchor: 'middle' }],
  };
  var TALL = {
    viewBox: '0 0 300 560',
    node: { w: 196, h: 64 },
    centers: { source: [128, 40], init: [128, 156], branch: [128, 272], action: [128, 388], output: [128, 504] },
    wires: { w1: 'M 128 72 L 128 124', w2: 'M 128 188 L 128 240', w3: 'M 128 304 L 128 356', w4: 'M 128 420 L 128 472',
      w5: 'M 226 272 C 296 272, 296 504, 226 504' },
    labels: [{ text: 'true', x: 140, y: 334, anchor: 'start' }, { text: 'false', x: 262, y: 392, anchor: 'start' }],
  };
  var WIRE_IDS = ['w1', 'w2', 'w3', 'w4', 'w5'];

  function mountDataOps(el) {
    var panel = h('div', 'sw-dataops');
    panel.setAttribute('aria-hidden', 'true');
    target(el).appendChild(panel);
    var tallMq = window.matchMedia ? window.matchMedia('(max-width: 640px)') : null;
    var tick = 0, lastReadoutKey = null, readout = null, parts = null;

    function build() {
      var tall = !!(tallMq && tallMq.matches), L = tall ? TALL : WIDE;
      panel.classList.toggle('sw-d-tall', tall);
      while (panel.firstChild) panel.removeChild(panel.firstChild);
      lastReadoutKey = null;
      var s = svg('svg', { class: 'sw-d-svg', viewBox: L.viewBox, preserveAspectRatio: 'xMidYMid meet' }, panel);
      WIRE_IDS.forEach(function (id) { svg('path', { d: L.wires[id], class: 'sw-d-wire' + (id === 'w5' ? ' sw-d-wireDashed' : '') }, s); });
      var flow = svg('g', null, s);
      var labels = L.labels.map(function (l) {
        var t = svg('text', { x: l.x, y: l.y, 'text-anchor': l.anchor, class: 'sw-d-label' }, s);
        t.textContent = l.text;
        return { text: l.text, el: t };
      });
      var nodes = {};
      D_NODES.forEach(function (n) {
        var c = L.centers[n.id], w = L.node.w, hh = L.node.h;
        var fo = svg('foreignObject', { x: c[0] - w / 2, y: c[1] - hh / 2, width: w, height: hh, class: 'sw-d-fo' }, s);
        var div = h('div', 'sw-d-node', fo);
        var wrap = document.createElement('span');
        wrap.innerHTML = '<svg class="sw-d-glyph" viewBox="0 0 24 24">' + n.glyph + '</svg>';
        div.appendChild(wrap.firstChild);
        h('span', 'sw-d-name', div).textContent = n.name;
        h('span', 'sw-d-kind', div).textContent = n.kind;
        nodes[n.id] = div;
      });
      parts = { L: L, flow: flow, labels: labels, nodes: nodes };
      render(tick);
    }

    function render(t) {
      tick = t;
      var still = prefersReducedMotion(), step = D_STEPS[t], L = parts.L;
      // Without motion the whole "true" pass is shown lit, so the flow still reads as one.
      D_NODES.forEach(function (n) { parts.nodes[n.id].classList.toggle('sw-d-nodeLit', still || n.id === step.lit); });
      while (parts.flow.firstChild) parts.flow.removeChild(parts.flow.firstChild);
      if (!still && step.wire) {
        svg('path', { d: L.wires[step.wire], pathLength: 1, class: 'sw-d-flowGlow' }, parts.flow);
        svg('path', { d: L.wires[step.wire], pathLength: 1, class: 'sw-d-flow' }, parts.flow);
      }
      parts.labels.forEach(function (l) {
        var on = still ? l.text === 'true' : step.pass === l.text && step.lit !== 'source';
        l.el.classList.toggle('sw-d-labelOn', on);
      });
      // The readout is re-created when the pass changes (React keys it), so it fades in again.
      var key = still ? 'still' : step.pass;
      if (key !== lastReadoutKey) {
        lastReadoutKey = key;
        if (readout && readout.parentNode) readout.parentNode.removeChild(readout);
        readout = h('div', 'sw-d-readout', panel);
        var dot = h('span', 'sw-d-readoutDot', readout);
        if (still || step.pass === 'true') dot.classList.add('sw-d-readoutDotOn');
        h('span', null, readout).textContent = READOUT[still ? 'true' : step.pass];
      }
    }

    var tk = ticker(D_STEPS.length, 1300, render);
    build();
    if (tallMq) {
      var onMq = function () { build(); };
      if (tallMq.addEventListener) tallMq.addEventListener('change', onMq);
      else if (tallMq.addListener) tallMq.addListener(onMq);
    }
    watchInView(panel, tk.run);
  }

  /* ── Pixel field ──────────────────────────────────────── */

  var CW = 8, CH = 12, CELL_W = 12, CELL_H = 18;
  var MASKS = [0, 1, 2, 3].map(function (level) {
    var m = new Uint8Array(CW * CH);
    for (var y = 0; y < CH; y++)
      for (var x = 0; x < CW - 1; x++) {
        var on;
        if (level === 0) on = true;
        else if (level === 1) on = !(x % 2 === 0 && y % 2 === 1);
        else if (level === 2) on = (x + y) % 2 === 0;
        else on = x % 2 === 0 && y % 2 === 0;
        m[y * CW + x] = on ? 1 : 0;
      }
    return m;
  });

  function oklchToRgb(L, C, hDeg) {
    var hr = (hDeg * Math.PI) / 180, a = C * Math.cos(hr), b = C * Math.sin(hr);
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.291485548 * b;
    var l = l_ * l_ * l_, m = m_ * m_ * m_, s2 = s_ * s_ * s_;
    var lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s2,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s2,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s2,
    ];
    return lin.map(function (v) {
      var c = Math.min(1, Math.max(0, v));
      var g = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
      return Math.round(g * 255);
    });
  }

  /** Optional overrides from CSS: --sw-pf-hue, --sw-pf-speed, --sw-pf-intensity, --sw-pf-grid (0/1). */
  function cssNum(el, name, fallback) {
    var v = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  }

  function mountPixelField(el) {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.classList.add('sw-pf-host');
    var cfg = {
      hue: cssNum(el, '--sw-pf-hue', 170),
      speed: cssNum(el, '--sw-pf-speed', 0.6),
      intensity: cssNum(el, '--sw-pf-intensity', 0.65),
      grid: cssNum(el, '--sw-pf-grid', 1) !== 0,
    };
    var root = h('div', 'sw-pf');
    root.setAttribute('aria-hidden', 'true');
    if (cfg.grid) h('div', 'sw-pf-grid', root);
    var canvas = h('canvas', 'sw-pf-canvas', root);
    canvas.style.opacity = cfg.intensity;
    el.insertBefore(root, el.firstChild);

    var ctx = null;
    try { ctx = canvas.getContext('2d'); } catch (e) { ctx = null; }
    if (!ctx || typeof ImageData === 'undefined') return;
    var COLS = 120, ROWS = 40, W = COLS * CW, H = ROWS * CH;
    var img = ctx.createImageData(W, H), px = img.data;
    function fit() {
      var cols = Math.max(8, Math.round(canvas.clientWidth / CELL_W));
      var rows = Math.max(4, Math.round(canvas.clientHeight / CELL_H));
      if (cols === COLS && rows === ROWS && canvas.width === W) return;
      COLS = cols; ROWS = rows; W = COLS * CW; H = ROWS * CH;
      canvas.width = W; canvas.height = H;
      img = ctx.createImageData(W, H);
      px = img.data;
    }
    fit();
    var n = 0, raf = 0, visible = true, last = performance.now();
    function draw() {
      px.fill(0);
      var base = cfg.hue;
      for (var e = 0; e < ROWS; e++)
        for (var t = 0; t < COLS; t++) {
          var v = ((Math.sin(0.08 * t + n) * Math.cos(0.12 * e + 0.5 * n) +
            Math.sin(0.05 * t - 0.7 * n) * Math.sin(0.08 * e + 0.3 * n) +
            Math.cos(0.03 * t + 0.03 * e + 0.4 * n)) / 3 + 1) / 2;
          var idx = Math.floor(v * 4);
          if (idx >= 4) continue;
          var rgb = oklchToRgb(0.5 + 0.3 * v, 0.15, base + 30 * v);
          var alpha = Math.round((0.3 + 0.7 * v) * 255);
          var mask = MASKS[idx], ox = t * CW, oy = e * CH;
          for (var y = 0; y < CH; y++) {
            var p = ((oy + y) * W + ox) * 4, row = y * CW;
            for (var x = 0; x < CW; x++, p += 4) {
              if (!mask[row + x]) continue;
              px[p] = rgb[0]; px[p + 1] = rgb[1]; px[p + 2] = rgb[2]; px[p + 3] = alpha;
            }
          }
        }
      ctx.putImageData(img, 0, 0);
    }
    // ~0.82 pattern units per second, drawn at ~30 fps, scaled by speed (as the original).
    var RATE = 0.82, STEP = 1000 / 30, acc = 0;
    function frame(now) {
      var dt = Math.min(now - last, 100);
      last = now;
      acc += dt;
      if (acc >= STEP) {
        n += RATE * (acc / 1000) * cfg.speed;
        acc = 0;
        draw();
      }
      raf = requestAnimationFrame(frame);
    }
    // The footer sits pinned under the page for its reveal, so it always "intersects" the viewport.
    // It only animates once the page above has actually scrolled off it.
    var page = el.closest('.sw-footer') ? (document.getElementById('content') || document.querySelector('.site-content')) : null;
    var uncovered = function () { return !page || page.getBoundingClientRect().bottom < window.innerHeight - 8; };
    var wasUncovered = uncovered();
    if (page) window.addEventListener('scroll', function () {
      var u = uncovered();
      if (u !== wasUncovered) { wasUncovered = u; start(); }
    }, { passive: true });
    function start() {
      cancelAnimationFrame(raf);
      if (!visible || document.hidden || !uncovered()) { return; }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    draw();
    start();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(function () { fit(); draw(); }).observe(canvas);
    if (typeof IntersectionObserver !== 'undefined') {
      new IntersectionObserver(function (entries) { visible = entries[entries.length - 1].isIntersecting; start(); }).observe(canvas);
    }
    document.addEventListener('visibilitychange', start);
  }

  /* ── Typing text ──────────────────────────────────────── */

  /**
   * Reads the rendered text into segments: each run of characters with the chain of inline
   * elements (a <strong>, a span.sw-typing-hi …) it sits in, so highlighted words keep their
   * styling as they are typed. <br> becomes a newline; whitespace collapses as HTML renders it.
   */
  function readSegments(src) {
    var segs = [];
    function walk(node, chain) {
      each(node.childNodes, function (c) {
        if (c.nodeType === 3) {
          var t = c.nodeValue.replace(/[ \t\n\r\f]+/g, ' ');
          if (t) segs.push({ text: t, chain: chain });
        } else if (c.nodeType === 1) {
          if (c.tagName === 'BR') segs.push({ text: '\n', chain: chain });
          else if (!/^(SCRIPT|STYLE|TEMPLATE)$/.test(c.tagName)) walk(c, chain.concat([c]));
        }
      });
    }
    walk(src, []);
    // Trim, and drop the spaces either side of a line break.
    var whole = segs.map(function (s) { return s.text; }).join('');
    var out = [], pos = 0, prevCh = '\n';
    segs.forEach(function (s) {
      var t = '';
      for (var i = 0; i < s.text.length; i++, pos++) {
        var ch = s.text.charAt(i);
        if (ch === ' ') {
          var next = whole.charAt(pos + 1);
          if (prevCh === '\n' || prevCh === ' ' || next === '\n' || next === '') continue;
        }
        t += ch;
        prevCh = ch;
      }
      if (t) out.push({ text: t, chain: s.chain });
    });
    // Collapse leading/trailing newlines.
    while (out.length && /^\n+$/.test(out[0].text)) out.shift();
    while (out.length && /^\n+$/.test(out[out.length - 1].text)) out.pop();
    return out;
  }

  function cloneChain(chain) {
    var top = null, cur = null;
    chain.forEach(function (el) {
      var c = el.cloneNode(false);
      c.removeAttribute('id');
      if (!top) top = c; else cur.appendChild(c);
      cur = c;
    });
    return { top: top, inner: cur };
  }

  function mountTyping(el) {
    var src = el.querySelector('.elementor-heading-title') || el.querySelector('p') ||
      el.querySelector('.elementor-widget-container') || el;
    if (src.querySelector('.sw-typing-root')) return;
    var segs = readSegments(src);
    if (!segs.length) return;
    var chars = [];
    segs.forEach(function (s, si) { Array.from(s.text).forEach(function (ch) { chars.push(si); }); });
    var full = segs.map(function (s) { return s.text; }).join('');
    var total = chars.length;

    var root = h('span', 'sw-typing-root');
    root.setAttribute('role', 'text');
    root.setAttribute('aria-label', full.replace(/\n/g, ' '));
    var ghost = h('span', 'sw-typing-ghost', root);
    ghost.setAttribute('aria-hidden', 'true');
    var typed = h('span', 'sw-typing-typed', root);
    typed.setAttribute('aria-hidden', 'true');
    // The full line, invisible, with the same styled runs, holds the box at its final size.
    function fill(box, count) {
      while (box.firstChild) box.removeChild(box.firstChild);
      var left = count;
      for (var i = 0; i < segs.length && left > 0; i++) {
        var cps = Array.from(segs[i].text);
        var part = cps.slice(0, left).join('');
        left -= cps.length;
        var tn = document.createTextNode(part);
        if (segs[i].chain.length) {
          var c = cloneChain(segs[i].chain);
          c.inner.appendChild(tn);
          box.appendChild(c.top);
        } else box.appendChild(tn);
      }
    }
    fill(ghost, total);
    var caret = document.createElement('span');
    caret.className = 'sw-typing-caret';
    while (src.firstChild) src.removeChild(src.firstChild);
    src.appendChild(root);

    var speed = 110, hold = 6000, count = 0, erasing = false;
    function paint() { fill(typed, count); typed.appendChild(caret); }
    function step() {
      var delay = erasing ? speed / 2 : speed;
      if (!erasing && count === total) delay = hold;
      if (erasing && count === 0) delay = 600;
      setTimeout(function () {
        if (!erasing && count === total) erasing = true;
        else if (erasing && count === 0) erasing = false;
        else { count += erasing ? -1 : 1; paint(); }
        step();
      }, delay);
    }
    paint();
    // It types for everyone, reduced motion included, as the original does.
    step();
  }

  /* ── Highlight grid (+ the platform tabs' pointer glow) ── */

  function mountHighlightGrid(el) {
    // Elementor nested tabs: the title buttons in the tabs heading (older versions also repeat them
    // inside the content for the mobile accordion; those are skipped). Otherwise .sw-highlight-cell items.
    var cells = el.querySelectorAll('.e-n-tabs-heading > .e-n-tab-title');
    if (!cells.length) cells = el.querySelectorAll('.e-n-tab-title');
    if (!cells.length) cells = el.querySelectorAll('.sw-highlight-cell');
    if (!cells.length) return;
    cells = Array.prototype.slice.call(cells);
    var box = cells[0].parentElement;
    cells = cells.filter(function (c) { return c.parentElement === box; });
    if (box.querySelector(':scope > .sw-hg-highlight')) return;
    box.classList.add('sw-hg-box');
    if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
    cells.forEach(function (c) { c.classList.add('sw-hg-cell'); });
    var hl = document.createElement('div');
    hl.className = 'sw-hg-highlight';
    hl.setAttribute('aria-hidden', 'true');
    box.insertBefore(hl, box.firstChild);
    var followHover = el.classList.contains('sw-hg-hover');

    function activeIndex() {
      for (var i = 0; i < cells.length; i++) {
        var c = cells[i];
        if (c.getAttribute('aria-selected') === 'true' || c.classList.contains('is-active') || c.classList.contains('e-active')) return i;
      }
      return 0;
    }
    var active = activeIndex(), shown = -1;
    function moveTo(i) {
      var cell = cells[i];
      if (!cell) return;
      var r = cell.getBoundingClientRect(), b = box.getBoundingClientRect();
      // Offset by the container's own scroll, so a strip that scrolls sideways on phones stays aligned.
      var x = r.left - b.left + box.scrollLeft - box.clientLeft, y = r.top - b.top + box.scrollTop - box.clientTop;
      hl.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      hl.style.width = r.width + 'px';
      hl.style.height = r.height + 'px';
      shown = i;
    }
    function markOn() { cells.forEach(function (c, j) { c.classList.toggle('sw-hg-on', j === active); }); }
    // First placement without a slide, so the highlight appears in place.
    hl.style.transition = 'none';
    moveTo(active);
    markOn();
    void hl.offsetWidth;
    hl.style.transition = '';

    /** On phones the tabs are one scrolling row: keep the selected one in view. */
    function keepInView(i) {
      var tab = cells[i];
      if (box.scrollWidth <= box.clientWidth || typeof box.scrollTo !== 'function') return;
      var left = tab.getBoundingClientRect().left - box.getBoundingClientRect().left + box.scrollLeft;
      box.scrollTo({ left: left - (box.clientWidth - tab.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
    function sync() {
      var a = activeIndex();
      if (a !== active) {
        active = a;
        markOn();
        moveTo(active);
        keepInView(active);
      }
    }
    if (typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(sync);
      cells.forEach(function (c) { mo.observe(c, { attributes: true, attributeFilter: ['aria-selected', 'class'] }); });
    }
    cells.forEach(function (c, i) {
      c.addEventListener('click', function () { setTimeout(sync, 0); });
      // trackGlow: points the cell's glow at the pointer.
      c.addEventListener('mousemove', function (ev) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ev.clientX - r.left + 'px');
        c.style.setProperty('--my', ev.clientY - r.top + 'px');
      });
      if (followHover) {
        c.addEventListener('mouseenter', function () { moveTo(i); });
        c.addEventListener('mouseleave', function () { moveTo(active); });
      }
    });
    var realign = function () { moveTo(shown < 0 ? active : shown); };
    window.addEventListener('resize', realign);
    window.addEventListener('load', realign);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(realign).observe(box);
  }

  /* ── Cursor card ──────────────────────────────────────── */

  var CARD_WIDTH = 240, OFFSET = 20, EDGE = 12;

  /** gsap.quickTo(el, prop, { duration: 0.35, ease: 'power3.out' }): each call tweens from where it is now. */
  function quickTo(apply, duration) {
    var cur = 0, from = 0, to = 0, t0 = 0, raf = 0;
    function frame(now) {
      var p = duration ? Math.min(1, (now - t0) / duration) : 1;
      var e = 1 - Math.pow(1 - p, 3);
      cur = from + (to - from) * e;
      apply(cur);
      raf = p < 1 ? requestAnimationFrame(frame) : 0;
    }
    return function (value, jump) {
      if (jump !== undefined) {
        cancelAnimationFrame(raf); raf = 0;
        cur = from = to = jump; apply(cur);
        return;
      }
      from = cur; to = value; t0 = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    };
  }

  function mountCursorCards(host) {
    var words = host.querySelectorAll('a.hero-word');
    if (!words.length) return;
    var sources = document.querySelectorAll('.hero-word-card');
    each(sources, function (s) { s.classList.add('sw-cc-source'); });
    var reduce = prefersReducedMotion();

    each(words, function (a, i) {
      if (a.classList.contains('sw-cc-link')) return;
      a.classList.add('sw-cc-link');
      var source = sources[i];
      var card = h('div', 'sw-cc-card', document.body);
      card.setAttribute('aria-hidden', 'true');
      var panel = h('div', 'sw-cc-panel', card);
      var img = source && source.querySelector('img');
      if (img) {
        var im = document.createElement('img');
        im.className = 'sw-cc-image';
        im.src = img.currentSrc || img.src;
        if (img.getAttribute('srcset')) im.setAttribute('srcset', img.getAttribute('srcset'));
        if (img.getAttribute('sizes')) im.setAttribute('sizes', '240px');
        im.alt = '';
        im.decoding = 'async';
        im.loading = 'lazy';
        if (img.getAttribute('width')) im.setAttribute('width', img.getAttribute('width'));
        if (img.getAttribute('height')) im.setAttribute('height', img.getAttribute('height'));
        panel.appendChild(im);
      } else {
        h('div', 'sw-cc-image sw-cc-placeholder', panel);
      }
      var textEl = source && (source.querySelector('.elementor-widget-text-editor p, .elementor-widget-text-editor') ||
        source.querySelector('p') || source.querySelector('.elementor-heading-title'));
      var desc = h('p', 'sw-cc-description', panel);
      desc.textContent = textEl ? textEl.textContent.replace(/\s+/g, ' ').trim() : '';

      var dur = reduce ? 0 : 350, px = 0, py = 0;
      function applyT() { card.style.transform = 'translate(' + px + 'px, ' + py + 'px)'; }
      var moveX = quickTo(function (v) { px = v; applyT(); }, dur);
      var moveY = quickTo(function (v) { py = v; applyT(); }, dur);
      function place(e, jump) {
        var height = card.offsetHeight;
        var x = Math.min(Math.max(e.clientX - CARD_WIDTH / 2, EDGE), window.innerWidth - CARD_WIDTH - EDGE);
        var below = e.clientY + OFFSET;
        var y = below + height > window.innerHeight - EDGE ? e.clientY - OFFSET - height : below;
        // On entry the card starts at the cursor rather than gliding in from where it last closed.
        if (jump) { moveX(x, x); moveY(y, y); } else { moveX(x); moveY(y); }
      }
      function setOpen(on) { if (on) card.setAttribute('data-open', ''); else card.removeAttribute('data-open'); }
      a.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse') return;
        place(e, true);
        setOpen(true);
      });
      a.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') place(e); });
      a.addEventListener('pointerleave', function () { setOpen(false); });
      a.addEventListener('blur', function () { setOpen(false); });
    });

    // The key word underline moves along the words every 3s (Hero.tsx). A host inside .hero-words is
    // already cycled by sw-motion.js, so it is left to that.
    if (!host.closest('.hero-words') && !host.querySelector('.hero-words')) {
      var n = 0;
      var show = function (k) { each(words, function (w, j) { w.classList.toggle('is-active', j === k); }); };
      show(0);
      setInterval(function () { n = (n + 1) % words.length; show(n); }, 3000);
    }
  }

  /* ── Mounting ─────────────────────────────────────────── */

  var MOUNTS = [
    ['.sw-viz-pipeline', mountPipeline],
    ['.sw-viz-telemetry', mountTelemetry],
    ['.sw-viz-events', mountEvents],
    ['.sw-viz-integrations', mountIntegrations],
    ['.sw-viz-sensors', mountSensors],
    ['.sw-viz-dataops', mountDataOps],
    ['.sw-pixel-field', mountPixelField],
    ['.sw-typing', mountTyping],
    ['.sw-highlight-grid', mountHighlightGrid],
    ['.sw-cursor-card-host', mountCursorCards],
  ];

  function mount(root) {
    root = root || document;
    MOUNTS.forEach(function (m) {
      qsa(root, m[0]).forEach(function (el) {
        if (el.swVisualMounted && el.swVisualMounted[m[0]]) return;
        el.swVisualMounted = el.swVisualMounted || {};
        el.swVisualMounted[m[0]] = true;
        try { m[1](el); } catch (err) { if (window.console) console.error('[SWVisuals] ' + m[0], err); }
      });
    });
  }

  window.SWVisuals = { mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mount(document); });
  else mount(document);
})();
