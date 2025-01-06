import { addTaskToDOM } from './tasks.js';
import { todoEmptyList, totalTasksElement, completedTasksElement } from './main.js';

export let allTasks = {
    count: 0
};
export let completedTasks = {
    count: 0
};
export const todoSummaryCompleteAll = document.querySelector('.todo_summary_complete_all');

// Сохранение задачи в localStorage
export function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из localStorage
export function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
    if (tasks.length !== 0) {
        todoEmptyList.style.display = 'none';
    }
    allTasks.count = tasks.length;
    completedTasks.count = tasks.filter(task => task.completed === true).length;
    totalTasksElement.innerText = allTasks.count;
    completedTasksElement.innerText = completedTasks.count;
    todoSummaryCompleteAll.innerText = allTasks.count;
}



// Удаление задачи из localStorage
export function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}