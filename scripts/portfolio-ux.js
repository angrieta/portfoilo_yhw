(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<img src="images/icons/arrow-up-right.svg" alt="">';
  const extras = {
    carbay: {url:'./demos/carbay/?v=20261006-4',pages:'메인 · 차량 탐색 · 즉시출고',note:'UI 시연본 · 운영 상품 데이터와 실제 상담 접수는 연결되지 않습니다.'},
    carpro: {url:'./demos/carpro/?v=20261006-4',pages:'메인 · 즉시출고 · FAQ',note:'UI 시연본 · 실제 상담은 접수되지 않습니다.'},
    chanawa: {url:'./demos/chanawa/',pages:'메인 · 차량 선택 · 견적 UI',note:'메인 UI 시연본 · 고객 후기와 실제 상담 접수는 포함하지 않습니다.'},
    carmong: {url:'./demos/carmong/',pages:'메인 · 차량 목록 · 상세 · FAQ',role:'개인 UI 디자인 · 퍼블리싱',summary:'노란색과 캐릭터로 전개한 자동차 비교견적 사이트.',note:'개인 리디자인 · 상품과 이용 수치는 예시이며 실제 상담은 접수되지 않습니다.'}
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
  projects.splice(3,0,{
    id:'business-card',name:'카베이 전자명함',type:'회사 프로젝트',category:'모바일 전자명함',
    url:'./demos/business-card/',title:'프로필부터 상담까지 이어지는 모바일 명함',
    summary:'프로필, 출고후기, 상담과 공유를 하나로 연결한 전자명함.',
    intro:'카베이 김민우 카매니저의 전자명함입니다. 모바일에서 프로필과 출고후기를 확인하고, 연락처 저장과 명함 공유까지 이어지도록 디자인하고 구현했습니다.',
    role:'UI 디자인 · 퍼블리싱',pages:'프로필 · 출고후기 · 상담 · 공유',
    note:'모바일 UI 시연본 · 상담은 전송되지 않으며 화면의 실적은 시안 기준입니다.',
    links:[],changes:[['모바일 프로필','인물, 담당 분야, 실적 정보를 한 화면에서 읽을 수 있도록 구성했습니다.'],['출고후기','사진 갤러리와 후기 상세 화면으로 작업 내용을 확장했습니다.'],['연락과 공유','연락처 저장, 링크 복사, QR 공유와 상담 화면을 구현했습니다.']]
  });
  const caseData=window.portfolioCases||{};
  const selectedIds=['carbay','business-card','brand-reference','rolex-web','twosome'];
  const familyId=id=>id==='rolex'?'rolex-web':id;
  const projectLabel=p=>p.id==='rolex-web'?'롤렉스 리디자인':p.name;
  const groups=[
    ['대표 프로젝트',selectedIds.map(id=>projects.find(p=>p.id===id))],
    ['회사 추가 작업',projects.filter(p=>['carpro','chanawa'].includes(p.id))],
    ['개인 추가 작업',projects.filter(p=>['starbucks','carmong'].includes(p.id))],
    ['이전 작업·인턴',projects.filter(p=>archiveIds.includes(p.id))]
  ];
  $('#web-title span').textContent=String(projects.length-1);
  $('#project-list').innerHTML=groups.map(([label,items],index)=>{
    const choices=items.map((p,i)=>`<button type="button" class="project-choice" data-project="${p.id}" aria-pressed="false"><span class="project-number">${String(i+1).padStart(2,'0')}</span><span>${esc(projectLabel(p))}${index===0?`<small>${esc(caseData[p.id].focus)}</small>`:''}</span></button>`).join('');
    return index===0?`<div class="project-group selected-projects"><h3>${label}<span>${items.length}</span></h3>${choices}</div>`:`<details class="project-group additional-projects"><summary>${label}<span>${items.length}</span></summary>${choices}</details>`;
  }).join('');
  $('#project-select').innerHTML=groups.map(([label,items])=>`<optgroup label="${label}">${items.map(p=>`<option value="${p.id}">${esc(projectLabel(p))}</option>`).join('')}</optgroup>`).join('');
  const publicCode={
    starbucks:'https://github.com/angrieta/portfoilo_yhw/tree/landing/demos/coffee',
    carmong:'https://github.com/angrieta/portfoilo_yhw/tree/landing/demos/carmong',
    rolex:'https://github.com/angrieta/portfoilo_yhw/tree/landing/demos/rolex'
  };
  let active;
  let device = matchMedia('(max-width:760px)').matches ? 'mobile' : 'desktop';
  let loadTimer;
  let frame=$('#project-frame');
  const stage=$('#preview-stage'),shell=$('#preview-shell');
  let expandedPreview=false,actualPreviewSize=false,nativePreview=false;
  let previewInertNodes=[];
  function fitPreview(){
    const width=stage.clientWidth;
    const virtualWidth=active?.previewType==='design'?active.previewWidth:expandedPreview?1920:device==='mobile'?390:active?.id==='business-card'?414:active?.id==='carmong'?900:1440;
    const scale=expandedPreview&&actualPreviewSize?1:Math.min(1,width/virtualWidth);
    frame.style.width=virtualWidth+'px';
    frame.style.height=Math.ceil(stage.clientHeight/scale)+'px';
    frame.style.transform=`scale(${scale})`;
    frame.style.left=Math.max(0,(width-virtualWidth*scale)/2)+'px';
    document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===device)));
    if(active)$('#preview-label').textContent=(active.english||active.name).toUpperCase()+(active.previewType==='design'?' / UI 시안 · '+active.previewWidth+'px':expandedPreview?' / 1920px':' / LIVE WEB');
  }
  function loadPreview(){
    clearTimeout(loadTimer);frame.classList.remove('ready');
    $('#preview-loading').hidden=false;$('#preview-loading').textContent=active.previewType==='design'?'디자인 시안을 불러오는 중입니다.':'웹페이지를 불러오는 중입니다.';
    // A new browsing context avoids extra history entries when changing projects.
    const next=frame.cloneNode(false);next.title=active.name+(active.previewType==='design'?' UI 디자인 시안':' 실제 웹페이지');next.src=active.url;
    next.addEventListener('load',()=>{if(next!==frame)return;clearTimeout(loadTimer);next.classList.add('ready');$('#preview-loading').hidden=true;});
    frame.replaceWith(next);frame=next;
    loadTimer=setTimeout(()=>{
      frame.classList.add('ready');$('#preview-loading').hidden=true;
      $('#project-note').textContent=active.note+' 미리보기가 열리지 않으면 '+(active.previewType==='design'?'시안 열기':'사이트 열기')+'를 이용해 주세요.';
    },18000);
  }
  function showProject(id,{updateUrl=true}={}){
    const p=projects.find(item=>item.id===id)||projects[0];active=p;
    document.querySelectorAll('[data-project]').forEach(b=>{
      const selected=b.dataset.project===familyId(p.id);b.setAttribute('aria-pressed',String(selected));
      if(selected&&b.closest('details'))b.closest('details').open=true;
    });
    $('#project-select').value=familyId(p.id);$('#project-name').textContent=familyId(p.id)==='rolex-web'?'롤렉스 리디자인':p.name;
    $('#project-type').textContent=p.type+' / '+(p.category||'WEB DESIGN');
    $('#project-summary').textContent=p.summary||p.intro;$('#project-open').href=p.url;
    $('#project-open').innerHTML=(p.previewType==='design'?'시안 열기':'사이트 열기')+' '+arrow;
    $('.device-controls').hidden=p.previewType==='design';
    const expandLabel=(p.previewType==='design'?p.previewWidth:1920)+'px 전체화면 보기';
    $('#preview-expand').setAttribute('aria-label',expandLabel);$('#preview-expand').title=expandLabel;
    $('.preview-scale-controls').setAttribute('aria-label',(p.previewType==='design'?p.previewWidth:1920)+'px 화면 배율');
    const company=['carbay','carpro','chanawa'].includes(p.id);
    const meta=[['담당',p.role],...(company?[['재직 기간','2025.09 ~ 현재']]:p.period?[['작업 시기',p.period]]:[]),['작업 범위',p.pages]];
    $('#project-meta').innerHTML=meta.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    const detail=caseData[familyId(p.id)];
    $('#project-takeaway').hidden=!detail;$('#project-takeaway').textContent=detail?.takeaway||'';
    $('#project-variants').hidden=familyId(p.id)!=='rolex-web';
    document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.variant===p.id)));
    const code=publicCode[p.id]||detail?.code;
    $('#project-code').hidden=!code;if(code)$('#project-code').href=code;
    $('#preview-label').textContent=p.name.toUpperCase()+' / LIVE WEB';$('#project-note').textContent=p.note;
    const figma=(p.links||[]).find(([,url])=>url.includes('figma.com'));
    $('#project-figma').hidden=!figma;if(figma)$('#project-figma').href=figma[1];
    $('#compare-open').hidden=!(p.before&&p.after);
    if(updateUrl){const url=new URL(location);url.searchParams.set('project',p.id);history.pushState({project:p.id},'',url);}
    loadPreview();fitPreview();
  }
  $('#project-list').addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(button)showProject(button.dataset.project);});
  $('#project-select').addEventListener('change',e=>showProject(e.target.value));
  $('#project-variants').addEventListener('click',e=>{const button=e.target.closest('[data-variant]');if(button)showProject(button.dataset.variant);});
  document.querySelectorAll('[data-intro-project]').forEach(a=>a.addEventListener('click',e=>{
    if(a.closest('.featured-slider')?.swiper?.allowClick===false){e.preventDefault();return;}
    if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    e.preventDefault();showProject(a.dataset.introProject,{updateUrl:false});
    const url=new URL(location);url.searchParams.set('project',a.dataset.introProject);url.hash='web-project';
    history.pushState({project:a.dataset.introProject},'',url);$('#web-project').scrollIntoView();
  }));
  window.addEventListener('popstate',()=>showProject(new URL(location).searchParams.get('project'),{updateUrl:false}));
  document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{device=b.dataset.device;fitPreview();}));
  new ResizeObserver(fitPreview).observe(stage);
  $('#preview-reload').addEventListener('click',loadPreview);
  function setExpandedPreview(open){
    expandedPreview=open;actualPreviewSize=false;
    shell.classList.toggle('expanded',open);shell.classList.remove('actual-size');
    document.body.classList.toggle('preview-expanded',open);
    $('#preview-expand').hidden=open;$('#preview-close').hidden=!open;
    $('.preview-scale-controls').hidden=!open;
    document.querySelectorAll('[data-preview-scale]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.previewScale==='fit')));
    if(open){
      shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label',active.previewType==='design'?active.previewWidth+'px UI 디자인 시안':'1920px 웹페이지 미리보기');
      // Also isolate the overlay when native fullscreen is unavailable.
      for(let node=shell;node&&node!==document.body;node=node.parentElement){
        [...node.parentElement.children].filter(sibling=>sibling!==node).forEach(sibling=>{
          previewInertNodes.push([sibling,sibling.inert]);sibling.inert=true;
        });
      }
    }else{
      shell.removeAttribute('role');shell.removeAttribute('aria-modal');shell.removeAttribute('aria-label');
      previewInertNodes.forEach(([node,inert])=>{node.inert=inert;});previewInertNodes=[];
    }
    stage.scrollLeft=0;stage.scrollTop=0;fitPreview();
    $(open?'#preview-close':'#preview-expand').focus({preventScroll:true});
  }
  async function closeExpandedPreview(){
    if(document.fullscreenElement===shell){try{await document.exitFullscreen();}catch{}}
    if(expandedPreview)setExpandedPreview(false);
  }
  $('#preview-expand').addEventListener('click',async()=>{
    if(expandedPreview)return;
    setExpandedPreview(true);
    if(shell.requestFullscreen){try{await shell.requestFullscreen();}catch{/* The fixed overlay remains available. */}}
    if(expandedPreview){fitPreview();$('#preview-close').focus({preventScroll:true});}
  });
  $('#preview-close').addEventListener('click',closeExpandedPreview);
  document.querySelectorAll('[data-preview-scale]').forEach(button=>button.addEventListener('click',()=>{
    actualPreviewSize=button.dataset.previewScale==='actual';
    shell.classList.toggle('actual-size',actualPreviewSize);stage.scrollLeft=0;stage.scrollTop=0;
    document.querySelectorAll('[data-preview-scale]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    fitPreview();
  }));
  document.addEventListener('keydown',event=>{if(expandedPreview&&event.key==='Escape'){event.preventDefault();closeExpandedPreview();}});
  document.addEventListener('fullscreenchange',()=>{
    if(document.fullscreenElement===shell){nativePreview=true;fitPreview();}
    else if(nativePreview){nativePreview=false;if(expandedPreview)setExpandedPreview(false);}
  });
  const dialog=$('#work-dialog');let opener;
  function openDialog(label,content){opener=document.activeElement;$('#dialog-label').textContent=label;$('#dialog-content').innerHTML=content;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');$('#dialog-close').focus();}
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
  function comparisonContent(p){
    if(!p.before||!p.after)return '';
    return `<div class="comparison">${[['before',p.beforeLabel,p.beforeText],['after',p.id==='carbay'?'리뉴얼 후 화면 기록':p.afterLabel,p.afterText]].map(([key,label,copy])=>`<figure><figcaption>${esc(label)}</figcaption><a href="images/work/${esc(p[key])}.jpg" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.name+' '+label+' 원본 이미지 보기')}"><img src="images/work/${esc(p[key])}.jpg" alt="${esc(p.name+' '+label)}"></a><p>${esc(copy)}</p></figure>`).join('')}</div>`;
  }
  $('#compare-open').addEventListener('click',()=>{
    const p=active;
    if(!p.before||!p.after)return;
    openDialog('리뉴얼 전후 비교',`<h2 id="dialog-title" class="dialog-title">${esc(p.name)} 전후 비교</h2><p class="dialog-description">${esc(p.intro)}</p>${comparisonContent(p)}<div class="case-changes">${(p.changes||[]).map(([title,copy])=>`<div><h3>${esc(title)}</h3><p>${esc(copy)}</p></div>`).join('')}</div><p class="dialog-note">비교 이미지는 작업 당시 보관한 화면입니다. 최신 구현 화면은 사이트 열기에서 확인할 수 있습니다.</p><div class="dialog-actions"><a class="button" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">사이트 열기 ${arrow}</a></div>`);
  });
  function metricsContent(){
    const rows=window.portfolioMenuClicks;
    const total=rows.reduce((n,row)=>n+row[1],0);
    const core=rows.slice(0,3).reduce((n,row)=>n+row[1],0);
    return `<section class="case-section case-evidence" id="case-evidence"><p class="eyebrow">OBSERVED DATA</p><h3>클릭 데이터로 읽는 이용 흐름</h3><p class="case-lead">제공된 메뉴별 클릭 집계에서 전차종 견적·즉시출고·렌트VS리스에 이용이 집중된 것을 확인했습니다.</p><div class="metric-strip"><div><strong>${total.toLocaleString('ko-KR')}</strong><span>표에 포함된 전체 메뉴 클릭</span></div><div><strong>${(core/total*100).toFixed(1)}<small>%</small></strong><span>핵심 메뉴 3개의 클릭 비중</span></div><div><strong>1,932</strong><span>전차종 견적 클릭 · 46.2%</span></div></div><figure class="click-chart"><figcaption>메뉴별 클릭 수와 비중</figcaption><ol>${rows.map(([name,n,share],i)=>`<li><span class="chart-label">${esc(name)}</span><span class="chart-track"><span class="chart-bar ${i<3?'core':''}" style="--bar-width:${share/46.2*100}%"></span></span><span class="chart-value"><b>${n.toLocaleString('ko-KR')}</b><small>${share}%</small></span></li>`).join('')}</ol></figure><p class="evidence-note">출처: 제공된 메뉴 클릭 집계표. 집계 기간은 표에 기재되어 있지 않으며, 비중은 반올림 값입니다. 이 수치는 메뉴 클릭 현황으로, 개선 전후 상승률이나 상담 전환율을 뜻하지 않습니다.</p><a class="text-link" href="images/work/carbay-menu-clicks.png" target="_blank" rel="noopener noreferrer">집계표 원본 보기 ${arrow}</a></section>`;
  }
  function guideContent(){
    return `<section class="case-section" id="case-guide"><p class="eyebrow">UI RULES IN USE</p><h3>전자명함의 작은 UI 가이드</h3><p class="case-lead">구현된 화면의 색상, 정보 위계와 입력 상태를 정리했습니다.</p><div class="ui-guide"><div><h4>색과 정보 위계</h4><div class="guide-swatches"><span style="--swatch:#2b4eff">Action<br>#2B4EFF</span><span style="--swatch:#22293a">Text<br>#22293A</span><span style="--swatch:#f5f7fb">Surface<br>#F5F7FB</span></div><p class="guide-title">이름과 핵심 정보</p><p class="guide-body">읽기 편한 본문과 설명</p><p class="guide-caption">보조 정보는 낮은 대비로 구분</p></div><div><h4>다음 행동의 우선순위</h4><div class="guide-buttons" aria-label="버튼 스타일 예시"><span class="guide-primary">상담하기</span><span class="guide-secondary">연락처 저장</span></div><p>주요 행동은 파란색 채움, 보조 행동은 밝은 바탕으로 구분합니다. 전화·상담 진입점은 하단에 유지합니다.</p></div><div><h4>입력 상태의 차이</h4><div class="guide-fields" aria-label="입력 필드 상태 예시"><span>기본 · 성함을 입력하세요</span><span class="focused">선택 · 입력 중인 항목</span><span class="invalid">오류 · 올바른 연락처를 확인해주세요</span></div><p>후기 상담 폼의 오류 문구와 입력 필드를 연결하고, 수정할 항목으로 포커스를 옮깁니다.</p></div></div><p class="evidence-note">반응형 규칙: 모바일 중심의 단일 열과 콘텐츠 최대 폭을 유지하고, 긴 설명은 줄바꿈합니다. 하단 행동 영역에는 기기 안전 여백을 반영했습니다.</p></section>`;
  }
  $('#case-open').addEventListener('click',()=>{
    const p=active,c=caseData[familyId(p.id)];
    const links=[[p.previewType==='design'?'전체 시안 보기':'구현 사이트 열기',p.url],...(p.links||[])];
    const code=publicCode[p.id]||c?.code;
    if(code&&!links.some(([,url])=>url===code))links.push(['구현 코드',code]);
    const intro=`<h2 id="dialog-title" class="dialog-title">${esc(familyId(p.id)==='rolex-web'?'롤렉스 리디자인':p.name)}<br><span>${esc(p.title||p.summary)}</span></h2><p class="dialog-description">${esc(c?.context||p.intro)}</p><div class="dialog-actions">${links.map(([label,url])=>`<a class="button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${arrow}</a>`).join('')}</div>`;
    if(!c){openDialog(p.type,intro+`<div class="case-changes">${(p.changes||[]).map(([title,copy])=>`<div><h3>${esc(title)}</h3><p>${esc(copy)}</p></div>`).join('')}</div>${comparisonContent(p)}<p class="dialog-note">${esc(p.note)}</p>`);return;}
    const sections=[['case-scope','담당 범위'],['case-decisions','디자인 결정'],...(c.metrics?[['case-evidence','클릭 데이터']]:[]),['case-screens','화면 보기'],['case-implementation','구현 사례']];
    const outline=`<nav class="case-outline" aria-label="작업 과정 목차">${sections.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>`;
    const blocks=(items,tag='h4')=>items.map(([title,copy])=>`<div><${tag}>${esc(title)}</${tag}><p>${esc(copy)}</p></div>`).join('');
    const scope=`<section class="case-section" id="case-scope"><p class="eyebrow">MY SCOPE</p><h3>담당한 작업과 시연 범위</h3><div class="case-scope">${blocks(c.scope)}</div></section>`;
    const decisions=`<section class="case-section" id="case-decisions"><p class="eyebrow">DESIGN DECISIONS</p><h3>이렇게 구성한 이유</h3><ol class="decision-list">${c.decisions.map(([title,copy],i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><div><h4>${esc(title)}</h4><p>${esc(copy)}</p></div></li>`).join('')}</ol>${comparisonContent(p)}</section>`;
    const screens=`<section class="case-section" id="case-screens"><p class="eyebrow">SCREENS & NOTES</p><h3>화면에서 확인하는 선택</h3><div class="case-screens">${c.screens.map(([src,title,copy,kind])=>`<figure class="case-screen ${kind||''}"><a href="${esc(src)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(title)} 원본 보기"><img src="${esc(src)}" alt="${esc(title)}" loading="lazy" decoding="async"></a><figcaption><h4>${esc(title)}</h4><p>${esc(copy)}</p></figcaption></figure>`).join('')}</div></section>`;
    const implementation=`<section class="case-section" id="case-implementation"><p class="eyebrow">IMPLEMENTATION</p><h3>디자인을 동작으로 연결하기</h3><div class="implementation-list">${blocks(c.implementation)}</div></section>`;
    openDialog(c.focus,intro+outline+scope+decisions+(c.metrics?metricsContent():'')+screens+implementation+(c.guide?guideContent():'')+`<section class="case-section case-next"><h3>확인 범위와 다음 과제</h3><p>${esc(c.next)}</p><p class="dialog-note">${esc(p.note)}</p></section>`);
  });
  $('#dialog-content').addEventListener('click',e=>{
    const link=e.target.closest('.case-outline a');if(!link)return;
    e.preventDefault();const target=dialog.querySelector(link.hash);target?.scrollIntoView({behavior:'instant',block:'start'});
    if(target){target.tabIndex=-1;target.focus({preventScroll:true});}
  });
  const labels={banner:'배너',detail:'상세페이지',sns:'SNS',brand:'브랜드 자산 활용',popup:'팝업',concept:'UI 시안'};
  const featuredIds=['gift-voucher','live-stock','summer-promotion','chuseok-promotion','review-popup','carpro-promotion-a','carpro-promotion-b','carbay-popup'];
  const art=window.portfolioCreative.map(p=>({...p,featured:featuredIds.includes(p.id),thumb:`images/creative/${p.id}-thumb.webp`,full:`images/creative/${p.id}.webp`}));
  Object.entries(window.portfolioGallery).forEach(([category,files])=>files.forEach(file=>{
    const [title,description]=window.portfolioArchiveTitles[file];
    art.push({id:file,category,title,brand:'DESIGN ARCHIVE',description,thumb:`images/thumbs/${file}.webp`,full:`images/original_image/${file}`});
  }));
  $('#graphic-title span').textContent=String(art.length);
  let filter='featured',count=9;
  function renderGallery(){
    const selected=art.filter(p=>filter==='all'||(filter==='featured'?p.featured:filter==='concept'?['concept','popup'].includes(p.category):p.category===filter));
    $('#gallery-count').textContent=filter==='featured'?`선별한 ${selected.length}개 작업 · 전체 ${art.length}개 아카이브`:`${selected.length}개의 작업`;
    const visible=selected.slice(0,count);
    const sections=filter==='featured'?[
      ['서비스 진입 배너','핵심 메시지와 다음 행동을 한 장에',visible.filter(p=>['gift-voucher','live-stock','rent-lease-test'].includes(p.id))],
      ['시즌·혜택 캠페인','상세페이지와 팝업으로 이어지는 프로모션',visible.filter(p=>['summer-promotion','chuseok-promotion','review-popup'].includes(p.id))],
      ['차량·후기 프로모션','제품 사진과 혜택을 강조한 그래픽',visible.filter(p=>['carpro-promotion-a','carpro-promotion-b','carbay-popup'].includes(p.id))]
    ]:[['','',visible]];
    $('#gallery').innerHTML=sections.map(([title,copy,items])=>`${title?`<header class="gallery-section-heading"><h3>${title}</h3><p>${copy}</p></header>`:''}${items.map(p=>{
      const wide=p.size?p.size==='1600 × 400':p.category==='banner';
      return `<article class="artwork ${wide?'wide-art':''}"><button type="button" class="artwork-button" data-art="${esc(p.id)}" aria-label="${esc(p.title)} 확대"><span class="artwork-image ${wide?'wide':p.category==='sns'?'square':['detail','concept','popup'].includes(p.category)?'tall':''} ${p.dark?'dark':''}"><img src="${esc(p.thumb)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></span><h3>${esc(p.title)}</h3><p>${esc(p.brand)} · ${labels[p.category]}</p></button></article>`;
    }).join('')}`).join('');
    $('#gallery-more').hidden=count>=selected.length;$('#gallery-more span').textContent=`${Math.min(count,selected.length)} / ${selected.length}`;
  }
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;count=9;document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));renderGallery();}));
  $('#gallery-more').addEventListener('click',()=>{const previous=count;count+=9;renderGallery();$('#gallery').querySelectorAll('[data-art]')[previous]?.focus({preventScroll:true});});
  $('#gallery').addEventListener('click',e=>{
    const b=e.target.closest('[data-art]');if(!b)return;const p=art.find(item=>item.id===b.dataset.art);
    const relatedIds=p.id==='chuseok-promotion'?[]:['gift-voucher','review-popup','carbay-popup'].includes(p.id)?['gift-voucher','review-popup','carbay-popup'].filter(id=>id!==p.id):['carpro-promotion-a','carpro-promotion-b'].includes(p.id)?['carpro-promotion-a','carpro-promotion-b'].filter(id=>id!==p.id):[];
    const related=relatedIds.map(id=>art.find(item=>item.id===id));
    const campaign=p.id==='chuseok-promotion'?`<figure class="campaign-application"><img src="images/work/carbay-featured.png" alt="한가위 프로모션의 메인 배너 적용 화면" loading="lazy"><figcaption>한가위 캠페인 · 메인 배너 적용 화면</figcaption></figure><h3 class="campaign-detail-title">상세페이지로 이어지는 캠페인</h3>`:'';
    openDialog(`${p.brand} / ${labels[p.category]}`,`<h2 id="dialog-title" class="dialog-title">${esc(p.title)}</h2><p class="dialog-description">${esc(p.description)}</p><div class="dialog-actions"><a class="text-link" href="${esc(p.full)}" target="_blank" rel="noopener noreferrer">원본 이미지 ${arrow}</a>${p.node?`<a class="text-link" href="https://www.figma.com/design/M76Os4WpCOZ3zFDt5hgnpJ/Untitled?node-id=${p.node.replace(':','-')}" target="_blank" rel="noopener noreferrer">Figma ${arrow}</a>`:''}</div>${campaign}<img class="artwork-full ${p.dark?'dark':''}" src="${esc(p.full)}" alt="${esc(p.title)}">${related.length?`<section class="related-art"><h3>함께 보는 ${p.brand==='CARPRO'?'프로모션 시안':'혜택 그래픽'}</h3><p>같은 브랜드의 다른 매체와 표현을 함께 확인할 수 있습니다.</p>${related.map(item=>`<figure><a href="${esc(item.full)}" target="_blank" rel="noopener noreferrer"><img src="${esc(item.thumb)}" alt="${esc(item.title)}" loading="lazy"></a><figcaption>${esc(item.title)} · ${labels[item.category]}</figcaption></figure>`).join('')}</section>`:''}`);
  });
  const sections=['web-project','graphic','about','contact'];
  const updateNav=()=>{let id='';for(const item of sections){if(document.getElementById(item).getBoundingClientRect().top<160)id=item;}document.querySelectorAll('.site-header nav a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
  let navFrame;window.addEventListener('scroll',()=>{if(navFrame)return;navFrame=requestAnimationFrame(()=>{updateNav();navFrame=null;});},{passive:true});
  showProject(new URL(location).searchParams.get('project'),{updateUrl:false});renderGallery();updateNav();
})();
