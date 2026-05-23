function signup(){

    let newUser = document.getElementById("newUsername").value;

    let newPass = document.getElementById("newPassword").value;

    localStorage.setItem("username", newUser);

    localStorage.setItem("password", newPass);

    alert("Account Created Successfully");

}

function login(){

    let user = document.getElementById("username").value;

    let pass = document.getElementById("password").value;

    let savedUser = localStorage.getItem("username");

    let savedPass = localStorage.getItem("password");

    if(user === savedUser && pass === savedPass){

        document.getElementById("signupPage").style.display = "none";

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