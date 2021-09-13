const track = document.querySelector('.carousel-img');
const images = Array.from(track.children);
const nextButton = document.querySelector('#next-slide');
const prevButton = document.querySelector('#prev-slide');

const CLASS_ACTIVE = 'carousel-item--active';

const slideWidth = images[0].getBoundingClientRect().width;

images.forEach((image, index) => {
  image.style.left = slideWidth * index + 'px';
});

nextButton.addEventListener('click', e => {
  const activeSlide = track.querySelector('.carousel-item--active');
  const nextSlide = activeSlide.nextElementSibling;

  toMoveSlides(track, activeSlide, nextSlide);
});

prevButton.addEventListener('click', e => {
  const activeSlide = track.querySelector('.carousel-item--active');
  const prevSlide = activeSlide.previousElementSibling;

  toMoveSlides(track, activeSlide, prevSlide);
});

function toMoveSlides(track, activeSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  activeSlide.classList.remove(CLASS_ACTIVE);
  targetSlide.classList.add(CLASS_ACTIVE);
}
