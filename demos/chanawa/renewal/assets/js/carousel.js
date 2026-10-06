/* =====================================================================
   반응형 카드 스와이퍼
   ---------------------------------------------------------------------
   가로 스크롤/스냅은 CSS 가 담당하고, 여기서는
     - 섹션마다 페이지 점을 만들고 스크롤 위치에 맞춰 표시
     - 점을 누르면 해당 카드로 이동
     - 스와이프로 끝난 동작이 카드 클릭(견적 시트 열기)으로 새는 것을 막음
   차량은 고정 크기를 유지하며 넘칠 때만 슬라이드와 점을 표시한다.
   ===================================================================== */
(function () {
  'use strict';

  var tracks = document.querySelectorAll('.rw-cards, #review .homereview ul');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!tracks.length) return;

  Array.prototype.forEach.call(tracks, function (track) {
    var isReview = track.matches('#review .homereview ul');
    var cards = isReview ? track.children : track.querySelectorAll('.rw-card');
    if (cards.length < 2) return;

    /* ── 점 ─────────────────────────────────────── */
    var dots = document.createElement('div');
    dots.className = 'rw-swipe-dots';
    for (var i = 0; i < cards.length; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'rw-swipe-dot';
      dot.setAttribute('aria-label', (i + 1) + (isReview ? '번째 출고후기 보기' : '번째 차량 보기'));
      dots.appendChild(dot);
    }
    track.parentNode.insertBefore(dots, track.nextSibling);
    var bs = Array.prototype.slice.call(dots.children);
    var current = 0;

    function step() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return parseFloat(getComputedStyle(cards[0]).width) + gap;
    }

    function sync() {
      var s = step();
      if (!s) return;
      var max = track.scrollWidth - track.clientWidth;
      var i;
      if (max > 0 && track.scrollLeft >= max - 1) {
        // 끝에 닿으면 마지막 점. 카드가 2장씩 보이므로 마지막 카드는
        // 왼쪽 끝에 올 수 없어, 이 처리가 없으면 마지막 점이 켜지지 않는다.
        i = cards.length - 1;
      } else {
        i = Math.round(track.scrollLeft / s);
      }
      i = Math.max(0, Math.min(cards.length - 1, i));
      current = i;
      for (var k = 0; k < bs.length; k++) {
        bs[k].classList.toggle('on', k === i);
        bs[k].setAttribute('aria-current', k === i ? 'true' : 'false');
      }
    }

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { sync(); ticking = false; });
    }, { passive: true });

    Array.prototype.forEach.call(bs, function (b, i) {
      b.addEventListener('click', function (e) {
        track.scrollTo({ left: i * step(), behavior: reduce.matches || e.detail === 0 ? 'auto' : 'smooth' });
      });
    });

    /* ── 스와이프가 클릭으로 새지 않도록 ──────────
       가로로 끌었으면 그 직후의 click 을 한 번 삼킨다. */
    var x0 = 0, y0 = 0, moved = false, dragging = false, startScroll = 0;
    track.addEventListener('pointerdown', function (e) {
      x0 = e.clientX; y0 = e.clientY; moved = false; dragging = e.button === 0; startScroll = track.scrollLeft;
    }, { passive: true });
    track.addEventListener('pointermove', function (e) {
      if (dragging && Math.abs(e.clientX - x0) > 8 && Math.abs(e.clientX - x0) > Math.abs(e.clientY - y0)) {
        moved = true;
        if (e.pointerType === 'mouse' && track.classList.contains('has-overflow')) {
          e.preventDefault();
          track.classList.add('is-dragging');
          track.setPointerCapture(e.pointerId);
          track.scrollLeft = startScroll - (e.clientX - x0);
        }
      }
    }, { passive: false });
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    document.addEventListener('pointerup', function () {
      dragging = false;
      if (track.classList.contains('is-dragging')) {
        track.classList.remove('is-dragging');
        track.scrollTo({left:Math.round(track.scrollLeft / step()) * step(),behavior:reduce.matches ? 'auto' : 'smooth'});
      }
    }, { passive: true });
    document.addEventListener('pointercancel', function () { dragging = false; moved = false; track.classList.remove('is-dragging'); }, { passive: true });
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);   // 캡처 단계: 시트 열기 리스너보다 먼저 가로챈다

    sync();
    window.addEventListener('resize', sync, { passive: true });

    {
      function resizeCards() {
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        var content = cards.length * (step() - gap) + (cards.length - 1) * gap;
        var style = getComputedStyle(track);
        var available = track.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        var overflow = content > available + 1;
        track.classList.toggle('has-overflow',overflow);
        dots.hidden = !overflow;
        track.scrollTo({left:overflow ? current * step() : 0,behavior:'instant'});
        sync();
        if (isReview && toggle) schedule();
      }
      track.addEventListener('keydown', function (e) {
        if (!track.classList.contains('has-overflow') || !['ArrowLeft','ArrowRight'].includes(e.key)) return;
        e.preventDefault();
        var next = Math.max(0,Math.min(cards.length - 1,current + (e.key === 'ArrowRight' ? 1 : -1)));
        (isReview ? cards[next].querySelector('a') : cards[next]).focus({preventScroll:true});
        track.scrollTo({left:next * step(),behavior:reduce.matches ? 'auto' : 'smooth'});
      });
      new ResizeObserver(resizeCards).observe(track);
      resizeCards();
    }
    if (!isReview) return;

    /* 후기는 넘칠 때 화면에 보일 때만 5초마다 넘긴다.
       직접 조작/포커스/마우스 읽기 중에는 멈추고, 마지막 다음은 첫 후기다. */
    var timer, visible = false, hovered = false, paused = false;
    var area = track.parentNode;
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'rw-swipe-toggle';
    dots.appendChild(toggle);

    function labelToggle() {
      toggle.classList.toggle('is-paused', paused);
      toggle.setAttribute('aria-label', paused ? '출고후기 자동 넘김 재생' : '출고후기 자동 넘김 정지');
      toggle.hidden = reduce.matches;
    }
    function schedule() {
      clearTimeout(timer);
      var focused = area.contains(document.activeElement) && document.activeElement !== toggle &&
                    document.activeElement.matches(':focus-visible');
      if (!track.classList.contains('has-overflow') || reduce.matches || !visible || document.hidden || paused ||
          hovered || dragging || focused) return;
      timer = setTimeout(function () {
        sync();
        track.scrollTo({ left: ((current + 1) % cards.length) * step(), behavior: 'smooth' });
        schedule();
      }, 5000);
    }
    toggle.addEventListener('click', function () { paused = !paused; labelToggle(); schedule(); });
    area.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovered = true; schedule(); } });
    area.addEventListener('pointerleave', function () { hovered = false; schedule(); });
    area.addEventListener('focusin', schedule);
    area.addEventListener('focusout', function () { setTimeout(schedule, 0); });
    track.addEventListener('pointerdown', schedule, { passive: true });
    document.addEventListener('pointerup', schedule, { passive: true });
    document.addEventListener('pointercancel', schedule, { passive: true });
    track.addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    reduce.addEventListener('change', function () { labelToggle(); schedule(); });
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.5;
        schedule();
      }, { threshold: 0.5 });
      observer.observe(track);
    }
    labelToggle();
  });
})();
