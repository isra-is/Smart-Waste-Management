/*===================================
        Notifications
===================================*/

const notifications=[];

function addNotification(message){

    notifications.unshift({

        text:message,

        time:new Date().toLocaleTimeString()

    });

    renderNotifications();

}

function renderNotifications(){

    const list=document.getElementById("notificationList");

    if(!list) return;

    list.innerHTML="";

    notifications.forEach(note=>{

        list.innerHTML+=`

            <div class="notification-item">

                <strong>${note.time}</strong><br>

                ${note.text}

            </div>

        `;

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