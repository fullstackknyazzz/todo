import { todoList } from './main.js';

let draggedItem = null;

todoList.addEventListener("dragstart", function (e) {
    draggedItem = e.target.closest('li');
    setTimeout(() => draggedItem.style.opacity = "0.5", 0);
});

todoList.addEventListener("dragend", function () {
    setTimeout(() => {
        draggedItem.style.opacity = "1";
        draggedItem = null;
    }, 0);
});

todoList.addEventListener("dragover", function (e) {
    e.preventDefault();
    const target = e.target.closest('li');
    if (target && target !== draggedItem) {
        target.classList.add('over');
    }
});

todoList.addEventListener("dragenter", function (e) {
    e.preventDefault();
});

todoList.addEventListener("dragleave", function (e) {
    const target = e.target.closest('li');
    if (target) target.classList.remove('over');
});

todoList.addEventListener("drop", function (e) {
    e.preventDefault();
    const target = e.target.closest('li');
    if (target && draggedItem !== target) {
        const allItems = Array.from(todoList.children);
        const draggedIndex = allItems.indexOf(draggedItem);
        const targetIndex = allItems.indexOf(target);

        if (draggedIndex < targetIndex) {
            todoList.insertBefore(draggedItem, target.nextSibling);
        } else {
            todoList.insertBefore(draggedItem, target);
        }
    }
    target.classList.remove('over');
    saveTasks();
});
