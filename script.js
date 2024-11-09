const navItems = document.querySelectorAll('.nav-tabs li');
const navWrapper = document.querySelector('.nav-wrapper');
const nav = document.getElementById("nav");  // Навигационное меню
const sections = ['#combo-section', '#burgers-section', '#pizza-section', '#sushi-section'];  // Секции, к которым нужно прокручиваться
let lastScrollY = window.scrollY;  // Для отслеживания направления скролла

// Флаг, чтобы избежать прокрутки при начальной загрузке
window.isInitialLoad = true;

// Функция для выделения активного элемента на основе прокрутки
function highlightActiveTab() {
    const wrapperRect = navWrapper.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;

    // Перебираем секции и выбираем ближайшую
    sections.forEach((sectionId, index) => {
        const section = document.querySelector(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);

            // Выбираем ближайшую секцию для активной вкладки
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        }
    });

    // Убираем активность у всех элементов и добавляем ее ближайшему
    navItems.forEach(item => item.classList.remove('active'));
    navItems[closestIndex].classList.add('active');

    // Прокручиваем к нужной секции
    if (!window.isInitialLoad) {
        scrollToSection(closestIndex);
    }
}

// Функция для плавной прокрутки к секции
function scrollToSection(index) {
    const section = document.querySelector(sections[index]);
    
    if (section) {
        // Прокручиваем страницу к секции с учетом высоты меню
        window.scrollTo({
            top: section.offsetTop - 70, // 70 - высота меню (вы можете отрегулировать это значение)
            behavior: 'smooth'
        });
    }
}

// Прокрутка на нужную секцию при скроллинге
window.addEventListener('scroll', function() {
    if (!window.isInitialLoad) {
        highlightActiveTab();
    }

    // Фиксация навигационного меню
    if (window.scrollY > nav.offsetTop) {
        nav.classList.add("fixed");  // Добавляем фиксированное положение для меню
    } else {
        nav.classList.remove("fixed");  // Убираем фиксированное положение
    }
});

// Инициализация: выделяем первый элемент при загрузке страницы
window.onload = function() {
    window.isInitialLoad = false;
    highlightActiveTab();  // Обновляем вкладку только после загрузки страницы
    navWrapper.addEventListener('scroll', highlightActiveTab);  // Добавляем обработчик прокрутки
};

// Привязка навигационных ссылок к соответствующим разделам
navItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(index);
    });
});

// Фиксированное меню навигации
const navOffset = nav.offsetTop;

window.onscroll = function() {
    nav.classList.toggle("fixed", window.pageYOffset >= navOffset);
};

// Обработчик события для каждого элемента карточки
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
document.getElementById("link0").addEventListener('click', () => scrollToElement('#combo-section'));
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
