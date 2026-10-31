let currentSlide = 0;
const totalSlides = 2;
function goToSlide(index) {
    currentSlide = index;
    document.getElementById('assembly-track').style.transform = `translateX(-${index * 100}%)`;
    document.querySelector('.carousel-arrow-prev').style.opacity = index === 0 ? '0.3' : '1';
    document.querySelector('.carousel-arrow-next').style.opacity = index === totalSlides - 1 ? '0.3' : '1';
}
document.querySelector('.carousel-arrow-prev').style.opacity = '0.3';
document.querySelector('.carousel-arrow-prev').addEventListener('click', () => goToSlide(0));
document.querySelector('.carousel-arrow-next').addEventListener('click', () => goToSlide(1));
