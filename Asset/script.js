/* ===================================================================
   PLANMalaysia — Home Page Interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Fade-in on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Mobile dropdown toggle (tap to open submenus) ---------- */
  var isMobile = function () { return window.innerWidth <= 720; };

  document.querySelectorAll('.has-dropdown > .main-nav__link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!isMobile()) return;
      var parent = link.parentElement;
      var alreadyOpen = parent.classList.contains('is-open');

      // close any other open submenu
      document.querySelectorAll('.has-dropdown.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });

      if (!alreadyOpen) {
        e.preventDefault();
        parent.classList.add('is-open');
      }
    });
  });

  /* ---------- BM / EN language toggle (visual only for now) ---------- */
  var langButtons = document.querySelectorAll('.lang-toggle__btn');
  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      langButtons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      // NOTE: hook actual i18n/content-swap logic here when ready
    });
  });

  /* ---------- Newsletter form (placeholder submit feedback) ---------- */
  var newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button');
      var originalHTML = btn.innerHTML;
      btn.innerHTML = 'Terima kasih! <i class="ti ti-check"></i>';
      setTimeout(function () {
        btn.innerHTML = originalHTML;
        newsletterForm.reset();
      }, 2200);
    });
  }

  /* ---------- Sticky nav shadow on scroll ---------- */
  var mainNav = document.querySelector('.main-nav');
  if (mainNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        mainNav.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
      } else {
        mainNav.style.boxShadow = 'none';
      }
    });
  }

});
