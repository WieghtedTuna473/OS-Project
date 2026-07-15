/* ======================================================================
                            Global Variables
====================================================================== */
var dragged = false;
var biggestIndex = 1;
var selectedIcon = undefined;
var currentNoteIndex = 0;

var timeText = document.querySelector("#timeElement");
var topBar = document.querySelector("#taskbar");

/* ======================================================================
                            Clock
====================================================================== */
function updateTime() {

    var currentTime = new Date().toLocaleString();

    timeText.innerHTML = currentTime;

}

setInterval(updateTime, 1000);

/* ======================================================================
                            Dragging Windows
====================================================================== */
function dragElement(element) {

    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

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

        var rect = element.getBoundingClientRect();

        element.style.top = rect.top + "px";

        element.style.left = rect.left + "px";

        element.style.transform = "none";

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

        var newTop = element.offsetTop - currentY;

        var newLeft = element.offsetLeft - currentX;

        var maxTop = window.innerHeight - element.offsetHeight;

        var maxLeft = window.innerWidth - element.offsetWidth;

        if (newTop < 0) newTop = 0;

        if (newTop > maxTop) newTop = maxTop;

        if (newLeft < 0) newLeft = 0;

        if (newLeft > maxLeft) newLeft = maxLeft;

        element.style.top = newTop + "px";

        element.style.left = newLeft + "px";

    }

    function stopDragging() {

        document.onmouseup = null;

        document.onmousemove = null;

    }

}

/* ======================================================================
                            Window Open and Close
====================================================================== */
function closeWindow(element) {

    element.style.display = "none";

}

function openWindow(element) {

    element.style.top = "";

    element.style.left = "";

    element.style.transform = "";

    element.style.display = "block";

    biggestIndex++;

    element.style.zIndex = biggestIndex;

    topBar.style.zIndex = biggestIndex + 1;

}

function handleWindowTap(element) {

    biggestIndex++;

    element.style.zIndex = biggestIndex;

    topBar.style.zIndex = biggestIndex + 1;

    deselectIcon(selectedIcon);

}

function addWindowTapHandling(element) {

    element.addEventListener("mousedown", () => handleWindowTap(element));

}

/* ======================================================================
                            Desktop Icons
====================================================================== */
function selectIcon(element) {

    element.classList.add("desktop-icon");

    selectedIcon = element;

}

function deselectedIcon(element) {

    element.classList.remove("desktop-icon");

    selectedIcon = undefined;

}

function handleIconTap(element) {

    if (element.classList.contains("desktop-icon-selected")) {

        deselectIcon(element);

        openWindow(window);

    } else {

        selectIcon(element);

    }

}

/* ======================================================================
                            Welcome Window
====================================================================== */
var welcomeScreen = document.querySelector("#window");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

dragElement(welcomeScreen);

welcomeScreenClose.addEventListener("click", function(e) {

    if (e.target.id === "welcomeclose") {

        closeWindow(welcomeScreen);

    }

});

welcomeScreenOpen.addEventListener("click", function() {

    openWindow(welcomeScreen);

});

/* ======================================================================
                            Images App
====================================================================== */
var imageScreen = document.querySelector("#images");
var imageScreenClose = document.querySelector("#imageclose");

dragElement(imageScreen);

imageScreenClose.addEventListener("click", () => closeWindow(imageScreen));

/* ======================================================================
                            Notes App
====================================================================== */
var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#notesclose");
var newNoteButton = document.querySelector("#newNote");
var notesContentDiv = document.querySelector("#notesContent");

var content = [

    {

        title: "Welcome",

        date: "7/14/2026",

        content: `
            <div class="notes-content" contenteditable="true">

                Welcome to <strong>BrickOS Notes</strong>
                <br>
                This is your app inside BrickOS to keep your thoughts, plans, or anything else you want, including ideas LEGO related! Remember, There is no end to <strong>CREATIVITY!</strong>
                <br>
                From, Me

            </div>
        `

    }

];

dragElement(notesScreen);

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

function setNotesContent(index) {

    currentNoteIndex = index;

    notesContentDiv.innerHTML = content[index].content;

}

function addToSideBar(index) {

    var sidebar = document.querySelector("#sidebar");

    var note = content[index];

    var newDiv = document.createElement("div");

    newDiv.className = "notes-sidebar-item";

    newDiv.innerHTML = `

        <p class="notes-sidebar-title">
            ${note.title}
        </p>

        <p class="notes-sidebar-date">
            ${note.date}
        </p>

    `;

    newDiv.addEventListener("click", function() {

        setNotesContent(index);

    });

    sidebar.appendChild(newDiv);

}

function saveNotes() {

    localStorage.setItem("brickos-notes", JSON.stringify(content));

}

function loadNotes() {

    var saved = localStorage.getItem("brickos-notes");

    if (saved) {

        content = JSON.parse(saved);

    }

}

newNoteButton.addEventListener("click", function() {

    var noteName = prompt("Note title:", "New Note");

    if (noteName === null) return;

    var newNote = {

        title: noteName || "New Note",

        date: new Date().toLocaleDateString(),

        content: `<div class="notes-content" contenteditable="true">Start typing...</div>`

    };

    content.push(newNote);

    addToSideBar(content.length - 1);

    saveNotes();

    setNotesContent(content.length - 1);

});

notesContentDiv.addEventListener("input", function() {

    content[currentNoteIndex].content = notesContentDiv.innerHTML;

    saveNotes();

});

loadNotes();

for (let i = 0; i < content.length; i++) {

    addToSideBar(i);

}

setNotesContent(0);

/* ======================================================================
                            Calendar App
====================================================================== */
var calendarScreen = document.querySelector("#calendar");

timeText.addEventListener("click", function() {

    if (calendarScreen.style.display === "block") {

        closeWindow(calendarScreen);

    } else {

        buildCalendar();

        openWindow(calendarScreen);

    }

});

function buildCalendar() {

    var now = new Date();

    var year = now.getFullYear();

    var month = now.getMonth();

    var today = now.getDate();

    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    document.querySelector("#calendarMonthLabel").innerHTML = monthNames[month] + " " + year;

    var grid = document.querySelector("#calendarGrid");

    grid.innerHTML = "";

    var dayLabels = ["Su","Mo","Tu","We","Th","Fr","Sa"];

    for (let i = 0; i < 7; i++) {

        var label = document.createElement("div");

        label.className = "calendar-daylabel";

        label.innerHTML = dayLabels[i];

        grid.appendChild(label);

    }

    var firstDayIndex = new Date(year, month, 1).getDay();

    var daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {

        var empty = document.createElement("div");

        empty.className = "calendar-day empty";

        grid.appendChild(empty);

    }

    for (let day = 1; day <= daysInMonth; day++) {

        var dayDiv = document.createElement("div");

        dayDiv.className = "calendar-day";

        if (day === today) dayDiv.classList.add("today");

        dayDiv.innerHTML = day;

        grid.appendChild(dayDiv);

    }

}
