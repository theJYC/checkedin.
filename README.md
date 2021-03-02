# checkedin.

<a href="https://jinyoungch0i.github.io/CheckedIn/">
    <img src="misc/demo.gif" alt='checkedIn dynamic demo'>
</a>

#### Technologies: HTML, CSS, Object-Oriented JavaScript, DayJS, Web APIs (DOM, Web Storage)

`checkedin.` is an open source, browser-based CRUD application providing users with a minimalistic platform to manage their contacts and be reminded of when to get in touch with others. 

Through the use of `localstorage` and `DOM manipulation`, `checkedin.` enables users to submit a contact that are due for a check-in and, upon page-refresh, update each contact's `daysLeft` variable to indicate whether the check-in is due/past-due, and/or signal how many days are between the check-in date and the current date of browser session. 

[Live Demo](https://jinyoungch0i.github.io/CheckedIn/) & [Source Code](https://github.com/jinyoungch0i/CheckedIn)

## FAQ

### Why does the user submit the contact's last initial, instead of last name? 

The currently deployed application is an MVP and functions entirely on the front end, through the use of the Web Storage API.

This means that all of the CRUD *(Create, Read, Update, and Delete)* activity is stored within localStorage, which is inherently not as secure as a designated server-side DB. 

The author believes that the use of localStorage in this manner was a strategic decision that offers a great security trade-off for speedy deployment and rapid prototyping. 

**Last initial was used, in lieu of last name, in order to provide a layer of anonymity for the user given the inherent security risk with localStorage.**

### Where can I see the notes I've included with a contact? 

Make sure to hover your mouse over the `↠notes↞` text to preview the note snippet that you've submitted!

### What could be done to bolster the security of user data collected in localStorage? 

The author is brainstorming ways to promote enhanced user privacy and, as of Feb 4th, 2021, believes that **the use of W3C's [Web Cryptography API](https://www.w3.org/TR/WebCryptoAPI/) coupled with [Google Firebase](https://firebase.google.com/) may be the first step towards the right direction.**   

### Isn't this a redundant reiteration of a generic Calendar application? 

In a way, CheckedIn is similar to conventional online calendars in that it is a platform on which users can keep a record of their schedules and store it on their electronic devices. 

However, the area whereby CheckedIn excels is the layer of minimalism that is applied to the existing calendar concept, resulting in enhanced and much simpler UX. 

**Compared to other Calendar applications whereby the user may get lost amidst the wide range of events that are stored on their respective platforms, CheckedIn stands out in its sole purpose of allowing users to record and easily visualise their CheckIn appointments, adding greater emphasis on contact name CheckIn due date**

### Would the author be open to adding a reminder functionality, perhaps in the form of push-notifications, etc?

With CheckedIn's guiding philosophies of user-centricity and minimalism, the author intends for the application to not have any notifying features that would remind the user at calculated intervals. 

**This is because the author believes the user should claim full agency with regards to their use of CheckedIn, not the other way round whereby the application dictates the user and make them become dependent to technology such as this one.** 

**While online and electronic in its very nature, CheckedIn can be approached the same way an offline medium would be used; the user picks up the platform when-- and only when-- they feel obliged to do so.** 

### Will CheckedIn become a native mobile application?

Given the heightened level of isolation and disconnectedness brought about by the ongoing pandemic, the author remains convinced that a designated platform like CheckedIn may serve a tangible purpose to users and be of practical use for many, not just for those within the author's network. 

With that said, the author is open to scaling the application upon peer feedback and back end configuration. 

**As of current, CheckedIn is being developed into a mobile-responsive application available on mobile browsers although the possibility of mobile-native development is yet to be decided.**

### How can I provide user-feedback and/or contribute?

As a BSD-3 licensed open source application, the author would be grateful for any feedback regarding CheckedIn's UX. Furthermore, any developer contribution is especially welcome given the author's growing (yet limited) knowledge of software development.

**Please direct all feedback via [email](mailto:jinyoungsjourney@gmail.com) and kindly submit a Pull Request for developer contribution opportunities.**   
