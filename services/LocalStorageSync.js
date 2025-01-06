/*
LocalStorageSync — Синхронизирует данные с localStorage.
*/

export default class LocalStorageSync {
    constructor(taskList) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.setTasks(savedTasks);
        taskList.addObserver(this);
    }

    update(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}