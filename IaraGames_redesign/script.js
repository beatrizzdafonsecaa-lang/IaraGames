document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#game-search');
  const searchPanel = document.querySelector('#search-panel');
  const catalogItems = [...document.querySelectorAll('.catalog-item')];
  const categoryButtons = [...document.querySelectorAll('.category-chip')];
  const activeFilter = document.querySelector('#active-filter');
  const noResults = document.querySelector('#no-results');
  let activeCategory = categoryButtons.find(btn => btn.classList.contains('active'))?.dataset.category || 'all';
  let toastTimer;
  // Auth state is demonstrative (no backend). Home pages establish the state;
  // support reads it so the header follows the same user flow.
  const pageAuth = document.body.dataset.auth;
  const pageName = location.pathname.split('/').pop().toLowerCase();
  let authState = pageAuth;
  if (pageAuth === 'auto') {
    authState = localStorage.getItem('iaraAuth') || 'guest';
    document.body.dataset.auth = authState;
  } else if (pageAuth === 'logged' || pageAuth === 'guest') {
    localStorage.setItem('iaraAuth', pageAuth);
    authState = pageAuth;
  }
  const isGuest = authState === 'guest';

  // Support header follows the same logged/visitor flow as the Home.
  if (pageName === 'em-construcao.html') {
    const backLink = document.querySelector('#construction-back');
    if (backLink) {
      backLink.href = isGuest ? 'index-visitante.html' : 'index.html';
    }
  }

  if (pageName === 'suporte.html') {
    document.querySelectorAll('.support-auth-logged').forEach(el => {
      el.hidden = isGuest;
    });
    document.querySelectorAll('.support-auth-guest').forEach(el => {
      el.hidden = !isGuest;
    });
    document.querySelectorAll('.support-page-body .logo').forEach(link => {
      link.setAttribute('href', isGuest ? 'index-visitante.html' : 'index.html');
    });
    document.querySelectorAll('.support-page-body .nav a').forEach(link => {
      if (link.textContent.trim() === 'Loja') {
        link.setAttribute('href', isGuest ? 'index-visitante.html' : 'index.html');
      }
    });
    document.querySelectorAll('.support-page-body .footer a').forEach(link => {
      if (link.textContent.trim() === 'Loja') {
        link.setAttribute('href', isGuest ? 'index-visitante.html' : 'index.html');
      }
    });
  }

  // Hero carousel: the arrows, dots and automatic rotation all control the same state.
  const hero = document.querySelector('.hero');
  const heroVideo = hero?.querySelector('.hero-video');
  const heroLogo = hero?.querySelector('.hero-logo');
  const heroDescription = hero?.querySelector('.hero-content p');
  const heroStatus = hero?.querySelector('.hero-status');
  const heroDots = [...(hero?.querySelectorAll('.hero-dots [data-slide]') || [])];
  const heroSlides = [
    {
      video: 'assets/videos/trailer-entreestrelas.mp4',
      logo: 'assets/images/jogo-entreasestrelas.svg',
      alt: 'Entre as Estrelas',
      description: 'Entre as Estrelas é um RPG leve e narrativo que acompanha duas irmãs indígenas brasileiras em uma jornada emocionante para se reencontrarem após um evento trágico que remodela sua terra natal.',
      status: 'DISPONÍVEL EM BREVE'
    },
    {
      video: 'assets/videos/trailer-dandara.mp4',
      logo: 'assets/images/jogo-dandara.svg',
      alt: 'Dandara',
      description: 'Em um universo bizarro onde os oprimidos estão à beira do esquecimento, Dandara despertou para remodelar o mundo.',
      status: 'DISPONÍVEL EM BREVE'
    },
    {
      video: 'assets/videos/trailer-cururu.mp4',
      logo: 'assets/images/jogo-cururu.svg',
      alt: 'Cururu — Whispers of the Forest',
      description: 'Em um Brasil Naturepunk, siga a jornada de Cururu, um jovem sapo que, com o poder das águas sagradas, busca purificar os biomas e explorar o folclore brasileiro em sua missão de cura e redenção.',
      status: 'DISPONÍVEL EM BREVE'
    }
  ];
  let currentHeroSlide = 2;
  let heroTimer;

  function setHeroSlide(index, restartTimer = true) {
    if (!hero || !heroVideo || !heroLogo || !heroDescription) return;
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroSlide];

    hero.classList.add('is-changing');
    setTimeout(() => {
      heroVideo.src = slide.video;
      heroVideo.load();
      heroVideo.play().catch(() => {});
      heroLogo.src = slide.logo;
      heroLogo.alt = slide.alt;
      heroDescription.textContent = slide.description;
      if (heroStatus) heroStatus.textContent = slide.status;
      heroDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentHeroSlide);
        dot.setAttribute('aria-current', dotIndex === currentHeroSlide ? 'true' : 'false');
      });
      hero.classList.remove('is-changing');
    }, 150);

    if (restartTimer) startHeroTimer();
  }

  function startHeroTimer() {
    if (!hero) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(() => setHeroSlide(currentHeroSlide + 1, false), 7000);
  }

  hero?.querySelector('.hero-arrow-left')?.addEventListener('click', () => setHeroSlide(currentHeroSlide - 1));
  hero?.querySelector('.hero-arrow-right')?.addEventListener('click', () => setHeroSlide(currentHeroSlide + 1));
  heroDots.forEach(dot => dot.addEventListener('click', () => setHeroSlide(Number(dot.dataset.slide))));
  hero?.addEventListener('mouseenter', () => clearInterval(heroTimer));
  hero?.addEventListener('mouseleave', startHeroTimer);
  if (hero) setHeroSlide(currentHeroSlide, false);

  function showToast(message) {
    let container = document.querySelector('#toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'iara-toast';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function filterCatalog(query = searchInput?.value || '') {
    query = query.trim().toLowerCase();
    let visible = 0;

    catalogItems.forEach(item => {
      const name = (item.dataset.name || '').toLowerCase();
      const categories = (item.dataset.category || '').toLowerCase();
      const matchesSearch = !query || name.includes(query) || categories.includes(query);
      const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory.toLowerCase());
      const show = matchesSearch && matchesCategory;
      item.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    if (activeFilter) {
      activeFilter.textContent = query
        ? `Busca: ${searchInput.value}`
        : (activeCategory === 'all' ? 'Todos' : activeCategory);
    }
    if (noResults) noResults.style.display = visible ? 'none' : 'block';
  }

  function saveRecentSearch(value) {
    const term = value.trim();
    if (!term) return;
    const recent = JSON.parse(localStorage.getItem('iaraRecentSearches') || '[]');
    const next = [term, ...recent.filter(item => item.toLowerCase() !== term.toLowerCase())].slice(0, 4);
    localStorage.setItem('iaraRecentSearches', JSON.stringify(next));
  }

  function applySearch(value, shouldScroll = true) {
    if (!searchInput) return;
    searchInput.value = value;
    activeCategory = 'all';
    categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    filterCatalog();
    saveRecentSearch(value);
    searchPanel?.classList.remove('open');
    if (shouldScroll) document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`Busca aplicada: ${value}`);
  }

  searchInput?.addEventListener('focus', () => {
    searchPanel?.classList.add('open');
  });

  searchInput?.addEventListener('input', () => {
    searchPanel?.classList.add('open');
    activeCategory = 'all';
    categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    filterCatalog();
  });

  searchInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySearch(searchInput.value);
    }
    if (event.key === 'Escape') {
      searchPanel?.classList.remove('open');
      searchInput.blur();
    }
  });

  document.querySelectorAll('[data-search]').forEach(button => {
    button.addEventListener('click', () => applySearch(button.dataset.search));
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.search-wrap')) searchPanel?.classList.remove('open');
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.dataset.category || 'all';
      if (searchInput) searchInput.value = '';
      filterCatalog('');
      showToast(`Filtro aplicado: ${button.textContent.trim()}`);
    });
  });

  document.querySelectorAll('[data-cart]').forEach(button => {
    button.addEventListener('click', () => {
      if (isGuest) {
        showToast('Faça login para adicionar itens ao carrinho.');
        return;
      }
      if (button.classList.contains('is-added')) {
        showToast('Este item já está no carrinho.');
        return;
      }
      button.classList.add('is-added');
      const text = button.querySelector('span');
      if (text) text.textContent = button.dataset.cart === 'header' ? 'Carrinho' : 'Adicionado ao carrinho';
      showToast('Adicionado ao carrinho com sucesso');
    });
  });

  document.querySelectorAll('[data-wishlist]').forEach(button => {
    button.addEventListener('click', () => {
      if (isGuest) {
        showToast('Faça login para adicionar jogos aos favoritos.');
        return;
      }
      const added = button.classList.toggle('is-added');
      const text = button.querySelector('span');
      if (text) text.textContent = added ? 'Adicionado à lista de desejos' : 'Adicionar à lista de desejos';
      showToast(added ? 'Adicionado aos favoritos com sucesso' : 'Removido da lista de desejos');
    });
  });

  document.querySelectorAll('[data-discover]').forEach(button => {
    button.addEventListener('click', () => {
      const game = button.dataset.discover || '';
      if (searchInput && catalogItems.length) {
        applySearch(game);
      } else {
        showToast(`Descobrindo ${game}`);
      }
    });
  });

  document.querySelectorAll('.user-menu').forEach(menuButton => {
    menuButton.addEventListener('click', event => {
      event.stopPropagation();
      const menuId = menuButton.getAttribute('aria-controls');
      const menu = menuId ? document.getElementById(menuId) : menuButton.parentElement?.querySelector('.account-menu');
      if (!menu) return;
      const willOpen = menu.hasAttribute('hidden');
      document.querySelectorAll('.account-menu').forEach(item => item.setAttribute('hidden', ''));
      document.querySelectorAll('.user-menu').forEach(item => item.setAttribute('aria-expanded', 'false'));
      if (willOpen) {
        menu.removeAttribute('hidden');
        menuButton.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.user-menu-wrap')) {
      document.querySelectorAll('.account-menu').forEach(menu => menu.setAttribute('hidden', ''));
      document.querySelectorAll('.user-menu').forEach(button => button.setAttribute('aria-expanded', 'false'));
    }
  });

  document.querySelectorAll('[data-logout]').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.removeItem('iaraAuth');
      window.location.href = 'index-visitante.html';
    });
  });

  const loginForm = document.querySelector('.login-form');
  loginForm?.addEventListener('submit', event => {
    event.preventDefault();
    localStorage.setItem('iaraAuth', 'logged');
    window.location.href = 'index.html';
  });

  document.querySelectorAll('.continue-button').forEach(button => {
    button.addEventListener('click', () => {
      const original = button.innerHTML;
      button.textContent = 'PARTIDA RETOMADA ✓';
      button.disabled = true;
      showToast('Partida retomada com sucesso');
      setTimeout(() => { button.innerHTML = original; button.disabled = false; }, 2200);
    });
  });

  filterCatalog();
});
