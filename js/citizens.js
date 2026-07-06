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