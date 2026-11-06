/* Mohamed Eyad · portfolio — small progressive enhancements, no dependencies.
   The site works without this file; it adds the mobile menu, the active-section
   highlight, the image lightbox and the click-to-load video embeds. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  /* ---- mobile menu ---- */
  if (header && toggle) {
    var closeMenu = function () {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- header shadow once the page scrolls ---- */
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- highlight the nav link of the section in view (home page) ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var sections = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var visible = {};
    var mark = function () {
      var current = null;
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sections[sections.length - 1].id;
      else sections.forEach(function (s) { if (visible[s.id] && current === null) current = s.id; });
      links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + current); });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      mark();
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
    window.addEventListener('scroll', function () {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) mark();
    }, { passive: true });
  }

  /* ---- click-to-load video embeds ---- */
  document.querySelectorAll('.embed-btn[data-embed]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = btn.getAttribute('data-embed');
      frame.title = btn.getAttribute('data-title') || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      btn.parentNode.replaceChild(frame, btn);
    });
  });

  /* ---- lightbox for images marked with a.zoom ---- */
  var zooms = Array.prototype.slice.call(document.querySelectorAll('a.zoom'));
  if (!zooms.length) return;

  var icon = function (path) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg>';
  };
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML =
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-btn lb-close" type="button" aria-label="Close">' + icon('<path d="M18 6 6 18M6 6l12 12"/>') + '</button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Previous image">' + icon('<path d="m15 18-6-6 6-6"/>') + '</button>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Next image">' + icon('<path d="m9 18 6-6-6-6"/>') + '</button>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var cap = box.querySelector('figcaption');
  var closeBtn = box.querySelector('.lb-close');
  var index = 0;
  var lastFocus = null;

  var show = function (i) {
    index = (i + zooms.length) % zooms.length;
    var a = zooms[index];
    var inner = a.querySelector('img');
    img.src = a.getAttribute('href');
    img.alt = inner ? inner.alt : '';
    var fig = a.closest('figure');
    var text = fig && fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : (inner ? inner.alt : '');
    cap.textContent = text;
  };
  var open = function (i) {
    lastFocus = document.activeElement;
    box.classList.toggle('single', zooms.length < 2);
    show(i);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  var close = function () {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    img.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  };

  zooms.forEach(function (a, i) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
  closeBtn.addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();
