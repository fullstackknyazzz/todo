/*
TaskCounter — Показывает количество задач.
*/

export default class TaskCounter {
    constructor(taskList, counterElement, completedTaskCountElement) {
        this.taskList = taskList;
        this.counterElement = counterElement;
        this.completedTaskCountElement = completedTaskCountElement;
        this.taskList.addObserver(this);
    }

    update(tasks) {
        this.render(tasks);
    }

    render(tasks) {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        this.counterElement.textContent = `${totalTasks}`;
        this.completedTaskCountElement.textContent = `${completedTasks}`;
    }
}