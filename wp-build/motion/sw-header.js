/*
 * Smartwatch Solutions header and footer behaviour (React MegaMenuNavbar, ContactAction, drawer,
 * WhatsAppButton and the footer reveal). Content lives in the Xpro templates; this only opens,
 * closes and animates what is there.
 */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var CARET = '<svg class="sw-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    /* ---------------- mega menus: the Nth top-level menu item opens the Nth .sw-mega panel */
    var nav = $('.sw-nav');
    var megas = $$('.sw-mega');
    var tops = nav ? $$('.xpro-elementor-horizontal-navbar-nav > li', nav) : [];
    var timer = null, openIdx = -1;
    function closeAll() { megas.forEach(function (m) { m.classList.remove('is-open'); }); tops.forEach(function (t) { t.classList.remove('is-open'); var a = t.querySelector('a'); if (a) a.setAttribute('aria-expanded', 'false'); }); openIdx = -1; }
    function open(i) {
      clearTimeout(timer);
      if (i === openIdx) return;
      closeAll();
      if (!megas[i]) return;
      openIdx = i;
      megas[i].classList.add('is-open');
      tops[i].classList.add('is-open');
      var a = tops[i].querySelector('a'); if (a) a.setAttribute('aria-expanded', 'true');
    }
    function later() { clearTimeout(timer); timer = setTimeout(closeAll, 120); }
    tops.forEach(function (li, i) {
      var a = li.querySelector('a');
      if (!a) return;
      if (megas[i]) {
        a.insertAdjacentHTML('beforeend', CARET);
        a.setAttribute('aria-haspopup', 'true');
        a.setAttribute('aria-expanded', 'false');
        li.addEventListener('mouseenter', function () { open(i); });
        li.addEventListener('mouseleave', later);
        a.addEventListener('click', function (e) {
          if (window.innerWidth <= 900) return;
          e.preventDefault();
          if (openIdx === i) closeAll(); else open(i);
        });
        a.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); open(i); var f = megas[i].querySelector('a'); if (f) f.focus(); } });
      }
    });
    megas.forEach(function (m) {
      m.addEventListener('mouseenter', function () { clearTimeout(timer); });
      m.addEventListener('mouseleave', later);
      m.addEventListener('click', function (e) { if (e.target.closest('a')) closeAll(); });
    });
    var actions = $('.sw-actions');
    if (actions) actions.addEventListener('mouseenter', later);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeDrawer(); closeWa(); } });
    document.addEventListener('pointerdown', function (e) { if (openIdx >= 0 && !e.target.closest('.sw-mega, .sw-nav')) closeAll(); });

    /* ---------------- contact popover */
    $$('.sw-contact').forEach(function (c) {
      var t = null;
      c.addEventListener('mouseenter', function () { clearTimeout(t); c.classList.add('is-open'); });
      c.addEventListener('mouseleave', function () { t = setTimeout(function () { c.classList.remove('is-open'); }, 80); });
    });

    /* ---------------- burger + drawer */
    var burger = $('.sw-burger');
    var drawer = $('.sw-drawer');
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      if (burger) { burger.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
      document.body.classList.remove('sw-drawer-open');
    }
    if (burger && drawer) {
      burger.innerHTML = '<span class="sw-burger-line" aria-hidden="true"></span>';
      burger.setAttribute('role', 'button');
      burger.setAttribute('aria-controls', 'sw-drawer');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      burger.addEventListener('click', function (e) {
        e.preventDefault();
        var on = !drawer.classList.contains('is-open');
        if (!on) { closeDrawer(); return; }
        var bar = $('.xpro-theme-builder-header');
        if (bar) drawer.style.setProperty('--sw-header-h', Math.round(bar.getBoundingClientRect().bottom) + 'px');
        drawer.classList.add('is-open');
        burger.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Close menu');
        document.body.classList.add('sw-drawer-open');
      });
      drawer.addEventListener('click', function (e) { if (e.target.closest('a[href]') && !e.target.closest('.e-n-accordion-item-title')) closeDrawer(); });
      window.addEventListener('resize', function () { if (window.innerWidth > 900) closeDrawer(); });
    }

    /* ---------------- WhatsApp lines: open on every page load, the badge toggles them */
    var wa = $('.sw-wa');
    var badge = wa && $('.sw-wa-badge', wa);
    var WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';
    var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    function setWa(on) {
      if (!wa) return;
      wa.classList.toggle('is-open', on);
      badge.innerHTML = on ? CLOSE : WA;
      badge.setAttribute('aria-expanded', on ? 'true' : 'false');
      badge.setAttribute('aria-label', on ? 'Close the WhatsApp lines' : 'Chat with us on WhatsApp');
    }
    function closeWa() { if (wa && wa.classList.contains('is-open')) setWa(false); }
    if (wa && badge) {
      badge.setAttribute('role', 'button');
      setWa(true);
      badge.addEventListener('click', function (e) { e.preventDefault(); setWa(!wa.classList.contains('is-open')); });
      document.addEventListener('pointerdown', function (e) { if (!wa.contains(e.target)) closeWa(); });
      $$('.sw-wa-line', wa).forEach(function (a) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); });
    }

    /* ---------------- footer reveal: the footer waits under the page, its contents fade in and grow */
    var footer = $('.sw-footer');
    var inner = footer && $('.sw-ft-reveal', footer);
    var page = $('#content') || $('.site-content');
    var G = window.gsap, ST = window.ScrollTrigger;
    var apple = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var editor = document.body.classList.contains('elementor-editor-active');
    if (footer && inner && page && G && ST && !editor) {
      G.registerPlugin(ST);
      var HEADER_H = function () { var b = $('.xpro-theme-builder-header'); return b ? b.offsetHeight : 64; };
      var hold = function () { return Math.min(footer.offsetHeight, window.innerHeight - HEADER_H()); };
      var origin = function () { return footer.offsetHeight > window.innerHeight - HEADER_H() ? '50% 0%' : '50% 100%'; };
      var from = reduce ? { autoAlpha: 0 } : { autoAlpha: 0, scale: 0.94, transformOrigin: origin, filter: function () { return window.innerWidth > 900 ? 'blur(10px)' : 'blur(0px)'; } };
      var to = reduce ? { autoAlpha: 1 } : { autoAlpha: 1, scale: 1, filter: 'blur(0px)' };
      if (!apple) {
        // Pin the outermost footer box: sticky only holds inside a parent taller than itself.
        var pin = footer.closest('#xpro-theme-builder-footer') || footer;
        var measure = function () { pin.style.setProperty('--footer-h', pin.offsetHeight + 'px'); };
        measure();
        pin.setAttribute('data-pinned', '');
        if (window.ResizeObserver) new ResizeObserver(measure).observe(pin);
        G.fromTo(inner, from, Object.assign({}, to, { ease: 'none', scrollTrigger: { trigger: page, start: 'bottom bottom', end: function () { return '+=' + Math.round(hold() * 0.85); }, scrub: true, invalidateOnRefresh: true, onRefreshInit: measure } }));
      } else {
        var tl = G.timeline({ scrollTrigger: { trigger: footer, start: 'top bottom', end: function () { return '+=' + hold(); }, scrub: true, invalidateOnRefresh: true } });
        tl.fromTo(inner, { y: function () { return -hold(); } }, { y: 0, ease: 'none', duration: 1 }, 0).fromTo(inner, from, Object.assign({}, to, { ease: 'none', duration: 0.85 }), 0);
      }
    }
  });
})();
