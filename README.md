I built a LEGO themes browser based on HTML, CSS, and JavaScript.
There are draggable windows, a taskbar with a live clock, a Notes app with storage even if you close the app, and app for images, and a calnder.

The Taskbar
Shows a live clock with the time and date that updates per second. 
Clicking the BrickOS reopens the Welcome window and clicking the clock opens the calender.

The Windows
openWindow(element)-shows a window and positions it to the center.
closeWindow(element)-hides the window
dragElement(element)-makes a window draggable by the header and makes it so it can't be dragged off screen.
The calender is not draggable.

Images App
Grid of images that you can scroll through.

Notes App
The sidebar is in the notes app where it shows the notes and has a button to add a new note.
All the are in the notes area has contenteditable so you can still edit any note and it will be saves even if the app is exited out of.
saveNotes() will save the content to local storage unless the web is reloaded.

Calender App
buildCalender() builds the days of the week.
It highlights todays date and is built everytime instanatly everytime the calnder app is opened.
