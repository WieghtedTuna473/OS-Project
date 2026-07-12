var dragged = false;

function updateTime() {

    var currentTime = new Date().toLocaleString();

    var timeText = document.querySelector("#timeElement");

    timeText.innerHTML = currentTime

}

setInterval(updateTime, 1000);


dragElement(document.getElementById("window"));

function dragElement(element) {

    var initialX=0;

    var initialY=0;

    var currentX=0;

    var currentY=0;

    if (document.getElementById(element.id + "header")) {

        document.getElementById(element.id + "header").onmousedown = startDragging;

    } else {

        element.onmousedown = startDragging;

    }

    function startDragging(e) {

        if (e.target.id === "welcomeclose") return;

        if (e.target.id === "welcomeopen") return;

        e = e || window.event;

        dragged = false;

        e.preventDefault();

        initialX = e.clientX;

        initialY = e.clientY;

        document.onmouseup = stopDragging;

        document.onmousemove = dragElement;

    }

    function dragElement(e) {

        e = e || window.event;

        e.preventDefault();

        dragged = true;

        currentX = initialX - e.clientX;

        currentY = initialY - e.clientY;

        initialX = e.clientX;

        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";

        element.style.left = (element.offsetLeft - currentX) + "px";

    }

      function stopDragging() {

        document.onmouseup = null;

        document.onmousemove = null;
    
    }

}

var welcomeScreen = document.querySelector("#window")

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

function closeWindow(element) {

    element.style.display = "none"

}

function openWindow(element) {

    element.style.display = "block"

}

welcomeScreenClose.addEventListener("click", function(e) {

    if (e.target.id === "welcomeclose") {

        closeWindow(welcomeScreen);

    }

});

welcomeScreenOpen.addEventListener("click", function() {

    openWindow(welcomeScreen);

});
