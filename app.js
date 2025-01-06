import TaskList from "./models/TaskList.js";
import TaskCounter from "./components/TaskCounter.js";
import TaskListView from "./components/TaskListView.js";
import LocalStorageSync from "./services/LocalStorageSync.js";
import { 
    taskInput, 
    addTaskButton, 
    taskListElement, 
    taskCountElement,
    body,
    themeSwitcher,
    todoEmptyList,
    completedTaskCountElement
} from "./constants/constants.js";
import { checkToDoEmptyList } from './services/checkToDoEmptyList.js';


const taskList = new TaskList();
const taskListView = new TaskListView(taskList, taskListElement);
const taskCounter = new TaskCounter(taskList, taskCountElement, completedTaskCountElement);
const localStorageSync = new LocalStorageSync(taskList);
let draggedItem = null;



checkToDoEmptyList(todoEmptyList, taskCountElement);


//Слушатель по добавлению задачи
addTaskButton.addEventListener("submit", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        taskList.addTask(taskText);
        taskInput.value = "";
    }
    
});

//Слушатель по удалению задачи
taskListElement.addEventListener("click", (event) => {
    if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
        const taskId = Number(event.target.parentNode.parentNode.closest('li').id);
        taskList.deleteTask(taskId);
    }
    checkToDoEmptyList(todoEmptyList, taskCountElement);
});




//Слушатель по изменению задачи
taskListElement.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains('todo_task_page')) {
        console.log(event.target);
        event.target.contentEditable = true;
        event.target.classList.add('editing');
        event.target.focus();
    }
});

taskListElement.addEventListener("blur", (event) => {
    if (event.target.classList.contains('todo_task_page')) {
        console.log(event.target.textContent);
        const taskId = Number(event.target.parentNode.parentNode.closest('li').id);
        console.log(taskId);
        const newText = event.target.textContent.trim();
        if (newText) {
            taskList.updateTask(taskId, { text: newText });
        }
    }
}, true);

//Слушатель на изменения выполнения задач
taskListElement.addEventListener("change", (event) => {
    if (event.target.tagName === 'INPUT') {
        const taskId = Number(event.target.parentNode.parentNode.closest('li').id);
        const completed = event.target.checked;
        taskList.updateTask(taskId, { completed });
    }
});



//Слушатель на изменения темы
themeSwitcher.addEventListener('change', () => {
    body.classList.toggle('dark', themeSwitcher.checked);
    body.classList.toggle('light', !themeSwitcher.checked);
});


//Слушатели dragAndDrop
taskListElement.addEventListener("dragstart", function (e) {
    draggedItem = e.target.closest('li');
    setTimeout(() => draggedItem.style.opacity = "0.5", 0);
});

taskListElement.addEventListener("dragend", function () {
    setTimeout(() => {
        draggedItem.style.opacity = "1";
        draggedItem = null;
    }, 0);
});

taskListElement.addEventListener("dragover", function (e) {
    e.preventDefault();
    const target = e.target.closest('li');
    if (target && target !== draggedItem) {
        target.classList.add('over');
    }
});

taskListElement.addEventListener("dragenter", function (e) {
    e.preventDefault();
});

taskListElement.addEventListener("dragleave", function (e) {
    const target = e.target.closest('li');
    if (target) target.classList.remove('over');
});

taskListElement.addEventListener("drop", function (e) {
    e.preventDefault();
    const target = e.target.closest('li');
    if (target && draggedItem !== target) {
        const allItems = Array.from(taskListElement.children);
        const draggedIndex = allItems.indexOf(draggedItem);
        const targetIndex = allItems.indexOf(target);

        if (draggedIndex < targetIndex) {
            taskListElement.insertBefore(draggedItem, target.nextSibling);
        } else {
            taskListElement.insertBefore(draggedItem, target);
        }
    }
    target.classList.remove('over');
});
