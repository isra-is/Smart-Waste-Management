/* =====================================
        DRIVER ROUTE LOGIC
===================================== */

let routeState = "waiting";

function acceptRoute() {

    routeState = "accepted";

    const status = document.getElementById("routeStatus");

    status.innerHTML = "🚛 Route Accepted. Starting collection...";

    status.className = "status-success";

    // Later we will connect this to truck.js
    console.log("Driver accepted route");

    startSimulation();

}

function rejectRoute() {

    routeState = "rejected";

    const status = document.getElementById("routeStatus");

    status.innerHTML = "❌ Route Rejected. Sent back to admin.";

    status.className = "status-error";

    console.log("Driver rejected route");

}

/* TEMP SIMULATION */

function startSimulation() {

    setTimeout(() => {

        const status = document.getElementById("routeStatus");

        status.innerHTML = "🚛 Truck is now on route...";

        status.className = "status-waiting";

    }, 2000);

}