/*
 * Smartwatch Solutions motion layer.
 * Behaviour only: every rule below finds elements by their semantic class and animates whatever
 * content Elementor rendered inside them. No copy, image or link lives in this file, so editing a
 * headline, adding a hero word or a tab in Elementor needs no change here.
 */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var inEditor = document.body && document.body.classList.contains('elementor-editor-active');
  doc.classList.add('sw-js');

  function each(sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); }

  /* Header height -> CSS variable, used by the sticky rail and anchor offsets. */
  function headerHeight() {
    var h = document.querySelector('.xpro-theme-builder-header');
    doc.style.setProperty('--sw-header-h', (h ? h.offsetHeight : 0) + 'px');
  }
  headerHeight();
  window.addEventListener('resize', headerHeight);
  window.addEventListener('load', headerHeight);

  /* 1. Headline: split the rendered text of .hero-headline into words and stagger them in. */
  each('.hero-headline .elementor-heading-title', function (title) {
    if (title.dataset.swSplit) return;
    title.dataset.swSplit = '1';
    var i = 0;
    var walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span');
        w.className = 'sw-word';
        w.style.setProperty('--i', i++);
        w.textContent = part;
        frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    title.classList.add('sw-words-ready');
  });

  /* 2. Hero words: cycle an active state through whatever .hero-word items exist. */
  each('.hero-words', function (group) {
    var items = group.querySelectorAll('.hero-word');
    if (!items.length) return;
    var n = 0, paused = false;
    function show(k) { Array.prototype.forEach.call(items, function (el, j) { el.classList.toggle('is-active', j === k); }); }
    show(0);
    group.addEventListener('mouseenter', function () { paused = true; });
    group.addEventListener('mouseleave', function () { paused = false; });
    Array.prototype.forEach.call(items, function (el, j) { el.addEventListener('mouseenter', function () { n = j; show(j); }); });
    if (!reduce) setInterval(function () { if (!paused) { n = (n + 1) % items.length; show(n); } }, 3000);
  });

  /* 3. Auto-advancing nested tabs: clicks the next native tab title until the visitor takes over. */
  each('.sw-autotabs', function (box) {
    var titles = box.querySelectorAll(':scope > .e-n-tabs > .e-n-tabs-heading > .e-n-tab-title');
    if (titles.length < 2 || reduce) return;
    var stopped = false, visible = false;
    box.addEventListener('pointerdown', function () { stopped = true; });
    box.addEventListener('keydown', function () { stopped = true; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(box);
    setInterval(function () {
      if (stopped || !visible) return;
      var cur = 0;
      Array.prototype.forEach.call(titles, function (t, j) { if (t.getAttribute('aria-selected') === 'true') cur = j; });
      titles[(cur + 1) % titles.length].click();
    }, 5000);
  });

  /* 4. Scroll reveal for bands marked .sw-reveal (never hides content in the editor). */
  if (!inEditor && !reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    each('.sw-reveal', function (el, k) { if (k === 0) { el.classList.add('is-in'); return; } el.classList.add('sw-reveal-armed'); io.observe(el); });
  }

  /* 5. Section rail: highlight the link of the section in view. */
  each('.sw-rail', function (rail) {
    var links = rail.querySelectorAll('a[href^="#"]');
    var map = [];
    Array.prototype.forEach.call(links, function (a) {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t) map.push([a, t]);
    });
    if (!map.length) return;
    function spy() {
      var y = window.scrollY + (parseInt(getComputedStyle(doc).getPropertyValue('--sw-header-h'), 10) || 0) + 120, cur = null;
      map.forEach(function (p) { if (p[1].getBoundingClientRect().top + window.scrollY <= y) cur = p[0]; });
      map.forEach(function (p) { p[0].classList.toggle('is-current', p[0] === cur); });
    }
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  });
})();
