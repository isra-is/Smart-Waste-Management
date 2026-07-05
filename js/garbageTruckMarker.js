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
/*==================================================
        MOVEMENT & COLLECTION LOGIC
==================================================*/
function moveToNextStop() {

    truckIndex++;

    if (truckIndex >= truckRoute.length) {

        truckIndex = 0;

    }

    const destination = truckRoute[truckIndex];

    animateTruck(destination);

}
function animateTruck(destination) {

    const start = garbageTruckMarker.getLatLng();

    const end = L.latLng(destination[0], destination[1]);

    const steps = 100;

    let step = 0;

    const latStep = (end.lat - start.lat) / steps;
    const lngStep = (end.lng - start.lng) / steps;

    const smooth = setInterval(() => {

        step++;

        garbageTruckMarker.setLatLng([
            start.lat + latStep * step,

            start.lng + lngStep * step
        ]);

        if (step >= steps) {

            clearInterval(smooth);

            reachedStop();

        }

    }, 30);

}
function reachedStop() {

    if (truckIndex === 0 || truckIndex === truckRoute.length - 1) {

        garbageTruckMarker.bindPopup(
            "🏠 Garage"
        ).openPopup();

        return;

    }

    const bin = smartBins[truckIndex - 1];

    garbageTruckMarker.bindPopup(
        `🚛 Collecting Waste<br><br>${bin.name}`
    ).openPopup();

    setTimeout(() => {

        collectWaste(bin);

    }, 2000);

}
function collectWaste(bin) {

    bin.fill = 0;

    updateBinMarker(bin);

    garbageTruckMarker.bindPopup(

        `✅ Collection Complete<br><br>${bin.name}`

    ).openPopup();

}
/*==================================================
        UPDATE BIN
==================================================*/
function updateBinMarker(bin) {

    map.eachLayer(layer => {

        if (layer instanceof L.CircleMarker) {

            const pos = layer.getLatLng();

            if (Math.abs(pos.lat - bin.lat) < 0.0001 &&

                Math.abs(pos.lng - bin.lng) < 0.0001) {

                layer.setStyle({
                    color: "#22c55e",

                    fillColor: "#22c55e"
                });

                layer.setPopupContent(`

                    <b>${bin.name}</b><br>

                    Fill : ${bin.fill}%<br>

                    Battery : ${bin.battery}%<br>

                    Temperature : ${bin.temperature}°C<br>

                    Washing : ${bin.washing ? "Required" : "Not Required"}

                `);

            }

        }

    });

}
