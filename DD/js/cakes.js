document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const toggleSection = document.querySelector('.toggle-section');
    const hiddenCakes = document.querySelector('.hidden-cakes');
    const arrowIcon = document.querySelector('.arrow-icon');
    const container = document.querySelector('.container');

    // Настройки анимации
    const ANIMATION_DURATION = 600;
    const SCROLL_DELAY = 100;

    if (toggleButton) {
        let isAnimating = false;

        toggleButton.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;

            const isExpanded = toggleSection.classList.toggle('expanded');
            
            if (isExpanded) {
                container.appendChild(toggleSection);
                hiddenCakes.style.transition = `max-height ${ANIMATION_DURATION}ms ease, padding ${ANIMATION_DURATION}ms ease`;
                hiddenCakes.classList.add('show');
                
                setTimeout(() => {
                    toggleSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    isAnimating = false;
                }, SCROLL_DELAY);
            } else {
                toggleSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                setTimeout(() => {
                    hiddenCakes.classList.remove('show');
                    
                    setTimeout(() => {
                        const cakes = document.querySelector('.cakes');
                        cakes.insertAdjacentElement('afterend', toggleSection);
                        isAnimating = false;
                    }, ANIMATION_DURATION);
                }, SCROLL_DELAY);
            }
        });
    }

    // Проверка загрузки изображений
    const images = ['Vector.png', 'VectorO.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = function() {
            console.error('Ошибка загрузки изображения:', src);
        };
    });
});