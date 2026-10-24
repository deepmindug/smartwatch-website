/*
 * Smartwatch Solutions behaviour layer, ported from the React site's motion hooks.
 * Code provides behaviour only: everything it animates or toggles is found by semantic class and
 * the content comes from what Elementor rendered. Uses GSAP + ScrollTrigger + Lenis (as the React
 * site does) when they loaded; without them every element simply rests visible.
 */
(function () {
  'use strict';
  var doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var editor = document.body && document.body.classList.contains('elementor-editor-active');
  var G = window.gsap;
  var ST = window.ScrollTrigger;
  if (G && ST) G.registerPlugin(ST);
  var motion = !!G && !reduce && !editor;
  if (motion) doc.classList.add('sw-motion');

  /* ---------------------------------------------------------- header height */
  function headerHeight() {
    var h = $('.sw-header-bar') || $('.xpro-theme-builder-header');
    var v = (h ? Math.round(h.getBoundingClientRect().height) : 84) + 'px';
    doc.style.setProperty('--sw-header-h', v);
    doc.style.setProperty('--header-h', v);
  }
  headerHeight();
  window.addEventListener('resize', headerHeight);
  window.addEventListener('load', headerHeight);

  /* ---------------------------------------------------------- smooth scroll (Lenis) */
  var lenis = null;
  if (window.Lenis && !reduce && !editor) {
    lenis = new window.Lenis({ autoRaf: false, anchors: false });
    if (G) {
      G.ticker.add(function (t) { lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
      if (ST) lenis.on('scroll', ST.update);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
    window.swLenis = lenis;
  }
  // In-page anchors glide to their section and land clear of the sticky bars.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a) return;
    var u = new URL(a.href, location.href);
    if (u.pathname !== location.pathname || !u.hash || u.hash.length < 2) return;
    var t = document.getElementById(decodeURIComponent(u.hash.slice(1)));
    if (!t) return;
    e.preventDefault();
    var off = (parseInt(getComputedStyle(doc).getPropertyValue('--sw-header-h'), 10) || 84) + 24 + ($('.sw-rail') ? 64 : 0);
    if (lenis) lenis.scrollTo(t, { offset: -off });
    else window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', u.hash);
  });

  /* ---------------------------------------------------------- corner buttons */
  $$('.sw-corner').forEach(function (w) {
    if (w.querySelector('.sw-cb-dot')) return;
    var parts = [['sw-cb-line sw-cb-h sw-cb-top'], ['sw-cb-line sw-cb-v sw-cb-right'], ['sw-cb-line sw-cb-h sw-cb-bottom'], ['sw-cb-line sw-cb-v sw-cb-left'],
      ['sw-cb-dot sw-cb-top sw-cb-left'], ['sw-cb-dot sw-cb-top sw-cb-right'], ['sw-cb-dot sw-cb-bottom sw-cb-right'], ['sw-cb-dot sw-cb-bottom sw-cb-left']];
    parts.forEach(function (p) {
      var s = document.createElement('span');
      s.className = p[0];
      s.setAttribute('aria-hidden', 'true');
      w.insertBefore(s, w.firstChild);
    });
  });

  /* ---------------------------------------------------------- headline: words rise from their masks */
  function splitWords(title) {
    if (title.dataset.swSplit) return [];
    title.dataset.swSplit = '1';
    var words = [];
    var walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var mask = document.createElement('span'); mask.className = 'sw-word-mask';
        var w = document.createElement('span'); w.className = 'sw-word'; w.textContent = part;
        mask.appendChild(w); frag.appendChild(mask); words.push(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return words;
  }

  /* ---------------------------------------------------------- hero entrance (useEntrance + StaggerText) */
  $$('.hero-headline .elementor-heading-title').forEach(function (title) {
    var words = splitWords(title);
    if (!motion || !words.length) return;
    var hero = title.closest('.e-parent') || document;
    G.from(words, { yPercent: 120, duration: 0.7, ease: 'power3.out', stagger: 0.05, clearProps: 'transform' });
    var items = $$('.sw-enter', hero);
    var media = $$('.sw-enter-media', hero);
    var tl = G.timeline({ delay: 0.3, defaults: { ease: 'power2.out' } });
    if (items.length) tl.from(items, { autoAlpha: 0, y: 22, duration: 0.6, stagger: 0.09, clearProps: 'transform' });
    if (media.length) tl.from(media, { autoAlpha: 0, y: 30, scale: 0.98, duration: 0.8, clearProps: 'transform' }, '-=0.35');
  });

  /* ---------------------------------------------------------- scroll reveal (Reveal) */
  if (motion && ST) {
    $$('.sw-reveal').forEach(function (el) {
      if (el.closest('.sw-hero, .hero')) return;
      G.from(el, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out', clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    $$('.sw-stagger').forEach(function (el) {
      var kids = Array.prototype.slice.call(el.children);
      if (!kids.length) return;
      G.from(kids, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.08, clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    $$('.sw-section:not(.sw-reveal):not(.sw-cov-section)').forEach(function (el) {
      if (el.querySelector('.sw-stagger')) {
        var head = el.querySelector('.sw-head');
        if (head) G.from(head, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out', clearProps: 'transform', scrollTrigger: { trigger: head, start: 'top 88%', once: true } });
      }
    });
  }

  /* ---------------------------------------------------------- hero words: the underline walks the key words */
  $$('.hero-lead').forEach(function (lead) {
    var words = $$('a.hero-word', lead);
    if (!words.length) return;
    var i = 0;
    function on(k) { words.forEach(function (w, j) { w.classList.toggle('is-active', j === k); }); }
    on(0);
    setInterval(function () { i = (i + 1) % words.length; on(i); }, 3000);
  });

  /* ---------------------------------------------------------- rail: the pill of the section in view */
  $$('.sw-rail').forEach(function (rail) {
    var pills = $$('.sw-rail-pill', rail);
    var pairs = pills.map(function (p) {
      var a = p.querySelector('a');
      var id = a ? decodeURIComponent((a.getAttribute('href') || '').split('#')[1] || '') : '';
      return [p, document.getElementById(id)];
    }).filter(function (x) { return x[1]; });
    if (!pairs.length) return;
    var strip = rail.querySelector('.e-con-inner') || rail;
    var current = null;
    function spy() {
      var y = window.innerHeight * 0.45, cur = pairs[0][0];
      pairs.forEach(function (x) { var r = x[1].getBoundingClientRect(); if (r.top <= y) cur = x[0]; });
      if (cur === current) return;
      current = cur;
      pairs.forEach(function (x) { x[0].classList.toggle('is-current', x[0] === cur); });
      if (strip.scrollWidth > strip.clientWidth) {
        var left = cur.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
        strip.scrollTo({ left: left - (strip.clientWidth - cur.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  });

  /* ---------------------------------------------------------- tabs that rotate like a carousel until picked */
  $$('.sw-autotabs').forEach(function (box) {
    var titles = $$('.e-n-tab-title', box).filter(function (t) { return t.closest('.sw-autotabs') === box; });
    if (titles.length < 2) return;
    var auto = true, paused = false, visible = true;
    box.addEventListener('mouseenter', function () { paused = true; });
    box.addEventListener('mouseleave', function () { paused = false; });
    titles.forEach(function (t) { t.addEventListener('click', function (e) { if (e.isTrusted) auto = false; }); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(box);
    if (reduce) return;
    setInterval(function () {
      if (!auto || paused || !visible) return;
      var cur = 0;
      titles.forEach(function (t, j) { if (t.getAttribute('aria-selected') === 'true') cur = j; });
      var next = titles[(cur + 1) % titles.length];
      next.click();
      var strip = next.parentElement;
      if (strip && strip.scrollWidth > strip.clientWidth) {
        var left = next.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
        strip.scrollTo({ left: left - (strip.clientWidth - next.offsetWidth) / 2, behavior: 'smooth' });
      }
    }, 5000);
  });

  /* ---------------------------------------------------------- logo marquee from a native gallery */
  $$('.sw-marquee').forEach(function (row) {
    var imgs = $$('img', row);
    if (!imgs.length) return;
    var track = document.createElement('ul');
    track.className = 'sw-marquee-track';
    track.style.setProperty('--count', imgs.length);
    function add(img, repeat) {
      var li = document.createElement('li');
      li.className = 'sw-marquee-item';
      var c = img.cloneNode(true);
      c.removeAttribute('srcset'); c.removeAttribute('sizes');
      c.loading = 'eager';
      if (repeat) { li.setAttribute('aria-hidden', 'true'); c.alt = ''; }
      li.appendChild(c);
      track.appendChild(li);
    }
    imgs.forEach(function (i) { add(i, false); });
    imgs.forEach(function (i) { add(i, true); });
    var host = row.querySelector('.elementor-widget-container') || row;
    host.appendChild(track);
    row.classList.add('sw-marquee-ready');
  });
  $$('.sw-marquee-toggle').forEach(function (tg) {
    var a = tg.querySelector('a, button');
    var label = tg.querySelector('.elementor-button-text');
    if (!a) return;
    a.setAttribute('role', 'button');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var paused = !tg.classList.contains('is-paused');
      tg.classList.toggle('is-paused', paused);
      $$('.sw-marquee').forEach(function (r) { r.classList.toggle('is-paused', paused); });
      if (label) label.textContent = paused ? label.textContent.replace(/^Pause/, 'Play') : label.textContent.replace(/^Play/, 'Pause');
    });
  });

  /* ---------------------------------------------------------- expose for header/footer modules */
  window.SW = { $: $, $$: $$, reduce: reduce, motion: motion, editor: editor, lenis: lenis };
})();
