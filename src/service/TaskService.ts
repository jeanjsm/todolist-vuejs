import Task from "../model/Task";

export default class TaskService {

    static findAll(): Array<Task> {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!tasks)
            return []
        return tasks;
    }

    static save(task: Task) {
        if (!task.finished)
            task.finished = false;
        let tasks = TaskService.findAll();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static updateList(tasks: Array<Task>) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

}