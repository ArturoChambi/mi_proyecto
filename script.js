(function() {
  // ----- CATÁLOGO DE JUEGOS (DATOS) -----
  const games = [
    { id: 1, title: "Cyberpunk 2077", genre: "rpg", price: 29.99, img: "https://placehold.co/300x300/1a2a3a/white?text=Cyberpunk" },
    { id: 2, title: "God of War Ragnarök", genre: "accion", price: 49.99, img: "https://placehold.co/300x300/2c3e4f/white?text=God+of+War" },
    { id: 3, title: "The Legend of Zelda", genre: "aventura", price: 59.99, img: "https://placehold.co/300x300/3d5a3d/white?text=Zelda" },
    { id: 4, title: "FIFA 24", genre: "deportes", price: 39.99, img: "https://placehold.co/300x300/1f4b4b/white?text=FIFA" },
    { id: 5, title: "Elden Ring", genre: "rpg", price: 44.99, img: "https://placehold.co/300x300/2a1f2a/white?text=Elden+Ring" },
    { id: 6, title: "Call of Duty", genre: "accion", price: 34.99, img: "https://placehold.co/300x300/3a2a1a/white?text=COD" },
    { id: 7, title: "Hogwarts Legacy", genre: "aventura", price: 54.99, img: "https://placehold.co/300x300/2a2a3a/white?text=Hogwarts" },
    { id: 8, title: "NBA 2K24", genre: "deportes", price: 44.99, img: "https://placehold.co/300x300/1f3a3a/white?text=NBA2K" },
    { id: 9, title: "Diablo IV", genre: "rpg", price: 49.99, img: "https://placehold.co/300x300/2a1f1f/white?text=Diablo" },
    { id: 10, title: "Spider-Man 2", genre: "accion", price: 59.99, img: "https://placehold.co/300x300/1f2a3a/white?text=Spider-Man" }
  ];

  // ----- ESTADO -----
  let cart = [];
  let currentFilter = 'all';

  // ----- DOM REFERENCIAS -----
  const grid = document.getElementById('gamesGrid');
  const filterBtns = document.querySelectorAll('#filterContainer button');
  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const cartCount = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // ----- FUNCIONES DE RENDER -----
  function renderGames(filter = 'all') {
    const filtered = filter === 'all' 
      ? games 
      : games.filter(g => g.genre === filter);

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#6b7f93; padding:3rem 0;">No hay juegos en esta categoría.</p>`;
      return;
    }

    grid.innerHTML = filtered.map(game => `
      <div class="game-card" data-id="${game.id}">
        <img src="${game.img}" alt="${game.title}" loading="lazy">
        <h3>${game.title}</h3>
        <span class="genre">${game.genre}</span>
        <span class="price">$${game.price.toFixed(2)}</span>
        <button class="add-btn" data-id="${game.id}">
          <i class="fas fa-cart-plus"></i> Añadir
        </button>
      </div>
    `).join('');

    // Asignar eventos a los botones "Añadir"
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
      });
    });
  }

  function renderCart() {
    // Mostrar items
    if (cart.length === 0) {
      cartItemsList.innerHTML = `<li class="empty-cart">🛒 No hay juegos aún</li>`;
    } else {
      cartItemsList.innerHTML = cart.map((item, index) => `
        <li>
          <div class="item-info">
            <span class="item-title">${item.title}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
          </div>
          <button class="item-remove" data-index="${index}">✕</button>
        </li>
      `).join('');

      // Eventos para eliminar items
      document.querySelectorAll('.item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.index);
          removeFromCart(idx);
        });
      });
    }

    // Actualizar total y contador
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
  }

  // ----- FUNCIONES DEL CARRITO -----
  function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Evitar duplicados (si ya está, no se agrega de nuevo)
    if (cart.some(item => item.id === gameId)) {
      alert('⚠️ Este juego ya está en el carrito.');
      return;
    }

    cart.push({ ...game });
    renderCart();
    // Animación sutil en el ícono
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function clearCart() {
    cart = [];
    renderCart();
  }

  // ----- TOGGLE CARRITO SIDEBAR -----
  function openCart() {
    cartOverlay.classList.add('open');
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay.classList.remove('open');
    cartSidebar.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ----- EVENTOS UI -----
  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGames(currentFilter);
    });
  });

  // Abrir/cerrar carrito
  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega algunos juegos.');
      return;
    }
    alert(`✅ Compra finalizada. Total: $${cart.reduce((s, i) => s + i.price, 0).toFixed(2)}\n¡Gracias por tu compra!`);
    clearCart();
    closeCart();
  });

  // ----- INICIO -----
  renderGames('all');
  renderCart();

  // Pequeño mensaje en consola para contar commits (simbólico)
  console.log('🛠️ GameStore iniciada. ¡Lista para jugar!');
})();