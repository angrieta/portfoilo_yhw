/* Filter the rendered catalogue by its available rent/lease prices. */
(() => {
  const tabs = document.getElementById('catalogContract');
  if (!tabs) return;
  const cards = [...document.querySelectorAll('.list-product > ul > li')];
  const count = document.querySelector('.list-category .text-info span');
  const brandCount = document.querySelector('.brand-circles .brand-on .brand-label em');
  const empty = document.createElement('p');
  empty.className = 'catalog-contract-empty';
  empty.textContent = '선택한 계약 유형의 차량이 없습니다.';
  empty.hidden = true;
  document.querySelector('.list-product').append(empty);
  tabs.addEventListener('click', event => {
    const tab = event.target.closest('[data-contract]');
    if (!tab) return;
    event.preventDefault();
    const kind = {rent:'렌트', lease:'리스'}[tab.dataset.contract];
    tabs.querySelectorAll('a').forEach(link => {
      link.classList.toggle('tab-on', link === tab);
      link.setAttribute('aria-pressed', String(link === tab));
    });
    let visible = 0;
    cards.forEach(card => {
      const prices = [...card.querySelectorAll('.car-price')];
      let available = !kind;
      prices.forEach(price => {
        const matches = !kind || price.querySelector('.car-kind')?.textContent.trim() === kind;
        price.hidden = !matches;
        if (matches) available = true;
      });
      card.hidden = !available;
      if (available) visible++;
    });
    count.textContent = visible;
    if (brandCount) brandCount.textContent = visible;
    empty.hidden = visible > 0;
  });
  tabs.addEventListener('keydown', event => {
    if (event.key === ' ' && event.target.matches('[data-contract]')) {
      event.preventDefault();
      event.target.click();
    }
  });
})();
