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

var welcomeScreen = document.querySelector("#window")

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

function closeWindow(element) {

    element.style.display = "none"

}

welcomeScreenClose.addEventListener("click", function(e) {

    if (e.target.id === "welcomeclose") {

        closeWindow(welcomeScreen);

    }

});

welcomeScreenOpen.addEventListener("click", function() {

    openWindow(welcomeScreen);

});

var selectedIcon = undefined

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

        deselectIcon(element)

        openWindow(window)

    } else {

        selectIcon (element)

    }

}

dragElement(document.querySelector("#images"))

var imageScreen = document.querySelector("#images")

var imageScreenClose = document.querySelector("#imageclose")

imageScreenClose.addEventListener("click", () => closeWindow(imageScreen));

dragElement(document.querySelector("#notes"))

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

var newNoteButton = document.querySelector("#newNote")

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

var biggestIndex = 1;

function addWindowTapHandling(element) {
    
    element.addEventListener("mousedown", () =>
        
        handleWindowTap(element)
    
    )
}

function handleWindowTap(element) {

  biggestIndex++;

  element.style.zIndex = biggestIndex;

}

var topBar = document.querySelector("#taskbar")

function handleWindowTap(element) {

  biggestIndex++;

  element.style.zIndex = biggestIndex;

  topBar.style.zIndex = biggestIndex + 1;

  deselectIcon(selectedIcon)

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

]

function setNotesContent(index) {

  currentNoteIndex = index;

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content

}


for (let i = 0; i < content.length; i++) {

    addToSideBar(i);

}

setNotesContent(0)

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

var notesContentDiv = document.querySelector("#notesContent")

notesContentDiv.addEventListener("input", function() {

    content[currentNoteIndex].content = notesContentDiv.innerHTML;

    saveNotes();

});
