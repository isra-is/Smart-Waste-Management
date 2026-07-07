/* ==========================================
   SMART WASTE MANAGEMENT AUTH SYSTEM
========================================== */

function showMessage(message, type = "success") {

    const old = document.getElementById("authAlert");

    if (old) old.remove();

    const div = document.createElement("div");

    div.id = "authAlert";

    div.className = `alert alert-${type} mt-3`;

    div.innerHTML = message;

    const form = document.querySelector("form");

    form.appendChild(div);

    setTimeout(() => {

        div.remove();

    }, 3000);

}


/* ==========================
        REGISTER
========================== */

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const address = document.getElementById("address").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const role = document.getElementById("role").value;

    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !password ||
        !confirmPassword
    ) {

        showMessage("Please fill all fields.", "danger");

        return;

    }

    if (password !== confirmPassword) {

        showMessage("Passwords do not match.", "danger");

        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(user => user.email === email);

    if (exists) {

        showMessage("Email already registered.", "warning");

        return;

    }

    users.push({

        name,

        email,

        phone,

        address,

        password,

        role

    });

    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Registration Successful!", "success");

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1500);

}


/* ==========================
        LOGIN
========================== */

function loginUser(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u =>

        u.email === username &&
        u.password === password &&
        u.role === role

    );

    if (!user) {

        showMessage("Invalid email, password or role.", "danger");

        return;

    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    showMessage("Login Successful!", "success");

    setTimeout(() => {

        redirectUser(user.role);

    }, 1000);

}


/* ==========================
        REDIRECT
========================== */

function redirectUser(role) {

    switch (role) {

        case "admin":

            window.location.href = "dashboard.html";
            break;

        case "driver":

            window.location.href = "driver.html";
            break;

        case "worker":

            alert("Worker Dashboard is under development.");
            window.location.href = "login.html";
            break;

        case "citizen":

            alert("Citizen Dashboard is under development.");
            window.location.href = "login.html";
            break;

        default:

            window.location.href = "login.html";

    }

}