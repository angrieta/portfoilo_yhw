(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<img src="images/icons/arrow-up-right.svg" alt="">';
  const extras = {
    carbay: {url:'./demos/carbay/?v=20261006-3',pages:'메인 · 차량 탐색 · 즉시출고',note:'최신 carbay-ui 소스의 UI 시연본입니다. 상담·상품 데이터는 운영 서버와 연결되지 않습니다.'},
    carpro: {url:'./demos/carpro/',pages:'메인 · 즉시출고 · FAQ',note:'직접 구현한 UI 시연본입니다. 실제 상담은 접수되지 않습니다.'},
    chanawa: {url:'./demos/chanawa/',pages:'메인 · 차량 선택 · 견적 UI',note:'리뉴얼 소스의 메인 UI 시연본입니다. 고객 후기와 실제 접수 기능은 제외했습니다.'},
    carmong: {url:'./demos/carmong/',pages:'메인 · 차량 목록 · 상세 · FAQ',role:'개인 UI 디자인 · 퍼블리싱',summary:'노란색과 캐릭터로 전개한 자동차 비교견적 사이트.',note:'개인 시안 #3·#4의 실제 HTML 구현입니다. 상품·이용 수치는 예시이며 상담은 접수되지 않습니다.'}
  };
  const projects = window.portfolioProjects.map(p=>({...p,...extras[p.id]}));
  const archiveIds = ['krizer','bebedepino','time-clinic','m-mall','nuphy'];
  const archive = window.portfolioArchive.map((p,i)=>({
    ...p,id:archiveIds[i],url:p.links[0][1],summary:p.description,intro:p.description,
    role:i===0?'웹디자인 (인턴)':'UI 디자인 · 퍼블리싱',period:p.date,
    pages:i===0?'메인 · 제품 랜딩':p.description,
    note:i===0?'운영 중인 사이트입니다. 참여 당시 작업은 Figma에서 함께 확인할 수 있습니다.':'직접 퍼블리싱한 공개 웹사이트입니다.',
    changes:[]
  }));
  archive[1].url='./demos/bebedepino/';
  archive[1].links=archive[1].links.map(([label,url])=>[label,url.includes('bebe_de_pino')?'./demos/bebedepino/':url]);
  archive[1].note='기존 저장소에 보관된 베베드피노 원래 구현본을 복원한 시연 사이트입니다.';
  ['https://m.bebedepino.com/index/','https://timeclinicbp.com/','https://mpointmall.hyundaicard.com/main.do','https://www.nuphy.kr/'].forEach((url,i)=>archive[i+1].links.push(['리디자인 원본 사이트',url]));
  projects.push(...archive.slice(1),archive[0]);
  const groups=[['회사 프로젝트',projects.slice(0,3)],['개인 프로젝트',projects.slice(3,8)],['인턴 실무',projects.slice(8)]];
  $('#project-list').innerHTML=groups.map(([label,items])=>`<div class="project-group"><h3>${label}</h3>${items.map(p=>`<button type="button" class="project-choice" data-project="${p.id}" aria-pressed="false"><span class="project-number">${String(projects.indexOf(p)+1).padStart(2,'0')}</span>${esc(p.name)}</button>`).join('')}</div>`).join('');
  $('#project-select').innerHTML=groups.map(([label,items])=>`<optgroup label="${label}">${items.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</optgroup>`).join('');
  let active;
  let device = matchMedia('(max-width:760px)').matches ? 'mobile' : 'desktop';
  let loadTimer;
  let frame=$('#project-frame');
  const stage=$('#preview-stage'),shell=$('#preview-shell');
  function fitPreview(){
    const width=stage.clientWidth;
    const virtualWidth=device==='mobile'?390:active?.id==='carmong'?900:1440;
    const scale=Math.min(1,width/virtualWidth);
    frame.style.width=virtualWidth+'px';
    frame.style.height=Math.ceil(stage.clientHeight/scale)+'px';
    frame.style.transform=`scale(${scale})`;
    frame.style.left=Math.max(0,(width-virtualWidth*scale)/2)+'px';
    document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===device)));
  }
  function loadPreview(){
    clearTimeout(loadTimer);frame.classList.remove('ready');
    $('#preview-loading').hidden=false;$('#preview-loading').textContent='웹페이지를 불러오는 중입니다.';
    // A new browsing context avoids extra history entries when changing projects.
    const next=frame.cloneNode(false);next.title=active.name+' 실제 웹페이지';next.src=active.url;
    next.addEventListener('load',()=>{if(next!==frame)return;clearTimeout(loadTimer);next.classList.add('ready');$('#preview-loading').hidden=true;});
    frame.replaceWith(next);frame=next;
    loadTimer=setTimeout(()=>{
      frame.classList.add('ready');$('#preview-loading').hidden=true;
      $('#project-note').textContent=active.note+' 미리보기가 열리지 않으면 사이트 열기를 이용해 주세요.';
    },18000);
  }
  function showProject(id,{updateUrl=true}={}){
    const p=projects.find(item=>item.id===id)||projects[0];active=p;
    document.querySelectorAll('[data-project]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.project===p.id)));
    $('#project-select').value=p.id;$('#project-name').textContent=p.name;
    $('#project-type').textContent=p.type+' / '+(p.category||'WEB DESIGN');
    $('#project-summary').textContent=p.summary||p.intro;$('#project-open').href=p.url;
    $('#project-meta').innerHTML=[['역할',p.role],['기간',p.period||'개인 디자인 시안'],['작업 범위',p.pages]].map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    $('#preview-label').textContent=p.name.toUpperCase()+' / LIVE WEB';$('#project-note').textContent=p.note;
    const figma=(p.links||[]).find(([,url])=>url.includes('figma.com'));
    $('#project-figma').hidden=!figma;if(figma)$('#project-figma').href=figma[1];
    if(updateUrl){const url=new URL(location);url.searchParams.set('project',p.id);history.pushState({project:p.id},'',url);}
    loadPreview();fitPreview();
  }
  $('#project-list').addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(button)showProject(button.dataset.project);});
  $('#project-select').addEventListener('change',e=>showProject(e.target.value));
  window.addEventListener('popstate',()=>showProject(new URL(location).searchParams.get('project'),{updateUrl:false}));
  document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{device=b.dataset.device;fitPreview();}));
  new ResizeObserver(fitPreview).observe(stage);
  $('#preview-reload').addEventListener('click',loadPreview);
  $('#preview-expand').addEventListener('click',async()=>{
    if(document.fullscreenElement){await document.exitFullscreen();return;}
    if(shell.requestFullscreen){try{await shell.requestFullscreen();}catch{window.open(active.url,'_blank','noopener');}}
    else window.open(active.url,'_blank','noopener');
  });
  document.addEventListener('fullscreenchange',()=>{
    const expanded=!!document.fullscreenElement;
    $('#preview-expand').setAttribute('aria-label',expanded?'확대 종료':'미리보기 확대');
    $('#preview-expand').title=expanded?'확대 종료':'미리보기 확대';
    $('#preview-expand img').src=expanded?'images/icons/x.svg':'images/icons/maximize-2.svg';fitPreview();
  });
  const dialog=$('#work-dialog');let opener;
  function openDialog(label,content){opener=document.activeElement;$('#dialog-label').textContent=label;$('#dialog-content').innerHTML=content;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');$('#dialog-close').focus();}
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
  $('#case-open').addEventListener('click',()=>{
    const p=active;
    const links=[['구현 사이트 열기',p.url],...(p.links||[])];
    let comparison='';
    if(p.before)comparison=`<div class="comparison">${[['before',p.beforeLabel,p.beforeText],['after',p.afterLabel,p.afterText]].map(([key,label,copy])=>`<figure><figcaption>${esc(label)}</figcaption><img src="images/work/${esc(p[key])}.jpg" alt="${esc(p.name+' '+label)}" loading="lazy"><p>${esc(copy)}</p></figure>`).join('')}</div>`;
    openDialog(p.type,`<h2 id="dialog-title" class="dialog-title">${esc(p.name)}<br>${esc(p.title||p.summary)}</h2><p class="dialog-description">${esc(p.intro)}</p><div class="dialog-actions">${links.map(([label,url])=>`<a class="button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${arrow}</a>`).join('')}</div><div class="case-changes">${(p.changes||[]).map(([title,copy])=>`<div><h3>${esc(title)}</h3><p>${esc(copy)}</p></div>`).join('')}</div>${comparison}<p class="dialog-note">${esc(p.note)}${p.id==='carbay'?' 전후 비교 이미지는 이전 기록이며, 위 시연 화면이 최신 소스 기준입니다.':''}</p>`);
  });
  const labels={banner:'배너',detail:'상세페이지',sns:'SNS',brand:'로고·브랜딩',popup:'팝업',concept:'UI 시안'};
  const art=window.portfolioCreative.map(p=>({...p,featured:true,thumb:`images/creative/${p.id}-thumb.webp`,full:`images/creative/${p.id}.webp`}));
  Object.entries(window.portfolioGallery).forEach(([category,files])=>files.forEach((file,i)=>art.push({id:file,category,title:`${labels[category]} 디자인 ${String(i+1).padStart(2,'0')}`,brand:'DESIGN ARCHIVE',description:'기존 포트폴리오 디자인 작업입니다.',thumb:`images/thumbs/${file}.webp`,full:`images/original_image/${file}`})));
  let filter='featured',count=9;
  function renderGallery(){
    const selected=art.filter(p=>filter==='all'||(filter==='featured'?p.featured:filter==='concept'?['concept','popup'].includes(p.category):p.category===filter));
    $('#gallery-count').textContent=`${selected.length}개의 작업`;
    $('#gallery').innerHTML=selected.slice(0,count).map(p=>`<article class="artwork"><button type="button" class="artwork-button" data-art="${esc(p.id)}" aria-label="${esc(p.title)} 확대"><span class="artwork-image ${['detail','concept','popup'].includes(p.category)?'tall':''} ${p.dark?'dark':''}"><img src="${esc(p.thumb)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></span><h3>${esc(p.title)}</h3><p>${esc(p.brand)} · ${labels[p.category]}</p></button></article>`).join('');
    $('#gallery-more').hidden=count>=selected.length;$('#gallery-more span').textContent=`${Math.min(count,selected.length)} / ${selected.length}`;
  }
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;count=9;document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));renderGallery();}));
  $('#gallery-more').addEventListener('click',()=>{const previous=count;count+=9;renderGallery();$('#gallery').children[previous]?.querySelector('button')?.focus({preventScroll:true});});
  $('#gallery').addEventListener('click',e=>{
    const b=e.target.closest('[data-art]');if(!b)return;const p=art.find(item=>item.id===b.dataset.art);
    openDialog(`${p.brand} / ${labels[p.category]}`,`<h2 id="dialog-title" class="dialog-title">${esc(p.title)}</h2><p class="dialog-description">${esc(p.description)}</p><div class="dialog-actions"><a class="text-link" href="${esc(p.full)}" target="_blank" rel="noopener noreferrer">원본 이미지 ${arrow}</a>${p.node?`<a class="text-link" href="https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=${p.node.replace(':','-')}" target="_blank" rel="noopener noreferrer">Figma ${arrow}</a>`:''}</div><img class="artwork-full ${p.dark?'dark':''}" src="${esc(p.full)}" alt="${esc(p.title)}">`);
  });
  const sections=['about','web-project','graphic','contact'];
  const updateNav=()=>{let id='';for(const item of sections){if(document.getElementById(item).getBoundingClientRect().top<160)id=item;}document.querySelectorAll('.site-header nav a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
  window.addEventListener('scroll',updateNav,{passive:true});
  showProject(new URL(location).searchParams.get('project'),{updateUrl:false});renderGallery();updateNav();
})();
