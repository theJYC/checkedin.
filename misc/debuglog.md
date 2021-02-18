# DebugLog

This is a working documentation of currently-existent bugs that need to be addressed in order for CheckedIn to function in its full capacity.

The list is organised in the order of priority.


### When page reloads/refreshes, the daysLeft function needs to do a recalculation from the current date (not the date on which the card was created) (testing debug!)

e.g. if the user submitted the profile today for a duedate of 'tomorrow', daysLeft should display 'today' if the user goes on and refreshes CheckedIn tomorrow. Currently, daysLeft is a static variable that needs to be updated every time the user is accessing CheckedIn.

**This will have to come in the form of defining and calling a function upon page reload (or new session), that checks the session/reload date/timestamp with that of the user-inputed checkInBy date variable.**

### The app displays erroneously on mobile browsers. In particular, the hover note functionality is compromised since hover does not exist on mobile

This is true. The hover-note functionality is an integral aspect of this program and, given that it cannot be accessed on mobile, the author is pondering on ways that it can be adapted to the mobile environment. Immediately, what comes to mind is that it could be a clickable note with a pop-up textbox containing within it the note input. This could be toggled upon clicking anywhere outside the textbox when it appears. However, such solution may not be as elegant as the hover access. 

### Update functionality is missing

I, the author, have been approaching the development of CheckedIn as a heuristic process. As soon as I get around to learning how to edit cards (for which the functionality will be integrated into the app.js script), update will be a live functionality.

### Increasing FAQ input accesibility to non-tech savvy user 

Currently the FAQ is written into the README.md document of the project's root directory. In order to increase the accesibility to FAQ (and also to encourage all users to provide feedback), there will be a visible 'FAQ' hyperlink somewhere in the header section of the CheckedIn platform. 

### Cards should always sort display by order of CheckInDate

This would be a better way of organising the CheckedIn contacts, in order to imply a sense of urgency towards those who are past due.  

### Allow users to press `esc` on keyboard to close modalbox

This will be integrated soon enough!
