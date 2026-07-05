/* ==========================================
        SMART WASTE AUTH SYSTEM (REAL)
        localStorage based users
========================================== */

/* ---------------------------
   REGISTER USER
----------------------------*/

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert("User already exists!");
        return;
    }

    const newUser = {
        name,
        email,
        phone,
        address,
        password,
        role
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "login.html";
}


/* ---------------------------
   LOGIN USER
----------------------------*/

function loginUser(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const selectedRole = localStorage.getItem("role");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u =>
        u.email === username &&
        u.password === password &&
        u.role === selectedRole
    );

    if (!user) {
        alert("Invalid credentials or role mismatch!");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");

    redirectUser(user.role);
}


/* ---------------------------
   REDIRECT SYSTEM
----------------------------*/

function redirectUser(role) {

    if (role === "admin") {
        window.location.href = "dashboard.html";
    }
    else if (role === "driver") {
        window.location.href = "driver.html";
    }
    else if (role === "worker") {
        window.location.href = "worker.html";
    }
    else if (role === "citizen") {
        window.location.href = "citizen.html";
    }
}