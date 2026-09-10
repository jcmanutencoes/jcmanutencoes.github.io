/* =========================================================
   JC MANUTENÇÃO — One Page
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '5511966322953';

  /* -------------------------------------------------------
     1. IMAGENS DEMONSTRATIVAS (banco de imagens)
     Troque os valores abaixo pelas fotos reais da empresa.
     Se um link falhar, cai automaticamente no placeholder.
  ------------------------------------------------------- */
  var U = 'https://images.unsplash.com/photo-';
  var Q = '?auto=format&fit=crop&w=1200&q=70';
  var QS = '?auto=format&fit=crop&w=320&h=320&q=70';

  var IMAGES = {
    hero:     U + '1621905251189-08b45d6a269e' + Q,
    sobre:    U + '1581091226825-a6a2a5aee158' + Q,
    fundador: U + '1560250097-0b93528c311a' + QS,

    antes1:  U + '1504328345606-18bbc8c9d7d1' + Q,
    depois1: U + '1581092160562-40aa08e78837' + Q,
    antes2:  U + '1504917595217-d4dc5ebe6122' + Q,
    depois2: U + '1581094794329-c8112a89af12' + Q,
    antes3:  U + '1516937941344-00b4e0337589' + Q,
    depois3: U + '1565043666747-69f6646db940' + Q,
    antes4:  U + '1567789884554-0b844b597180' + Q,
    depois4: U + '1590959651373-a3db0f38a961' + Q,

    pessoa1: U + '1507003211169-0a1dd7228f2d' + QS,
    pessoa2: U + '1472099645785-5658abf4ff4e' + QS,
    pessoa3: U + '1573496359142-b8d87734a5a2' + QS,
    pessoa4: U + '1519085360753-af0119f7cbe7' + QS
  };

  // Placeholder de segurança (sempre disponível)
  function fallbackFor(key) {
    var small = key.indexOf('pessoa') === 0 || key === 'fundador';
    return 'https://picsum.photos/seed/jc-' + key + (small ? '/320/320' : '/1200/800');
  }

  function loadImages() {
    var nodes = document.querySelectorAll('img[data-img]');
    Array.prototype.forEach.call(nodes, function (img) {
      var key = img.getAttribute('data-img');
      img.addEventListener('error', function onErr() {
        img.removeEventListener('error', onErr);
        img.src = fallbackFor(key);
      });
      img.src = IMAGES[key] || fallbackFor(key);
    });
  }

  /* -------------------------------------------------------
     2. MENU MOBILE
  ------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var scrim = null;

  function closeNav() {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    if (scrim) { scrim.remove(); scrim = null; }
  }

  function openNav() {
    nav.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    scrim.addEventListener('click', closeNav);
    document.body.appendChild(scrim);
  }

  burger.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1040 && nav.classList.contains('is-open')) closeNav();
  });

  /* -------------------------------------------------------
     3. HEADER + BOTÃO TOPO
  ------------------------------------------------------- */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-stuck', y > 10);
    toTop.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------
     4. SCROLLSPY
  ------------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* -------------------------------------------------------
     5. REVEAL ON SCROLL
  ------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        setTimeout(function () { en.target.classList.add('is-in'); }, i * 70);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    Array.prototype.forEach.call(revealables, function (el) { ro.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* -------------------------------------------------------
     6. CONTADORES DO HERO
  ------------------------------------------------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400;
    var start = performance.now();

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animateCount(en.target);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { co.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* -------------------------------------------------------
     7. ANTES / DEPOIS (toque no mobile)
  ------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.work__media'), function (media) {
    media.addEventListener('click', function () { media.classList.toggle('is-after'); });
    media.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        media.classList.toggle('is-after');
      }
    });
  });

  /* -------------------------------------------------------
     8. SLIDER DE DEPOIMENTOS
  ------------------------------------------------------- */
  var track = document.getElementById('track');
  var dotsBox = document.getElementById('dots');
  var slides = track ? track.children.length : 0;
  var index = 0;
  var timer = null;

  function goTo(i) {
    index = (i + slides) % slides;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    Array.prototype.forEach.call(dotsBox.children, function (d, n) {
      d.classList.toggle('is-active', n === index);
    });
  }

  function autoplay() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(index + 1); }, 7000);
  }

  if (slides) {
    for (var i = 0; i < slides; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Ir para o depoimento ' + (i + 1));
      b.addEventListener('click', (function (n) {
        return function () { goTo(n); autoplay(); };
      })(i));
      dotsBox.appendChild(b);
    }

    document.getElementById('prev').addEventListener('click', function () { goTo(index - 1); autoplay(); });
    document.getElementById('next').addEventListener('click', function () { goTo(index + 1); autoplay(); });

    var slider = document.getElementById('slider');
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', autoplay);

    // Swipe
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { goTo(index + (dx < 0 ? 1 : -1)); autoplay(); }
      x0 = null;
    });

    goTo(0);
    autoplay();
  }

  /* -------------------------------------------------------
     9. FORMULÁRIO -> WHATSAPP
  ------------------------------------------------------- */
  var form = document.getElementById('form');
  var formOk = document.getElementById('formOk');
  var telInput = document.getElementById('tel');

  // Máscara de telefone
  telInput.addEventListener('input', function () {
    var v = telInput.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) {
      v = '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length - 4) + '-' + v.slice(-4);
    } else if (v.length > 2) {
      v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    } else if (v.length > 0) {
      v = '(' + v;
    }
    telInput.value = v;
  });

  function setError(id, message) {
    var field = document.getElementById(id).closest('.field');
    var slot = field.querySelector('.err');
    field.classList.toggle('has-error', !!message);
    if (slot) slot.textContent = message || '';
    return !message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formOk.hidden = true;

    var nome = document.getElementById('nome').value.trim();
    var tel = telInput.value.trim();
    var email = document.getElementById('email').value.trim();
    var segmento = document.getElementById('segmento').value;
    var servico = document.getElementById('servico').value;
    var msg = document.getElementById('msg').value.trim();

    var ok = true;
    ok = setError('nome', nome.length < 3 ? 'Informe seu nome completo.' : '') && ok;
    ok = setError('tel', tel.replace(/\D/g, '').length < 10 ? 'Informe um telefone válido com DDD.' : '') && ok;
    ok = setError('email', email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'E-mail inválido.' : '') && ok;

    if (!ok) {
      form.querySelector('.has-error input').focus();
      return;
    }

    var linhas = [
      'Olá, JC Manutenção!',
      '',
      'Nome: ' + nome,
      'Telefone: ' + tel
    ];
    if (email) linhas.push('E-mail: ' + email);
    if (segmento) linhas.push('Segmento: ' + segmento);
    if (servico) linhas.push('Serviço: ' + servico);
    if (msg) linhas.push('', 'Mensagem: ' + msg);
    linhas.push('', 'Enviado pelo site.');

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n'));
    window.open(url, '_blank', 'noopener');

    formOk.hidden = false;
    form.reset();
  });

  /* -------------------------------------------------------
     10. ANO NO RODAPÉ
  ------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     INIT
  ------------------------------------------------------- */
  loadImages();
})();
