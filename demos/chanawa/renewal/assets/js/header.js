(function(){
  'use strict';
  const host=document.getElementById('rw-header');
  if(!host)return;
  const root=host.shadowRoot||host.attachShadow({mode:'open'});
  const template=host.querySelector('template');
  if(template){root.append(template.content.cloneNode(true));template.remove();}
  const header=root.querySelector('.header');
  // Subpage fixed controls follow the rendered header across breakpoints.
  const syncHeaderHeight=()=>document.documentElement.style.setProperty(
    '--rw-header-height',`${host.getBoundingClientRect().height}px`);
  new ResizeObserver(syncHeaderHeight).observe(host);
  syncHeaderHeight();
  const n=1;
  // Move existing controls so keyboard order follows the mobile layout as well.
  if(n<=3){
    const call=header.querySelector('.call-button'),nav=n===2?header.querySelector('.nav-row'):null,search=header.querySelector('.search-unit');
    const searchRow=document.createElement('div');searchRow.className='mobile-search-row';
    const positions=[call,...(nav?[nav]:[]),search].map(element=>{
      const marker=document.createComment('desktop control position');element.before(marker);return {element,marker};
    });
    const mobile=window.matchMedia('(max-width:999px)');
    const arrange=()=>{
      const menuButton=header.querySelector('.mobile-menu-button');
      if(!mobile.matches){positions.forEach(({element,marker})=>marker.after(element));header.append(menuButton);searchRow.remove();return;}
      // 01 places the menu beside the logo and the icon-only call beside search.
      if(n===1){
        header.querySelector('.brand').after(menuButton);
        positions.find(position=>position.element===search).marker.after(searchRow);
        searchRow.append(search,call);return;
      }
      header.querySelector('.brand').after(call);
      if(nav)header.querySelector('.upper-row>.search-unit').before(nav);
      positions.find(position=>position.element===search).marker.after(searchRow);
      searchRow.append(search,menuButton);
    };
    mobile.addEventListener('change',arrange);arrange();
  }
  // Touch uses native momentum scrolling; mouse dragging works in mobile previews too.
  const serviceNav=header.querySelector('.service-nav');
  const smallScreen=matchMedia('(max-width:999px)');
  const pagePath=location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
  const sectionPath=pagePath.split('/')[1];
  root.querySelectorAll('.service-nav a, .menu-services a').forEach(link=>{
    const linkSection=new URL(link.href,location.origin).pathname.split('/')[1];
    if(sectionPath && sectionPath===linkSection) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(pagePath==='/') header.querySelector('.brand').setAttribute('aria-current','page');
  function revealActivePage(){
    const active=serviceNav.querySelector('[aria-current="page"]');
    if(!smallScreen.matches || !active)return;
    const item=active.getBoundingClientRect(),rail=serviceNav.getBoundingClientRect();
    // Scroll only the horizontal menu, never the user's page position.
    if(item.left<rail.left+32 || item.right>rail.right-32){
      serviceNav.scrollLeft+=item.left-rail.left-(rail.width-item.width)/2;
    }
  }
  requestAnimationFrame(revealActivePage);
  document.fonts.ready.then(revealActivePage);
  new ResizeObserver(revealActivePage).observe(serviceNav);
  if(n===1){
    const viewport=document.createElement('div');viewport.className='service-nav-viewport';
    serviceNav.before(viewport);viewport.append(serviceNav);
    const next=document.createElement('button');next.type='button';next.className='service-nav-next';
    next.setAttribute('aria-label','오른쪽 메뉴 더 보기');
    next.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
    const previous=next.cloneNode(true);previous.className='service-nav-previous';
    previous.setAttribute('aria-label','왼쪽 메뉴 더 보기');
    viewport.prepend(previous);
    viewport.append(next);
    const updateOverflow=()=>{
      const more=smallScreen.matches&&serviceNav.scrollWidth-serviceNav.clientWidth-serviceNav.scrollLeft>2;
      const earlier=smallScreen.matches&&serviceNav.scrollLeft>2;
      viewport.classList.toggle('has-more',more);next.disabled=!more;
      viewport.classList.toggle('has-previous',earlier);previous.disabled=!earlier;
    };
    next.addEventListener('click',()=>serviceNav.scrollBy({left:serviceNav.clientWidth*.75,
      behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
    previous.addEventListener('click',()=>serviceNav.scrollBy({left:-serviceNav.clientWidth*.75,
      behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
    serviceNav.addEventListener('scroll',updateOverflow,{passive:true});
    new ResizeObserver(updateOverflow).observe(serviceNav);
    document.fonts.ready.then(updateOverflow);
    updateOverflow();
  }
  let drag=null,suppressClick=false;
  serviceNav.addEventListener('pointerdown',event=>{
    suppressClick=false;
    if(!smallScreen.matches||event.pointerType==='touch'||event.button!==0)return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:serviceNav.scrollLeft,moved:false};
  });
  serviceNav.addEventListener('pointermove',event=>{
    if(!drag||drag.id!==event.pointerId)return;
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!drag.moved){
      if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>6){drag=null;return;}
      if(Math.abs(dx)<6)return;
      drag.moved=true;suppressClick=true;
      serviceNav.setPointerCapture(event.pointerId);
      serviceNav.classList.add('is-dragging');
    }
    event.preventDefault();serviceNav.scrollLeft=drag.left-dx;
  });
  const endDrag=()=>{drag=null;serviceNav.classList.remove('is-dragging');};
  serviceNav.addEventListener('pointerup',endDrag);
  serviceNav.addEventListener('pointercancel',endDrag);
  serviceNav.addEventListener('lostpointercapture',endDrag);
  serviceNav.addEventListener('pointerleave',()=>{if(drag&&!drag.moved)endDrag();});
  serviceNav.addEventListener('dragstart',event=>{if(smallScreen.matches)event.preventDefault();});
  serviceNav.addEventListener('click',event=>{
    if(suppressClick&&event.detail!==0){event.preventDefault();event.stopPropagation();}
    suppressClick=false;
  },true);
  smallScreen.addEventListener('change',()=>{endDrag();serviceNav.scrollLeft=0;requestAnimationFrame(revealActivePage);});
  const units=[...header.querySelectorAll('.search-unit')];
  let catalog=[], ready=false, failed=false, timer=null;
  const normal=s=>s.toLowerCase().replace(/\s+/g,'');
  const initials=s=>[...s].map(c=>{const x=c.charCodeAt(0)-0xac00;return x>=0&&x<=11171?'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'[Math.floor(x/588)]:c;}).join('');
  function show(unit) {
    const input=unit.querySelector('input'),panel=unit.querySelector('.suggestions'),status=unit.querySelector('.result-heading'),list=unit.querySelector('.result-list');
    panel.hidden=false; input.setAttribute('aria-expanded','true'); list.replaceChildren();
    if(!ready){status.textContent=failed?'차량 목록을 불러오지 못했어요. 페이지를 새로고침해 주세요.':'차종을 불러오고 있어요.';return;}
    const q=normal(input.value);
    const matches=catalog.filter(c=>(!q||normal(c.brand+c.model).includes(q)||initials(normal(c.model)).includes(q)));
    const limited=!q?matches.slice(0,5):matches;
    status.textContent=q?'검색 결과 '+matches.length+'개':'지금 많이 찾는 차종';
    for(const car of limited){
      const b=document.createElement('a');b.href=car.url;b.className='result';
      const left=document.createElement('span'),small=document.createElement('small'),strong=document.createElement('strong'),right=document.createElement('span');
      small.textContent=car.brand;strong.textContent=car.model;right.textContent='상세보기 →';left.append(small,strong);b.append(left,right);
      list.appendChild(b);
    }
    if(!limited.length){const p=document.createElement('p');p.className='empty';p.textContent='검색 결과가 없어요. 차종명이나 브랜드를 다시 확인해 주세요.';list.appendChild(p);}
  }
  function closeSearch(){
    for(const unit of units){unit.querySelector('.suggestions').hidden=true;unit.querySelector('input').setAttribute('aria-expanded','false');}
  }
  document.addEventListener('header-menu-opening',closeSearch);
  units.forEach((unit,i)=>{
    const input=unit.querySelector('input'),list=unit.querySelector('.result-list'),panel=unit.querySelector('.suggestions');
    const focusResult=option=>{
      if(!option)return;
      option.focus({preventScroll:true});
      const item=option.getBoundingClientRect(),box=panel.getBoundingClientRect();
      if(item.top<box.top+8)panel.scrollTop-=box.top+8-item.top;
      else if(item.bottom>box.bottom-8)panel.scrollTop+=item.bottom-box.bottom+8;
    };
    list.id='results-'+i;input.setAttribute('aria-controls',list.id);input.setAttribute('aria-expanded','false');
    input.addEventListener('focus',()=>show(unit));input.addEventListener('input',()=>show(unit));
    unit.querySelector('form').addEventListener('submit',e=>{
      e.preventDefault();show(unit);
      const query=normal(input.value);
      const exact=catalog.find(car=>query&&(normal(car.model)===query||normal(car.brand+car.model)===query));
      if(exact)window.location.assign(exact.url);
      else if(query&&list.children.length===1&&list.firstElementChild.matches('a'))window.location.assign(list.firstElementChild.href);
      else focusResult(list.querySelector('a'));
    });
    unit.addEventListener('keydown',e=>{
      const options=[...list.querySelectorAll('a')],index=options.indexOf(root.activeElement);
      if(e.key==='ArrowDown'){e.preventDefault();if(panel.hidden)show(unit);else focusResult(options[index+1]||options[0]);}
      if(e.key==='ArrowUp'){e.preventDefault();if(index<=0)input.focus({preventScroll:true});else focusResult(options[index-1]);}
      if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeSearch();input.focus();panel.hidden=true;input.setAttribute('aria-expanded','false');}
    });
  });
  document.addEventListener('pointerdown',event=>{
    if(!event.composedPath().some(node=>node.classList?.contains('search-unit')))closeSearch();
  });
  root.addEventListener('keydown',event=>{if(event.key==='Escape')closeSearch();});
  fetch('/portfoilo_yhw/demos/chanawa/renewal/assets/data/header-cars.json').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(data=>{catalog=data;ready=true;units.filter(u=>!u.querySelector('.suggestions').hidden).forEach(show);}).catch(()=>{failed=true;units.filter(u=>!u.querySelector('.suggestions').hidden).forEach(show);});

function setupMenu(){
  'use strict';
  const menu=root.querySelector('.mobile-menu'),button=root.querySelector('.mobile-menu-button');
  const panel=menu.querySelector('.menu-panel'),shade=menu.querySelector('.menu-shade'),closeButton=menu.querySelector('.menu-close');
  const mobile=matchMedia('(max-width:999px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
  let state='closed',revision=0,motion=[],openingFrame=0;
  const closedPose=[{transform:'translate3d(100%,0,0)',opacity:'1'},{opacity:'0'}];
  const openPose=[{transform:'translate3d(0,0,0)',opacity:'1'},{opacity:'1'}];
  const appearance=element=>({transform:getComputedStyle(element).transform,opacity:getComputedStyle(element).opacity});
  function setPose(pose){
    panel.style.transform=pose[0].transform;panel.style.opacity=pose[0].opacity;
    shade.style.opacity=pose[1].opacity;
  }
  function stopMotion(){
    cancelAnimationFrame(openingFrame);openingFrame=0;
    motion.forEach(animation=>animation.cancel());motion=[];
  }
  function animate(from,to,duration,done){
    const version=revision;
    motion=[panel,shade].map((element,index)=>element.animate([from[index],to[index]],{
      duration,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'
    }));
    Promise.allSettled(motion.map(animation=>animation.finished)).then(()=>{
      if(version!==revision)return;
      stopMotion();done();
    });
  }
  const notify=open=>{
    host.toggleAttribute('data-menu-open',open);
  };
  function finish(){
    stopMotion();state='closed';menu.classList.remove('is-open','is-closing','instant');
    if(menu.open)menu.close();
    menu.style.opacity='0';
    setPose(closedPose);
    document.documentElement.classList.remove('mobile-menu-open');
    button.setAttribute('aria-expanded','false');notify(false);
    if(mobile.matches)button.focus({preventScroll:true});
  }
  function open(){
    if(!mobile.matches||state!=='closed')return;
    revision++;state='opening';
    document.dispatchEvent(new Event('header-menu-opening'));
    // Safari does not always focus a tapped button. Make the opener the
    // dialog's return target, rather than restoring a search input/keyboard.
    button.focus({preventScroll:true});
    // showModal() performs its own focusing steps. Keep the controls in the
    // viewport for those steps: an offscreen transform can scroll the dialog
    // horizontally before preventScroll on our explicit focus takes effect.
    // Hide the entire dialog until its entry animation has been installed.
    menu.style.opacity='0';
    setPose(openPose);
    document.documentElement.classList.add('mobile-menu-open');
    menu.showModal();button.setAttribute('aria-expanded','true');notify(true);
    menu.classList.add('is-open');
    closeButton.focus({preventScroll:true});
    menu.scrollLeft=0;menu.scrollTop=0;
    if(reduce.matches){menu.style.opacity='1';state='open';return;}
    setPose(closedPose);
    openingFrame=requestAnimationFrame(()=>{
      openingFrame=0;
      if(state!=='opening')return;
      // The underlying pose matches the last keyframe, including its 3D
      // transform, so cancelling the finished animation cannot snap/flicker.
      setPose(openPose);
      animate(closedPose,openPose,280,()=>{state='open';});
      menu.style.opacity='1';
    });
  }
  function close(instant=false){
    if(state==='closed'||state==='closing')return;
    if(openingFrame){revision++;finish();return;}
    const from=[appearance(panel),appearance(shade)];
    revision++;stopMotion();state='closing';
    menu.classList.add('is-closing');menu.classList.remove('is-open');
    setPose(closedPose);
    if(instant||reduce.matches){finish();return;}
    animate(from,closedPose,240,finish);
  }
  button.addEventListener('click',open);
  closeButton.addEventListener('click',()=>close());
  shade.addEventListener('click',()=>close());
  menu.addEventListener('cancel',event=>{event.preventDefault();close();});
  menu.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const controls=[...panel.querySelectorAll('a[href],button:not([disabled])')].filter(element=>element.getClientRects().length);
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&root.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&root.activeElement===last){event.preventDefault();first.focus();}
  });
  menu.addEventListener('close',()=>{if(state!=='closed'){revision++;finish();}});
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>close(true)));
  mobile.addEventListener('change',()=>{if(!mobile.matches&&state!=='closed'){revision++;finish();}});
  reduce.addEventListener('change',()=>{
    if(!reduce.matches)return;
    revision++;stopMotion();
    if(state==='closing')finish();
    else if(state==='opening'){setPose(openPose);menu.style.opacity='1';state='open';}
  });
}
setupMenu();
})();
