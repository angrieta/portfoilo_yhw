/* Lock the viewport without turning body into a new sticky-header scroll container. */
(function () {
  'use strict';
  const owners = new Set();
  let saved = null;
  function restorePosition() {
    if (saved) window.scrollTo({left:saved.x,top:saved.y,behavior:'instant'});
  }
  window.ChanawaScrollLock = {
    restorePosition,
    lock() {
      const token = {};
      if (!owners.size) {
        const root = document.documentElement;
        saved = {x:window.scrollX,y:window.scrollY,overflow:root.style.overflow,
          gutter:root.style.scrollbarGutter};
        root.style.scrollbarGutter = 'stable';
        root.style.overflow = 'hidden';
        restorePosition();
      }
      owners.add(token);
      return function release() {
        if (!owners.delete(token) || owners.size) return;
        document.documentElement.style.overflow = saved.overflow;
        document.documentElement.style.scrollbarGutter = saved.gutter;
        restorePosition();
        saved = null;
      };
    }
  };
})();

/* 원본 약관을 보여주고, 저장 시에만 견적 폼의 동의 상태를 반영한다. */
(function () {
  'use strict';
  var dialog = document.getElementById('rwConsentDialog');
  if (!dialog) return;
  var form, trigger, main;
  var all = dialog.querySelector('#rwcp-all');
  var choices = Array.from(dialog.querySelectorAll('[data-consent]'));
  var fields = {};
  var releaseScroll = null;

  function useForm(nextForm) {
    form = nextForm;
    main = form.querySelector('input[name="agree"]');
    fields = {};
    choices.forEach(function (choice) {
      var key = choice.dataset.consent;
      var field = form.querySelector('input[name="' + key + '_agree"]');
      if (!field) {
        field = document.createElement('input');
        field.type = 'hidden'; field.name = key + '_agree'; field.value = '0';
        form.appendChild(field);
      }
      fields[key] = field;
    });
  }

  function syncAll() {
    var count = choices.filter(function (choice) { return choice.checked; }).length;
    all.checked = count === choices.length;
    all.indeterminate = count > 0 && count < choices.length;
  }
  document.addEventListener('click', function (event) {
    var candidate = event.target.closest('.rw-detail,[data-rw-consent]');
    if (!candidate) return;
    var nextForm = candidate.closest('form');
    if (!nextForm || !nextForm.querySelector('[name="agree"]')) return;
    event.preventDefault();
    trigger = candidate;
    useForm(nextForm);
    if (dialog.open) return;
    // 상위 체크는 필수 동의만 나타내며, 선택 항목을 자동 선택하지 않는다.
    fields.privacy.value = main.checked ? '1' : '0';
    choices.forEach(function (choice) { choice.checked = fields[choice.dataset.consent].value === '1'; });
    syncAll();
    releaseScroll = window.ChanawaScrollLock.lock();
    dialog.showModal();
    dialog.querySelector('[data-consent-close]').focus({ preventScroll: true });
    window.ChanawaScrollLock.restorePosition();
  });
  all.addEventListener('change', function () {
    choices.forEach(function (choice) { choice.checked = all.checked; });
    syncAll();
  });
  choices.forEach(function (choice) { choice.addEventListener('change', syncAll); });
  dialog.querySelectorAll('.rwcp-expand').forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.setAttribute('aria-label', button.getAttribute('aria-label').replace(expanded ? '접기' : '펼치기', expanded ? '펼치기' : '접기'));
      document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
    });
  });
  dialog.querySelector('[data-consent-close]').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.rwcp-save').addEventListener('click', function () {
    choices.forEach(function (choice) { fields[choice.dataset.consent].value = choice.checked ? '1' : '0'; });
    main.checked = fields.privacy.value === '1';
    main.dispatchEvent(new Event('change', { bubbles: true }));
    dialog.close();
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    releaseScroll?.();
    releaseScroll = null;
    trigger.focus({ preventScroll: true });
  });
})();
