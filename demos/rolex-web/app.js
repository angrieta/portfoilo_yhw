const watches = [
  {id:'submariner',name:'Submariner Date',ko:'서브마리너 데이트',ref:'126610LN-0001',size:41,material:'steel',materialName:'오이스터스틸',dial:'블랙',movement:'3235',reserve:70,water:300,bracelet:'오이스터 브레슬릿',tagline:'깊이를 향한 도전, 일상 속의 아이콘.',url:'https://www.rolex.com/ko/watches/submariner/m126610ln-0001',copy:'블랙 다이얼과 세라크롬 베젤, 견고한 오이스터스틸 케이스. 다이버 워치의 기능성과 간결한 디자인을 함께 만나보세요.'},
  {id:'datejust',name:'Datejust 36',ko:'데이트저스트 36',ref:'126234-0051',size:36,material:'rolesor',materialName:'오이스터스틸 & 화이트 골드',dial:'민트 그린',movement:'3235',reserve:70,water:100,bracelet:'쥬빌리 브레슬릿',tagline:'매일의 순간에 깃드는 클래식.',url:'https://www.rolex.com/ko/watches/datejust/m126234-0051',copy:'민트 그린 다이얼의 섬세한 빛과 화이트 골드 플루티드 베젤. 5열 링크 쥬빌리 브레슬릿이 데이트저스트 특유의 균형을 완성합니다.'},
  {id:'daytona',name:'Cosmograph Daytona',ko:'코스모그래프 데이토나',ref:'126500LN-0001',size:40,material:'steel',materialName:'오이스터스틸',dial:'화이트',movement:'4131',reserve:72,water:100,bracelet:'오이스터 브레슬릿',tagline:'속도를 넘어, 정밀함의 기준으로.',url:'https://www.rolex.com/ko/watches/cosmograph-daytona/m126500ln-0001',copy:'화이트 다이얼에 대비되는 블랙 카운터 링과 세라크롬 타키미터 베젤. 크로노그래프 칼리버 4131이 경과 시간을 정밀하게 측정합니다.'}
];
const $ = s=>document.querySelector(s);
const $$ = s=>[...document.querySelectorAll(s)];
const icon = (name='arrow')=>`<span class="icon ${name}-icon" aria-hidden="true"></span>`;
const knownIds=new Set(watches.map(w=>w.id));
let saved=new Set();
try{const stored=JSON.parse(localStorage.getItem('rolex-selection')||'[]');if(Array.isArray(stored))saved=new Set(stored.filter(id=>knownIds.has(id)));}catch{}
let size=41,material='steel',slide=0,dialogMode='',toastTimer;
const dialog=$('#dialog');
function favorite(w){return `<button class="icon-button favorite" data-save="${w.id}" aria-label="${w.ko} ${saved.has(w.id)?'관심 모델에서 삭제':'관심 모델로 저장'}" aria-pressed="${saved.has(w.id)}">${icon('heart')}</button>`;}
$('#collection-grid').innerHTML=watches.map(w=>`<article class="collection-card reveal"><div class="product-image"><button class="product-open" data-model="${w.id}" aria-label="${w.ko} 자세히 보기"><img src="assets/${w.id}.webp" alt="${w.dial} 다이얼의 롤렉스 ${w.ko}" width="800" height="1200" loading="lazy"></button>${favorite(w)}<span class="product-index">OYSTER PERPETUAL</span></div><div class="product-info"><button class="product-name" data-model="${w.id}"><h3>${w.name}</h3>${icon('northeast')}</button><p class="product-description">${w.tagline}</p><div class="product-meta"><span>${w.size} MM / ${w.material==='steel'?'OYSTERSTEEL':'WHITE ROLESOR'}</span><button data-model="${w.id}">자세히 보기 ↗</button></div></div></article>`).join('');
function syncSaved(){ document.querySelector('[data-action="saved"]').setAttribute('aria-label', 'MY SELECTION, 관심 모델 '+saved.size+'개 보기'); $$('.saved-count').forEach(n=>n.textContent=saved.size);$$('[data-save]').forEach(b=>{const w=watches.find(w=>w.id===b.dataset.save);b.setAttribute('aria-pressed',saved.has(w.id));b.setAttribute('aria-label',`${w.ko} ${saved.has(w.id)?'관심 모델에서 삭제':'관심 모델로 저장'}`);if(b.classList.contains('save-full'))b.innerHTML=`${icon(saved.has(w.id)?'check':'heart')}${saved.has(w.id)?'관심 모델에 저장됨':'관심 모델로 저장'}`;});}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600);}
function toggleSaved(id){const w=watches.find(w=>w.id===id);if(!w)return;let removed=saved.has(id);removed?saved.delete(id):saved.add(id);try{localStorage.setItem('rolex-selection',JSON.stringify([...saved]));}catch{}syncSaved();if(dialog.open&&dialogMode==='saved')renderExplorer('saved');toast(`${w.ko}${removed?'를 관심 모델에서 삭제했습니다.':'를 관심 모델에 저장했습니다.'}`);}
function renderFinder(){
  $$('[data-size]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.size)===size));
  $$('[data-material]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.material===material));
  $('#size-help').textContent={36:'단정한 비례와 편안한 착용감의 36 mm.',40:'균형 잡힌 크기와 스포티한 인상의 40 mm.',41:'손목 위에 선명한 존재감을 더하는 41 mm.'}[size];
  $('#material-help').textContent=material==='steel'?'견고함과 은은한 광택의 스틸.':'오이스터스틸과 화이트 골드의 조화.';
  const w=watches.find(w=>w.size===size&&w.material===material),r=$('#finder-result');
  r.classList.toggle('finder-empty',!w);
  r.innerHTML=w?`<span class="eyebrow gold">YOUR STARTING POINT</span><h3>${w.name}</h3><p>${w.size} mm / ${w.materialName}</p><button class="button gold-button" data-model="${w.id}">나의 시계 만나보기 ${icon()}</button>`:`<span class="eyebrow gold">EXPLORE YOUR OPTIONS</span><h3>선택한 조건의 모델이 없습니다.</h3><p>소개된 세 모델 중에는 이 조합이 없습니다.<br>크기나 소재를 바꿔보세요.</p><button class="reset-link" data-action="reset-finder">추천 조건으로 돌아가기</button>`;
}
function openDialog(mode){setMenu(false);dialogMode=mode;if(!dialog.open)dialog.showModal();document.body.classList.add('locked');dialog.scrollTop=0;}
function closeDialog(){dialog.close();}
dialog.addEventListener('close',()=>{document.body.classList.remove('locked');dialogMode='';});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
function openModel(id){const w=watches.find(w=>w.id===id);if(!w)return;$('#dialog-eyebrow').textContent='OYSTER PERPETUAL / THE COLLECTION';$('#dialog-content').innerHTML=`<div class="dialog-model"><div class="dialog-model-image"><img src="assets/${w.id}.webp" alt="${w.dial} 다이얼의 ${w.ko}" width="800" height="1200"></div><div><p class="ref">REF. ${w.ref}</p><h2 id="dialog-title">${w.name}</h2><p class="model-korean">${w.ko}</p><p class="model-copy">${w.copy}</p><dl class="model-specs"><div><dt>케이스 지름</dt><dd>${w.size} mm</dd></div><div><dt>파워리저브</dt><dd>약 ${w.reserve}시간</dd></div><div><dt>칼리버</dt><dd>${w.movement}</dd></div><div><dt>방수 성능</dt><dd>${w.water} m</dd></div></dl><div class="dialog-actions"><button class="button save-full" data-save="${w.id}" aria-pressed="${saved.has(w.id)}"></button><a href="${w.url}" class="button gold-button" target="_blank" rel="noopener noreferrer">공식 사이트에서 자세히 보기 ${icon('northeast')}</a></div></div></div>`;syncSaved();openDialog('model');}
function explorerItems(list){if(!list.length)return `<div class="empty-state">${dialogMode==='saved'?'아직 저장한 시계가 없습니다.<br>컬렉션의 하트를 눌러 마음에 드는 모델을 모아보세요.':'일치하는 모델이 없습니다.<br>모델명, 소재 또는 크기로 다시 검색해 보세요.'}${dialogMode==='saved'?'<br><button class="button" data-action="explore">컬렉션 둘러보기 '+icon()+'</button>':''}</div>`;return list.map(w=>`<article class="explorer-item"><button class="mini-image" data-model="${w.id}" aria-label="${w.ko} 자세히 보기"><img src="assets/${w.id}.webp" width="85" height="110" alt=""></button><button class="item-main" data-model="${w.id}"><h3>${w.name}</h3><p>${w.ko} / ${w.size} mm</p><p class="ref">${w.materialName}</p></button>${favorite(w)}</article>`).join('');}
function renderExplorer(mode){dialogMode=mode;const isSaved=mode==='saved',list=isSaved?watches.filter(w=>saved.has(w.id)):watches;$('#dialog-eyebrow').textContent=isSaved?'YOUR PERSONAL SELECTION':'EXPLORE THE COLLECTIONS';$('#dialog-content').innerHTML=`<h2 id="dialog-title">${isSaved?'My selection.':'Find your icon.'}</h2>${isSaved?'<p class="dialog-description">관심 모델은 이 브라우저에 저장됩니다.</p>':'<label class="search-field"><span class="sr-only">모델 검색</span>'+icon('search')+'<input id="watch-search" type="search" placeholder="모델명, 소재 또는 크기로 검색" autocomplete="off"></label>'}<div class="explorer-list" id="explorer-list">${explorerItems(list)}</div><p class="sr-only" id="search-count" role="status">${list.length}개 모델</p>`;}
function openExplorer(mode){renderExplorer(mode);openDialog(mode);if(mode==='search'||mode==='explore')$('#watch-search').focus();}
function setMenu(open){$('#mobile-menu').hidden=!open;const button=$('[data-action=menu]');button.setAttribute('aria-expanded',open);button.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');button.innerHTML=icon(open?'close':'menu');document.body.classList.toggle('locked',open||dialog.open);if(open)$('#mobile-menu a').focus();}
const slides=[
 {image:'hero-gold.webp',alt:'18캐럿 옐로우 골드 서브마리너 데이트의 블랙 다이얼과 베젤 클로즈업',name:'Submariner Date',detail:'41 mm / 18 ct yellow gold',url:'https://www.rolex.com/ko/watches/submariner/m126618ln-0002'},
 {image:'dial.webp',alt:'민트 그린 다이얼의 데이트저스트 36 클로즈업',name:'Datejust 36',detail:'36 mm / White Rolesor',id:'datejust'},
 {image:'daytona-scene.webp',alt:'화이트 다이얼 코스모그래프 데이토나',name:'Cosmograph Daytona',detail:'40 mm / Oystersteel',id:'daytona'}
];
function setSlide(n){slide=n;const s=slides[n];$('#hero-image').src='assets/'+s.image;$('#hero-image').alt=s.alt;$('#hero-image').style.objectPosition=n===2?'65% 60%':'65% 50%';$('#hero-caption').innerHTML=`<span class="eyebrow">OYSTER PERPETUAL</span><strong>${s.name}</strong><span class="caption-detail">${s.detail} ${icon('northeast')}</span>`;$$('[data-slide]').forEach(b=>{const active=Number(b.dataset.slide)===n;b.classList.toggle('active',active);b.setAttribute('aria-current',active);});}
document.addEventListener('click',e=>{
const b=e.target.closest('button');
if(b?.dataset.save){toggleSaved(b.dataset.save);return;}
if(b?.dataset.model){openModel(b.dataset.model);return;}
if(b?.dataset.size){size=Number(b.dataset.size);renderFinder();return;}
if(b?.dataset.material){material=b.dataset.material;renderFinder();return;}
if(b?.dataset.slide){setSlide(Number(b.dataset.slide));return;}
switch(b?.dataset.action){
case 'search':openExplorer('search');break;case 'explore':openExplorer('explore');break;case 'saved':openExplorer('saved');break;
case 'menu':setMenu($('#mobile-menu').hidden);break;case 'close-dialog':closeDialog();break;
case 'reset-finder':size=41;material='steel';renderFinder();break;
case 'hero-link':if(slides[slide].id)openModel(slides[slide].id);else window.open(slides[slide].url,'_blank','noopener,noreferrer');break;
case 'about':$('#dialog-eyebrow').textContent='INDEPENDENT DESIGN EXPLORATION';$('#dialog-content').innerHTML=`<h2 id="dialog-title">Time, redefined.</h2><div class="about-copy"><p>롤렉스의 제품 탐색 경험을 새롭게 해석한 개인 포트폴리오입니다. 제공된 Figma 시안의 차콜, 샴페인 골드, 세리프 타이포그래피를 바탕으로 반응형 레이아웃과 실제 작동하는 탐색 기능을 구현했습니다.</p><p>이 사이트는 Rolex SA의 공식 웹사이트가 아니며 제휴 관계가 없습니다. 제품 구매와 상담은 롤렉스 공식 사이트에서 진행할 수 있습니다.</p><p>사진과 제품 사양: <a href="https://www.rolex.com/ko" target="_blank" rel="noopener noreferrer">Rolex 공식 웹사이트</a><br>워드마크: <a href="https://commons.wikimedia.org/wiki/File:Rolex_wordmark_logo.svg" target="_blank" rel="noopener noreferrer">Wikimedia Commons / Rolex SA</a><br>타이포그래피: Cormorant Garamond, Pretendard<br>아이콘: Phosphor Icons</p><p>관심 모델 선택만 현재 브라우저에 저장합니다. 계정 정보와 개인정보를 수집하거나 전송하지 않습니다.</p></div>`;openDialog('about');break;
}
if(e.target.closest('#mobile-menu a'))setMenu(false);
});
document.addEventListener('input',e=>{if(e.target.id==='watch-search'){const q=e.target.value.trim().toLowerCase();const list=watches.filter(w=>`${w.name} ${w.ko} ${w.materialName} ${w.size} ${w.dial} ${w.ref}`.toLowerCase().includes(q));$('#explorer-list').innerHTML=explorerItems(list);$('#search-count').textContent=`${list.length}개 모델`;} });
$('#differences').addEventListener('change',e=>$$('.same-spec').forEach(row=>row.hidden=e.target.checked));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#mobile-menu').hidden)setMenu(false);if(e.key==='Tab'&&!$('#mobile-menu').hidden){const controls=[$('[data-action=menu]'),...$$('#mobile-menu a')];if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}}});
matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
renderFinder();syncSaved();
if('IntersectionObserver' in window){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});$$('.reveal').forEach(el=>observer.observe(el));}
