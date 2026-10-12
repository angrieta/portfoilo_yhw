(() => {
  'use strict';
  const region = document.querySelector('.intro-work');
  const element = region?.querySelector('.featured-slider');
  if (!element || !window.Swiper) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const dots = [...region.querySelectorAll('[data-featured-slide]')];
  const link = region.querySelector('#featured-open');
  function update(swiper) {
    const index = swiper.activeIndex;
    const slide = swiper.slides[index];
    swiper.slides.forEach((item, i) => {
      item.inert = i !== index;
      item.setAttribute('aria-hidden', String(i !== index));
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    const target = slide.querySelector('[data-intro-project]');
    link.href = target.href;
    link.dataset.introProject = target.dataset.introProject;
    link.setAttribute('aria-label', target.getAttribute('aria-label'));
    region.querySelector('#featured-name').textContent = slide.dataset.name;
    region.querySelector('#featured-kind').textContent = slide.dataset.kind;
    region.querySelector('#featured-current').textContent = String(index + 1).padStart(2, '0');
    region.querySelector('.featured-status').textContent = `${index + 1} / ${swiper.slides.length}, ${slide.dataset.name}`;
  }
  const slider = new Swiper(element, {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: reducedMotion.matches ? 0 : 380,
    rewind: true,
    grabCursor: true,
    threshold: 10,
    navigation: {
      prevEl: region.querySelector('.featured-prev'),
      nextEl: region.querySelector('.featured-next')
    },
    a11y: {
      prevSlideMessage: '이전 대표 작업',
      nextSlideMessage: '다음 대표 작업',
      slideLabelMessage: '{{index}} / {{slidesLength}}'
    },
    on: { init: update, slideChange: update }
  });
  region.querySelector('.featured-controls').hidden = false;
  dots.forEach((dot, i) => dot.addEventListener('click', () => slider.slideTo(i)));
  region.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const actions = {
      ArrowLeft: () => slider.slidePrev(), ArrowRight: () => slider.slideNext(),
      Home: () => slider.slideTo(0), End: () => slider.slideTo(slider.slides.length - 1)
    };
    if (!actions[event.key]) return;
    event.preventDefault();
    // Keep focus visible when a keyboard command moves the focused preview away.
    if (event.target.closest('.featured-slide')) link.focus({ preventScroll: true });
    actions[event.key]();
  });
  reducedMotion.addEventListener('change', event => { slider.params.speed = event.matches ? 0 : 380; });
})();
