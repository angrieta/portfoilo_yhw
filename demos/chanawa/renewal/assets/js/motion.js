/* =====================================================================
   차나와 리뉴얼 — 모션 스크립트
   ---------------------------------------------------------------------
   - 뷰포트에 들어온 요소에 .is-in 을 붙여 등장시킨다 (그리드는 순차 지연)
   - 헤더에 스크롤 그림자
   마크업을 바꾸지 않고 여기서 대상만 골라 .reveal 을 붙인다.

   이 파일이 로드되지 않으면 .js-motion 이 붙지 않아 모든 요소가
   처음부터 보인다 (콘텐츠가 숨은 채 남는 사고를 막기 위한 장치).
   ===================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  // 이 스크립트가 살아있을 때만 숨김 스타일이 활성화된다.
  root.classList.add('js-motion');

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {

    /* ── 등장 대상 지정 ────────────────────────────────
       [선택자, 순차지연(ms)] — 지연 0 이면 동시에 등장한다. */
    var TARGETS = [
      ['.rw-sec-hd', 0],
      ['.rw-chips', 0],
      ['#weekly .rw-card', 60],
      ['#bestsale .rw-card', 60],
      ['#readystock .rw-card', 60],
      ['#popular .rw-card', 60],
      ['#preview .container', 0],
      ['.merit-wrap li', 90],          // 컨설팅 3카드
      ['#review .review-grade', 0],
      ['#review .title-wrap', 0],
      ['.homereview li', 70]           // 후기 카드
    ];

    var items = [];
    TARGETS.forEach(function (t) {
      var nodes = doc.querySelectorAll(t[0]);
      Array.prototype.forEach.call(nodes, function (el, i) {
        if (el.classList.contains('reveal')) return;
        el.classList.add('reveal');
        if (t[1]) el.style.setProperty('--d', (i % 6) * t[1] + 'ms');
        items.push(el);
      });
    });

    // 움직임 최소화 설정이면 즉시 전부 보여주고 끝낸다.
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var show = function (el) {
        if (el.classList.contains('is-in')) return;
        el.classList.add('is-in');
        io.unobserve(el);                   // 한 번 등장하면 다시 숨기지 않는다
      };

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          // 교차했거나, 이미 위로 지나쳐 버린 경우(빠른 스크롤·앵커 이동)도 노출.
          // 후자를 빠뜨리면 건너뛴 요소가 영영 숨은 채 남는다.
          if (e.isIntersecting || e.boundingClientRect.top < 0) show(e.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

      items.forEach(function (el) { io.observe(el); });

      // 첫 화면에 이미 들어와 있거나 위로 지나간 요소를 즉시 노출.
      // 스크롤 중에도 주기적으로 훑어 누락분을 보정한다.
      var sweep = function () {
        var vh = window.innerHeight;
        items.forEach(function (el) {
          if (el.classList.contains('is-in')) return;
          var r = el.getBoundingClientRect();
          if (r.top < vh * 0.92) show(el);
        });
      };
      requestAnimationFrame(sweep);

      var sweeping = false;
      window.addEventListener('scroll', function () {
        if (sweeping) return;
        sweeping = true;
        requestAnimationFrame(function () { sweep(); sweeping = false; });
      }, { passive: true });
    }

    /* ── 헤더 스크롤 그림자 ──────────────────────────── */
    var nav = doc.getElementById('navbar');
    if (nav) {
      var ticking = false;
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          nav.classList.toggle('is-scrolled', window.scrollY > 8);
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
})();
