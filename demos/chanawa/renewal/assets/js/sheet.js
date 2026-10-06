/* Shared quote dialogs. Read vehicle information from the clicked UI at open time. */
(function () {
  'use strict';
  const vehicle = document.getElementById('rwQuote');
  const general = document.getElementById('rwGeneralQuote');
  if (!vehicle || !general) return;
  let active = null, lastFocus = null, releaseScroll = null;
  let homeCards = [], homeIndex = 0;
  const text = (root, selector) => root?.querySelector(selector)?.textContent.trim() || '';
  const image = (root, selector) => root?.querySelector(selector)?.getAttribute('src') || '';
  const selected = id => document.getElementById(id)?.selectedOptions[0]?.textContent.trim() || '';
  const price = (memo, kind) => memo.match(new RegExp(kind + ':?\\s*월\\s*([\\d,]+)'))?.[1] || '';
  const condition = memo => memo.split('\n').find(line => /^\d+개월/.test(line.trim())) || '';

  function fromTrigger(trigger) {
    const stock = trigger.closest('.stock-tr');
    const detail = trigger.closest('#detail_info');
    const card = trigger.closest('.list-product li');
    const memo = trigger.dataset.memo || '';
    if (detail) {
      const brand = selected('select_brand');
      const model = selected('select_model') || text(detail, '.detail-car-name');
      const trim = [selected('select_lineup'), selected('select_trim')].filter(Boolean).join(' ');
      const rows = [...detail.querySelectorAll('.detail-monthly-price p')];
      const amount = kind => rows.find(row => row.textContent.trim().startsWith(kind))?.querySelector('.text-primary')?.textContent.trim() || '';
      const rent = amount('렌트'), lease = amount('리스');
      const note = text(detail, '.detail-condition');
      const car = [brand, model, trim].filter(Boolean).join(' ');
      return {brand, model, rent, lease, note:[trim,note].filter(Boolean).join('\n'), image:image(detail,'.detail-car-image-wrap img'), car,
        memo:[car,note,rent && '렌트: 월 '+rent+'원',lease && '리스: 월 '+lease+'원'].filter(Boolean).join('\n')};
    }
    return {brand:stock?.dataset.brand || '',
      model:stock ? text(stock,'.nm') : text(card,'.car-name') || trigger.dataset.car?.trim() || '',
      image:image(stock || card, stock ? '.im img' : '.car-image img'),
      rent:price(memo,'렌트'), lease:price(memo,'리스'),
      note:[stock ? text(stock,'.tr') : '',condition(memo)].filter(Boolean).join(' · '),
      title:stock ? '즉시출고 견적 신청' : '차량 견적 신청',car:trigger.dataset.car || '',memo};
  }

  function fromHome(card) {
    const d = card.dataset;
    const titles = {weekly:'이번 주가 제일 싸요',bestsale:'최대 할인',readystock:'즉시 출고',popular:'이 달의 인기 차종'};
    return {brand:d.brand,model:d.model,rent:d.rent,lease:d.lease,badge:d.badge,badgeClass:d.badgeCls,note:d.note,
      title:titles[card.closest('.rw-sec')?.id],
      image:image(card,'.thumb img'),car:[d.brand,d.model].filter(Boolean).join(' '),
      memo:[d.note,'렌트: 월 '+d.rent+'원','리스: 월 '+d.lease+'원'].filter(Boolean).join('\n')};
  }

  function show(dialog) {
    if (active === dialog && dialog.open) return;
    if (active) {
      active.classList.remove('is-open');active.close();
    } else {
      lastFocus = document.activeElement;
      releaseScroll = window.ChanawaScrollLock.lock();
    }
    active = dialog;
    dialog.classList.remove('is-open');
    dialog.showModal();
    dialog.querySelector('.rwq-sheet').scrollTop = 0;
    dialog.querySelector('[data-rwq-close].rwq-x').focus({preventScroll:true});
    dialog.classList.add('is-open');
    window.ChanawaScrollLock.restorePosition();
    const status = dialog.querySelector('.rwq-status');
    status.hidden = true; status.textContent = '';
  }

  function renderVehicle(data) {
    if (!data?.model) return;
    const q = selector => vehicle.querySelector(selector);
    q('.rwq-title').textContent = data.title || '차량 견적 신청';
    q('.rwq-brand').textContent = data.brand || '';
    q('.rwq-model').textContent = data.model;
    q('.rwq-badge').textContent = data.badge || '';
    q('.rwq-badge').className = ['rwq-badge', data.badgeClass || ''].join(' ').trim();
    q('.rent').textContent = data.rent ? String(data.rent).replace(/원$/, '') + '원' : '상담 문의';
    q('.lease').textContent = data.lease ? String(data.lease).replace(/원$/, '') + '원' : '상담 문의';
    q('.rwq-note').textContent = data.note || '';
    q('.rwq-img').hidden = !data.image;
    if (data.image) q('.rwq-img').src = data.image;
    q('.rwq-img').alt = data.model;
    const form = q('form');
    form.elements.car.value = data.car || [data.brand,data.model].filter(Boolean).join(' ');
    form.elements.memo.value = data.memo || '';
    q('.rwq-submit').textContent = data.model + ' 무료 견적 신청';
  }

  function openVehicle(data, cards = [], index = 0) {
    if (!data?.model) return;
    homeCards = cards;
    homeIndex = index;
    const carousel = homeCards.length > 1;
    vehicle.classList.toggle('is-carousel', carousel);
    vehicle.querySelectorAll('.rwq-nav').forEach(button => {button.hidden = !carousel;});
    const dots = vehicle.querySelector('.rwq-dots');
    dots.hidden = !carousel;
    dots.replaceChildren();
    if (carousel) homeCards.forEach((card, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `${i + 1}번째 ${card.dataset.model} 보기`);
      button.addEventListener('click', () => moveVehicle(i - homeIndex));
      dots.append(button);
    });
    renderVehicle(data);
    syncCarousel();
    show(vehicle);
  }

  function syncCarousel() {
    vehicle.querySelectorAll('.rwq-dots button').forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === homeIndex));
    });
    vehicle.querySelector('.rwq-slide-status').textContent = homeCards.length > 1
      ? `${homeIndex + 1} / ${homeCards.length}, ${homeCards[homeIndex].dataset.model}` : '';
  }

  function moveVehicle(step) {
    if (homeCards.length < 2) return;
    homeIndex = (homeIndex + step + homeCards.length) % homeCards.length;
    renderVehicle(fromHome(homeCards[homeIndex]));
    const status = vehicle.querySelector('.rwq-status');
    status.hidden = true;
    status.textContent = '';
    syncCarousel();
  }
  vehicle.querySelector('.rwq-prev').addEventListener('click', () => moveVehicle(-1));
  vehicle.querySelector('.rwq-next').addEventListener('click', () => moveVehicle(1));
  vehicle.addEventListener('keydown', event => {
    if (homeCards.length < 2 || event.target.closest('input,textarea,select,form')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveVehicle(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  const visual = vehicle.querySelector('.rwq-visual');
  let swipe = null;
  visual.addEventListener('pointerdown', event => {
    if (homeCards.length < 2 || !event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
    swipe = {id:event.pointerId,x:event.clientX,y:event.clientY};
    visual.setPointerCapture(event.pointerId);
  });
  visual.addEventListener('pointerup', event => {
    if (!swipe || event.pointerId !== swipe.id) return;
    const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.3) moveVehicle(dx < 0 ? 1 : -1);
  });
  visual.addEventListener('pointercancel', () => {swipe = null;});

  const concepts = {
    '많은 할인':['/portfoilo_yhw/demos/chanawa/assets/img/estimate_1.webp','40여 개 제휴 업체를 비교 분석하여\n최대 할인 혜택을 받을 수 있는 업체를 찾아드립니다.'],
    '신용 무관':['/portfoilo_yhw/demos/chanawa/assets/img/estimate_2.webp','내 신용으로도 계약이 될까?\n고객님의 상황에 맞는 방법을 함께 찾아드립니다.'],
    '빠른 출고':['/portfoilo_yhw/demos/chanawa/assets/img/estimate_3.webp','원하시는 출고 일정에 맞춰\n빠르게 받을 수 있는 차량을 안내해드립니다.']
  };
  general.addEventListener('change', event => {
    if (event.target.name !== 'point' || !event.target.checked) return;
    const value = event.target.value, content = concepts[value];
    if (!content) return;
    general.querySelector('.rwq-general-img').src = content[0];
    general.querySelector('.rwq-lead').textContent = content[1];
    general.querySelector('[name=memo]').value = '['+value.replace(/\s/g,'')+']';
  });

  // Capture the selected vehicle before older per-page popup handlers run.
  document.querySelectorAll('.stock-tr .im').forEach(visual => {
    visual.tabIndex = 0;
    visual.setAttribute('role','button');
    visual.setAttribute('aria-label',text(visual.closest('.stock-tr'),'.nm')+' 견적 보기');
    visual.addEventListener('keydown',event=>{
      if (event.key==='Enter'||event.key===' ') {event.preventDefault();visual.click();}
    });
  });
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest('.rwq')) return;
    let data, isGeneral = false;
    const homeCard = target.closest('.rw-card');
    const bottom = target.closest('.m-btn-quickform,[data-quickform-open]');
    const trigger = target.closest('.open_request_popup');
    const rank = target.closest('.stock-rank a[href^="#stock-"]');
    const stock = target.closest('.stock-tr');
    if (homeCard) data = fromHome(homeCard);
    else if (bottom) {
      const detailTrigger = document.querySelector('#detail_info .open_request_popup');
      if (detailTrigger) data = fromTrigger(detailTrigger); else isGeneral = true;
    } else if (trigger && trigger.closest('.list-product,#detail_info,.stock-tr')) data = fromTrigger(trigger);
    else if (rank) {
      const row = document.getElementById(rank.getAttribute('href').slice(1));
      const button = row?.querySelector('.open_request_popup');
      if (button) data = fromTrigger(button);
    } else if (stock && !target.closest('a,button,input,select')) {
      const button = stock.querySelector('.open_request_popup');
      if (button) data = fromTrigger(button);
    }
    if (!data && !isGeneral) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (isGeneral) show(general);
    else if (homeCard) {
      const cards = [...homeCard.closest('.rw-cards').querySelectorAll('.rw-card')]
        .filter(card => card.getClientRects().length > 0);
      openVehicle(data, cards, cards.indexOf(homeCard));
    } else openVehicle(data);
  }, true);

  [vehicle,general].forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target.closest('[data-rwq-close]')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog.open) return;
      dialog.classList.remove('is-open');
      if (active !== dialog) return;
      active = null;
      releaseScroll?.(); releaseScroll = null;
      lastFocus?.focus?.({preventScroll:true});
    });
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const status = form.querySelector('.rwq-status');
      const fail = (message,field) => {status.textContent=message;status.hidden=false;field?.focus();};
      if (!form.elements.name.value.trim()) return fail('이름을 입력해주세요.',form.elements.name);
      const digits = form.elements.phone.value.replace(/\D/g,'');
      if (!/^010\d{8}$/.test(digits)) return fail('휴대폰 번호를 정확히 입력해주세요.',form.elements.phone);
      if (!form.elements.agree.checked) return fail('개인정보 수집 및 이용에 동의해주세요.',form.elements.agree);
      form.elements.privacy_agree.value = '1';
      // The mirrored pages already own the submission/Turnstile integration.
      // Pass the selected vehicle and consent fields to that existing form.
      const legacy = document.querySelector('#request_popup form.frmRequest');
      const submit = legacy?.querySelector('.btn_request_exe');
      if (!submit || !window.cwDoPost) {
        return fail('현재 미리보기에서는 접수가 지원되지 않습니다. 전화상담을 이용해주세요.');
      }
      for (const [name,value] of new FormData(form)) {
        const field = legacy.elements.namedItem(name);
        if (!field) continue;
        if (field.type === 'checkbox') field.checked = true;
        else field.value = value;
      }
      legacy.elements.phone.value = digits.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
      submit.click();
    });
  });
  window.ChanawaQuote = {openVehicle,openGeneral:()=>show(general)};
})();
