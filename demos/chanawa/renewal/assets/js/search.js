(function () {
  'use strict';
  var dialog = document.getElementById('rwSearch');
  if (!dialog) return;
  var input = dialog.querySelector('input');
  var results = dialog.querySelector('.rws-results');
  var status = dialog.querySelector('.rws-status');
  var catalog = null, loading = null, origin = null, previousOverflow = '', selected = false;
  function normalize(value) { return value.toLowerCase().replace(/\s+/g, ''); }
  function render() {
    if (!catalog) return;
    var query = normalize(input.value);
    var matches = catalog.filter(function (car) { return normalize(car.brand + car.model).includes(query); });
    var shown = query ? matches : matches.slice(0, 5);
    status.textContent = query ? '검색 결과 ' + matches.length + '개' : '추천 차종';
    results.replaceChildren();
    shown.forEach(function (car) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = 'rws-result';
      var info = document.createElement('span');
      var brand = document.createElement('small'); brand.textContent = car.brand;
      var model = document.createElement('strong'); model.textContent = car.model;
      var action = document.createElement('span'); action.textContent = '견적 신청 →';
      info.append(brand, model); button.append(info, action);
      button.addEventListener('click', function () {
        var form = document.querySelector('.rw-form');
        var field = form.querySelector('input[name="car"]');
        field.value = car.model;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        selected = true;
        dialog.close();
        form.scrollIntoView({ block: 'center', behavior: 'instant' });
        form.querySelector('input[name="name"]').focus({ preventScroll: true });
      });
      results.appendChild(button);
    });
    if (!shown.length) {
      var empty = document.createElement('p'); empty.className = 'rws-empty';
      empty.textContent = '검색 결과가 없어요. 차종명이나 브랜드를 다시 확인해 주세요.';
      results.appendChild(empty);
    }
  }
  function load() {
    if (catalog) { render(); return; }
    if (loading) return;
    status.textContent = '차량 목록을 불러오는 중입니다.';
    loading = fetch('/portfoilo_yhw/demos/chanawa/renewal/assets/data/cars.json').then(function (response) {
      if (!response.ok) throw new Error('catalog');
      return response.json();
    }).then(function (data) { catalog = data; render(); }).catch(function () {
      status.textContent = '차량 목록을 불러오지 못했어요. 검색창을 닫고 다시 열어 주세요.';
    }).finally(function () { loading = null; });
  }
  document.querySelectorAll('.rw-search-open').forEach(function (button) {
    button.addEventListener('click', function () {
      origin = button; selected = false; previousOverflow = document.body.style.overflow;
      input.value = ''; dialog.showModal(); document.body.style.overflow = 'hidden';
      load(); input.focus({ preventScroll: true });
    });
  });
  input.addEventListener('input', render);
  dialog.querySelector('.rws-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;
    if (!selected && origin) origin.focus({ preventScroll: true });
  });
})();
