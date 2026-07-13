/*===================================
        Notifications
===================================*/

const notificationStorageKey = "smartWasteNotifications";
const notifications = JSON.parse(localStorage.getItem(notificationStorageKey) || "[]");

function saveNotifications(){

    localStorage.setItem(notificationStorageKey, JSON.stringify(notifications));

}

function addNotification(message){

    notifications.unshift({

        text:message,

        time:new Date().toLocaleTimeString()

    });

    notifications.splice(20);
    saveNotifications();

    renderNotifications();

}

function renderNotifications(){

    const list=document.getElementById("notificationList");

    if(!list) return;

    list.innerHTML="";

    notifications.forEach(note=>{

        const item=document.createElement("div");
        const time=document.createElement("strong");

        item.className="notification-item";
        time.textContent=note.time;
        item.append(time, document.createElement("br"), note.text);
        list.appendChild(item);

    });

}

function initializeNotifications(){

    const btn=document.getElementById("notificationBtn");

    const panel=document.getElementById("notificationPanel");

    if(!btn) return;

    btn.onclick=()=>{

        panel.classList.toggle("show");

    };

}
