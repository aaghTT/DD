document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Прокрутка к форме заказа
    function scrollToOrder() {
        const orderSection = document.getElementById('order');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Обработка отправки формы
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = {
                name: document.getElementById('fullname').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                date: document.getElementById('date').value,
                cake: document.getElementById('cake').value,
                createdAt: new Date().toISOString()
            };
            
            // Валидация данных
            if (!formData.name) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            
            if (!formData.phone.match(/^\+?[0-9]{10,15}$/)) {
                alert('Пожалуйста, введите корректный номер телефона (10-15 цифр)');
                return;
            }
            
            if (!formData.date) {
                alert('Пожалуйста, выберите дату получения');
                return;
            }
            
            if (!formData.cake) {
                alert('Пожалуйста, выберите торт');
                return;
            }

            try {
                // Показываем индикатор загрузки
                const submitBtn = document.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
                
                // Отправляем данные на MockAPI
                const response = await fetch('https://6831cb646205ab0d6c3da755.mockapi.io/api/q1/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // Успешная отправка
                alert('Ваш заказ успешно оформлен! Мы свяжемся с вами для подтверждения.');
                orderForm.reset();
                
            } catch (error) {
                console.error('Ошибка при отправке заказа:', error);
                alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте ещё раз.');
            } finally {
                // Восстанавливаем кнопку
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

    // Назначаем обработчики для всех кнопок "Оформить заказ"
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            scrollToOrder();
        });
    });
});