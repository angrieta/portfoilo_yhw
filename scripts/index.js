'use strict';

const sectionNames = ['처음', '프로필', '웹 프로젝트', '브랜드·그래픽', '상세페이지', 'SNS 디자인', '배너 디자인', '연락처'];
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-section-menu';
mobileMenu.innerHTML = `<button type="button" class="section-menu-toggle" aria-label="섹션 메뉴" title="섹션 메뉴" aria-expanded="false" aria-controls="section-menu-links"><img src="./images/icons/menu.svg" alt=""></button><div id="section-menu-links" hidden>${sectionNames.map((name, index) => `<button type="button" data-section="${index}">${name}</button>`).join('')}</div>`;
document.querySelector('main > nav').append(mobileMenu);
const menuToggle = mobileMenu.querySelector('.section-menu-toggle');
const menuLinks = mobileMenu.querySelector('#section-menu-links');
function closeMenu() { menuLinks.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => {
    menuLinks.hidden = !menuLinks.hidden;
    menuToggle.setAttribute('aria-expanded', String(!menuLinks.hidden));
});
menuLinks.addEventListener('click', event => {
    const button = event.target.closest('[data-section]');
    if (button) { vertical.slideTo(Number(button.dataset.section), slideSpeed); closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click', event => { if (!mobileMenu.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menuLinks.hidden) { closeMenu(); menuToggle.focus(); } });
vertical.on('slideChange', () => {
    menuLinks.querySelectorAll('button').forEach((button, index) => {
        if (index === vertical.activeIndex) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
    });
});

document.querySelectorAll('.guide_btn').forEach((guide, index) => {
    const link = guide.querySelector('a');
    const label = guide.querySelector('p');
    link.addEventListener('mouseenter', () => {
        document.querySelectorAll('.guide_btn p').forEach(item => { item.style.opacity = '0'; });
        link.style.animation = 'btnScaleOn 0.5s forwards';
        label.style.animation = 'on 0.5s forwards';
    });
    link.addEventListener('mouseleave', () => {
        link.style.animation = 'btnScaleOff 0.5s forwards';
        label.style.animation = 'off 0.5s forwards';
    });
    link.addEventListener('click', event => {
        event.preventDefault();
        vertical.slideTo(index, slideSpeed);
    });
});

const popup = document.querySelector('.popup_bg');
const popupScroll = popup.querySelector('.scroll_wrap');
let galleryTrigger;
function closeGallery() {
    popup.style.display = 'none';
    vertical.mousewheel.enable();
    galleryTrigger?.focus({preventScroll:true});
}
popup.querySelector('.close').addEventListener('click', event => { event.preventDefault(); closeGallery(); });
popup.addEventListener('click', event => { if (event.target === popup) closeGallery(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && popup.style.display === 'block') closeGallery(); });
document.querySelectorAll('.sns_aria img, .banner_aria1 img, .banner_aria2 img, .detail_aria img').forEach((image, index) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `디자인 작업 ${index + 1} 확대`);
    function open() {
        galleryTrigger = image;
        popup.style.display = 'block';
        popupScroll.querySelector('img').src = image.dataset.fullSrc || image.src;
        popupScroll.querySelector('img').alt = image.alt || '디자인 작업 전체 이미지';
        popupScroll.style.maxWidth = image.closest('.detail_aria,.sns_aria') ? '800px' : '1000px';
        popupScroll.style.height = 'auto';
        popupScroll.style.margin = '80px auto';
        popupScroll.style.overflow = 'auto';
        popupScroll.style.padding = '0 20px';
        popupScroll.scrollTo(0, 0);
        vertical.mousewheel.disable();
        popup.querySelector('.close').focus();
    }
    image.addEventListener('click', open);
    image.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
});
