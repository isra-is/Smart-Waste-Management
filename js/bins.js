/*=========================================
        SMART BINS MODULE
=========================================*/

function loadBinsPage() {

    const grid = document.getElementById("binsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    smartBins.forEach(bin => {

        let color = "bg-success";

        if (bin.fill >= 90) {

            color = "bg-danger";

        } else if (bin.fill >= 70) {

            color = "bg-warning";

        }

        const card = document.createElement("div");

        card.className = "dashboard-card";

        card.innerHTML = `

            <h4>🗑 ${bin.name}</h4>

            <hr>

            <p><strong>Fill Level</strong></p>

            <div class="progress mb-3">

                <div class="progress-bar ${color}"
                     style="width:${bin.fill}%">

                    ${bin.fill}%

                </div>

            </div>

            <p>🔋 Battery : ${bin.battery}%</p>

            <p>🌡 Temperature : ${bin.temperature}°C</p>

            <p>🔥 Smoke :
                ${bin.smoke ? "Detected" : "Normal"}
            </p>

            <p>🧹 Washing :
                ${bin.washing ? "Required" : "Not Required"}
            </p>

            <div class="d-grid gap-2 mt-3">

                <button
                    class="btn btn-success"
                    onclick="collectBin(${bin.id})">

                    🚛 Collect Waste

                </button>

                <button
                    class="btn btn-primary"
                    onclick="scheduleWash(${bin.id})">

                    🧹 Schedule Wash

                </button>

                <button
                    class="btn btn-outline-secondary"
                    onclick="viewBinOnMap(${bin.id})">

                    📍 View on Map

                </button>

            </div>

        `;

        grid.appendChild(card);

    });

}

/*=========================================
        BUTTON ACTIONS
=========================================*/

function collectBin(id) {

    const bin = smartBins.find(b => b.id === id);

    if (!bin) return;

    bin.fill = 0;

    loadBinsPage();

    if (typeof updateStatistics === "function")
        updateStatistics();

    if (typeof loadAlerts === "function")
        loadAlerts();

    if (typeof addActivity === "function")
        addActivity(`🚛 ${bin.name} collected successfully`);

    if (typeof addNotification === "function")
        addNotification(`${bin.name} has been emptied`);

    if (typeof drawBins === "function")
        drawBins();

}

function scheduleWash(id) {

    const bin = smartBins.find(b => b.id === id);

    if (!bin) return;

    bin.washing = false;

    loadBinsPage();

    if (typeof addActivity === "function")
        addActivity(`🧹 Washing scheduled for ${bin.name}`);

    if (typeof addNotification === "function")
        addNotification(`${bin.name} washing scheduled`);

}

function viewBinOnMap(id) {

    const bin = smartBins.find(b => b.id === id);

    if (!bin) return;

    alert(
        `${bin.name}\n\nLatitude : ${bin.lat}\nLongitude : ${bin.lng}`
    );

}