/*=========================================
    SMART WASTE MANAGEMENT SYSTEM
        Navigation Controller
==========================================*/

const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const links = document.querySelectorAll(".nav-link");

/* Page Titles */

const pageTitles = {

    home: "Dashboard",

    bins: "Smart Bins",

    trucks: "Garbage Trucks",

    "live-map": "Live Map",

    alerts: "Alerts",

    citizens: "Citizens",

    settings: "Settings"

};

/* Load Page */

async function loadPage(page){

    try{

        const response = await fetch(`pages/${page}.html`);

        const html = await response.text();

        content.innerHTML = html;
pageTitle.textContent = pageTitles[page];

// Initialize page-specific features

if(page === "home"){

    setTimeout(() => {

        initializeMap();

        console.log("Map loaded");

        if (typeof startTruck === "function") {
            startTruck();
            console.log("Truck started");
        } else {
            console.error("startTruck not found");
        }

        if (typeof loadAlerts === "function") {
            loadAlerts();
        }

        initializeDashboard();
    }, 200);

}

if(page === "bins"){

    setTimeout(()=>{

        loadBinsPage();

    },100);

}

if(page==="trucks"){

    setTimeout(()=>{

        loadTruckPage();

    },100);

}

    }

    catch(error){

        content.innerHTML = `

            <h2>Page Not Found</h2>

            <p>${page}.html could not be loaded.</p>

        `;

    }

}

/* Sidebar Click */

links.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        links.forEach(item=>item.classList.remove("active"));

        this.classList.add("active");

        const page=this.dataset.page;

        loadPage(page);

    });

});

/* Default Page */

loadPage("home");