/*
TaskList — Главный объект управления задачами (Subject):
1.Хранит данные (массив задач).
2.Позволяет добавлять, удалять, обновлять задачи.
3.Отвечает за оповещение всех подписанных наблюдателей о любых изменениях в задачах.
*/

export default class TaskList {
    constructor() {
        this.tasks = [];
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.tasks));
    }

    setTasks(tasks) {
        this.tasks = tasks;
        this.notifyObservers();
    }

    addTask(taskText) {
        const newTask = { id: Date.now(), text: taskText, completed: false };
        this.tasks.push(newTask);
        this.notifyObservers();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.notifyObservers();
    }

    updateTask(taskId, updatedFields) {
        this.tasks = this.tasks.map(task => 
            task.id === taskId ? { ...task, ...updatedFields } : task
        );
        this.notifyObservers();
    }

    getCompletedTasksCount() {
        return this.tasks.filter(task => task.completed).length;
    }

    getTasks() {
        return this.tasks;
    }
}