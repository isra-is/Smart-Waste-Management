/* ==========================================
   SMART WASTE MANAGEMENT
   WORKER DASHBOARD
========================================== */

// Worker Information

const worker = {

    id: "WRK-1024",

    name: "Mohammed Arif",

    area: "Udupi City Zone",

    shift: "Morning",

    status: "Available"

};


// Today's Statistics

let stats = {

    binsCollected: 18,

    wasteCollected: 920,

    distance: 24,

    tasksCompleted: 7

};


// Assigned Bins

let assignedBins = [

    {

        id: "BIN-101",

        location: "Udupi Bus Stand",

        fill: 95,

        priority: "High",

        status: "Waiting"

    },

    {

        id: "BIN-102",

        location: "Karkala Market",

        fill: 70,

        priority: "Medium",

        status: "Assigned"

    },

    {

        id: "BIN-103",

        location: "Manipal Circle",

        fill: 40,

        priority: "Low",

        status: "Normal"

    }

];


// Notifications

const notifications = [

    "Bin BIN-101 reached 95%",

    "New task assigned",

    "Truck TRK-07 arrived",

    "Route updated"

];



/* ==========================================
        UPDATE DASHBOARD
========================================== */

function updateDashboard() {

    document.getElementById("workerName").textContent = worker.name;

    document.getElementById("binsCollected").textContent =
        stats.binsCollected;

    document.getElementById("distanceTravelled").textContent =
        stats.distance + " km";

    document.getElementById("wasteCollected").textContent =
        stats.wasteCollected + " Kg";

    document.getElementById("tasksCompleted").textContent =
        stats.tasksCompleted;

}



/* ==========================================
        SHIFT CONTROLS
========================================== */

document
.getElementById("startShift")
.addEventListener("click", () => {

    worker.status = "Working";

    alert("Shift Started");

});


document
.getElementById("breakShift")
.addEventListener("click", () => {

    worker.status = "Break";

    alert("Worker is on Break");

});


document
.getElementById("resumeShift")
.addEventListener("click", () => {

    worker.status = "Working";

    alert("Shift Resumed");

});


document
.getElementById("endShift")
.addEventListener("click", () => {

    worker.status = "Offline";

    alert("Shift Completed");

});



/* ==========================================
        REPORT ISSUE
========================================== */

document
.getElementById("issueForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Issue Report Submitted Successfully.");

});



/* ==========================================
        LIVE MAP
========================================== */

let map = L.map("workerMap").setView(
    [13.3409, 74.7421],
    13
);

L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

maxZoom:19,

attribution:"© OpenStreetMap"

}

).addTo(map);



let marker = L.marker(

[13.3409,74.7421]

).addTo(map);

marker.bindPopup("Worker Location");



/* ==========================================
        SIMULATE MOVEMENT
========================================== */

setInterval(()=>{

    let lat =
    marker.getLatLng().lat +
    (Math.random()-0.5)*0.001;

    let lng =
    marker.getLatLng().lng +
    (Math.random()-0.5)*0.001;

    marker.setLatLng([lat,lng]);

},3000);



/* ==========================================
        INITIALIZE
========================================== */

updateDashboard();

console.log("Worker Dashboard Loaded");

/* ==========================================
        BIN COLLECTION SYSTEM
========================================== */

function collectBin(button) {

    const row = button.closest("tr");

    const progressBar = row.querySelector(".progress-bar");

    const statusBadge = row.cells[4].querySelector(".badge");

    progressBar.style.width = "0%";
    progressBar.innerHTML = "0%";
    progressBar.className = "progress-bar bg-success";

    statusBadge.innerHTML = "Collected";
    statusBadge.className = "badge bg-success";

    button.disabled = true;
    button.innerHTML = "Completed";
    button.className = "btn btn-secondary btn-sm";

    stats.binsCollected++;
    stats.tasksCompleted++;
    stats.wasteCollected += 45;
    stats.distance += 1;

    updateDashboard();

    addNotification(
        "✅ " +
        row.cells[1].innerText +
        " collected successfully."
    );

}



/* ==========================================
        ENABLE COLLECT BUTTONS
========================================== */

document
.querySelectorAll(".btn-success.btn-sm")
.forEach(button => {

    button.addEventListener("click", function () {

        collectBin(this);

    });

});



/* ==========================================
        NOTIFICATION SYSTEM
========================================== */

function addNotification(message){

    const container =
    document.querySelector(".card-body");

    if(!container) return;

    const alert=document.createElement("div");

    alert.className="alert alert-success mt-2";

    alert.innerHTML=message;

    container.prepend(alert);

    setTimeout(()=>{

        alert.remove();

    },5000);

}



/* ==========================================
        AUTO BIN LEVEL UPDATE
========================================== */

setInterval(()=>{

    document
    .querySelectorAll(".progress-bar")
    .forEach(bar=>{

        let value=parseInt(bar.innerHTML);

        if(value<100){

            value+=Math.floor(Math.random()*4);

            if(value>100)
                value=100;

            bar.style.width=value+"%";

            bar.innerHTML=value+"%";

            if(value>=90){

                bar.className="progress-bar bg-danger";

            }

            else if(value>=70){

                bar.className="progress-bar bg-warning";

            }

            else{

                bar.className="progress-bar bg-success";

            }

        }

    });

},10000);



/* ==========================================
        SAVE DATA
========================================== */

function saveWorkerData(){

    localStorage.setItem(

        "workerStats",

        JSON.stringify(stats)

    );

}



/* ==========================================
        LOAD DATA
========================================== */

function loadWorkerData(){

    const data=

    localStorage.getItem("workerStats");

    if(data){

        stats=JSON.parse(data);

        updateDashboard();

    }

}

loadWorkerData();



/* ==========================================
        AUTO SAVE
========================================== */

setInterval(()=>{

    saveWorkerData();

},5000);



/* ==========================================
        LIVE CLOCK
========================================== */

const clock=document.createElement("h5");

clock.className="text-end mt-3";

document.querySelector(".navbar").appendChild(clock);

setInterval(()=>{

clock.innerHTML=new Date().toLocaleTimeString();

},1000);



console.log("Worker System Ready");