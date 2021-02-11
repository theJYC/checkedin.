# CheckedIn

<a href="https://jinyoungch0i.github.io/CheckedIn/">
    <img src="misc/checkedin.gif" alt='checkedIn dynamic demo' width="500">
</a>

#### Technologies: HTML, CSS, Object-Oriented JavaScript, Web APIs (DOM, Web Storage)

CheckedIn is an open source, browser-based CRUD application providing users with a minimalistic platform to manage their contacts and be reminded of when to get in touch with others. 

[Live Demo](https://jinyoungch0i.github.io/CheckedIn/) & [Source Code](https://github.com/jinyoungch0i/CheckedIn)

## FAQ

### Why last initial, instead of last name? 

The currently deployed application is an MVP and functions entirely on the front end, through the use of the Web Storage API.

This means that all of the CRUD *(Create, Read, Update, and Delete)* activity is stored within localStorage, which is inherently not as secure as a designated server-side DB. 

The author believes that the use of localStorage in this manner was a strategic decision that offers a great security trade-off for speedy deployment and rapid prototyping. 

**Last initial was used, in lieu of last name, in order to provide a layer of anonymity for the user given the inherent security risk with localStorage.**

### What could be done to bolster the security of user data collected in localStorage? 

The author is brainstorming ways to promote enhanced user privacy and, as of Feb 4th, 2021, believes that **the use of W3C's [Web Cryptography API](https://www.w3.org/TR/WebCryptoAPI/) coupled with [Google Firebase](https://firebase.google.com/) may be the first step towards the right direction.**   

### Isn't this a redundant reiteration of a generic Calendar application? 

In a way, CheckedIn is similar to other conventional online calendars in that it is a platform on which users can keep a record of their schedules and store it on their electronic devices. 

However, the area whereby CheckedIn excels is the layer of minimalism that is applied to the existing online calendar concept, resulting in enhanced usability and functionality. 

**Whereas other Calendar applications allow users to input and review _all_ types of events to the platform, CheckedIn's competitive edge is its simple purpose of being the designated, one-stop platform to keep up with human connections (a singular category) through substantially simpler usability.**

### Would the author be open to adding a reminder functionality, perhaps in the form of push-notifications, etc?

With CheckedIn's guiding philosophies of user-centricity and minimalism, the author intends for the application to not have any notifying features that would remind the user at calculated intervals. 

**This is because the author believes the user should claim full agency with regards to their use of CheckedIn, not the other way round whereby the application dictates the user and make them dependant to technology.** 

**While online and electronic in its very nature, CheckedIn can be approached the same way an offline medium would be used; the user picks up the platform only when they feel obliged to do so.** 

### Will CheckedIn become a native mobile application?

Given the heightened level of isolation and disconnectedness brought about by the ongoing pandemic, the author remains convinced that a designated platform like CheckedIn may serve a tangible purpose to users and be of practical use for many, not just for those within the author's network. 

With that said, the author is open to scaling the application upon peer feedback and back end configuration. 

**As of current, CheckedIn is being developed into a mobile-responsive application available on mobile browsers (albeit it is not being planned to be scaled for native mobile platforms).**

### How can I provide user-feedback and/or contribute?

As a BSD-3 licensed open source application, the author will be grateful for any feedback regarding CheckedIn's UX (User Experience). Furthermore, any developer contribution is especially welcome given the author's growing (yet limited) knowledge of software development.

**Please direct all feedback via [email](mailto:jinyoungsjourney@gmail.com) and kindly submit a Pull Request for contribution opportunities.**   
