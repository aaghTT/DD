document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const toggleSection = document.querySelector('.toggle-section');
    const hiddenCakes = document.querySelector('.hidden-cakes');
    const arrowIcon = document.querySelector('.arrow-icon');
    const container = document.querySelector('.container');

    // Настройки анимации
    const ANIMATION_DURATION = 600; // Увеличили длительность анимации
    const SCROLL_DELAY = 100; // Задержка перед скроллом

    if (toggleButton) {
        let isAnimating = false;

        toggleButton.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;

            const isExpanded = toggleSection.classList.toggle('expanded');
            
            if (isExpanded) {
                // 1. Перемещаем стрелку вниз
                container.appendChild(toggleSection);
                
                // 2. Плавное появление контента
                hiddenCakes.style.transition = `max-height ${ANIMATION_DURATION}ms ease, padding ${ANIMATION_DURATION}ms ease`;
                hiddenCakes.classList.add('show');
                
                // 3. Плавный поворот стрелки
                arrowIcon.style.transition = `transform ${ANIMATION_DURATION}ms ease-out`;
                arrowIcon.style.transform = 'rotate(180deg)';
                
                // 4. Плавная прокрутка с задержкой
                setTimeout(() => {
                    toggleSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                    isAnimating = false;
                }, SCROLL_DELAY);
            } else {
                // 1. Плавный поворот стрелки
                arrowIcon.style.transition = `transform ${ANIMATION_DURATION}ms ease-out`;
                arrowIcon.style.transform = 'rotate(0deg)';
                
                // 2. Плавная прокрутка вверх
                toggleSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
                
                // 3. Плавное исчезновение контента с задержкой
                setTimeout(() => {
                    hiddenCakes.style.transition = `max-height ${ANIMATION_DURATION}ms ease, padding ${ANIMATION_DURATION}ms ease`;
                    hiddenCakes.classList.remove('show');
                    
                    // 4. Возвращаем стрелку на место после анимации
                    setTimeout(() => {
                        const cakes = document.querySelector('.cakes');
                        cakes.insertAdjacentElement('afterend', toggleSection);
                        isAnimating = false;
                    }, ANIMATION_DURATION);
                }, SCROLL_DELAY);
            }
        });
    }

    // Проверка загрузки стрелки
    const img = new Image();
    img.src = 'Vector.png';
    img.onerror = function() {
        document.documentElement.classList.add('no-arrow-image');
    };
});