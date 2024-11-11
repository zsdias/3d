// Получаем все пункты меню и контейнер навигации
const navItems = document.querySelectorAll('.nav-tabs li');
const navWrapper = document.querySelector('.nav-wrapper');
const sections = document.querySelectorAll('.combo-section'); // Все секции на странице

// Функция для выделения активной секции в меню
function highlightActiveTab() {
    let currentSectionIndex = -1;

    // Проходим по всем секциям и проверяем, какая на экране
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        // Если верхняя часть секции находится на экране (проверка для прокрутки)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Убираем класс 'active' у всех пунктов меню
    navItems.forEach(item => item.classList.remove('active'));

    // Добавляем класс 'active' к соответствующему пункту меню
    if (currentSectionIndex !== -1) {
        navItems[currentSectionIndex].classList.add('active');
    }
}

// Отслеживаем событие прокрутки страницы
window.addEventListener('scroll', highlightActiveTab);

// Инициализация - выделяем первый элемент при загрузке страницы
highlightActiveTab();

// Привязка навигационных ссылок к соответствующим разделам
document.getElementById("link0").addEventListener('click', () => scrollToElement('#combo-section'));
document.getElementById("link1").addEventListener('click', () => scrollToElement('#burgers-section'));
document.getElementById("link2").addEventListener('click', () => scrollToElement('#pizza-section'));
document.getElementById("link3").addEventListener('click', () => scrollToElement('#sushi-section'));

// Функция для плавного скролла к элементу
function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

// Получаем элементы модального окна
const modal = document.querySelector('.modal');
const closeButtons = document.querySelectorAll(".close-button");

// Функция для открытия модального окна
function openModal(info) {
    document.querySelector('.modal-content h2').innerText = info;
    modal.classList.add('show');
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('show');
}

// Закрытие модального окна при нажатии вне его
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Обработчик для всех кнопок закрытия модального окна
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Модальное окно 2 и overlay для него
const modal2 = document.getElementById('modal2');         // Модальное окно
const overlay2 = document.getElementById('overlay2');     // Оверлей
const closeButton2 = document.getElementById('closeButton2');  // Кнопка закрытия
const openModalBtn = document.getElementById('openModalBtn');  // Кнопка для открытия модального окна

// Функция для открытия модального окна 2
function openModal2() {
    modal2.style.display = 'block';     // Показываем модальное окно
    overlay2.style.display = 'block';   // Показываем оверлей
}

// Функция для закрытия модального окна 2
function closeModal2() {
    modal2.style.display = 'none';      // Скрываем модальное окно
    overlay2.style.display = 'none';    // Скрываем оверлей
}

// Добавляем обработчик события для каждой карточки
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function() {
        const info = `${card.querySelector('.name').innerText} - ${card.querySelector('.price').innerText}`;
        openModal(info);
    });
});

// Открытие и закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    
    // Переключаем отображение бокового меню
    sideMenu.classList.toggle("show-side-menu");
    overlay.classList.toggle("show-overlay");
}

// Закрытие бокового меню при клике на overlay
document.getElementById("overlay").addEventListener('click', function() {
    closeSideMenu(); // Закрыть боковое меню
});

// Закрытие бокового меню
function closeSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    
    sideMenu.classList.remove("show-side-menu"); // Скрыть боковое меню
    overlay.classList.remove("show-overlay"); // Скрыть overlay
}

// Фиксированное меню навигации
const nav = document.getElementById("nav");
const navOffset = nav.offsetTop;

// Меню будет фиксированным при прокрутке страницы
window.onscroll = function() {
    nav.classList.toggle("fixed", window.pageYOffset >= navOffset);
};

// Поиск по карточкам
function search() {
    const input = document.getElementById('searchBox').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    let found = false;

    // Проверяем каждую карточку
    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if (name.includes(input)) {
            found = true; // Найдено совпадение
            card.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Скроллим к карточке
            return; // Прерываем цикл, как только нашли первое совпадение
        }
    });

    // Если ничего не найдено, можно показать сообщение
    if (!found) {
        alert("Ничего не найдено");
    }
}

window.addEventListener('scroll', function() {
    highlightActiveTab(); // Обновляем активный пункт при прокрутке страницы
});

// Инициализация: выделяем первый элемент при загрузке страницы
highlightActiveTab();
