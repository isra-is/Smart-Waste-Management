/*=================================================
        SMART CITY SIMULATION ENGINE
=================================================*/

let simulationTimer = null;
let simulationStarted = false;

function startSimulation() {

    if (simulationStarted) return;

    simulationStarted = true;

    simulationTimer = setInterval(() => {

        simulateBins();

        updateStatistics();

    }, 5000);

}

function stopSimulation() {

    clearInterval(simulationTimer);

    simulationStarted = false;

}

function simulateBins() {

    smartBins.forEach(bin => {

        const random = Math.floor(Math.random() * 8);

        bin.fill += random;

        if (bin.fill > 100) {

            bin.fill = 100;

        }

    });

    if (typeof drawBins === "function") {

        drawBins();

    }

}