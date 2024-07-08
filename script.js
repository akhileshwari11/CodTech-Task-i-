// Get the task input field, due date input field, and add task button
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li>
                <span>${task.task}</span>
                <span>Due: ${task.dueDate}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

// Add task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const dueDate = dueDateInput.value.trim();
    if (task && dueDate) {
        tasks.push({ task, dueDate });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        dueDateInput.value = '';
        renderTasks();
    }
});

// Edit task
function editTask(index) {
    const task = tasks[index];
    const editedTask = prompt('Edit task:', task.task);
    const editedDueDate = prompt('Edit due date:', task.dueDate);
    if (editedTask && editedDueDate) {
        tasks[index] = { task: editedTask, dueDate: editedDueDate };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Render tasks on page load
renderTasks();
