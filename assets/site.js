/* The Oak Tree House — unified scroll-reveal (smooth settle) */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }

  ready(function () {
    // Tag top-level content blocks for reveal
    document.querySelectorAll('main > section, main > header').forEach(function (el) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
    // Stagger small grids (2-6 children) for a gentle cascade
    document.querySelectorAll('.grid').forEach(function (g) {
      var n = g.children.length;
      if (n > 1 && n <= 6) g.classList.add('stagger');
    });

    var targets = document.querySelectorAll('.reveal, .stagger');

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(function (e) { e.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (e) { io.observe(e); });

    // Safety: anything already in view on load reveals immediately
    requestAnimationFrame(function () {
      targets.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) e.classList.add('in');
      });
    });
  });
})();

/* Modern mobile menu (slide-in overlay) */
(function () {
  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }
  ready(function () {
    var old = document.getElementById('menu-btn');
    if (!old) return;
    // strip any existing listeners by cloning
    var btn = old.cloneNode(true);
    old.parentNode.replaceChild(btn, old);
    // remove legacy dropdown
    var legacy = document.getElementById('mobile-menu');
    if (legacy) legacy.remove();
    // modern 3-line burger
    btn.classList.add('oak-burger');
    btn.innerHTML = '<span></span><span></span><span></span>';

    var WA = 'https://wa.me/26774327923?text=Hi%20The%20Oak%20Tree%20House%2C%20I%27d%20like%20to%20enquire%20about%20a%20stay';
    var links = [['Home','index.html'],['Rooms','rooms.html'],['Gallery','gallery.html'],['About','about.html'],['Contact','contact.html']];
    var cur = (location.pathname.split('/').pop() || 'index.html');
    if (cur === '') cur = 'index.html';

    var FB='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5v1.8H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg>';
    var IG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>';
    var TT='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8a4.3 4.3 0 0 1-2.6-2.6h-2.7v11.5a2.3 2.3 0 1 1-2.3-2.3c.2 0 .4 0 .6.1V9.7a5.3 5.3 0 0 0-.6 0 5 5 0 1 0 5 5V9.2a6.9 6.9 0 0 0 4 1.3V7.8a4.3 4.3 0 0 1-2-.5 4.3 4.3 0 0 1-.4-.5z"/></svg>';
    var WAS='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';

    var nav = document.createElement('div');
    nav.id = 'oak-mobile-nav';
    nav.setAttribute('role','dialog');
    nav.setAttribute('aria-label','Menu');
    nav.innerHTML =
      '<div class="omn-top">'
      + '<img class="omn-logo" src="assets/logo.png" alt="The Oak Tree House"/>'
      + '<button class="omn-close" aria-label="Close menu"><span class="material-symbols-outlined">close</span></button>'
      + '</div>'
      + '<nav class="omn-links">'
      + links.map(function(l){ return '<a class="'+(l[1]===cur?'active':'')+'" href="'+l[1]+'">'+l[0]+'</a>'; }).join('')
      + '</nav>'
      + '<div class="omn-foot">'
      + '<div class="omn-social">'
      + '<a href="https://www.facebook.com/profile.php?id=61581750747015" target="_blank" rel="noopener" aria-label="Facebook">'+FB+'</a>'
      + '<a href="#" aria-label="Instagram">'+IG+'</a>'
      + '<a href="#" aria-label="TikTok">'+TT+'</a>'
      + '<a href="'+WA+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+WAS+'</a>'
      + '</div></div>';
    document.body.appendChild(nav);

    var backdrop = document.createElement('div');
    backdrop.id = 'oak-mobile-backdrop';
    document.body.appendChild(backdrop);

    function open(){ nav.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow='hidden'; }
    function close(){ nav.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow=''; }
    btn.addEventListener('click', function(e){ e.preventDefault(); nav.classList.contains('open') ? close() : open(); });
    backdrop.addEventListener('click', close);
    nav.querySelector('.omn-close').addEventListener('click', close);
    nav.querySelectorAll('.omn-links a').forEach(function(a){ a.addEventListener('click', close); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  });
})();
