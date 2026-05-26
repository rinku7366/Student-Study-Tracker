const API = "http://localhost:5000";


// ADD TASK
async function addTask() {

    let task = document.getElementById("taskInput").value;

    await fetch(`${API}/addTask`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task: task
        })

    });

    loadTasks();

}


// LOAD TASKS
async function loadTasks() {

    const response = await fetch(`${API}/tasks`);

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        taskList.innerHTML += `
            <div class="task">

                <h3 style="
                    color: ${task.completed ? 'green' : 'black'}
                ">
                    ${task.completed ? '✅' : ''}
                    ${task.task}
                </h3>

                <button onclick="completeTask('${task._id}')">
                    Complete
                </button>

                <button onclick="deleteTask('${task._id}')">
                    Delete
                </button>

            </div>
        `;

    });

}


// DELETE TASK
async function deleteTask(id) {

    await fetch(`${API}/task/${id}`, {

        method: "DELETE"

    });

    loadTasks();

}


// COMPLETE TASK
async function completeTask(id) {

    await fetch(`${API}/task/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            completed: true
        })

    });

    loadTasks();

}


loadTasks();