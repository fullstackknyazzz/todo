import { deleteTask, updateTaskSummary, completedToggleTask, addTaskToDOM } from "./tasks.js";
import { loadTasks, saveTaskToLocalStorage, allTasks } from "./storage.js";

const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('.todo_input');
export const todoList = document.querySelector('.todo_list');
export const todoEmptyList = document.querySelector('.todo_empty_list');
export const totalTasksElement = document.querySelector('.todo_summary_number_value');
export const completedTasksElement = document.querySelector('.todo_summary_complete_number');

document.addEventListener('DOMContentLoaded', loadTasks);

//Слуша Добавление новой задачи
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const task = { id: Date.now(), text: taskText, completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        todoInput.value = '';

        todoEmptyList.style.display = 'none';

        allTasks.count = updateTaskSummary(allTasks.count, 'add');
    }
});

document.querySelector('.todo_list').addEventListener('click', (event) => {
    if (event.target.tagName === 'svg') {
        deleteTask(event);
    } else if (event.target.tagName === 'INPUT') {
        completedToggleTask(event);
    }
});


todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo_task_page')) {
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
        }, { once: true });
    }
});
