## DebugLog

This is a working documentation of currently-existent bugs that need to be addressed in order for CheckedIn to function in its full capacity.

The list is organised in the order of priority.

#### When page reloads/refreshes, the daysLeft function needs to do a recalculation from the current date (not the date on which the card was created)

e.g. if the user submitted the profile today for a duedate of 'tomorrow', daysLeft should display 'today' if the user goes on and refreshes CheckedIn tomorrow. Currently, daysLeft is a static variable that needs to be updated every time the user is accessing CheckedIn.

**This will have to come in the form of defining and calling a function upon page reload (or new session), that checks the session/reload date/timestamp with that of the user-inputed checkInBy date variable.**

#### Once the number of cards become greater than 8, the responsiveness fails. (on MacBookPro 13 inch) 

One way to mitigate this would be to do flex wrap, and make sure that after 8 entries, the 9th card will start from the row below, and so on.

#### Update functionality is missing

I, the author, have been approaching the development of CheckedIn as a heuristic process. As soon as I get around to learning how to edit cards (for which the functionality will be integrated into the app.js script), update will be a live functionality.
