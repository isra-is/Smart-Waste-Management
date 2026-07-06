/*=========================================
        SETTINGS
=========================================*/

function initializeSettings(){

    const dark =
        localStorage.getItem("darkMode");

    if(dark==="true"){

        document.body.classList.add("dark-mode");

        document.getElementById("darkModeToggle").checked=true;

    }

}

function saveSettings(){

    const dark=
        document.getElementById("darkModeToggle").checked;

    if(dark){

        document.body.classList.add("dark-mode");

    }else{

        document.body.classList.remove("dark-mode");

    }

    localStorage.setItem("darkMode",dark);

    alert("Settings Saved");

}