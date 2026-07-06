/*====================================
        Dashboard Controller
====================================*/

console.log("Dashboard Controller Started");

/* ----------------------------
   Wait until Home Page Loads
-----------------------------*/

function initializeDashboard() {

    console.log("Initializing Dashboard...");

    startClock();

    updateStatistics();

    updateCharts();

    startStatisticsSimulation();

    connectReportButton();

    startActivityFeed();

    startCitySimulation();

    startSimulation();

    initializeNotifications();

addNotification("🚛 Smart Waste System Started");

addNotification("🗑 Dashboard Loaded");

initializeCharts();



}

/* ----------------------------
   Live Clock
-----------------------------*/

function startClock(){

    const date=document.getElementById("liveDate");

    const clock=document.getElementById("liveClockCard");

    setInterval(()=>{

        const now=new Date();

        date.innerHTML="📅 "+now.toDateString();

        clock.innerHTML="🕒 "+now.toLocaleTimeString();

    },1000);

}

/* ----------------------------
   Dashboard Statistics
-----------------------------*/

function updateStatistics() {

    document.getElementById("binsCount").innerText = smartBins.length;

    document.getElementById("truckCount").innerText = 3;

    document.getElementById("alertCount").innerText =
        smartBins.filter(bin => bin.fill >= 80).length;

    document.getElementById("collectionCount").innerText =
        Math.floor(Math.random() * 500);

}

/* ----------------------------
   Live Simulation
-----------------------------*/

function startStatisticsSimulation() {

    setInterval(() => {

        smartBins.forEach(bin => {

            bin.fill += Math.floor(Math.random() * 8);

            if (bin.fill > 100)
                bin.fill = 0;

        });

        updateStatistics();

    }, 5000);

}

/* ----------------------------
   Reports Button
-----------------------------*/

function connectReportButton() {

    const btn = document.querySelector(".primary-btn");

    if (!btn) return;

    btn.onclick = () => {

        alert("Reports module will be added in Version 2.0");

    };

}

/*----------------------------
    Live Activity Feed
-----------------------------*/

const activities = [

    "🚛 Truck 01 collected Bin 02",

    "🗑 Bin 03 reached 92%",

    "⚠ Overflow alert generated",

    "🧹 Washing truck dispatched",

    "📍 Route optimized",

    "✅ Collection completed"

];

function startActivityFeed(){

    const feed = document.getElementById("activityFeed");

    if(!feed) return;

    setInterval(()=>{

        const item = document.createElement("div");

        item.className="activity-item";

        const message =
            activities[Math.floor(Math.random()*activities.length)];

        item.innerHTML=`

            <div class="activity-time">

                ${new Date().toLocaleTimeString()}

            </div>

            <div>

                ${message}

            </div>

        `;

        feed.prepend(item);

        if(feed.children.length>6){

            feed.removeChild(feed.lastChild);

        }

    },3000);

}

/*====================================
        SMART CITY SIMULATION
====================================*/

let simulationRunning = false;

function startCitySimulation(){

    if(simulationRunning) return;

    simulationRunning = true;

    setInterval(()=>{

        smartBins.forEach(bin=>{

            const increase=Math.floor(Math.random()*10);

            bin.fill+=increase;

            if(bin.fill>100){

                bin.fill=100;

            }

            if(bin.fill>=90){

                addActivity(
                    `🚨 ${bin.name} Overflow (${bin.fill}%)`
                );

            }

        });

        if(typeof drawBins==="function"){

            drawBins();

        }

        updateStatistics();

    },5000);

}

function addActivity(message){

    const feed=document.getElementById("activityFeed");

    if(!feed) return;

    const item=document.createElement("div");

    item.className="activity-item";

    item.innerHTML=`

        <div class="activity-time">

            ${new Date().toLocaleTimeString()}

        </div>

        <div>

            ${message}

        </div>

    `;

    feed.prepend(item);

    if(feed.children.length>8){

        feed.removeChild(feed.lastChild);

    }

}