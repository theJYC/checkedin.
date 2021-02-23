# DebugLog

This is a working documentation of currently-existent bugs that need to be addressed in order for CheckedIn to function in its full capacity.

The list is organised in the order of priority.

### HTML "type="time"" attribute does not work in Safari or Internet Explorer

This is [unfortunately the case](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_time) and it would be futile for the author to try to find a hack around this issue. Feedback on how to make CheckedIn compatible with Safari and Internet Explorer would be much appreciated! 

### The overdue indicator (red borders around profile card) is only date sensitive and not date *and* time sensitive

This is because CheckedIn is programmed so that the overdue indicator is triggered by comparing the difference in the date (isolated from time input) of check-in and the current date of the browser session. 

Unfortunately, working with dates in JavaScript has proven to be one of the most nebulous (and contentious) topics surrounding the programming language and, up until now, there has not been a lot of thought put into how one would go about making a more 'accurate' overdue indicator that incorporates both the date and time.

Immediately, the solution would be to find a way to concatenate the date and time variable (with the assumption that they would be converted to compatible string formats), and then measure the difference between the current session date (that includes the timestamp as well as date) and the concatenated string value.  

### The app displays erroneously on mobile browsers. In particular, the hover note functionality is compromised since hover does not exist on mobile

This is true. 

The hover-note functionality is an integral aspect of this program and, given that it cannot be accessed on mobile, the author is pondering on ways that it can be adapted to the mobile environment. Immediately, what comes to mind is that it could be a clickable note with a pop-up textbox containing within it the note input. This could be toggled upon clicking anywhere outside the textbox when it appears. However, such solution may not be as elegant as the hover access. 

### Update functionality is missing

I, the author, have been approaching the development of CheckedIn as a heuristic process. As soon as I get around to learning how to edit cards (for which the functionality will be integrated into the app.js script), update will be a live functionality.

### Increasing FAQ input accesibility to non-tech savvy user 

Currently the FAQ is written into the README.md document of the project's root directory. In order to increase the accesibility to FAQ (and also to encourage all users to provide feedback), there will be a visible 'FAQ' hyperlink somewhere in the header section of the CheckedIn platform. 

### Perhaps a demo page that is referenced on the platform could enhance the accessibility of the application to a wide target user-audience

This is the direction that the author is thinking of taking CheckedIn, and he is brainstorming the best way to go about with its implementation. 

As of now (02/22/2021), the demo link is appended right below the "add contact" button, which works well because 1) it will appear in the center of the screen when no contact is registered, and 2) it will be positioned below the last row of contact cards, which doesn't get in the user's way yet remains visible. 

The link is planned to direct the user to a separate html script with an image tag, specifically a GIF, that displays the screen recording or step by step screenshots of how the application works:

0) registering the contact by clicking the contact form and filling out the relevant fields.
1) several contacts populated onto the screen
1.5) note link hovered over to display the note text that was submitted on the 'add contact' form
2) several days later, when the page is refreshed, the dates being calculated and updating to display some overdue items.

### Cards should always sort display by order of CheckInDate

This would be a better way of organising the CheckedIn contacts, in order to imply a sense of urgency towards those who are past due.  

However, in order to make the functionality more intuitive, a 'sort by due-date' button on the top right (aligned with 'add contact button') would make for an elegant implementation.

### Allow users to press `esc` on keyboard to close modalbox

This will be integrated soon enough!
