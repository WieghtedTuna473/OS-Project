Overview:<br>
I built a LEGO themes browser based on HTML, CSS, and JavaScript.<br>
There are draggable windows, a taskbar with a live clock, a Notes app with storage even if you close the app, and app for images, and a calnder.<br>
========================================================================================================================================================
Features:<br>
-
The Taskbar:<br>
Shows a live clock with the time and date that updates per second. <br>
Clicking the BrickOS reopens the Welcome window and clicking the clock opens the calender.<br>

The Windows:<br>
openWindow(element)-shows a window and positions it to the center.<br>
closeWindow(element)-hides the window.<br>
dragElement(element)-makes a window draggable by the header and makes it so it can't be dragged off screen.<br>
The calender is not draggable.<br>

Images App:<br>
Grid of images that you can scroll through.<br>

Notes App:<br>
The sidebar is in the notes app where it shows the notes and has a button to add a new note.<br>
All the are in the notes area has contenteditable so you can still edit any note and it will be saves even if the app is exited out of.<br>
saveNotes() will save the content to local storage unless the web is reloaded.<br>

Calender App:<br>
buildCalender() builds the days of the week.<br>
It highlights todays date and is built everytime instanatly everytime the calnder app is opened.<br>
