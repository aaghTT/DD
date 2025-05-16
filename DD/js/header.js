document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Функция для проверки размера экрана
    function checkScreenSize() {
        if (window.innerWidth > 992) {
            // На больших экранах гарантируем, что меню видно
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Проверяем при загрузке
    checkScreenSize();
    
    // Проверяем при изменении размера окна
    window.addEventListener('resize', checkScreenSize);

    // Остальной код (как у вас было)
    const SCROLL_THRESHOLD = 30;
    const ANIMATION_SPEED = 200;
    let lastScroll = window.pageYOffset;
    let isMenuOpen = false;

    header.style.transition = `transform ${ANIMATION_SPEED}ms ease-in-out`;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (isMenuOpen || currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        const scrollingDown = currentScroll > lastScroll;
        const scrollDifference = Math.abs(currentScroll - lastScroll);
        
        if (scrollDifference > SCROLL_THRESHOLD) {
            header.style.transform = scrollingDown ? 'translateY(-100%)' : 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }

    function toggleMenu() {
        if (window.innerWidth <= 992) { // Только на мобильных
            isMenuOpen = !isMenuOpen;
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
                header.style.transform = 'translateY(0)';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    let isThrottled = false;
    window.addEventListener('scroll', () => {
        if (!isThrottled) {
            handleScroll();
            isThrottled = true;
            setTimeout(() => { isThrottled = false; }, 100);
        }
    });

    // Обработчик клика по бургеру
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    
        if (this.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            header.style.transform = 'translateY(0)';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => isMenuOpen && toggleMenu());
    });

    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && isMenuOpen) {
            toggleMenu();
        }
    });
});