/* Mathix landing — interactivity (theme, language, waitlist FAB, gallery). */
(function () {
  'use strict';

  var html = document.documentElement;

  // ----- Theme toggle -----
  var themeBtn = document.getElementById('themeToggle');

  function currentTheme() {
    var manual = html.getAttribute('data-theme');
    if (manual === 'light' || manual === 'dark') return manual;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Pick up system theme changes if user hasn't made an explicit choice.
  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) {}

  // ----- Language switcher -----
  var langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', function (e) {
      var lang = e.target.value;
      var base = langSelect.dataset.base || '/';
      var path = lang === 'en' ? base : base + lang + '/';
      window.location.pathname = path;
    });
  }

  // ----- Floating waitlist widget -----
  var fab     = document.getElementById('fabWrap');
  var fabBtn  = document.getElementById('fabBtn');
  var fabClose = document.getElementById('fabClose');

  function openFab() {
    if (!fab) return;
    fab.classList.add('open');
    setTimeout(function () {
      var input = document.getElementById('fName');
      if (input) input.focus();
    }, 200);
  }
  function closeFab() {
    if (!fab) return;
    fab.classList.remove('open');
  }

  if (fabBtn) fabBtn.addEventListener('click', openFab);
  if (fabClose) fabClose.addEventListener('click', closeFab);

  var openTriggers = document.querySelectorAll('[data-open-waitlist]');
  for (var i = 0; i < openTriggers.length; i++) {
    openTriggers[i].addEventListener('click', function (e) {
      e.preventDefault();
      openFab();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && fab && fab.classList.contains('open')) closeFab();
  });

  document.addEventListener('click', function (e) {
    if (!fab || !fab.classList.contains('open')) return;
    if (fab.contains(e.target)) return;
    if (e.target.closest && e.target.closest('[data-open-waitlist]')) return;
    closeFab();
  });

  // ----- Gallery slider -----
  var gallery = document.getElementById('gallery');
  var galleryPrev = document.getElementById('galleryPrev');
  var galleryNext = document.getElementById('galleryNext');

  function scrollGallery(direction) {
    if (!gallery) return;
    var step = Math.round(gallery.clientWidth * 0.8 + 24);
    gallery.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
  if (galleryPrev) galleryPrev.addEventListener('click', function () { scrollGallery(-1); });
  if (galleryNext) galleryNext.addEventListener('click', function () { scrollGallery(1); });
})();
