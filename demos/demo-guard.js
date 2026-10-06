/* Public portfolio copies must not submit leads or contact production APIs. */
(() => {
  'use strict';
  const message = '포트폴리오 시연용 화면입니다. 실제 상담은 접수되지 않습니다.';
  const nativeFetch = window.fetch.bind(window);
  const sampleCars=location.pathname.includes('/demos/carbay/')?nativeFetch('/portfoilo_yhw/demos/carbay-sample-cars.json').then(r=>r.json()).catch(()=>[]):Promise.resolve([]);
  window.fetch = (input, options) => {
    const url = new URL(input instanceof Request ? input.url : String(input), location.href);
    if(url.pathname==='/api/build')return sampleCars.then(cars=>{
      const brands=[...new Map(cars.map(c=>[c.maker,{code:Number(c.brandImage.match(/brands\/(\d+)/)?.[1]),name:c.maker}])).values()];
      let result=[];
      if(url.searchParams.has('brands'))result=brands;
      else if(url.searchParams.has('brandCode'))result=cars.filter(c=>c.brandImage.includes('/brands/'+url.searchParams.get('brandCode')+'/')).map(c=>({code:c.modelCode,name:c.name}));
      return new Response(JSON.stringify(result),{headers:{'Content-Type':'application/json'}});
    });
    if (/\/api\/|estimate\.php|request\.php/.test(url.pathname) || (options?.method && !/^(GET|HEAD)$/i.test(options.method))) {
      return Promise.resolve(new Response(JSON.stringify({success:false,message,items:[],data:[]}),{status:200,headers:{'Content-Type':'application/json'}}));
    }
    return nativeFetch(input,options);
  };
  document.addEventListener('submit', event => {
    if (event.target.getAttribute('role') === 'search') return;
    event.preventDefault();event.stopImmediatePropagation();alert(message);
  },true);
  document.addEventListener('click',event=>{
    const target=event.composedPath()[0];
    const link=target.closest?.('a');
    if(link && /^(tel:|sms:)/.test(link.getAttribute('href')||'')) {event.preventDefault();event.stopImmediatePropagation();alert(message);}
    if(link && window.PORTFOLIO_DEMO_ROUTES){
      const url=new URL(link.href,location.href);
      const base=location.pathname.match(/\/portfoilo_yhw\/demos\/[^/]+/)[0];
      let route=url.pathname.replace(base,'').replace(/\/$/,'')||'/';
      if(url.origin===location.origin&&!window.PORTFOLIO_DEMO_ROUTES.includes(route)&&!url.hash){
        event.preventDefault();event.stopImmediatePropagation();alert('이 시연본에서는 메인과 주요 UI 화면을 확인할 수 있습니다. 이 메뉴는 운영 서버 연결이 필요한 기능입니다.');
      }
    }
    if(link && location.pathname.includes('/demos/chanawa/')){
      const url=new URL(link.href,location.href);
      if(url.origin===location.origin&&url.pathname!==location.pathname&&!link.classList.contains('rw-card')){
        event.preventDefault();
        const selector=url.pathname.includes('stock')?'#readystock':url.pathname.includes('estimate')?'.rw-form':url.pathname.includes('story')?'#consulting':url.pathname==='/'?'#rw-header':'#weekly';
        document.querySelector('#rw-header')?.shadowRoot?.querySelector('dialog[open]')?.close();
        document.querySelector(selector)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  },true);
  document.addEventListener('DOMContentLoaded',()=>{
    const note=document.createElement('div');note.className='portfolio-demo-note';
    note.textContent='PORTFOLIO DEMO · 상담 접수 불가 · 표시된 상품·수치는 시연용';
    Object.assign(note.style,{position:'relative',zIndex:'100',padding:'8px 12px',background:'#f1f5f4',color:'#455651',font:'12px/1.5 sans-serif',textAlign:'center'});
    if(window.top===window.self){
      note.textContent='포트폴리오 시연 · 실제 상담 접수 불가';
      Object.assign(note.style,{position:'fixed',left:'8px',bottom:'84px',zIndex:'99999',padding:'6px 10px',border:'1px solid #c7d8d0',borderRadius:'4px',fontSize:'11px',pointerEvents:'none'});
    }
    document.body.append(note);
    document.querySelectorAll('input[type="tel"],input[name="phone"],input[name="name"]').forEach(el=>{el.autocomplete='off';});
    if(window.top!==window.self)document.querySelector('#introSkip')?.click();
    if(location.pathname.includes('/demos/carmong/')){
      const enhanceCards=()=>document.querySelectorAll('.car-card[data-id],.model-card[data-id],.maker-card[data-code]').forEach(card=>{
        if(card.hasAttribute('tabindex'))return;
        card.tabIndex=0;card.setAttribute('role','button');
        card.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();card.click();}});
      });
      enhanceCards();new MutationObserver(enhanceCards).observe(document.body,{childList:true,subtree:true});
    }
  });
})();
