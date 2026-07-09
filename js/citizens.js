const complaints = [];

function submitComplaint() {

    const name = document.getElementById("citizenName").value.trim();
    const complaint = document.getElementById("citizenComplaint").value.trim();

    if (!name || !complaint) {
        alert("Please fill all fields.");
        return;
    }

    complaints.unshift({
        name,
        complaint,
        time: new Date().toLocaleString(),
        status: "Pending"
    });

    document.getElementById("citizenName").value = "";
    document.getElementById("citizenComplaint").value = "";

    renderComplaints();

    if (typeof addNotification === "function") {
        addNotification(`📢 New complaint from ${name}`);
    }

    if (typeof addActivity === "function") {
        addActivity(`📢 Complaint submitted by ${name}`);
    }
}

function renderComplaints() {

    const list = document.getElementById("complaintList");

    if (!list) return;

    list.innerHTML = "";

    complaints.forEach(item => {

        list.innerHTML += `
            <div class="alert alert-light border mb-2">
                <strong>${item.name}</strong><br>
                ${item.complaint}<br>
                <small>${item.time}</small><br>
                <span class="badge bg-warning">${item.status}</span>
            </div>
        `;

    });

}

/* ==========================================
   SMART WASTE MANAGEMENT
   CITIZEN DASHBOARD
========================================== */

// ===============================
// Citizen Statistics
// ===============================

const citizenStats = {
    totalComplaints: 12,
    resolved: 8,
    pending: 4,
    nearbyBins: 26
};

document.getElementById("totalComplaints").textContent =
    citizenStats.totalComplaints;

document.getElementById("resolvedComplaints").textContent =
    citizenStats.resolved;

document.getElementById("pendingComplaints").textContent =
    citizenStats.pending;

document.getElementById("nearbyBins").textContent =
    citizenStats.nearbyBins;


// ===============================
// Complaint Form
// ===============================

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Complaint submitted successfully.");

        complaintForm.reset();

    });

}


// ===============================
// Feedback Form
// ===============================

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you for your feedback.");

        feedbackForm.reset();

    });

}


// ===============================
// Leaflet Map
// ===============================

const mapDiv = document.getElementById("citizenMap");

if (mapDiv) {

    const map = L.map("citizenMap").setView(
        [13.3409, 74.7421],
        13
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // Citizen Location

    L.marker([13.3409, 74.7421])

        .addTo(map)

        .bindPopup("You are here")

        .openPopup();


    // Smart Bins

    const bins = [

        {
            name: "Karkala Market",
            lat: 13.214,
            lng: 74.992,
            fill: 95
        },

        {
            name: "Bus Stand",
            lat: 13.335,
            lng: 74.746,
            fill: 82
        },

        {
            name: "City Circle",
            lat: 13.344,
            lng: 74.752,
            fill: 40
        }

    ];

    bins.forEach(bin => {

        L.marker([bin.lat, bin.lng])

            .addTo(map)

            .bindPopup(
                `<b>${bin.name}</b><br>Fill Level : ${bin.fill}%`
            );

    });

}


// ===============================
// Notifications
// ===============================

console.log("Citizen Dashboard Loaded Successfully");