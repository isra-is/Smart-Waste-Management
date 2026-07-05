/*=========================================
        GARBAGE TRUCKS
=========================================*/

function loadTruckPage() {

    const grid = document.getElementById("truckGrid");

    if (!grid) return;

    grid.innerHTML = "";

    const trucks = [

        {
            id:1,
            driver:"Rahul",
            truck:"Truck-01",
            fuel:87,
            load:35,
            status:"Available"
        },

        {
            id:2,
            driver:"Arjun",
            truck:"Truck-02",
            fuel:72,
            load:58,
            status:"Collecting"
        },

        {
            id:3,
            driver:"Amit",
            truck:"Truck-03",
            fuel:95,
            load:12,
            status:"Waiting"
        }

    ];

    trucks.forEach(truck=>{

        const card=document.createElement("div");

        card.className="truck-card";

        card.innerHTML=`

            <h3>${truck.truck}</h3>

            <hr>

            <p><strong>👷 Driver:</strong> ${truck.driver}</p>

            <p><strong>⛽ Fuel:</strong> ${truck.fuel}%</p>

            <p><strong>🗑 Load:</strong> ${truck.load}%</p>

            <p><strong>📍 Status:</strong> ${truck.status}</p>

            <div class="truck-buttons">

                <button
                    class="accept-btn"
                    onclick="acceptRoute(${truck.id})">

                    Accept Route

                </button>

                <button
                    class="reject-btn"
                    onclick="rejectRoute(${truck.id})">

                    Reject

                </button>

            </div>

        `;

        grid.appendChild(card);

    });

}

function acceptRoute(id){

    alert("Truck "+id+" accepted the assigned route.");

}

function rejectRoute(id){

    alert("Truck "+id+" rejected the route. Admin has been notified.");

}