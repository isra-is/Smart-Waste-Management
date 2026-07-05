/*=========================================
        SMART WASTE MAP
=========================================*/

let map;

let garbageTruckMarker;
let washingTruckMarker;

let binMarkers = [];

function getBinColor(fill){

    if(fill >= 90) return "#ef4444";

    if(fill >= 60) return "#f59e0b";

    return "#22c55e";

}

function initializeMap(){

    const mapContainer = document.getElementById("map");

    if(!mapContainer) return;

    if(map){

        map.remove();

    }

    map = L.map("map").setView([12.9716,77.5946],13);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:"© OpenStreetMap"

        }

    ).addTo(map);

    drawCollectionRoute();

    drawBins();

    drawVehicles();

}

/*==============================
        SMART BINS
===============================*/

function drawBins(){

    binMarkers=[];

    smartBins.forEach(bin=>{

        const marker=L.circleMarker(

            [bin.lat,bin.lng],

            {

                radius:10,

                color:getBinColor(bin.fill),

                fillColor:getBinColor(bin.fill),

                fillOpacity:1,

                weight:3

            }

        ).addTo(map);

        marker.bindPopup(`

            <b>${bin.name}</b><br>

            Fill : ${bin.fill}%<br>

            Battery : ${bin.battery}%<br>

            Temp : ${bin.temperature}°C<br>

            Washing : ${bin.washing ? "Required":"Not Required"}

        `);

        binMarkers.push(marker);

    });

}

/*==============================
        ROUTE
===============================*/

function drawCollectionRoute(){

    const points=[

        [12.9650,77.5900],

        ...smartBins.map(bin=>[bin.lat,bin.lng]),

        [12.9650,77.5900]

    ];

    L.polyline(points,{

        color:"#2563eb",

        weight:5,

        opacity:.7

    }).addTo(map);

}

/*==============================
        VEHICLES
===============================*/

function drawVehicles(){

    const garbageIcon=L.divIcon({

        html:"🚛",

        className:"",

        iconSize:[32,32]

    });

    const washingIcon=L.divIcon({

        html:"🚿",

        className:"",

        iconSize:[32,32]

    });

    garbageTruckMarker=L.marker(

        [12.9650,77.5900],

        {

            icon:garbageIcon

        }

    ).addTo(map);

    garbageTruckMarker.bindPopup("Garbage Truck");

    washingTruckMarker=L.marker(

        [12.9658,77.5892],

        {

            icon:washingIcon

        }

    ).addTo(map);

    washingTruckMarker.bindPopup("Bin Washing Truck");

}