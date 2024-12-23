const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('.todo_input');
const todoList = document.querySelector('.todo_list');
const todoEmptyList = document.querySelector('.todo_empty_list');


const todoSummaryNumberValue = document.querySelector('.todo_summary_number_value');
const todoSummaryCompleteNumber = document.querySelector('.todo_summary_complete_number');
const todoSummaryCompleteAll = document.querySelector('.todo_summary_complete_all');

let allTasks = 0;
let completedTasks = 0;

document.addEventListener('DOMContentLoaded', loadTasks);


const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

themeSwitcher.addEventListener('change', () => {
    body.classList.toggle('dark', themeSwitcher.checked);
    body.classList.toggle('light', !themeSwitcher.checked);
});

let draggedItem = null;




// Добавление новой задачи
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const task = { text: taskText, completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        todoInput.value = '';

        const todoListBlock = document.querySelector('.todo_empty_list');
        todoListBlock.style.display = 'none';

        allTasks = allTasks + 1;
        todoSummaryNumberValue.innerText = allTasks;
        todoSummaryCompleteAll.innerText = allTasks;
    }
});


document.querySelector('.todo_list').addEventListener('click', (event) => {
    if (event.target.tagName === 'svg') {
        const parentNode = event.target.parentNode;
        parentNode.remove();
        removeTaskFromLocalStorage(parentNode.childNodes[3].innerText);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


        allTasks = allTasks - 1;
        todoSummaryNumberValue.innerText = allTasks;
        todoSummaryCompleteAll.innerText = allTasks;

        if (allTasks === 0) {
            todoEmptyList.style.display = 'flex';
        }


        if (event.target.parentNode.childNodes[3].classList.contains('completed')) {
            completedTasks = completedTasks - 1;
            todoSummaryCompleteNumber.innerText = completedTasks;
        }
    } else if (event.target.tagName === 'INPUT') {
        const parentNode = event.target.parentNode.parentNode.childNodes[3];
        toggleTaskCompletion(parentNode.innerText);
        parentNode.classList.toggle('completed');

        if (parentNode.classList.contains('completed')) {
            completedTasks = completedTasks + 1;
            todoSummaryCompleteNumber.innerText = completedTasks;
        } else {
            completedTasks = completedTasks - 1;
            todoSummaryCompleteNumber.innerText = completedTasks;
        }
    }
});




// Добавление задачи в DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.innerHTML = `
    <div class="todo_task">
        <label class="custom-checkbox">
            <input type="checkbox" ${(task.completed) ? "checked" : ""}>
                <span class="checkmark"></span>
            </label>
            <p class="todo_task_page ${(task.completed) ? "completed" : ""}">${task.text}</p>
            <svg class="todo_task_trash" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2021 9.98547H12.8716V15.5073H14.2021V9.98547Z" fill="#808080" />
                <path d="M11.4624 9.98547H10.1318V15.5073H11.4624V9.98547Z" fill="#808080" />
                <path
                     d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
                fill="#808080" />
            </svg>                
    </div>
    `;
    li.querySelector('.todo_task_page').addEventListener('click', (e) => {
        const p = e.target;
        p.contentEditable = true;
        p.classList.add('editing');
        p.focus();
        p.addEventListener('blur', () => {
            p.contentEditable = false;
            p.classList.remove('editing');
            const tasks = Array.from(document.querySelectorAll('.todo_task')).map(task => ({
                text: task.querySelector('.todo_task_page').textContent,
                completed: task.querySelector('input[type="checkbox"]').checked
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    });


    li.addEventListener("dragstart", function () {
        draggedItem = li;
        setTimeout(() => li.style.opacity = "0.5", 0);
    });

    li.addEventListener("dragend", function () {
        setTimeout(() => {
            draggedItem.style.opacity = "1";
            draggedItem = null;
        }, 0);
    });

    li.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add('over');
    });

    li.addEventListener("dragenter", function (e) {
        e.preventDefault();
    });

    li.addEventListener("dragleave", function () {
        this.classList.remove('over');
    });

    li.addEventListener("drop", function () {
        this.classList.remove('over');
        if (draggedItem !== this) {
            const allItems = Array.from(todoList.children);
            const draggedIndex = allItems.indexOf(draggedItem);
            const targetIndex = allItems.indexOf(this);

            if (draggedIndex < targetIndex) {
                this.parentNode.insertBefore(draggedItem, this.nextSibling);
            } else {
                this.parentNode.insertBefore(draggedItem, this);
            }
        }
    });

    todoList.appendChild(li);
}


// Сохранение задачи в localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
    if (tasks.length !== 0) {
        todoEmptyList.style.display = 'none';
    }

    allTasks = tasks.length;
    completedTasks = tasks.filter(task => task.completed === true).length;
    todoSummaryNumberValue.innerText = allTasks;
    todoSummaryCompleteNumber.innerText = completedTasks;
    todoSummaryCompleteAll.innerText = allTasks;
}

// Переключение состояния выполнения задачи
function toggleTaskCompletion(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Удаление задачи из localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



