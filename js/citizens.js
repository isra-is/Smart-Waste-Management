/* ==========================================
   SMART WASTE MANAGEMENT — CITIZEN DASHBOARD
========================================== */

const complaintStorageKey = "smartWasteComplaints";
const complaints = JSON.parse(localStorage.getItem(complaintStorageKey) || "[]");

const citizenStats = {
    totalComplaints: 12,
    resolved: 8,
    pending: 4,
    nearbyBins: 26
};

function saveComplaints() {
    localStorage.setItem(complaintStorageKey, JSON.stringify(complaints));
}

function renderComplaints() {
    const list = document.getElementById("complaintList");

    if (!list) return;

    list.innerHTML = "";

    complaints.forEach(item => {
        const complaintItem = document.createElement("div");
        const name = document.createElement("strong");
        const time = document.createElement("small");
        const status = document.createElement("span");

        complaintItem.className = "alert alert-light border mb-2";
        name.textContent = item.name;
        time.textContent = item.time;
        status.className = "badge bg-warning";
        status.textContent = item.status;
        complaintItem.append(
            name,
            document.createElement("br"),
            item.complaint,
            document.createElement("br"),
            time,
            document.createElement("br"),
            status
        );
        list.appendChild(complaintItem);
    });
}

function updateCitizenStatistics() {
    const resolvedCount = complaints.filter(item => item.status === "Resolved").length;
    const total = document.getElementById("totalComplaints");
    const resolved = document.getElementById("resolvedComplaints");
    const pending = document.getElementById("pendingComplaints");
    const nearbyBins = document.getElementById("nearbyBins");

    if (total) total.textContent = citizenStats.totalComplaints + complaints.length;
    if (resolved) resolved.textContent = citizenStats.resolved + resolvedCount;
    if (pending) pending.textContent = citizenStats.pending + complaints.length - resolvedCount;
    if (nearbyBins) nearbyBins.textContent = citizenStats.nearbyBins;
}

function initializeCitizenMap() {
    const mapDiv = document.getElementById("citizenMap");

    if (!mapDiv || mapDiv.dataset.initialized || typeof L === "undefined") return;

    mapDiv.dataset.initialized = "true";

    const map = L.map("citizenMap").setView([13.3409, 74.7421], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([13.3409, 74.7421]).addTo(map).bindPopup("You are here").openPopup();

    [
        { name: "Karkala Market", lat: 13.214, lng: 74.992, fill: 95 },
        { name: "Bus Stand", lat: 13.335, lng: 74.746, fill: 82 },
        { name: "City Circle", lat: 13.344, lng: 74.752, fill: 40 }
    ].forEach(bin => {
        L.marker([bin.lat, bin.lng])
            .addTo(map)
            .bindPopup(`<b>${bin.name}</b><br>Fill Level: ${bin.fill}%`);
    });
}

function initializeCitizenDashboard() {
    const complaintForm = document.getElementById("complaintForm");

    // The admin shell also loads this shared script. Wait until the citizen
    // content is present before accessing citizen-only elements.
    if (!complaintForm || complaintForm.dataset.initialized) return;

    complaintForm.dataset.initialized = "true";
    updateCitizenStatistics();
    renderComplaints();
    initializeCitizenMap();

    complaintForm.addEventListener("submit", event => {
        event.preventDefault();

        const type = document.getElementById("complaintType").value;
        const priority = document.getElementById("priority").value;
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!location || !description) {
            alert("Please provide a location and description.");
            return;
        }

        complaints.unshift({
            name: "Citizen",
            complaint: `${type}: ${description} (${location})`,
            priority,
            time: new Date().toLocaleString(),
            status: "Pending"
        });

        saveComplaints();
        complaintForm.reset();
        updateCitizenStatistics();
        renderComplaints();

        if (typeof addNotification === "function") {
            addNotification(`New ${priority.toLowerCase()} complaint: ${type}`);
        }

        if (typeof addActivity === "function") {
            addActivity(`Complaint submitted: ${type}`);
        }

        alert("Complaint submitted successfully.");
    });

    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", event => {
            event.preventDefault();
            alert("Thank you for your feedback.");
            feedbackForm.reset();
        });
    }
}

// This initializes the standalone citizen page. The navigation controller
// invokes it again after it dynamically loads the citizen content.
initializeCitizenDashboard();
