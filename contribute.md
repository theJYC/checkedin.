# ContributionLog

Below are a couple of lists of suggested [Next Steps](https://github.com/jinyoungch0i/checkedin./blob/main/contribute.md#next-steps) and [Bugs](https://github.com/jinyoungch0i/checkedin./blob/main/contribute.md#Bugs) that need to be addressed.

The lists are organised in order of priority.

## Next Steps

### Provide default contact upon first visit

If user has not yet submitted a contact (via the modal form), provide a sample "John D." profile card to the profilesList array. Ideal for enhanced UX.

### Include Location input on modal form

Allow user to input optional location data, and integrate Google PlaceAutocomplete API in order to create an elegant dropdown location search bar. 

## Bugs

### Form should be validating for required fields.

Upon research, it was found that form validation with pure HTML (using the inline ["required" attribute](https://github.com/jinyoungch0i/checkedin./blob/f7baf239fbf6952ae896d82b7d1b7a2770756c31/index.html#L63-L70)) may not work when the submit button element is added a "click" eventlistener. This is because, when JS is involed, the best practice is to add the eventlistener *not* to the submit button, but rather the entire form element itself. 

Knowing this doesn't provide a quick fix, however. The main reason the author could not simply add the event listener to the form is that the form currently performs **two** different types of actions:

1) To "submit" a new, non-existing profile
2) To "update" an existing profile

So far, the only way to make the modal perform these two independent actions has been to add separate event listeners to the "submit" and "update" buttons (which are hidden/displayed via CSS) on the **same** form element. 

Since different actions are required for the form in "submit" and "update" modes, simply tagging the form element with one event listener would be a messy operation.

If there is a suggested way to tackle this particular bug, please kindly submit a PR!

### "type="time"" and "type="date"" HTML attributes do not work in Safari or Internet Explorer

This is [unfortunately the case](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_time) and it would be futile for the author to try to find a hack around this issue. 

While it's not really an issue per sé (since the user can type in the date and time (vs. clicking on a more intuitive widget), this does make the UX of Safari users less than optimal. 

Feedback on how to make CheckedIn compatible with Safari and Internet Explorer would be much appreciated! 

### The overdue indicator (red borders around profile card) is only date sensitive and not date *and* time sensitive

This is because CheckedIn is programmed so that the overdue indicator is triggered by comparing the difference in the date (isolated from time input) of check-in and the current date of the browser session. 

Unfortunately, working with dates in JavaScript has proven to be one of the most nebulous (and contentious) topics surrounding the programming language and, up until now, there has not been a lot of thought put into how one would go about making a more 'accurate' overdue indicator that incorporates both the date and time.

Immediately, the solution would be to find a way to concatenate the date and time variable (with the assumption that they would be converted to compatible string formats), and then measure the difference between the current session date (that includes the timestamp as well as date) and the concatenated string value.  

### Increasing FAQ input accesibility to non-tech savvy user 

Currently the FAQ is written into the README.md document of the project's root directory. In order to increase the accesibility to FAQ (and also to encourage all users to provide feedback), there will be a visible 'FAQ' hyperlink somewhere in the header section of the CheckedIn platform. 

### The app displays erroneously on mobile browsers. In particular, the hover note functionality is compromised since hover does not exist on mobile

This is true. 

The hover-note functionality is an integral aspect of this program and, given that it cannot be accessed on mobile, the author is pondering on ways that it can be adapted to the mobile environment. Immediately, what comes to mind is that it could be a clickable note with a pop-up textbox containing within it the note input. This could be toggled upon clicking anywhere outside the textbox when it appears. However, such solution may not be as elegant as the hover access. 

That being said, the author also believes that the merit of `checkedin.` lies in the fact that the UX it aims to deliver is akin to that of an analog medium; given this fact, it may be better for `checkedin.` to solely exist on Desktop. 

Hence, 'please access via desktop browser' has been integrated into mobile display until a suitable solution can be explored.

### ~~Update functionality is missing~~

~~I, the author, have been approaching the development of CheckedIn as a heuristic process. As soon as I get around to learning how to edit cards (for which the functionality will be integrated into the app.js script), update will be a live functionality.~~

~Update is now fully integrated into `checkedin.`.~

### ~~Perhaps a demo page that is referenced on the platform could enhance the accessibility of the application to a wide target user-audience~~

~~This is the direction that the author is thinking of taking CheckedIn, and he is brainstorming the best way to go about with its implementation.~~ 

~~As of now (02/22/2021), the demo link is appended right below the "add contact" button, which works well because 1. it will appear in the center of the screen when no contact is registered, and 2. it will be positioned below the last row of contact cards, which doesn't get in the user's way yet remains visible.~~ 

~~The link is planned to direct the user to a separate html script with an image tag, specifically a GIF, that displays the screen recording or step by step screenshots of how the application works:~~

~~0) registering the contact by clicking the contact form and filling out the relevant fields.~~
~~1) several contacts populated onto the screen~~
~~1.5) note link hovered over to display the note text that was submitted on the 'add contact' form~~
~~2) several days later, when the page is refreshed, the dates being calculated and updating to display some overdue items.~~

### ~~Cards should always sort display by order of CheckInDate~~

~~This would be a better way of organising the CheckedIn contacts, in order to imply a sense of urgency towards those who are past due~~

~~However, in order to make the functionality more intuitive, a 'sort by due-date' button on the top right (aligned with 'add contact button') would make for an elegant implementation.~~

### ~~Allow users to press `esc` on keyboard to close modalbox~~

~~This has been integrated.~~
