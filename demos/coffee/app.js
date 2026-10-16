const brand = document.documentElement.dataset.brand;
const isStarbucks = brand === 'starbucks';
const assets = 'assets/';
const products = isStarbucks ? [
  { id:'black-glazed', name:'블랙 글레이즈드 라떼', en:'BLACK GLAZED LATTE', image:'sb-ProductPhotograph.png', type:'coffee', tag:'부드럽고 깊은 달콤함', description:'진한 커피와 부드러운 글레이즈드 폼이 어우러진 한 잔. 잠깐의 휴식이 필요한 순간, 풍성한 달콤함을 즐겨보세요.' },
  { id:'matcha-glazed', name:'말차 글레이즈드 티 라떼', en:'MATCHA GLAZED TEA LATTE', image:'sb-ProductPhotograph2.png', type:'tea', tag:'말차의 여운을 천천히', description:'말차의 은은한 풍미와 글레이즈드 폼의 부드러움. 익숙한 하루에 조금 다른 취향을 더해보세요.' },
  { id:'hojicha-glazed', name:'호지 글레이즈드 티 라떼', en:'HOJICHA GLAZED TEA LATTE', image:'sb-ProductPhotograph1.png', type:'tea', tag:'고소하고 편안한 한 모금', description:'깊고 고소한 호지차를 부드럽게 즐기는 티 라떼. 나만의 호흡으로 쉬어가는 시간에 잘 어울립니다.' },
  { id:'glazed-black-tea', name:'글레이즈드 폼 블랙 티', en:'GLAZED FOAM BLACK TEA', image:'sb-ProductPhotograph3.png', type:'refresh', tag:'홍차 위에 부드러운 달콤함', description:'향긋한 홍차와 부드러운 글레이즈드 폼을 함께 즐겨보세요. 익숙한 티 타임에 기분 좋은 달콤함을 더하는 한 잔입니다.' }
] : [
  { id:'strawberry', name:'스트로베리 초콜릿 생크림', en:'STRAWBERRY CHOCOLATE CAKE', image:'ts-StrawberryChocolateCakeCollection.png', type:'cake', tag:'진한 초콜릿에 더한 싱그러운 딸기.', description:'입안 가득 퍼지는 초콜릿의 풍미와 딸기의 싱그러움. 소중한 날에도, 평범한 하루에도 잘 어울리는 투썸의 케이크입니다.' },
  { id:'icebox', name:'아이스박스', en:'ICEBOX', image:'ts-IceboxCakeTexture.png', type:'cake', tag:'쿠키와 크림, 가장 기분 좋은 조합.', description:'부드러운 크림과 쿠키가 층층이 만나는 디저트. 한 조각을 천천히 즐기며 나만의 달콤한 시간을 만들어보세요.' },
  { id:'pairing', name:'커피와 디저트의 만남', en:'COFFEE & DESSERT PAIRING', image:'ts-CoffeePairingCollection.png', type:'coffee', tag:'함께할 때 더 풍부해지는 취향.', description:'깊은 커피 풍미와 부드러운 디저트가 만나는 순간. 오늘의 취향에 맞는 조합으로 투썸의 시간을 즐겨보세요.' }
];

// Browser storage is optional: the page remains functional when it is unavailable.
function readStored(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeStored(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* session-only fallback */ } }
let saved = readStored('twosome-favorites', []);
if (!Array.isArray(saved)) saved = [];
saved = saved.filter(id => typeof id === 'string');
let activeFilter = isStarbucks ? 'all' : 'cake';
const grid = document.getElementById('product-grid');
const dialog = document.querySelector('.product-dialog');
let dialogTrigger = null;

function productImage(product, modal = false) {
  return isStarbucks
    ? `<div class="drink-crop"><img src="${assets + product.image}" alt="${product.name}" width="309" height="408" ${modal ? '' : 'loading="lazy"'}></div>`
    : `<img src="${assets + product.image}" alt="${product.name}" width="920" height="920" ${modal ? '' : 'loading="lazy"'}>`;
}
function renderProducts() {
  let visible = products.filter(p => activeFilter === 'all' || (activeFilter === 'saved' ? saved.includes(p.id) : p.type === activeFilter));
  grid.innerHTML = visible.map(p => isStarbucks
    ? `<article class="sb-product"><button class="product-open" data-product="${p.id}" aria-label="${p.name} 상세 보기"><div class="sb-product-stage">${productImage(p)}<span class="product-detail-mark" aria-hidden="true">↗</span></div><h3>${p.name}</h3><p class="product-en">${p.en}</p><p class="product-tag">${p.tag}</p></button></article>`
    : `<article class="ts-product"><button class="product-open ts-product-image" data-product="${p.id}" aria-label="${p.name} 상세 보기">${productImage(p)}</button><p class="product-en">${p.en}</p><h3>${p.name}</h3><p class="product-tag">${p.tag}</p><div class="ts-product-actions"><button class="ts-detail-button" data-product="${p.id}">자세히 보기 <span aria-hidden="true">↗</span></button><button class="save-button" data-save="${p.id}" aria-pressed="${saved.includes(p.id)}" aria-label="${p.name} ${saved.includes(p.id) ? '저장 취소' : '저장'}">${saved.includes(p.id) ? '♥' : '♡'}</button></div></article>`
  ).join('');
  if (!visible.length) grid.innerHTML = '<div class="empty-state"><span aria-hidden="true">♡</span><h3>어떤 취향을 담아볼까요?</h3><p>마음에 드는 메뉴의 하트를 눌러<br>나만의 컬렉션을 만들어보세요.</p><button data-reset-filter>케이크 둘러보기 ↗</button></div>';
  document.querySelectorAll('[data-filter]').forEach(button => { const active = button.dataset.filter === activeFilter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
  const count = document.getElementById('saved-count');
  if (count) count.textContent = saved.filter(id => products.some(p => p.id === id)).length;
}
function openProduct(id, trigger) {
  const p = products.find(product => product.id === id);
  if (!p) return;
  dialogTrigger = trigger;
  const url = isStarbucks ? 'https://www.starbucks.co.kr/menu/drink_list.do' : 'https://www.twosome.co.kr';
  document.getElementById('dialog-content').innerHTML = `<div class="dialog-layout"><div class="dialog-visual">${productImage(p,true)}</div><div class="dialog-copy"><p class="product-en">${p.en}</p><h2 id="dialog-title">${p.name}</h2><p>${p.description}</p><p class="dialog-note">시안에 사용된 메뉴입니다. 실제 판매 여부와 알레르기 정보는 공식 홈페이지 또는 매장에서 확인해주세요.</p><a class="${isStarbucks ? 'button sb-button' : 'ts-button'}" href="${url}" target="_blank" rel="noopener">공식 메뉴 확인하기 <span aria-hidden="true">↗</span></a></div></div>`;
  dialog.showModal();
}
document.addEventListener('click', event => {
  const filter = event.target.closest('[data-filter]');
  if (filter) { activeFilter = filter.dataset.filter; renderProducts(); }
  const productButton = event.target.closest('[data-product]');
  if (productButton) openProduct(productButton.dataset.product, productButton);
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    const id = saveButton.dataset.save;
    const alreadySaved = saved.includes(id);
    saved = alreadySaved ? saved.filter(item => item !== id) : [...saved,id];
    writeStored('twosome-favorites', saved);
    renderProducts();
    const nextFocus = grid.querySelector(`[data-save="${id}"]`) || document.querySelector('[data-filter="saved"]');
    nextFocus?.focus({preventScroll:true});
    showToast(alreadySaved ? '담아둔 취향에서 삭제했어요.' : '좋아하는 취향에 담았어요.');
  }
  if (event.target.closest('[data-reset-filter]')) { activeFilter = 'cake'; renderProducts(); document.querySelector('[data-filter="cake"]').focus({preventScroll:true}); }
  const jump = event.target.closest('[data-jump-filter]');
  if (jump) { activeFilter = jump.dataset.jumpFilter; renderProducts(); }
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => dialogTrigger?.focus({preventScroll:true}));

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu(returnFocus = false) { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','메뉴 열기'); if (returnFocus) menuButton.focus(); }
menuButton.addEventListener('click', () => { const open = mobileNav.hidden; mobileNav.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기'); });
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width:768px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const themeKey = 'coffee-theme';
const colorPreference = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme) { document.documentElement.dataset.theme = theme; document.querySelector('.theme-toggle').setAttribute('aria-label', theme === 'dark' ? '밝은 화면으로 변경' : '어두운 화면으로 변경'); }
applyTheme(readStored(themeKey, colorPreference.matches ? 'dark' : 'light'));
document.querySelector('.theme-toggle').addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(theme); writeStored(themeKey,theme); });
colorPreference.addEventListener('change', event => { if (!readStored(themeKey,null)) applyTheme(event.matches ? 'dark' : 'light'); });

document.querySelectorAll('.store-search').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  const input = form.querySelector('input');
  const location = input.value.trim();
  if (!location) { input.setCustomValidity('지역 또는 매장명을 입력해주세요.'); input.reportValidity(); return; }
  const search = encodeURIComponent(`${location} ${form.dataset.storeBrand}`);
  window.open(`https://map.naver.com/p/search/${search}`, '_blank', 'noopener,noreferrer');
}));
document.querySelectorAll('.store-search input').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));

document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  const slides = [products[0],products[2],products[1]];
  const p = slides[Number(button.dataset.slide)];
  const image = document.getElementById('hero-drink');
  image.src = assets + p.image; image.alt = p.name;
  document.getElementById('hero-caption').textContent = p.tag + ', ' + p.name;
  document.querySelectorAll('[data-slide]').forEach(dot => { const active = dot === button; dot.classList.toggle('is-active',active); dot.setAttribute('aria-pressed',String(active)); });
}));
document.querySelectorAll('[data-pairing]').forEach(button => button.addEventListener('click', () => {
  const notes = ['초콜릿의 깊은 달콤함에 깔끔한 커피 한 모금. 기분 좋은 균형을 즐겨보세요.','쿠키와 크림의 달콤함에 부드러운 우유 커피를 더해, 더 포근한 디저트 시간을 만들어보세요.'];
  document.getElementById('pairing-note').textContent = notes[Number(button.dataset.pairing)];
  document.querySelectorAll('[data-pairing]').forEach(option => { const active = option === button; option.classList.toggle('is-active',active); option.setAttribute('aria-pressed',String(active)); });
}));
let toastTimeout;
function showToast(message) { const toast = document.querySelector('.toast'); if (!toast) return; clearTimeout(toastTimeout); toast.textContent = message; toast.classList.add('is-visible'); toastTimeout = setTimeout(() => toast.classList.remove('is-visible'),2300); }

renderProducts();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }),{threshold:0.07});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
