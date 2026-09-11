(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobile = document.querySelector('[data-mobile-menu]');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobile.classList.toggle('is-open', !open);
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('is-open');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const form = document.querySelector('[data-lead-form]');
  const serviceMap = {
    'certificado-digital': 'Certificado digital',
    'registro-de-marcas': 'Registro de marcas',
    'sites-sistemas': 'Site ou sistema',
    'marketing': 'Marketing empresarial',
    'google-maps': 'Google Maps',
    'identidade-visual': 'Logo e artes',
    'treinamento-vendas': 'Treinamento de vendas'
  };

  if (form) {
    const params = new URLSearchParams(location.search);
    const wanted = serviceMap[params.get('interesse')];
    if (wanted) form.elements.interesse.value = wanted;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get('nome') || '').trim();
      const empresa = (data.get('empresa') || '').trim();
      const interesse = (data.get('interesse') || '').trim();
      const mensagem = (data.get('mensagem') || '').trim();
      const text = [
        `Olá, Certial! Meu nome é ${nome}.`,
        empresa ? `Falo pela empresa ${empresa}.` : '',
        `Tenho interesse em: ${interesse}.`,
        mensagem ? `Contexto: ${mensagem}` : '',
        'Gostaria de entender os próximos passos.'
      ].filter(Boolean).join('\n');

      const whatsappUrl = `https://wa.me/5581989419441?text=${encodeURIComponent(text)}`;
      window.location.href = whatsappUrl;
    });
  }
})();
