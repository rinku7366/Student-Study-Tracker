const API = "http://localhost:5000";


// SHOW REGISTER
function showRegister() {

    document.getElementById(
        "loginPage"
    ).style.display = "none";

    document.getElementById(
        "registerPage"
    ).style.display = "block";

}


// SHOW LOGIN
function showLogin() {

    document.getElementById(
        "registerPage"
    ).style.display = "none";

    document.getElementById(
        "loginPage"
    ).style.display = "block";

}


// REGISTER
async function register() {

    const username =
        document.getElementById(
            "registerUsername"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    const response = await fetch(

        `${API}/register`,

        {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                username,
                password

            })

        }

    );

    const data = await response.json();

    alert(data.message);

}


// LOGIN
async function login() {

    const username =
        document.getElementById(
            "loginUsername"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const response = await fetch(

        `${API}/login`,

        {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                username,
                password

            })

        }

    );

    const data = await response.json();

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

        document.getElementById(
            "loginPage"
        ).style.display = "none";

        document.getElementById(
            "taskPage"
        ).style.display = "block";

        loadTasks();

    } else {

        alert(data.message);

    }

}


// LOAD TASKS
async function loadTasks() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(

        `${API}/tasks`,

        {

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    const tasks = await response.json();

    const taskList =
        document.getElementById(
            "taskList"
        );

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        taskList.innerHTML += `

            <div class="task">

                <h3>

                    ${task.completed ? "✅" : ""}

                    ${task.task}

                </h3>

                <button
                    onclick="completeTask('${task._id}')"
                >
                    Complete
                </button>

                <button
                    onclick="deleteTask('${task._id}')"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


// ADD TASK
async function addTask() {

    const task =
        document.getElementById(
            "taskInput"
        ).value;

    const token =
        localStorage.getItem("token");

    await fetch(

        `${API}/addTask`,

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`

            },

            body: JSON.stringify({
                task
            })

        }

    );

    document.getElementById(
        "taskInput"
    ).value = "";

    loadTasks();

}


// COMPLETE TASK
async function completeTask(id) {

    const token =
        localStorage.getItem("token");

    await fetch(

        `${API}/task/${id}`,

        {

            method: "PUT",

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    loadTasks();

}


// DELETE TASK
async function deleteTask(id) {

    const token =
        localStorage.getItem("token");

    await fetch(

        `${API}/task/${id}`,

        {

            method: "DELETE",

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    loadTasks();

}