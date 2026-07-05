/*==================================================
        SMART WASTE ALERT SYSTEM
==================================================*/

function loadAlerts() {

    const container = document.getElementById("alertsContainer");

    if (!container) return;

    container.innerHTML = "";

    smartBins.forEach(bin => {

        let type = "";
        let title = "";
        let message = "";

        if (bin.fill >= 90) {

            type = "alert-danger";
            title = "Overflow";
            message = `${bin.name} is ${bin.fill}% full`;

        }

        else if (bin.washing) {

            type = "alert-warning";
            title = "Cleaning Required";
            message = `${bin.name} needs washing`;

        }

        else {

            type = "alert-success";
            title = "Normal";
            message = `${bin.name} is operating normally`;

        }

        const alert = document.createElement("div");

        alert.className = `alert-item ${type}`;

        alert.innerHTML = `

            <h6>${title}</h6>

            <p>${message}</p>

        `;

        container.appendChild(alert);

    });

}