let score = 0;
let coinsPerClick = 1; // Начальное количество монет за клик

const scoreElement = document.getElementById('score');
const coinContainer = document.querySelector('.coin-container');
const coinImage = document.querySelector('.coin');
const catImage = document.getElementById('catImage'); // Изменили на выбор по ID

const shopBtn = document.getElementById('shopBtn');
const shopModal = document.getElementById('shopModal');
const closeBtn = document.getElementById('closeBtn');
const upgradeItems = document.querySelectorAll('.upgrade-item');

// Функция для смены изображения котика
function updateCatImage() {
    if (score >= 1000) {
        catImage.src = 'cat.png';
    }
}

// Обработка клика по контейнеру с монетой и котиком
coinContainer.addEventListener('click', (event) => {
    score += coinsPerClick; // Увеличиваем на количество монет за клик
    scoreElement.textContent = score;

    // Обновляем изображение котика в зависимости от количества монет
    updateCatImage();

    const rect = coinContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const maxTilt = 35;
    const tiltX = (offsetY / rect.height) * maxTilt;
    const tiltY = -(offsetX / rect.width) * maxTilt;

    coinImage.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    catImage.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    setTimeout(() => {
        coinImage.style.transform = `rotateX(0) rotateY(0)`;
        catImage.style.transform = `translate(-50%, -50%) rotateX(0) rotateY(0)`;
    }, 300);
});

// Открытие магазина
shopBtn.addEventListener('click', () => {
    shopModal.style.display = 'flex';
});

// Закрытие магазина
closeBtn.addEventListener('click', () => {
    shopModal.style.display = 'none';
});

// Покупка улучшений
upgradeItems.forEach(item => {
    const cost = parseInt(item.getAttribute('data-cost'));
    const value = parseInt(item.getAttribute('data-value'));
    const buyBtn = item.querySelector('.buy-btn');

    buyBtn.addEventListener('click', () => {
        if (score >= cost) {
            score -= cost; // Снимаем стоимость улучшения
            coinsPerClick += value; // Увеличиваем количество монет за клик
            scoreElement.textContent = score;
            updateCatImage(); // Обновляем изображение котика после покупки
            item.style.display = 'none'; // Скрываем купленный элемент

            // Проверка, куплены ли все товары
            const allPurchased = Array.from(upgradeItems).every(item => item.style.display === 'none');
            if (allPurchased) {
                showThankYouModal(); // Показываем модальное окно благодарности
            }
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Недостаточно монет!';
            errorMessage.className = 'error-message'; // Добавьте стиль для сообщения об ошибке
            document.body.appendChild(errorMessage);

            setTimeout(() => {
                document.body.removeChild(errorMessage);
            }, 2000); // Удаляем сообщение через 2 секунды
        }
    });
});

// Функция для показа модального окна благодарности
function showThankYouModal() {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'flex'; // Показываем модальное окно
}

// Обработчик для кнопки "Продолжить играть"
const continueBtn = document.getElementById('continueBtn');
continueBtn.addEventListener('click', () => {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'none'; // Закрываем модальное окно
});

