'use strict';

window.portfolioCreative = [
    { id: 'gift-voucher', category: 'banner', title: '신세계·이마트 상품권', brand: 'CARBAY', size: '1600 × 400', description: '계약 고객 혜택을 강조한 리스트 배너. 상품권 이미지와 핵심 지급 문구를 중심으로 구성했습니다.' },
    { id: 'live-stock', category: 'banner', title: '즉시출고 실시간 리스트', brand: 'CARBAY', size: '1600 × 400', description: '모델과 차량 이미지를 합성하고, 실시간 재고 확인으로 이어지는 메시지를 배치한 배너입니다.' },
    { id: 'rent-lease-test', category: 'banner', title: '렌트 vs 리스, 60초 테스트', brand: 'CARBAY', size: '1600 × 400', description: '상품 선택 테스트를 소개하는 배너. 진단 콘셉트의 모델 이미지와 큰 타이포그래피로 주제를 전달했습니다.' },
    { id: 'summer-promotion', category: 'detail', title: '8월 여름 특가 프로모션', brand: 'CARBAY', size: '1000 × 2025', description: '계절감 있는 키 비주얼부터 차량별 가격 비교, 신청 영역까지 이어지는 프로모션 상세페이지입니다.' },
    { id: 'chuseok-promotion', category: 'detail', title: '9월 한가위 프로모션', brand: 'CARBAY · CHANAWA', size: '1000 × 3013', description: '보름달과 한가위 분위기의 메인 비주얼, 차량별 혜택 목록으로 구성한 프로모션 상세페이지입니다.' },
    { id: 'review-popup', category: 'popup', title: '출고후기 이벤트 팝업', brand: 'CARBAY', size: '372 × 811', description: '후기 작성 혜택과 참여 단계를 담은 모바일 팝업 적용 화면입니다. 배경 사이트와 함께 실제 노출 구성을 보여줍니다.' },
    { id: 'carbay-instock', category: 'banner', title: 'FAST 즉시출고', brand: 'CARBAY', size: '1600 × 400', node: '899:1365', description: '차량 이미지와 입체 타이포그래피로 빠른 출고 메시지를 전달한 서비스 배너입니다.' },
    { id: 'carbay-rent-lease', category: 'banner', title: '렌트 vs 리스 비교', brand: 'CARBAY', size: '1600 × 400', node: '899:1382', description: '렌트와 리스 비교 콘텐츠의 진입 배너. 두 차량을 양쪽에 배치해 비교 주제를 시각화했습니다.' },
    { id: 'carbay-discount', category: 'banner', title: '장기렌트 혜택 안내', brand: 'CARBAY', size: '1600 × 400', node: '899:1414', description: '혜택 메시지와 그래픽을 조합한 리스트 배너입니다.' },
    { id: 'carbay-coffee', category: 'banner', title: '고객 리뷰 · 커피 쿠폰', brand: 'CARBAY', size: '1600 × 400', node: '901:1498', description: '고객 리뷰 확인과 쿠폰 혜택을 연결한 이벤트 배너입니다.' },
    { id: 'carpro-promotion-a', category: 'banner', title: '최대 할인 프로모션', brand: 'CARPRO', size: '1200 × 760', node: '1873:846', description: '입체 그래픽과 금액 타이포그래피로 프로모션 혜택을 강조한 배너 시안입니다.' },
    { id: 'carpro-promotion-b', category: 'banner', title: '무심사 · 최대 할인', brand: 'CARPRO', size: '1200 × 760', node: '1962:141', description: '차량 이미지와 혜택 문구, 신청 버튼으로 구성한 카프로 프로모션 배너입니다.' },
    { id: 'carbay-popup', category: 'popup', title: '출고후기 감사 선물', brand: 'CARBAY', size: '1132 × 1426', node: '1935:12', description: '모델과 선물 상자, 상품권을 합성해 후기 작성 혜택을 표현한 팝업 디자인입니다.' },
    { id: 'carpro-white-logo', category: 'brand', title: 'CARPRO 로고 활용안', brand: 'CARPRO', size: '404 × 62', node: '1324:27', description: '카프로 작업 파일에 포함된 화이트 로고 적용 자산입니다. 브랜드 아이덴티티의 활용 작업으로 정리했습니다.', dark: true },
    { id: 'carpro-style-guide', category: 'brand', title: 'CARPRO 타이포그래피 가이드', brand: 'CARPRO', size: '1520 × 1172', node: '1702:6259', description: '서비스 화면에서 사용하는 제목과 본문, 강조 문구의 타이포그래피를 정리한 스타일 가이드입니다.' },
    { id: 'carbay-business-card-a', category: 'concept', title: '전자명함 · 라이트 시안', brand: 'CARBAY', size: '390 × 1800', node: '2075:29', description: '담당자 소개, 상담 진입, 출고후기를 연결한 모바일 전자명함 UI 시안입니다. 화면의 인물 정보와 서비스 수치는 시안에 포함된 예시이며 포트폴리오 작성자의 성과가 아닙니다.' },
    { id: 'carbay-business-card-b', category: 'concept', title: '전자명함 · 다크 시안', brand: 'CARBAY', size: '390 × 1800', node: '2075:255', description: '동일한 전자명함 구조를 다크 톤으로 전개한 모바일 UI 시안입니다. 화면의 인물 정보와 서비스 수치는 시안에 포함된 예시이며 포트폴리오 작성자의 성과가 아닙니다.' }
];

(() => {
    const works = window.portfolioCreative;
    const categories = { all: '전체', banner: '배너', detail: '상세페이지', popup: '팝업', brand: '로고·브랜딩', concept: 'UI 시안' };
    const section = document.createElement('section');
    section.className = 'swiper-slide creative-section';
    section.id = 'creative-work';
    section.innerHTML = `<div class="creative-shell"><header class="creative-heading"><div><p>2025 - PRESENT / CARBAY</p><h2>Brand & Graphic</h2></div><span class="creative-total">${works.length} works</span></header><div class="creative-tabs" role="tablist" aria-label="디자인 작업 분류">${Object.entries(categories).map(([key, label], i) => `<button type="button" id="creative-tab-${key}" role="tab" aria-controls="creative-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-category="${key}">${label}<span>${key === 'all' ? works.length : works.filter(item => item.category === key).length}</span></button>`).join('')}</div><div class="swiper creative-scroll" id="creative-panel" role="tabpanel" aria-labelledby="creative-tab-all"><div class="swiper-wrapper"><div class="swiper-slide creative-scroll-content"><div class="creative-grid"></div></div></div><div class="creative-scrollbar"></div></div></div>`;
    document.querySelector('.vertical_3').after(section);
    const guide = document.createElement('div');
    guide.className = 'guide_btn';
    guide.innerHTML = '<p>BRAND & GRAPHIC</p><a href="#creative-work" aria-label="브랜드·그래픽 작업"></a>';
    document.querySelectorAll('.guide_btn')[2].after(guide);

    const dialog = document.createElement('dialog');
    dialog.className = 'creative-dialog';
    dialog.setAttribute('aria-labelledby', 'creative-dialog-title');
    dialog.innerHTML = '<header class="creative-dialog-bar"><p id="creative-dialog-title"></p><button type="button" class="creative-close" aria-label="작업 닫기" title="닫기"><img src="./images/icons/x.svg" alt=""></button></header><div class="creative-dialog-body"></div><footer class="creative-dialog-footer"><button type="button" data-creative-step="-1" aria-label="이전 작업" title="이전 작업"><img class="previous-icon" src="./images/icons/arrow-right.svg" alt=""></button><span class="creative-position"></span><button type="button" data-creative-step="1" aria-label="다음 작업" title="다음 작업"><img src="./images/icons/arrow-right.svg" alt=""></button></footer>';
    document.body.append(dialog);
    const grid = section.querySelector('.creative-grid');
    let filtered = works;
    let selected = 0;
    let trigger = null;

    function render(category) {
        filtered = category === 'all' ? works : works.filter(item => item.category === category);
        grid.dataset.category = category;
        section.querySelectorAll('[role="tab"]').forEach(button => {
            const active = button.dataset.category === category;
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
        section.querySelector('[role="tabpanel"]').setAttribute('aria-labelledby', `creative-tab-${category}`);
        grid.innerHTML = filtered.map(item => `<button type="button" class="creative-item ${item.category}" data-creative="${item.id}" aria-label="${item.title} 자세히 보기"><span class="creative-preview ${item.dark ? 'dark-preview' : ''}"><img src="./images/creative/${item.id}-thumb.webp" alt="${item.title}" width="${item.size.split(' × ')[0]}" height="${item.size.split(' × ')[1]}" loading="lazy"><span class="creative-expand"><img src="./images/icons/arrow-up-right.svg" alt=""></span></span><span class="creative-caption"><span class="creative-brand">${item.brand} · ${categories[item.category]}</span><strong>${item.title}</strong><span class="creative-size">${item.size}</span></span></button>`).join('');
        if (window.creativeScroller) {
            window.creativeScroller.update();
            window.creativeScroller.setTranslate(0);
        }
    }
    function show(index) {
        selected = (index + filtered.length) % filtered.length;
        const item = filtered[selected];
        dialog.querySelector('#creative-dialog-title').textContent = item.title;
        dialog.querySelector('.creative-dialog-body').innerHTML = `<div class="creative-description"><p class="creative-brand">${item.brand} · ${categories[item.category]} · ${item.size}</p><p>${item.description}</p><div class="creative-links"><a href="./images/creative/${item.id}.webp" target="_blank" rel="noopener noreferrer">전체 이미지<img src="./images/icons/maximize-2.svg" alt=""></a>${item.node ? `<a href="https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=${item.node.replace(':', '-')}" target="_blank" rel="noopener noreferrer">Figma 원문<img src="./images/icons/arrow-up-right.svg" alt=""></a>` : ''}</div></div><div class="creative-full ${item.dark ? 'dark-preview' : ''}"><img src="./images/creative/${item.id}.webp" alt="${item.title}" width="${item.size.split(' × ')[0]}" height="${item.size.split(' × ')[1]}"></div>`;
        dialog.querySelector('.creative-position').textContent = `${String(selected + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
        if (!dialog.open) dialog.showModal();
        dialog.scrollTop = 0;
        window.vertical.mousewheel.disable();
    }
    section.querySelector('.creative-tabs').addEventListener('click', event => {
        const tab = event.target.closest('[data-category]');
        if (tab) render(tab.dataset.category);
    });
    section.querySelector('.creative-tabs').addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const tabs = [...section.querySelectorAll('[role="tab"]')];
        const current = tabs.indexOf(document.activeElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        tabs[next].focus();
        render(tabs[next].dataset.category);
    });
    grid.addEventListener('click', event => {
        const button = event.target.closest('[data-creative]');
        if (!button) return;
        trigger = button;
        show(filtered.findIndex(item => item.id === button.dataset.creative));
    });
    dialog.querySelector('.creative-close').addEventListener('click', () => dialog.close());
    dialog.querySelectorAll('[data-creative-step]').forEach(button => button.addEventListener('click', () => show(selected + Number(button.dataset.creativeStep))));
    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(selected + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { window.vertical.mousewheel.enable(); trigger?.focus({preventScroll:true}); });
    render('all');
    document.addEventListener('DOMContentLoaded', () => {
        window.creativeScroller = new Swiper('.creative-scroll', {direction:'vertical',slidesPerView:'auto',freeMode:true,nested:true,mousewheel:{releaseOnEdges:true},scrollbar:{el:'.creative-scrollbar',draggable:true}});
        grid.addEventListener('load', () => window.creativeScroller.update(), true);
    });
})();
