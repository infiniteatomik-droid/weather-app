// 1. Находим форму, инпут и списки колонок на странице
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

const todoList = document.querySelector('#todo-list');
const progressList = document.querySelector('#progress-list');
const doneList = document.querySelector('#done-list');

const savedTasks = localStorage.getItem('kanban-tasks');
// 2. Наша база данных (массив объектов задач)
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

function saveToLocalStorage() {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
}

// 3. Функция, которая отрисовывает задачи на экране
function renderTasks() {
    // Очищаем колонки, чтобы старые задачи не дублировались при новой отрисовке
    todoList.innerHTML = '';
    progressList.innerHTML = '';
    doneList.innerHTML = '';

    // Перебираем массив и создаем HTML-элементы
    tasks.forEach(task => {
        // Создаем белый блок для задачи
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerText = task.text;
        taskCard.draggable = true;

taskCard.addEventListener('dragstart', (event) => {
    // Сохраняем ID задачи в текстовом формате в карман браузера
    event.dataTransfer.setData('text/plain', task.id);
});

        // --- НАЧАЛО ОБРАБОТЧИКА КЛИКА ---
        // Вешаем клик на каждую созданную карточку
        taskCard.addEventListener('click', () => {
            if (task.status === 'todo') {
                // Если была в Планах — переводим В работу
                task.status = 'in-progress';
            } else if (task.status === 'in-progress') {
                // If была В работе — переводим в Готово
                task.status = 'done';
            } else if (task.status === 'done') {
                // Если была в Готово — удаляем из массива по её ID
                tasks = tasks.filter(t => t.id !== task.id);
            }

            // После того как изменили статус или удалили, ОБЯЗАТЕЛЬНО обновляем экран
            renderTasks();
            saveToLocalStorage();
        });
        // --- КОНЕЦ ОБРАБОТЧИКА КЛИКА ---

        // Раскладываем карточки по своим колонкам в зависимости от статуса
        if (task.status === 'todo') {
            todoList.appendChild(taskCard);
        } else if (task.status === 'in-progress') {
            progressList.appendChild(taskCard);
        } else if (task.status === 'done') {
            doneList.appendChild(taskCard);
        }
    });
}

// 4. Слушатель для формы (добавление новой задачи)
todoForm.addEventListener('submit', (event) => {
    // Отменяем перезагрузку страницы
    event.preventDefault();
    // Берем текст из поля ввода
    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        // Создаем объект новой задачи
        const newTask = {
            id: Date.now(), // Уникальный ID числом
            text: taskText,
            status: 'todo'  // Всегда стартует в колонке "Планы"
        };
        // Пушим в массив
        tasks.push(newTask);
        // Сразу перерисовываем экран, чтобы увидеть задачу
        renderTasks();
        saveToLocalStorage();
        // Очищаем инпут
        todoInput.value = '';
    }
});

todoList.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    progressList.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    doneList.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    todoList.addEventListener('drop', (event) => {
    const taskId = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = 'todo'; 
        renderTasks();
        saveToLocalStorage();
    }
});

progressList.addEventListener('drop', (event) => {
    const taskId = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = 'in-progress'; 
        renderTasks();
        saveToLocalStorage();
    }
});

doneList.addEventListener('drop', (event) => {
    const taskId = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = 'done'; 
        renderTasks();
        saveToLocalStorage();
    }
});

renderTasks();