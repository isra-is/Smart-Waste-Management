/*=========================================
        SMART ALERTS
=========================================*/

const alerts = [];

function generateAlerts() {

    alerts.length = 0;

    smartBins.forEach(bin => {

        if (bin.fill >= 90) {

            alerts.push({
                type: "danger",
                icon: "🚨",
                title: "Overflow Alert",
                message: `${bin.name} is ${bin.fill}% full`
            });

        } else if (bin.fill >= 70) {

            alerts.push({
                type: "warning",
                icon: "⚠️",
                title: "Nearly Full",
                message: `${bin.name} is ${bin.fill}% full`
            });

        }

        if (bin.washing) {

            alerts.push({
                type: "info",
                icon: "🧹",
                title: "Cleaning Required",
                message: `${bin.name} needs washing`
            });

        }

    });

}

function loadAlerts() {

    generateAlerts();

    const container = document.getElementById("alertsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (alerts.length === 0) {

        container.innerHTML = `
            <div class="alert alert-success">
                ✅ No active alerts.
            </div>
        `;

        return;
    }

    alerts.forEach(alert => {

        container.innerHTML += `

            <div class="alert alert-${alert.type}">

                <h5>${alert.icon} ${alert.title}</h5>

                <p>${alert.message}</p>

            </div>

        `;

    });

}