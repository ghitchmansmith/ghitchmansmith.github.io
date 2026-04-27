// ============================================================
//  BASECAMP STORE — Demo App for OneSignal Data Tags
//  Version: 1.1.0
// ============================================================

const APP_VERSION = '1.1.0';
console.log(`[Basecamp] v${APP_VERSION}`);

// ---- Product Catalog ----
const PRODUCTS = [
  {
    id: 1, name: "Alpine Down Jacket", category: "jackets", gender: "mens",
    price: 279, badge: "bestseller", colors: ["#2d3a4a","#5b7553","#1a1a1a"],
    sizes: ["S","M","L","XL","XXL"],
    sport: "climb",
    description: "Windproof 800-fill-power down jacket for alpine conditions. Lightweight, packable and built to last.",
    features: ["800-fill-power traceable down","Pertex® Quantum shell","Weighs just 340g","Packs into internal pocket"],
    colorBg: "#2d3a4a",
    image: "assets/product-alpine-down-jacket.avif"
  },
  {
    id: 2, name: "Trail Breeze Tee", category: "tops", gender: "womens",
    price: 45, badge: "new", colors: ["#d4a574","#7a9e7e","#3b3b3b"],
    sizes: ["XS","S","M","L","XL"],
    sport: "trail-run",
    description: "Moisture-wicking technical tee with UPF 30 sun protection. Made from recycled polyester.",
    features: ["Recycled polyester fabric","UPF 30 sun protection","Offset shoulder seams","Regular fit"],
    colorBg: "#d4a574",
    image: "assets/product-trail-breeze-tee.avif"
  },
  {
    id: 3, name: "Summit Fleece Pullover", category: "fleece", gender: "mens",
    price: 129, badge: null, colors: ["#5b7553","#b8860b","#2d2d2d"],
    sizes: ["S","M","L","XL"],
    sport: "hike",
    description: "Classic midweight fleece for layering or standalone wear on cool days. Fair Trade Certified™ sewn.",
    features: ["100% recycled polyester fleece","Fair Trade Certified™","Zippered chest pocket","Hip-length fit"],
    colorBg: "#5b7553",
    image: "assets/product-summit-fleece-pullover.avif"
  },
  {
    id: 4, name: "Coastal Shell Jacket", category: "jackets", gender: "womens",
    price: 199, salePrice: 149, badge: "sale", colors: ["#4a6fa5","#1a1a1a","#8b4513"],
    sizes: ["XS","S","M","L","XL"],
    sport: "surf",
    description: "Waterproof 3-layer shell built for coastal storms. H2No® Performance Standard protection.",
    features: ["H2No® waterproof/breathable","3-layer construction","Fully taped seams","Adjustable hood"],
    colorBg: "#4a6fa5",
    image: "assets/product-coastal-shell-jacket.avif"
  },
  {
    id: 5, name: "Granite Crag Pants", category: "bottoms", gender: "mens",
    price: 99, badge: null, colors: ["#6b6b6b","#3d3d2d","#1a1a1a"],
    sizes: ["28","30","32","34","36"],
    sport: "climb",
    description: "Durable stretch climbing pants with gusseted crotch for unrestricted movement.",
    features: ["Organic cotton/spandex blend","Gusseted crotch","Double-knee reinforcement","Integrated belt"],
    colorBg: "#6b6b6b",
    image: "assets/product-granite-crag-pants.avif"
  },
  {
    id: 6, name: "Ridgeline Nano Puff", category: "jackets", gender: "womens",
    price: 219, badge: "bestseller", colors: ["#c04040","#2d3a4a","#ddd"],
    sizes: ["XS","S","M","L","XL"],
    sport: "hike",
    description: "Warm, windproof insulation with PrimaLoft® Gold. Ideal as a midlayer or standalone.",
    features: ["60g PrimaLoft® Gold insulation","Pertex® windproof shell","Packs into internal pocket","Regular fit"],
    colorBg: "#c04040",
    image: "assets/product-ridgeline-nano-puff.avif"
  },
  {
    id: 7, name: "Black Hole Duffel 55L", category: "packs", gender: "all",
    price: 149, badge: "new", colors: ["#1a1a1a","#2d3a4a","#b8860b"],
    sizes: ["One Size"],
    sport: null,
    description: "Ultra-durable, weather-resistant duffel built from recycled materials. Converts to a backpack.",
    features: ["100% recycled body fabric","TPU-film laminate","U-shaped lid for easy packing","Padded backpack straps"],
    colorBg: "#1a1a1a",
    image: "assets/product-black-hole-duffel.avif"
  },
  {
    id: 8, name: "Torrentshell 3L Jacket", category: "jackets", gender: "mens",
    price: 159, badge: null, colors: ["#2d5a3d","#2d3a4a","#5a2d2d"],
    sizes: ["S","M","L","XL","XXL"],
    sport: "hike",
    description: "Our trusted 3-layer waterproof jacket for wet weather across any terrain.",
    features: ["H2No® 3-layer protection","100% recycled face fabric","Microfleece-lined neck","Two-way adjustable hood"],
    colorBg: "#2d5a3d",
    image: "assets/product-torrentshell-jacket.avif"
  },
  {
    id: 9, name: "Capilene Cool Trail Shirt", category: "tops", gender: "womens",
    price: 45, badge: null, colors: ["#7a9e7e","#b0c4de","#e8d4b8"],
    sizes: ["XS","S","M","L","XL"],
    sport: "trail-run",
    description: "Quick-dry, everyday performance shirt with HeiQ® Fresh odour control.",
    features: ["Recycled polyester/Tencel™ blend","HeiQ® Fresh odour control","UPF 20","Relaxed fit"],
    colorBg: "#7a9e7e",
    image: "assets/product-capilene-trail-shirt.avif"
  },
  {
    id: 10, name: "Baggies Shorts 5\"", category: "bottoms", gender: "mens",
    price: 55, badge: "bestseller", colors: ["#2d3a4a","#5b7553","#d4a574"],
    sizes: ["S","M","L","XL"],
    sport: "surf",
    description: "The original Baggies — quick-drying, versatile shorts that go from water to trail.",
    features: ["100% recycled nylon","DWR finish","Internal mesh liner","Two front pockets, one back"],
    colorBg: "#2d3a4a",
    image: "assets/product-baggies-shorts.avif"
  },
  {
    id: 11, name: "Powder Town Parka", category: "jackets", gender: "womens",
    price: 399, badge: "new", colors: ["#1a1a2e","#c04040","#ddd"],
    sizes: ["XS","S","M","L","XL"],
    sport: "snow",
    description: "Waterproof, insulated ski parka with GORE-TEX protection and 700-fill down.",
    features: ["2-layer GORE-TEX","700-fill-power down","Helmet-compatible hood","Powder skirt and gaiters"],
    colorBg: "#1a1a2e",
    image: "assets/product-powder-town-parka.avif"
  },
  {
    id: 12, name: "Kids' Retro-X Fleece", category: "fleece", gender: "kids",
    price: 89, badge: null, colors: ["#d4a574","#5b7553","#4a6fa5"],
    sizes: ["XS","S","M","L","XL"],
    sport: null,
    description: "Classic Retro-X fleece jacket sized for kids. Windproof and cosy.",
    features: ["100% recycled polyester fleece","Windproof membrane","Full-zip with chin guard","Handwarmer pockets"],
    colorBg: "#d4a574",
    image: "assets/product-retro-x-kids.avif"
  },
  {
    id: 13, name: "Ultralight Black Hole Pack 20L", category: "packs", gender: "all",
    price: 79, badge: null, colors: ["#1a1a1a","#2d5a3d","#4a6fa5"],
    sizes: ["One Size"],
    sport: "hike",
    description: "Packable, ultra-lightweight daypack for travel and day hikes.",
    features: ["100% recycled ripstop nylon","Packs into own pocket","Padded laptop sleeve","Weighs just 300g"],
    colorBg: "#2d5a3d",
    image: "assets/product-ultralight-pack.avif"
  },
  {
    id: 14, name: "Fjord Flannel Shirt", category: "tops", gender: "mens",
    price: 109, badge: null, colors: ["#8b4513","#2d3a4a","#5b7553"],
    sizes: ["S","M","L","XL","XXL"],
    sport: null,
    description: "Heavyweight organic cotton flannel for cold-weather comfort.",
    features: ["100% organic cotton","Midweight flannel weave","Button-front closure","Chest pockets with flaps"],
    colorBg: "#8b4513",
    image: "assets/product-fjord-flannel.avif"
  },
  {
    id: 15, name: "Micro Puff Hoody", category: "jackets", gender: "womens",
    price: 269, badge: null, colors: ["#b0c4de","#1a1a1a","#c04040"],
    sizes: ["XS","S","M","L","XL"],
    sport: "climb",
    description: "Revolutionary synthetic insulation that mimics the warmth of down at a fraction of the weight.",
    features: ["PlumaFill® synthetic insulation","Pertex® Quantum shell","65g packweight","Helmet-compatible hood"],
    colorBg: "#b0c4de",
    image: "assets/product-micro-puff-hoody.avif"
  },
  {
    id: 16, name: "Trucker Hat", category: "accessories", gender: "all",
    price: 35, badge: null, colors: ["#2d3a4a","#5b7553","#d4a574"],
    sizes: ["One Size"],
    sport: null,
    description: "Classic trucker hat with organic cotton front and breathable mesh back.",
    features: ["Organic cotton front panels","Polyester mesh back","Adjustable snap closure","Mid-crown fit"],
    colorBg: "#2d3a4a",
    image: "assets/product-trucker-hat.avif"
  }
];

// ---- State ----
let cart = [];
let dataTags = {};
let selectedProduct = null;
let selectedSize = null;

// ---- DOM Refs ----
const productsGrid = document.getElementById('productsGrid');
const productsTitle = document.getElementById('productsTitle');
const filterCategory = document.getElementById('filterCategory');
const filterGender = document.getElementById('filterGender');
const sortBy = document.getElementById('sortBy');
const productModal = document.getElementById('productModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const osTags = document.getElementById('osTags');

// ---- Render Products ----
function renderProducts() {
  let products = [...PRODUCTS];

  const catFilter = filterCategory.value;
  const genFilter = filterGender.value;
  const sort = sortBy.value;

  if (catFilter !== 'all') products = products.filter(p => p.category === catFilter);
  if (genFilter !== 'all') products = products.filter(p => p.gender === genFilter || p.gender === 'all');

  if (sort === 'price-low') products.sort((a,b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  else if (sort === 'price-high') products.sort((a,b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  else if (sort === 'newest') products.sort((a,b) => b.id - a.id);

  productsGrid.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-image" style="background-color: ${p.colorBg}; background-image: url('${p.image}'); background-size: cover; background-position: center;">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'bestseller' ? 'Best Seller' : p.badge === 'new' ? 'New' : 'Sale'}</span>` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${p.gender !== 'all' ? p.gender + "'s " : ''}${p.category}</p>
        <p class="product-name">${p.name}</p>
        <p class="product-color-count">${p.colors.length} colours</p>
        <p class="product-price">
          £${(p.salePrice || p.price).toFixed(2)}
          ${p.salePrice ? `<span class="original">£${p.price.toFixed(2)}</span>` : ''}
        </p>
      </div>
    </div>
  `).join('');

  // Attach click handlers
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openProduct(Number(card.dataset.id)));
  });
}

// ---- Open Product Detail ----
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  selectedProduct = p;
  selectedSize = null;

  document.getElementById('modalImage').style.backgroundColor = p.colorBg;
  document.getElementById('modalImage').style.backgroundImage = `url('${p.image}')`;
  document.getElementById('modalImage').style.backgroundSize = 'cover';
  document.getElementById('modalImage').style.backgroundPosition = 'center';
  document.getElementById('modalCategory').textContent = `${p.gender !== 'all' ? p.gender + "'s " : ''}${p.category}`;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').innerHTML = p.salePrice
    ? `£${p.salePrice.toFixed(2)} <span class="original" style="text-decoration:line-through;color:#999;font-weight:400;">£${p.price.toFixed(2)}</span>`
    : `£${p.price.toFixed(2)}`;
  document.getElementById('modalDescription').textContent = p.description;

  // Colors
  document.getElementById('modalColors').innerHTML = p.colors.map((c, i) =>
    `<div class="color-swatch ${i===0?'active':''}" style="background:${c};" data-color="${c}"></div>`
  ).join('');

  // Sizes
  document.getElementById('modalSizes').innerHTML = p.sizes.map(s =>
    `<button class="size-btn" data-size="${s}">${s}</button>`
  ).join('');

  // Features
  document.getElementById('modalFeatures').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  productModal.classList.add('active');

  // Size selection
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  // Color selection
  document.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
    });
  });

  // --- OneSignal: Tag product view ---
  setTag('last_product_viewed', p.name);
  setTag('last_category_viewed', p.category);
  if (p.gender !== 'all') setTag('last_gender_viewed', p.gender);
  if (p.sport) setTag('last_sport_interest', p.sport);
  incrementTag('product_views');

  const priceVal = p.salePrice || p.price;
  if (priceVal >= 200) setTag('price_affinity', 'premium');
  else if (priceVal >= 100) setTag('price_affinity', 'mid-range');
  else setTag('price_affinity', 'value');
}

// ---- Add to Cart ----
document.getElementById('addToCartBtn').addEventListener('click', () => {
  if (!selectedProduct) return;
  if (!selectedSize) {
    alert('Please select a size');
    return;
  }

  cart.push({
    ...selectedProduct,
    selectedSize,
    cartId: Date.now()
  });

  productModal.classList.remove('active');
  updateCart();

  // --- OneSignal: Tag add-to-cart ---
  setTag('last_item_added_to_cart', selectedProduct.name);
  setTag('last_item_added_time', Math.floor(Date.now() / 1000));
  setTag('last_cart_category', selectedProduct.category);
  incrementTag('items_in_cart');
  setTag('cart_value', cart.reduce((sum, item) => sum + (item.salePrice || item.price), 0));
  if (selectedProduct.salePrice) setTag('sale_shopper', 'true');
});

// ---- Cart ----
function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  const total = cart.reduce((sum, item) => sum + (item.salePrice || item.price), 0);
  cartTotal.textContent = `£${total.toFixed(2)}`;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image" style="background-color: ${item.colorBg}; background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">Size: ${item.selectedSize}</p>
        <p class="cart-item-price">£${(item.salePrice || item.price).toFixed(2)}</p>
        <p class="cart-item-remove" data-cart-id="${item.cartId}">Remove</p>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.cartId !== Number(btn.dataset.cartId));
      updateCart();
      setTag('items_in_cart', cart.length);
      setTag('cart_value', cart.reduce((sum, item) => sum + (item.salePrice || item.price), 0));
      if (cart.length === 0) {
        removeTag('last_item_added_to_cart');
        removeTag('last_item_added_time');
        removeTag('last_cart_category');
        removeTag('sale_shopper');
      }
    });
  });
}

// ---- Checkout ----
document.getElementById('checkoutBtn').addEventListener('click', () => {
  const total = cart.reduce((sum, item) => sum + (item.salePrice || item.price), 0);
  const categories = [...new Set(cart.map(i => i.category))];

  // --- OneSignal: Tag purchase ---
  setTag('last_purchase_value', total);
  setTag('last_purchase_categories', categories.join(', '));
  incrementTag('total_purchases');
  setTag('customer_type', 'purchaser');
  setTag('items_in_cart', 0);
  setTag('cart_value', 0);

  cart = [];
  updateCart();
  cartOverlay.classList.remove('active');
  alert('Order placed! Check the OneSignal panel to see your purchase tags.');
});

// ---- Modal / Cart open/close ----
document.getElementById('modalClose').addEventListener('click', () => productModal.classList.remove('active'));
productModal.addEventListener('click', (e) => { if (e.target === productModal) productModal.classList.remove('active'); });
document.getElementById('cartBtn').addEventListener('click', () => cartOverlay.classList.add('active'));
document.getElementById('cartClose').addEventListener('click', () => cartOverlay.classList.remove('active'));
cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) cartOverlay.classList.remove('active'); });

// ---- Hamburger ----
document.getElementById('hamburgerBtn').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ---- Filters ----
filterCategory.addEventListener('change', () => { renderProducts(); trackFilter(); });
filterGender.addEventListener('change', () => { renderProducts(); trackFilter(); });
sortBy.addEventListener('change', () => { renderProducts(); trackFilter(); });

function trackFilter() {
  if (filterCategory.value !== 'all') setTag('filter_category', filterCategory.value);
  if (filterGender.value !== 'all') setTag('filter_gender', filterGender.value);
}

// ---- Nav & Category link tracking ----
document.querySelectorAll('[data-category]').forEach(el => {
  el.addEventListener('click', (e) => {
    const cat = el.dataset.category;
    if (cat) {
      setTag('last_nav_click', cat);

      // Check gender-related categories
      if (cat.startsWith('womens')) setTag('gender_interest', 'womens');
      else if (cat.startsWith('mens')) setTag('gender_interest', 'mens');
      else if (cat === 'kids') setTag('gender_interest', 'kids');

      // Check sport-related
      const sports = ['climb','hike','trail-run','surf','snow','fly-fish'];
      if (sports.includes(cat)) setTag('sport_interest', cat);
    }
  });
});

// ---- Newsletter ----
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  if (email) {
    setTag('email', email);
    setTag('newsletter_subscriber', 'true');

    // Also add the email as a OneSignal email subscription
    OneSignalDeferred.push(function(OneSignal) {
      OneSignal.User.addEmail(email);
    });

    alert('Subscribed! Check the OneSignal panel to see your subscriber tags.');
    document.getElementById('newsletterEmail').value = '';
  }
});

// ---- OneSignal Panel Toggle ----
document.getElementById('osPanelToggle').addEventListener('click', () => {
  document.getElementById('osPanel').classList.toggle('collapsed');
});
document.querySelector('.os-panel-header').addEventListener('click', () => {
  document.getElementById('osPanel').classList.toggle('collapsed');
});

// ---- Clear Tags ----
document.getElementById('osClearTags').addEventListener('click', () => {
  const keys = Object.keys(dataTags);
  if (keys.length === 0) return;

  if (!confirm(`Remove all ${keys.length} tags from this user in OneSignal?`)) return;

  // Remove all tags from OneSignal
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.User.removeTags(keys);
    console.log('[OneSignal] Removed tags:', keys);
  });

  dataTags = {};
  renderTags();
});


// ============================================================
//  OneSignal Web SDK — Initialisation & Data Tags
// ============================================================

// Initialise OneSignal
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: "59ea98b1-26b6-4fe8-8ac9-803bdbf8ff99",
    notifyButton: {
      enable: true,
    },
  });
  console.log('[OneSignal] SDK initialised');

  // Restore the external ID if logged in, and re-login to refresh tags from server
  const storedExtId = OneSignal.User.externalId;
  if (storedExtId) {
    currentExternalId = storedExtId;
    updateAccountUI();

    // Re-login to sync tags from the server
    await OneSignal.login(storedExtId);
    console.log('[OneSignal] Re-logged in as:', storedExtId);

    // Now getTags() will have fresh server data
    try {
      const existingTags = OneSignal.User.getTags();
      if (existingTags && Object.keys(existingTags).length > 0) {
        Object.assign(dataTags, existingTags);
        renderTags();
        console.log('[OneSignal] Loaded tags from server:', existingTags);
      }
    } catch (e) {
      console.warn('[OneSignal] Could not retrieve tags:', e);
    }
  }
});

/**
 * Set a tag on the current user — updates both the local
 * demo panel AND the real OneSignal user profile.
 */
function setTag(key, value) {
  const strValue = String(value);
  dataTags[key] = strValue;
  renderTags();

  // Send to OneSignal
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.User.addTag(key, strValue);
  });
}

/**
 * Remove a tag from the current user.
 */
function removeTag(key) {
  delete dataTags[key];
  renderTags();

  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.User.removeTag(key);
  });
}

/**
 * Increment a numeric tag by 1.
 */
function incrementTag(key) {
  const newVal = (parseInt(dataTags[key]) || 0) + 1;
  setTag(key, newVal);
}

function renderTags() {
  const keys = Object.keys(dataTags);
  if (keys.length === 0) {
    osTags.innerHTML = '<p class="os-empty">Browse the store to see data tags populate in real-time...</p>';
    return;
  }

  osTags.innerHTML = keys.map(k => `
    <div class="os-tag">
      <span class="os-tag-key">${k}</span>
      <span class="os-tag-value">${dataTags[k]}</span>
    </div>
  `).join('');

}


// ---- Account / External ID Modal ----
const accountModal = document.getElementById('accountModal');
const externalIdInput = document.getElementById('externalIdInput');
const accountStatus = document.getElementById('accountStatus');
const accountSaveBtn = document.getElementById('accountSaveBtn');
const accountLogoutBtn = document.getElementById('accountLogoutBtn');
let currentExternalId = null;

function updateAccountUI() {
  if (currentExternalId) {
    accountStatus.innerHTML = `<span class="status-logged-in">Logged in as: ${currentExternalId}</span>`;
    externalIdInput.value = currentExternalId;
    accountSaveBtn.textContent = 'Update';
    accountLogoutBtn.style.display = 'block';
    // Update the nav icon to show logged-in state
    document.getElementById('accountBtn').style.color = 'var(--success)';
  } else {
    accountStatus.innerHTML = `<span class="status-logged-out">Not logged in</span>`;
    externalIdInput.value = '';
    accountSaveBtn.textContent = 'Save & Login';
    accountLogoutBtn.style.display = 'none';
    document.getElementById('accountBtn').style.color = '';
  }
}

document.getElementById('accountBtn').addEventListener('click', () => {
  // Try to retrieve the current external ID from the OneSignal SDK
  OneSignalDeferred.push(function(OneSignal) {
    const storedId = OneSignal.User.externalId;
    if (storedId) {
      currentExternalId = storedId;
    }
    updateAccountUI();
  });
  // Also update immediately in case the SDK hasn't loaded yet
  updateAccountUI();
  accountModal.classList.add('active');
});

document.getElementById('accountModalClose').addEventListener('click', () => {
  accountModal.classList.remove('active');
});
accountModal.addEventListener('click', (e) => {
  if (e.target === accountModal) accountModal.classList.remove('active');
});

accountSaveBtn.addEventListener('click', () => {
  const extId = externalIdInput.value.trim();
  if (!extId) {
    alert('Please enter an External ID');
    return;
  }

  currentExternalId = extId;

  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.login(extId);
    console.log(`[OneSignal] Logged in with external_id: ${extId}`);
  });

  setTag('external_id', extId);
  updateAccountUI();
  accountModal.classList.remove('active');
});

accountLogoutBtn.addEventListener('click', () => {
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.logout();
    console.log('[OneSignal] Logged out');
  });

  currentExternalId = null;
  removeTag('external_id');
  updateAccountUI();
  accountModal.classList.remove('active');
});

// ---- Demo Disclaimer Modal ----
document.getElementById('demoModalClose').addEventListener('click', () => {
  document.getElementById('demoModal').classList.add('hidden');
});

// ---- Initialize ----
renderProducts();
