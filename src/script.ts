interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskButton = document.getElementById("addTaskButton") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
            <div>
                <button onclick="toggleTask(${task.id})">✔️</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    if (taskInput.value.trim() === "") return;
    const newTask: Task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(id: number) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

function deleteTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
});

document.addEventListener("DOMContentLoaded", renderTasks);