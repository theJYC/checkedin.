### When page reloads/refreshes, the daysLeft function needs to do a recalculation from the current date (not the date on which the card was created)

### localStorage saving is not working

This has been discussed with Javier, and has to do with calling the saveToLocalStorage function before the object (profilesList) has had the chance to be updated with the user-inputted profile.

### Even if profiles are saved, they display daysLeft from the date on which the user has submitted the profile.

e.g. if the user submitted the profile today for a duedate of 'tomorrow', if the user goes on CheckedIn tomorrow, that daysLeft should now be 'today', instead of remaining as 'tomorrow'. This means that there needs to be continuous comparing the checkInBy date with the current date [new Date()]of the session.

### Once the number of cards become greater than 8, the responsiveness fails. (on MacBookPro 13 inch) 

One way to mitigate this would be to do flex wrap, and make sure that after 8 entries, the 9th card will start from the row below, and so on.

### Update functionality is missing

I, the author, have been approaching the development of CheckedIn as a heuristic process. As soon as I get around to learning how to edit cards (which will be coded into the app.js script), I will be incorporating the functionality. 
