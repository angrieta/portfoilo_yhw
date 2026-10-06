/* Catalogue search uses the same verified model/detail index as the header. */
(function () {
  'use strict';
  const row=document.querySelector('.list-category');
  if(!row)return;
  const search=document.createElement('div');
  search.className='catalog-search';
  search.innerHTML=`<form class="catalog-search-form" role="search" aria-label="브랜드·모델 검색">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>
    <input type="search" name="q" aria-label="브랜드명 또는 모델명 검색" placeholder="브랜드·모델명 검색 (예: 현대, 그랜저)" autocomplete="off" aria-controls="catalog-search-results" aria-expanded="false">
    <button type="submit">검색</button></form>
    <div class="catalog-search-panel" hidden><p class="catalog-search-status" role="status" aria-live="polite"></p><ul class="catalog-search-results" id="catalog-search-results" aria-label="차량 검색 결과"></ul></div>`;
  row.append(search);
  const input=search.querySelector('input'),panel=search.querySelector('.catalog-search-panel');
  const status=search.querySelector('.catalog-search-status'),list=search.querySelector('ul');
  const normalize=value=>value.toLowerCase().replace(/[\s·-]/g,'');
  let cars=[],loading=null,ready=false,failed=false,matches=[];
  function close(){panel.hidden=true;input.setAttribute('aria-expanded','false');}
  function render(){
    const query=normalize(input.value);
    if(!query){close();return;}
    panel.hidden=false;input.setAttribute('aria-expanded','true');list.replaceChildren();
    if(!ready){status.textContent=failed?'목록을 불러오지 못했습니다. 검색 버튼을 눌러 다시 시도해 주세요.':'차량 목록을 불러오는 중입니다.';return;}
    const terms=input.value.trim().split(/\s+/).map(normalize).filter(Boolean);
    matches=cars.filter(car=>terms.every(term=>normalize(car.brand+' '+car.model).includes(term)));
    status.textContent=matches.length?`검색 결과 ${matches.length}개`:'검색 결과가 없습니다. 브랜드명이나 모델명을 확인해 주세요.';
    matches.forEach(car=>{
      const item=document.createElement('li'),link=document.createElement('a');
      link.href=car.url;
      const copy=document.createElement('span'),brand=document.createElement('small'),model=document.createElement('strong'),arrow=document.createElement('span');
      brand.textContent=car.brand;model.textContent=car.model;arrow.textContent='상세보기 →';arrow.className='result-arrow';arrow.setAttribute('aria-hidden','true');
      copy.append(brand,model);link.append(copy,arrow);item.append(link);list.append(item);
    });
  }
  function load(){
    if(ready)return Promise.resolve();
    if(loading)return loading;
    failed=false;
    loading=fetch('/portfoilo_yhw/demos/chanawa/renewal/assets/data/header-cars.json').then(response=>{if(!response.ok)throw new Error('catalog');return response.json();}).then(data=>{cars=data;ready=true;}).catch(()=>{failed=true;}).finally(()=>{loading=null;if(search.contains(document.activeElement))render();});
    return loading;
  }
  input.addEventListener('focus',()=>{load();render();});
  input.addEventListener('input',()=>{load();render();});
  search.querySelector('form').addEventListener('submit',async event=>{
    event.preventDefault();await load();render();
    const query=normalize(input.value);
    const exact=cars.find(car=>normalize(car.model)===query||normalize(car.brand+car.model)===query);
    if(exact)location.assign(exact.url);
  });
  search.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown' && panel.hidden)render();
    const links=[...list.querySelectorAll('a')],index=links.indexOf(document.activeElement);
    if(event.key==='Escape'){close();input.focus({preventScroll:true});close();}
    if(event.key==='ArrowDown'){event.preventDefault();(links[index+1]||links[0])?.focus();}
    if(event.key==='ArrowUp'){event.preventDefault();if(index<=0)input.focus();else links[index-1].focus();}
  });
  document.addEventListener('pointerdown',event=>{if(!search.contains(event.target))close();});
  search.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!search.contains(document.activeElement))close();}));
})();
