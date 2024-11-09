// Получаем элементы навигации и секции
const navItems = document.querySelectorAll('.nav-tabs li a'); // Навигационные элементы (ссылки)
const sections = document.querySelectorAll('.section'); // Секции на странице
const navWrapper = document.querySelector('.nav-wrapper'); // Обертка для навигации
const nav = document.getElementById("nav"); // Навигационное меню

// Функция для выделения активного элемента в навигации в зависимости от прокрутки
function highlightActiveTab() {
    let activeIndex = 0; // По умолчанию активен первый элемент

    // Прокручиваем секции и проверяем, какая из них видна
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Проверяем, что хотя бы часть секции на экране
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            activeIndex = index; // Находим активную секцию
        }
    });

    // Убираем класс активной секции у всех пунктов меню
    navItems.forEach(item => item.classList.remove('active'));
    // Добавляем класс активной секции только тому элементу, который соответствует текущей секции
    navItems[activeIndex].classList.add('active');
    
    // Прокручиваем меню, если необходимо, чтобы активный пункт оказался на верху
    scrollNavToActive(activeIndex);
}

// Функция для прокрутки навигационного меню, чтобы активный пункт был виден
function scrollNavToActive(index) {
    const item = navItems[index];
    const rect = item.getBoundingClientRect();

    // Если активный элемент не виден, прокручиваем меню, чтобы он был в пределах видимости
    if (rect.top < 0 || rect.bottom > navWrapper.offsetHeight) {
        navWrapper.scrollTop = item.offsetTop - (navWrapper.offsetHeight / 2) + (item.offsetHeight / 2);
    }
}

// Функция для плавной прокрутки к секции при клике
function scrollToSection(index) {
    const section = sections[index];
    if (section) {
        // Прокручиваем страницу к секции с учетом высоты меню
        window.scrollTo({
            top: section.offsetTop - 70, // 70 - высота меню
            behavior: 'smooth'
        });
    }
}

// Отслеживаем событие прокрутки страницы
window.addEventListener('scroll', function() {
    highlightActiveTab(); // Обновляем активный пункт при прокрутке страницы
});

// Инициализация: выделяем первый элемент при загрузке страницы
highlightActiveTab();

// Привязка навигационных ссылок к соответствующим разделам
navItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное действие при клике на ссылку
        scrollToSection(index); // При клике скроллим к секции
    });
});

// Фиксированное меню навигации
const navOffset = nav.offsetTop;
window.addEventListener('scroll', function() {
    nav.classList.toggle("fixed", window.pageYOffset >= navOffset); // Фиксируем меню, когда оно выходит за пределы
});

// Открытие и закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("show-side-menu"); // Переключаем видимость бокового меню
}

// Обработчик для кнопки закрытия бокового меню
document.querySelector(".close-button1").addEventListener("click", toggleSideMenu);

// Обработчик для каждого элемента карточки (модальное окно)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function() {
        const info = `${card.querySelector('.name').innerText} - ${card.querySelector('.price').innerText}`;
        openModal(info);
    });
});

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

// Функция для плавного скролла к элементу
function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

// Привязка навигационных ссылок к соответствующим разделам
document.getElementById("link1").addEventListener('click', () => scrollToElement('#burgers-section'));
document.getElementById("link2").addEventListener('click', () => scrollToElement('#pizza-section'));
document.getElementById("link3").addEventListener('click', () => scrollToElement('#sushi-section'));

// Функция для поиска
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

    // Прокручиваем к соответствующему разделу, если введено "пицца"
    if (input.includes("пицца")) {
        scrollToElement('#pizza-section');
    }
}

// Открытие и закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("show-side-menu");
}

// Обработчик для кнопки закрытия бокового меню
document.querySelector(".close-button1").addEventListener("click", toggleSideMenu);

