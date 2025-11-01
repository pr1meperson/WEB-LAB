document.addEventListener('DOMContentLoaded', () => {
    const FULL_NAME = 'Попадинець Павло Андрійович';
    const nameEl = document.getElementById('personName');
    if (nameEl) nameEl.textContent = FULL_NAME;

    // ----- Дані -----
    const expData = [
        { company: 'Компанія A', period: '2020–2022', role: 'Frontend Developer', desc: 'Розробка інтерфейсів, робота з JS та DOM.' },
        { company: 'Компанія B', period: '2018–2020', role: 'Intern', desc: 'Підтримка веб-проєктів, тестування.' }
    ];

    let skillsData = ['HTML', 'CSS', 'JavaScript (ES6+)', 'DOM API', 'Git'];

    // ----- Генерація списків -----
    function generateList(container, items, renderer) {
        if (!container) return;
        container.innerHTML = '';
        if (!items.length) {
            container.textContent = 'Немає записів.';
            return;
        }
        items.forEach((it) => container.appendChild(renderer(it)));
    }

    function renderExp(item) {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<strong>${item.role}</strong> — ${item.company} <span class="note">(${item.period})</span>
                     <div class="note">${item.desc}</div>`;
        return div;
    }

    function renderSkill(skill) {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.textContent = skill;
        return div;
    }

    // ----- Вставлення -----
    const expCont = document.getElementById('exp-content');
    const skillCont = document.getElementById('skills-content');

    if (expCont) generateList(expCont, expData, renderExp);
    if (skillCont) generateList(skillCont, skillsData, renderSkill);

    // ----- Toggle -----
    document.querySelectorAll('.toggle-row').forEach(row => {
        const arrow = row.querySelector('.arrow');
        const target = document.getElementById(row.dataset.target);
        row.addEventListener('click', () => {
            target.classList.toggle('hidden');
            arrow.classList.toggle('rotate');
        });
    });

    // ----- Перегенерація -----
    const btn = document.getElementById('regenButton');
    if (btn && skillCont) {
        btn.addEventListener('click', () => {
            skillsData = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'];
            generateList(skillCont, skillsData, renderSkill);
        });
    }
});
