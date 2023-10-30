document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task}</span>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Initial rendering
    renderTasks();

    // Add a new task
    addTaskButton.addEventListener("click", () => {
        const newTask = newTaskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            newTaskInput.value = "";
        }
    });

    // Edit and delete tasks
    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-button")) {
            const index = event.target.getAttribute("data-index");
            const updatedTask = prompt("Edit task:", tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        } else if (event.target.classList.contains("delete-button")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });
});
