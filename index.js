// index.js
const sliderFrame = document.querySelector('.slider-frame');
const sliderList = document.querySelector('.slider-list');
const slides = document.querySelectorAll('.slider-list li');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');

let currentSlide = 0;
const slideWidth = sliderFrame.offsetWidth;

function showSlide(n) {
  sliderList.style.transform = `translateX(-${n * slideWidth}px)`;
  sliderList.style.transition = 'transform 0.5s ease'; // Transición suave
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Animación automática
setInterval(() => {
  nextSlide();
}, 5000); // Cambia de diapositiva cada 5 segundos