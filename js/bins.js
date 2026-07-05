/*=========================================
        SMART BIN MANAGEMENT
=========================================*/

function loadBinsPage() {

    const grid = document.getElementById("binsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    smartBins.forEach(bin => {

        let status = "Normal";
        let color = "#22c55e";

        if (bin.fill >= 90) {

            status = "Overflow";
            color = "#ef4444";

        }
        else if (bin.fill >= 60) {

            status = "Almost Full";
            color = "#f59e0b";

        }

        const card = document.createElement("div");

        card.className = "bin-card";

        card.innerHTML = `

            <div class="bin-header">

                <h3>${bin.name}</h3>

                <span class="status-badge"
                      style="background:${color};">

                    ${status}

                </span>

            </div>

            <hr>

            <p><strong>📊 Fill Level:</strong> ${bin.fill}%</p>

            <p><strong>🔋 Battery:</strong> ${bin.battery}%</p>

            <p><strong>🌡 Temperature:</strong> ${bin.temperature}°C</p>

            <p><strong>💨 Smoke:</strong> ${bin.smoke ? "Detected" : "Safe"}</p>

            <p><strong>🚿 Washing:</strong> ${bin.washing ? "Required" : "Not Required"}</p>

            <p><strong>📍 GPS:</strong></p>

            <small>

                ${bin.lat},

                ${bin.lng}

            </small>

        `;

        grid.appendChild(card);

    });

}