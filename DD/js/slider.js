document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const radios = document.querySelectorAll('input[type="radio"]');
    let currentIndex = 0;
    
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        radios[currentIndex].checked = true;
    }
    
    const interval = setInterval(showNextSlide, 2000);
    
    // Остановка при наведении
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
});