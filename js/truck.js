/*=========================================
        GARBAGE TRUCK SIMULATION
=========================================*/

let truckMarker = null;

const truckRoute = [

    [12.9650,77.5900], // Garage

    ...smartBins.map(bin => [bin.lat, bin.lng]),

    [12.9650,77.5900] // Return to Garage

];

let currentIndex = 0;

let animation = null;

function startTruck() {

    if (!map) return;

    if (truckMarker) {

        map.removeLayer(truckMarker);

    }

    truckMarker = L.marker(truckRoute[0])

        .addTo(map)

        .bindPopup("🚛 Garbage Truck");

    moveTruck();

}

function moveTruck() {

    animation = setInterval(() => {

        currentIndex++;

        if (currentIndex >= truckRoute.length) {

            currentIndex = 0;

        }

        truckMarker.setLatLng(truckRoute[currentIndex]);

        truckMarker.bindPopup(

            "🚛 Garbage Truck<br><br>Current Stop : "

            + (currentIndex + 1)

        );

    }, 3000);

}