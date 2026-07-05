/*==================================================
        SMART WASTE MANAGEMENT SYSTEM
                truck.js
==================================================*/

let garbageTruckMarker = null;
let truckAnimation = null;

const truckIcon = L.divIcon({
    html: `
        <div style="
            font-size:30px;
            transform:rotate(0deg);
        ">
            🚛
        </div>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

let truckRoute = [];

let truckIndex = 0;

function buildTruckRoute() {

    truckRoute = [];

    // Garage

    truckRoute.push([12.9650, 77.5900]);

    // All Smart Bins

    smartBins.forEach(bin => {

        truckRoute.push([bin.lat, bin.lng]);

    });

    // Return Garage

    truckRoute.push([12.9650, 77.5900]);

}

function startTruck() {

    if (!map) return;

    buildTruckRoute();

    if (garbageTruckMarker) {

        map.removeLayer(garbageTruckMarker);

    }

    garbageTruckMarker = L.marker(truckRoute[0], {

        icon: truckIcon

    }).addTo(map);

    garbageTruckMarker.bindPopup("🚛 Garbage Truck");

    truckIndex = 0;

    startAnimation();

}

function startAnimation() {

    if (truckAnimation) {

        clearInterval(truckAnimation);

    }

    truckAnimation = setInterval(() => {

        moveToNextStop();

    }, 4000);

}