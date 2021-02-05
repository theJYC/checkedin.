//Object constructor for 'Book'

class Profile {
    constructor(firstName, lastInitial, notes, checkInBy, daysLeft) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial + "."; // e.g. "T."
        this.notes = notes; // e.g. working in taiwan. check in about fulbright cohort!
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
        this.daysLeft = daysLeft // e.g. "3 days left"
    }
}

let profilesList = [];

const saveToLocalStorage = () => localStorage.setItem("profilesList", JSON.stringify(profilesList));

//grabbing input values from 'add contact' form:
const addProfileToList = () => {

    let firstName = document.getElementById("first-name").value;
    let lastInitial = document.getElementById("last-name").value;
    let notes = document.getElementById("notes-input").value;
    let checkInBy = document.getElementById("check-in-by").value;

    //adding custom variable to count daysLeft till assigned checkin date:
    let daysLeft = `${calculateDueDate(checkInBy)} day(s) left`;

    newProfile = new Profile(firstName, lastInitial, notes, checkInBy, daysLeft);
    console.log(newProfile);
    console.log(profilesList);
    profilesList.push(newProfile);

    saveToLocalStorage();
    toggleModal();

}

// event listener to add profile to list when form is submitted
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addProfileToList();
});

//N.B. momentsjs should be further looked into for more accurate days left count (see COMMENTS below)
const calculateDueDate = (date) => {

    //retrieve today's date in "2021-02-05" format
    let dateToday = new Date().toISOString().slice(0,10);
    let diffInTime = new Date(date) - new Date(dateToday);

    let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    return diffInDays;
}

// //snippet saved for later:
// //adds the inputted contact info to an array, in object format.
// contacts.push(contact);
// document.querySelector("form").reset();

//creating the checkin cards when a Profile is saved in localStorage
//i.e. if Profile item exists in localStorage
if (localStorage.getItem("profilesList") !== null) {
    const cardContainer = document.querySelector("#card-container");
    const contactCard = document.createElement("div");

    //shaping the contact card with .card
    contactCard.classList.add("card");

    //shaping the firstName + lastName display
    const cardName = document.createElement("div");
    cardName.classList.add("cardname");

    //John Doe to be replaced with `${firstName} ${lastInitial}`
    //when i figure out how to successfully get input to store in localStorage
    cardName.textContent = `Jin Young C.`

    //staged to the card!
    contactCard.appendChild(cardName);

    //next, add the notes
    const cardNotes = document.createElement("div");
    cardNotes.classList.add("cardnotes")

    //finally, adding the fully-done card to the list (#card-container)
    cardContainer.appendChild(contactCard);


}


//
//DOM work related to modal window & modal form//
//

//a function that adds/removes display: hidden function of modal div
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", toggleModal);

document.querySelector("#close")
.addEventListener("click", toggleModal);

//preventing user from selecting past date on date input (further info. in COMMENTS)
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);

// placeholder to define a daysLeft function to take in date as argument,
// and compares it with the current date of the browser and spits out X days left.
// needs to follow daysLeft(date) syntax since it's going to be called in getProfileFromInput;

//
//End of DOM work related to modal window & modal form//
//








/* COMMENTS

-Preventing past date input function was derived from StackOverFlow
and poses two immediate issues:
    1) solution only works for calendar popup, but user can still manually type in past date in text form.
        a) there will need to be an alert (etc.) function that prevents user from submitting the form entirely,
           if past date is typed in.
    2) allegedly the solution only works for Desktop, and not mobile.

-daysLeft might not work with daylights savings;
    1) StackOverFlow shows that moments.js is a great workaround for datehandling in JavaScript.
        a) moments.js is not explored in this app since moments.js-- regardless of its size (only 5KB)
           -- is nonetheless a dependency that I did not want to introduce into this application.

*/
