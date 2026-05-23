function login(){

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234"){

        document.getElementById("loginPage").style.display = "none";

        document.getElementById("taskPage").style.display = "block";

    }
    else{

        document.getElementById("message").innerText = "Invalid Login";

    }
}

function addTask(){

    let taskInput = document.getElementById("taskInput");

    let li = document.createElement("li");

    li.innerText = taskInput.value;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}