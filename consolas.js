(function() {
  // ----- CATÁLOGO DE CONSOLAS -----
  const consoles = [
    // NINTENDO
    { 
      id: 101, 
      name: "Nintendo Switch OLED", 
      brand: "nintendo", 
      price: 349.99, 
      specs: "Pantalla OLED 7\", 64GB, Modo portátil y TV",
      img: "https://placehold.co/300x300/e60012/white?text=Nintendo+Switch+OLED"
    },
    { 
      id: 102, 
      name: "Nintendo Switch", 
      brand: "nintendo", 
      price: 299.99, 
      specs: "Pantalla 6.2\", 32GB, Modo portátil y TV",
      img: "https://placehold.co/300x300/e60012/white?text=Nintendo+Switch"
    },
    { 
      id: 103, 
      name: "Nintendo Switch Lite", 
      brand: "nintendo", 
      price: 199.99, 
      specs: "Pantalla 5.5\", 32GB, Solo portátil",
      img: "https://placehold.co/300x300/e60012/white?text=Switch+Lite"
    },
    
    // SONY
    { 
      id: 104, 
      name: "PlayStation 5", 
      brand: "sony", 
      price: 499.99, 
      specs: "CPU AMD Zen 2, GPU RDNA 2, 16GB RAM, SSD 825GB",
      img: "https://placehold.co/300x300/003087/white?text=PS5"
    },
    { 
      id: 105, 
      name: "PlayStation 5 Digital", 
      brand: "sony", 
      price: 399.99, 
      specs: "CPU AMD Zen 2, GPU RDNA 2, 16GB RAM, SSD 825GB (Sin lector)",
      img: "https://placehold.co/300x300/003087/white?text=PS5+Digital"
    },
    { 
      id: 106, 
      name: "PlayStation 4 Pro", 
      brand: "sony", 
      price: 299.99, 
      specs: "CPU AMD Jaguar, GPU 4.2 TFLOPS, 8GB RAM, 1TB HDD",
      img: "https://placehold.co/300x300/003087/white?text=PS4+Pro"
    },
    
    // MICROSOFT
    { 
      id: 107, 
      name: "Xbox Series X", 
      brand: "microsoft", 
      price: 499.99, 
      specs: "CPU AMD Zen 2, GPU RDNA 2, 16GB RAM, SSD 1TB",
      img: "https://placehold.co/300x300/107c10/white?text=Xbox+Series+X"
    },
    { 
      id: 108, 
      name: "Xbox Series S", 
      brand: "microsoft", 
      price: 299.99, 
      specs: "CPU AMD Zen 2, GPU RDNA 2, 10GB RAM, SSD 512GB",
      img: "https://placehold.co/300x300/107c10/white?text=Xbox+Series+S"
    },
    { 
      id: 109, 
      name: "Xbox One X", 
      brand: "microsoft", 
      price: 249.99, 
      specs: "CPU AMD Jaguar, GPU 6 TFLOPS, 12GB RAM, 1TB HDD",
      img: "https://placehold.co/300x300/107c10/white?text=Xbox+One+X"
    }
  ];

  // ----- ESTADO -----
  let cart = [];

  // ----- DETECTAR PÁGINA -----
  const currentPage = window.location.pathname.split('/').pop() || 'consolas.html';
  let brandFilter = 'all';
  
  if (currentPage.includes('nintendo')) brandFilter = 'nintendo';
  else if (currentPage.includes('sony')) brandFilter = 'sony';
  else if (currentPage.includes('microsoft')) brandFilter = 'microsoft';

  // ----- DOM REFERENCIAS -----
  const consolesGrid = document.getElementById('consolesGrid');
  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const cartCount = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Navegación SPA (Contacto, About, Location)
  const navContact = document.getElementById('navContact');
  const navAbout = document.getElementById('navAbout');
  const navLocation = document.getElementById('navLocation');
  const pages = {
    consolas: document.getElementById('page-consolas'),
    contact: document.getElementById('page-contact'),
    about: document.getElementById('page-about'),
    location: document.getElementById('page-location')
  };

  // ----- FUNCIONES DE NAVEGACIÓN SPA -----
  function navigateTo(page) {
    Object.values(pages).forEach(p => {
      if (p) p.classList.remove('active');
    });
    if (pages[page]) {
      pages[page].classList.add('active');
    }
    // Actualizar links de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + page) {
        link.classList.add('active');
      }
    });
  }

  if (navContact) {
    navContact.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('contact');
    });
  }
  if (navAbout) {
    navAbout.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('about');
    });
  }
  if (navLocation) {
    navLocation.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('location');
    });
  }

  // ----- RENDER CONSOLAS -----
  function renderConsoles() {
    if (!consolesGrid) return;

    const filtered = brandFilter === 'all' 
      ? consoles 
      : consoles.filter(c => c.brand === brandFilter);

    if (filtered.length === 0) {
      consolesGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#6b7f93; padding:3rem 0;">No hay consolas disponibles en esta categoría.</p>`;
      return;
    }

    consolesGrid.innerHTML = filtered.map(console => {
      const brandColors = {
        nintendo: '#e60012',
        sony: '#003087',
        microsoft: '#107c10'
      };
      const color = brandColors[console.brand] || '#0b1a2e';
      
      return `
        <div class="console-card" data-id="${console.id}">
          <img src="${console.img}" alt="${console.name}" loading="lazy" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:20px; background:#f0f3f8;">
          <h3>${console.name}</h3>
          <p class="console-specs">${console.specs}</p>
          <p class="console-price" style="color: ${color};">$${console.price.toFixed(2)}</p>
          <button class="console-btn" data-id="${console.id}" style="background: ${color};">
            <i class="fas fa-cart-plus"></i> Añadir al carrito
          </button>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.console-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        addConsoleToCart(id);
      });
    });
  }

  // ----- FUNCIONES DEL CARRITO -----
  function addConsoleToCart(consoleId) {
    const consoleItem = consoles.find(c => c.id === consoleId);
    if (!consoleItem) return;

    if (cart.some(item => item.id === consoleId && item.type === 'console')) {
      alert('⚠️ Esta consola ya está en el carrito.');
      return;
    }

    cart.push({ ...consoleItem, type: 'console' });
    renderCart();
    if (cartCount) {
      cartCount.style.transform = 'scale(1.3)';
      setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function renderCart() {
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `<li class="empty-cart">🛒 No hay productos aún</li>`;
    } else {
      cartItemsList.innerHTML = cart.map((item, index) => `
        <li>
          <div class="item-info">
            <span class="item-title">${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
          </div>
          <button class="item-remove" data-index="${index}">✕</button>
        </li>
      `).join('');

      document.querySelectorAll('.item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.index);
          removeFromCart(idx);
        });
      });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    if (cartCount) cartCount.textContent = cart.length;
  }

  function clearCart() {
    cart = [];
    renderCart();
  }

  // ----- TOGGLE CARRITO -----
  function openCart() {
    if (cartOverlay) cartOverlay.classList.add('open');
    if (cartSidebar) cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('open');
    if (cartSidebar) cartSidebar.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('El carrito está vacío. Agrega algunas consolas.');
        return;
      }
      const total = cart.reduce((s, i) => s + i.price, 0);
      alert(`✅ Compra finalizada. Total: $${total.toFixed(2)}\n¡Gracias por tu compra!`);
      clearCart();
      closeCart();
    });
  }

  // Contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      alert(`✅ ¡Mensaje enviado!\n\nGracias ${name}, te responderemos a la brevedad.`);
      contactForm.reset();
    });
  }

  // ----- INICIO -----
  renderConsoles();
  renderCart();

  console.log('🛠️ GameStore Consolas iniciada.');
  console.log(`📌 Página: ${currentPage}, Filtro: ${brandFilter}`);
})();