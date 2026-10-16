'use strict';

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '전체 메뉴 열기');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });

const slides = [
  ['ts-StrawberryChocolateCakeCollection.png', '딸기와 초콜릿이 어우러진 투썸 시그니처 케이크 컬렉션', 'TWOSOME SIGNATURE · 스초생®'],
  ['ts-IceboxCakeTexture.png', '쿠키와 크림이 층층이 쌓인 아이스박스', 'TWOSOME SIGNATURE · 아박']
];
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  const [image, alt, caption] = slides[Number(button.dataset.slide)];
  const photo = document.getElementById('hero-cake');
  photo.src = 'assets/' + image;
  photo.alt = alt;
  document.getElementById('hero-caption').textContent = caption;
  document.querySelectorAll('[data-slide]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));

const dialog = document.querySelector('.detail-dialog');
const content = document.getElementById('dialog-content');
let dialogTrigger = null;
const arrow = '<img class="icon" src="assets/ts-ArrowRight.svg" width="18" height="18" alt="">';
const officialLink = '<a class="button" href="https://www.twosome.co.kr" target="_blank" rel="noopener">공식 홈페이지에서 확인' + arrow + '</a>';
const appLinks = '<div class="app-links"><a class="button" href="https://apps.apple.com/kr/app/id1225957208" target="_blank" rel="noopener">App Store' + arrow + '</a><a class="button" href="https://play.google.com/store/apps/details?id=com.cj.twosome" target="_blank" rel="noopener">Google Play' + arrow + '</a></div>';
const products = {
  icebox: {name:'아박 · 아이스박스', en:'COOKIES & CREAM', image:'ts-IceboxCakeTexture.png', description:'블랙 쿠키와 마스카포네 크림이 층층이. 부드러운 크림과 진한 쿠키가 어우러지는 투썸의 시그니처 디저트입니다.'},
  strawberry: {name:'스초생®', en:'STRAWBERRY CHOCOLATE', image:'ts-StrawberryChocolateCakeCollection.png', description:'딸기의 싱그러움과 진한 초콜릿의 달콤함. 특별한 날에도, 평범한 하루에도 좋은 순간을 완성해 주는 케이크입니다.'}
};
const panels = {
  app: '<div class="dialog-copy wide"><p class="eyebrow">TWOSOME HEARTS</p><h2 id="dialog-title">달콤한 일상을, 앱에서</h2><p>사용하는 기기에 맞는 앱 스토어에서 투썸하트를 만나보세요.</p>' + appLinks + '</div>',
  membership: '<div class="dialog-copy wide"><p class="eyebrow">TWOSOME HEARTS</p><h2 id="dialog-title">하트로 이어지는 좋은 순간</h2><p>하트와 스탬프를 모으고, 투썸오더로 편하게 주문하고, 좋아하는 케이크를 미리 예약해 보세요. 자세한 멤버십 혜택은 투썸하트 앱에서 확인할 수 있어요.</p>' + appLinks + '</div>',
  stores: '<div class="dialog-copy wide"><p class="eyebrow">FIND YOUR PLACE</p><h2 id="dialog-title">어느 동네에서 만날까요?</h2><p>지역이나 매장명을 입력하면 네이버 지도에서 가까운 투썸을 확인할 수 있어요.</p><form class="store-search"><label for="store-query" class="sr-only">지역 또는 매장명</label><input id="store-query" name="location" placeholder="예: 성수, 강남역" required maxlength="80" autocomplete="off"><button class="button" type="submit">매장 검색' + arrow + '</button></form></div>',
  english: '<div class="dialog-copy wide" lang="en"><p class="eyebrow">A TWOSOME PLACE · SINCE 2002</p><h2 id="dialog-title">The art of pairing.</h2><p>A carefully crafted dessert. A cup of coffee that suits your taste. Discover signature cakes, three coffee blends, and a place to enjoy your everyday moments.</p><a class="button" href="https://mcdn.twosome.co.kr/upload/home/contents/brandBook.pdf" target="_blank" rel="noopener">Explore the brand' + arrow + '</a></div>',
  film: '<div class="dialog-copy wide"><p class="eyebrow">TWOSOME BRAND FILM</p><h2 id="dialog-title">일상의 순간을 더 달콤하게</h2><img class="film-preview" src="assets/ts-OfficialTwosomeBrandFilm.png" alt="투썸플레이스 브랜드 필름"><p>투썸플레이스 공식 홈페이지에서 브랜드 영상과 새로운 캠페인을 만나보세요.</p>' + officialLink + '</div>'
};
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-dialog]');
  if (!trigger) return;
  const key = trigger.dataset.dialog;
  const product = products[key];
  if (product) {
    content.innerHTML = `<div class="dialog-layout"><img src="assets/${product.image}" alt="${product.name}"><div class="dialog-copy"><p class="eyebrow">${product.en}</p><h2 id="dialog-title">${product.name}</h2><p>${product.description}</p><p class="dialog-note">판매 여부와 알레르기 정보는 공식 홈페이지 또는 매장에서 확인해주세요.</p>${officialLink}</div></div>`;
  } else if (panels[key]) { content.innerHTML = panels[key]; }
  else return;
  dialogTrigger = trigger;
  closeMenu();
  dialog.showModal();
  if (key === 'stores') content.querySelector('input').focus();
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { content.innerHTML = ''; dialogTrigger?.focus({preventScroll:true}); });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
content.addEventListener('submit', event => {
  if (!event.target.matches('.store-search')) return;
  event.preventDefault();
  const input = event.target.querySelector('input');
  const query = input.value.trim();
  if (!query) { input.setCustomValidity('지역 또는 매장명을 입력해주세요.'); input.reportValidity(); return; }
  window.open('https://map.naver.com/p/search/' + encodeURIComponent('투썸플레이스 ' + query), '_blank', 'noopener,noreferrer');
});
content.addEventListener('input', event => { if (event.target.matches('input')) event.target.setCustomValidity(''); });
