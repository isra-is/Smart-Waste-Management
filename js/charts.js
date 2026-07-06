/*====================================
        Dashboard Charts
====================================*/

let collectionChart;
let binChart;

function initializeCharts() {

    const collectionCanvas = document.getElementById("collectionChart");
    const binCanvas = document.getElementById("binChart");

    if (!collectionCanvas || !binCanvas) return;

    if (collectionChart) collectionChart.destroy();
    if (binChart) binChart.destroy();

    collectionChart = new Chart(collectionCanvas, {

        type: "line",

        data: {

            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

            datasets: [{

                label: "Collections",

                data: [80,120,100,150,170,140,190],

                borderColor: "#2563eb",

                tension: .4

            }]

        }

    });

    binChart = new Chart(binCanvas, {

        type: "bar",

        data: {

            labels: smartBins.map(bin => bin.name),

            datasets: [{

                label: "Fill %",

                data: smartBins.map(bin => bin.fill),

                backgroundColor: "#22c55e"

            }]

        }

    });

}

function updateCharts() {

    if (!binChart) return;

    binChart.data.datasets[0].data =
        smartBins.map(bin => bin.fill);

    binChart.update();

}