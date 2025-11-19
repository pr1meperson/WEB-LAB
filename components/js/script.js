// Чекаємо завантаження DOM (Вимога ЛАБ 4)
document.addEventListener("DOMContentLoaded", () => {

    /**
     * ==========================================
     * ЗАВДАННЯ 1: Функція підстановки імені
     * ==========================================
     */
    function displayUserName() {
        const fullName = "Michel Rigaurio"; // Заздалегідь визначене ім'я
        const element = document.getElementById("personName"); // Пошук за ID

        if (element) {
            // Запис у текстовий вміст (без HTML)
            element.textContent = fullName;
        }
    }
    // Виклик функції
    displayUserName();


    /**
     * ==========================================
     * ЗАВДАННЯ 2: Обробка подій click (Collapsible)
     * ==========================================
     */
    function setupCollapsibles() {
        // Знаходимо всі блоки-тригери
        const triggers = document.querySelectorAll(".collapsible-trigger");

        triggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                // Знаходимо контент (наступний елемент)
                const content = trigger.nextElementSibling;
                // Знаходимо стрілку всередині заголовка
                const arrow = trigger.querySelector(".toggle-arrow");

                if (content && arrow) {
                    // Перемикання класу видимості (додавання/видалення)
                    content.classList.toggle("hidden");
                    // Перемикання класу орієнтації стрілки
                    arrow.classList.toggle("rotated");
                }
            });
        });
    }
    // Виклик функції
    setupCollapsibles();


    /**
     * ==========================================
     * ЗАВДАННЯ 3: Генерація розмітки з масиву
     * ==========================================
     */
        // Оголошення масиву даних (з прогресом у %)
    const expertiseData = [
            { name: "Adobe<br>Photoshop", class: "ps", progress: 90 },
            { name: "Adobe<br>Illustrator", class: "ai", progress: 75 },
            { name: "Adobe<br>Indesign", class: "id", progress: 60 },
            { name: "Figma<br>Sketch", class: "pp", progress: 85 }
        ];

    function generateExpertise(data) {
        const container = document.getElementById("expertise-container");
        if (!container) return;

        // Очищення вмісту контейнера перед вставленням
        container.innerHTML = "";

        // Константи для розрахунку кола (радіус 36px)
        const radius = 36;
        const circumference = 2 * Math.PI * radius; // ~226.19

        data.forEach(item => {
            // Розрахунок відступу штриха (offset) на основі прогресу
            const offset = circumference - (item.progress / 100) * circumference;

            // Генерація HTML (Template Literal)
            const itemHtml = `
                <div class="expertise-item">
                    <div class="expertise-circle ${item.class} mb-2">
                        <svg viewBox="0 0 85 85">
                            <circle class="circle-track" cx="42.5" cy="42.5" r="${radius}"></circle>
                            <circle 
                                class="circle-progress" 
                                cx="42.5" cy="42.5" r="${radius}"
                                stroke-dasharray="${circumference}" 
                                stroke-dashoffset="${offset}"
                            ></circle>
                        </svg>
                        <span class="fw-bold">${item.name}</span>
                    </div>
                </div>
            `;
            // Вставка в контейнер
            container.innerHTML += itemHtml;
        });
    }
    // Виклик функції
    generateExpertise(expertiseData);

});