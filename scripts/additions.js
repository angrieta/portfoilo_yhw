'use strict';

(() => {
    const projects = window.portfolioProjects;
    const wrapper = document.querySelector('.web_contents > .swiper-wrapper');
    const dialog = document.querySelector('#work-dialog');
    const body = dialog.querySelector('.work-dialog-body');
    const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
    const asset = name => `./images/work/${name}`;
    const profilePage = document.querySelector('.profile_page');
    const profileScroll = document.createElement('div');
    profileScroll.className = 'swiper profile-scroll';
    profileScroll.innerHTML = '<div class="swiper-wrapper"><div class="swiper-slide profile-scroll-content"></div></div>';
    profilePage.before(profileScroll);
    profileScroll.querySelector('.profile-scroll-content').append(profilePage);

    wrapper.insertAdjacentHTML('afterbegin', projects.map(project => {
        const personal = project.id === 'carmong';
        const image = personal
            ? `<div class="added-project-preview personal-preview"><img src="${asset('carmong-home.jpg')}" alt="CARMONG 메인 디자인"><img src="${asset('carmong-cars.jpg')}" alt="CARMONG 차량 목록 디자인"></div>`
            : `<div class="added-project-preview"><img src="${asset(project.image)}" alt="${escape(project.name)} ${escape(project.status)}"></div>`;
        return `<div class="swiper-slide added-project" data-work="${project.id}">
            <div class="web_inner">
                ${image}
                <div class="design_text_box">
                    <div class="design_text">${personal ? 'PERSONAL DESIGN' : 'COMPANY WORK'}</div>
                    <h3>${escape(project.name)}${personal ? '' : ` ${project.english}`}</h3>
                    <ul>
                        <li><em>Type</em><span>${escape(project.category)}</span></li>
                        <li><em>Role</em><span>${escape(project.role)}</span></li>
                        <li><em>${personal ? 'Page' : 'Period'}</em><span>${personal ? '메인 · 차량 목록 · 상세 · FAQ' : '2025.09.01 ~ 현재 재직 중 진행'}</span></li>
                        <li><em>Status</em><span>${escape(project.status)}</span></li>
                    </ul>
                    <p class="added-project-summary">${personal ? '회사 업무와 별개로 제작한 디자인 시안 #3 · #4' : escape(project.summary)}</p>
                    <button type="button" class="work-open" data-project="${project.id}">${personal ? '디자인 시안 보기' : '프로젝트 · 전후 비교'}<img src="./images/icons/arrow-up-right.svg" alt=""></button>
                </div>
            </div>
        </div>`;
    }).join(''));

    const projectNames = ['카베이', '카프로', '차나와', 'CARMONG', '베베드피노', '타임클리닉', 'M-mall', 'NuPhy', '크라이저'];
    const projectIds = ['carbay', 'carpro', 'chanawa', 'carmong', 'bebedepino', 'time-clinic', 'm-mall', 'nuphy', 'krizer'];
    const projectScrollers = [];
    Array.from(wrapper.children).forEach((slide, index) => {
        slide.dataset.work = projectIds[index];
        slide.id = `work-slide-${projectIds[index]}`;
        const inner = slide.querySelector('.web_inner');
        inner.firstElementChild.classList.add('project-visual');
        const description = inner.querySelector('.design_text_box');
        let project = projects.find(item => item.id === projectIds[index]);
        if (!project) {
            const rows = [...description.querySelectorAll('li')];
            const value = label => rows.find(row => row.querySelector('em')?.textContent === label)?.querySelector('span')?.textContent.trim() || '';
            const internship = projectIds[index] === 'krizer';
            const image = inner.querySelector('img');
            project = {
                id: projectIds[index], name: projectNames[index], type: internship ? '인턴 실무' : '개인 리디자인',
                category: internship ? '브랜드 · 제품 랜딩페이지' : value('Type'),
                role: 'UI 디자인 · 퍼블리싱', period: value('Deadline').replace(/\s*\([^)]*\)/g, ''),
                scope: value('Page'), display: value('Display'), status: internship ? '인턴 프로젝트' : '개인 프로젝트',
                preview: image.getAttribute('src'),
                title: internship ? '브랜드와 제품을 소개하는 랜딩 디자인' : `${projectNames[index]} 웹사이트 리디자인`,
                summary: value('Page').replaceAll(',', ' ·'),
                intro: internship ? '크라이저 인턴 기간에 진행한 메인 및 제품 랜딩페이지 작업입니다. 브랜드와 제품 정보를 전달하는 화면을 디자인했습니다.' : `${projectNames[index]}의 브랜드와 콘텐츠를 바탕으로 진행한 개인 리디자인입니다. ${value('Page')}를 디자인하고 퍼블리싱했습니다.`,
                changes: [['작업 화면', value('Page')], ['화면 대응', value('Display')]],
                tools: description.querySelector('.tool_img')?.outerHTML || '',
                note: internship ? '인턴 기간에 제작한 메인 및 제품 랜딩페이지입니다.' : '학습과 포트폴리오를 위한 개인 리디자인이며, 해당 브랜드의 공식 프로젝트가 아닙니다.',
                links: [...description.querySelectorAll('a')].map(link => [link.textContent.trim().replace('FIGMA 기획보기', 'Figma 작업 파일').replace('프로토 타입보기', '구현 사이트').replace('원본사이트 보기', '원본 사이트'), link.href])
            };
            projects.push(project);
            image.alt = `${project.name} 작업 화면`;
        }
        project.period ||= project.id === 'carmong' ? '개인 디자인 시안' : '2025.09.01 ~ 현재';
        project.scope ||= project.id === 'carmong' ? '메인 · 차량 목록 · 상세 · FAQ' : project.status;
        const category = project.type === '회사 프로젝트' || project.id === 'krizer' ? 'COMPANY WORK' : 'PERSONAL PROJECT';
        description.innerHTML = `<div class="project-eyebrow"><span class="design_text">${category}</span><span class="project-number">${String(index + 1).padStart(2, '0')} / 09</span></div><h3>${escape(project.name)}</h3><p class="added-project-summary">${escape(project.summary || project.title)}</p><ul><li><em>분야</em><span>${escape(project.category)}</span></li><li><em>담당</em><span>${escape(project.role)}</span></li><li><em>기간</em><span>${escape(project.period)}</span></li><li><em>화면</em><span>${escape(project.scope)}</span></li></ul><div class="project-actions"><button type="button" class="work-open" data-project="${project.id}">프로젝트 보기<img src="./images/icons/arrow-up-right.svg" alt=""></button></div>`;
        const scrollViewport = document.createElement('div');
        scrollViewport.className = 'swiper project-scroll';
        scrollViewport.innerHTML = '<div class="swiper-wrapper"><div class="swiper-slide project-scroll-content"></div></div><div class="project-scrollbar"></div>';
        inner.before(scrollViewport);
        scrollViewport.querySelector('.project-scroll-content').append(inner);
        projectScrollers.push(scrollViewport);
    });

    const jumpNavigation = document.createElement('div');
    jumpNavigation.className = 'project-jumps';
    jumpNavigation.setAttribute('aria-label', '웹 프로젝트 선택');
    jumpNavigation.innerHTML = projectNames.map((label, index) => `<button type="button" data-project-index="${index}" aria-controls="work-slide-${projectIds[index]}" ${index === 0 ? 'aria-current="true"' : ''}>${label}</button>`).join('');
    document.querySelector('#publish_aria').append(jumpNavigation);
    jumpNavigation.addEventListener('click', event => {
        const button = event.target.closest('[data-project-index]');
        if (button) window.webProject.slideToLoop(Number(button.dataset.projectIndex));
    });

    function comparisonFigure(project, side) {
        return `<figure data-comparison="${side}">
            <figcaption>${escape(project[`${side}Label`])}</figcaption>
            <a class="work-image-link" href="${asset(project[side] + '-full.jpg')}" target="_blank" rel="noopener noreferrer" aria-label="${escape(project.name)} ${escape(project[`${side}Label`])} 전체 이미지 새 창에서 보기">
                <img src="${asset(project[side] + '.jpg')}" alt="${escape(project.name)} ${escape(project[`${side}Label`])}" width="1440" height="960">
                <span class="image-expand"><img src="./images/icons/maximize-2.svg" alt=""></span>
            </a>
            <p>${escape(project[`${side}Text`])}</p>
        </figure>`;
    }

    function openProject(id) {
        const project = projects.find(item => item.id === id);
        if (!project) return;
        const personal = project.id === 'carmong';
        const company = Boolean(project.before);
        body.innerHTML = `<header class="work-heading">
            <p class="work-category">${escape(project.type)} · ${escape(project.status)}</p>
            <h2 id="work-dialog-title">${escape(project.name)}</h2>
            <p class="work-role">${escape(project.role)} | ${escape(project.period)}</p>
            <h3>${escape(project.title)}</h3>
            <p>${escape(project.intro)}</p>
        </header>
        ${personal ? `<section class="work-screens" aria-label="개인 디자인 화면">${project.screens.map(([file, label]) => `<figure><figcaption>${escape(label)}</figcaption><a class="work-image-link" href="${asset(file + '-full.jpg')}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label)} 전체 이미지 새 창에서 보기"><img src="${asset(file + '.jpg')}" alt="CARMONG ${escape(label)}" width="600" height="1000"><span class="image-expand"><img src="./images/icons/maximize-2.svg" alt=""></span></a></figure>`).join('')}</section>`
        : company ? `<section aria-label="변경 전후 비교"><div class="comparison-controls" role="group" aria-label="비교 화면 선택"><button type="button" data-comparison-mode="both" aria-pressed="true">전후 비교</button><button type="button" data-comparison-mode="before" aria-pressed="false">변경 전</button><button type="button" data-comparison-mode="after" aria-pressed="false">변경 후</button></div><div class="work-comparison">${comparisonFigure(project, 'before')}${comparisonFigure(project, 'after')}</div></section>` : `<figure class="work-preview"><figcaption>작업 화면</figcaption><a class="work-image-link" href="${escape(project.preview)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(project.name)} 전체 이미지 새 창에서 보기"><img src="${escape(project.preview)}" alt="${escape(project.name)} 작업 화면"><span class="image-expand"><img src="./images/icons/maximize-2.svg" alt=""></span></a></figure>`}
        <section class="work-changes"><h3>주요 작업</h3>${project.changes.map(([title, text]) => `<div><h4>${escape(title)}</h4><p>${escape(text)}</p></div>`).join('')}</section>
        ${project.tools ? `<section class="work-tools"><h3>사용 도구</h3>${project.tools}</section>` : ''}
        ${company ? '<aside class="work-result"><h3>재직 중 사이트 개선 성과</h3><strong>DB 접수 건수 20% 이상 증가</strong><p>카베이 재직 중 사이트 디자인 개선 후의 전체 성과이며, 개별 사이트별 수치는 아닙니다.</p></aside>' : ''}
        <p class="work-note">${escape(project.note)}</p>
        <div class="work-links">${project.links.map(([label, url]) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}<img src="./images/icons/arrow-up-right.svg" alt=""></a>`).join('')}</div>`;
        // Keep available resources in the same place for all nine project details.
        body.querySelector('.work-heading').after(body.querySelector('.work-links'));
        dialog.showModal();
        dialog.scrollTop = 0;
        window.vertical.mousewheel.disable();
    }

    document.querySelector('#publish_aria').addEventListener('click', event => {
        const button = event.target.closest('[data-project]');
        if (button) openProject(button.dataset.project);
    });
    body.addEventListener('click', event => {
        const button = event.target.closest('[data-comparison-mode]');
        if (!button) return;
        const mode = button.dataset.comparisonMode;
        body.querySelectorAll('[data-comparison-mode]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
        body.querySelectorAll('[data-comparison]').forEach(figure => { figure.hidden = mode !== 'both' && figure.dataset.comparison !== mode; });
        body.querySelector('.work-comparison').classList.toggle('single-comparison', mode !== 'both');
    });
    dialog.querySelector('.work-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => window.vertical.mousewheel.enable());

    document.querySelectorAll('.guide_btn').forEach(guide => {
        guide.querySelector('a').setAttribute('aria-label', guide.querySelector('p').textContent);
    });
    document.querySelectorAll('a[target="_blank"]').forEach(link => link.rel = 'noopener noreferrer');
    document.querySelectorAll('.contact_aria em, .btm_text span, .btm_text em').forEach(element => {
        const text = element.textContent.trim();
        if (text.includes('@') || text === '010-2672-9098') {
            const link = document.createElement('a');
            link.href = text.includes('@') ? `mailto:${text}` : `tel:${text.replaceAll('-', '')}`;
            link.textContent = text;
            element.replaceChildren(link);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        window.profileScroller = new Swiper('.profile-scroll', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            nested: true,
            mousewheel: { releaseOnEdges: true },
        });
        window.webProject.on('slideChange', () => {
            jumpNavigation.querySelectorAll('button').forEach((button, index) => {
                if (index === window.webProject.realIndex) button.setAttribute('aria-current', 'true');
                else button.removeAttribute('aria-current');
            });
        });
        window.projectScrollers = projectScrollers.map(element => new Swiper(element, {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            nested: true,
            mousewheel: { releaseOnEdges: true },
            scrollbar: { el: element.querySelector('.project-scrollbar'), draggable: true },
        }));
        window.webProject.on('slideChangeTransitionEnd', () => {
            window.projectScrollers.forEach(scroller => {
                scroller.update();
                scroller.setTranslate(0);
                scroller.updateProgress();
            });
        });
        const popup = document.querySelector('.popup_bg');
        popup.querySelector('.scroll_wrap').addEventListener('click', event => event.stopPropagation());
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') popup.style.display = 'none';
        });
    });
})();
