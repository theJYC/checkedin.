//Object constructor for 'Book'

class Profile {
    constructor(
        firstName = "Unknown",
        lastInitial = "Unknown",
        notes = "Unknown",
        checkInBy = "0",
    ) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial; // e.g. "T"
        this.notes = notes;
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
    }
}

//created an array to be populated upon user 'add contact' submission
let profilesList = [];

// Sample Profile: Fredrick Thompson
const fred = new Profile("Fredrick", "T", "fulbright, taiwan", "06/07/21");

profilesList.push(fred);
//testing sample Profile:
console.log("-----")
console.log(fred.firstName);
console.log(fred.lastInitial);
console.log(fred.notes);
console.log(fred.checkInBy);
console.log("-----")


//first creating a function that adds/removes display: hidden function of modal div
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", toggleModal);


//preventing user from selecting past date on date input (further info. in COMMENTS)
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);

// placeholder to define a daysLeft function to take in date as argument,
// and compares it with the current date of the browser and spits out X days left.
// needs to follow daysLeft(date) syntax since it's going to be called in getProfileFromInput;



//grabbing input values from 'add contact' form:
const getProfileFromInput = () => {

    const firstName = document.getElementById("first-name").value;
    const lastInitial = document.getElementById("last-name").value;
    const notes = document.getElementById("notes-input").value;
    const checkInBy = document.getElementById("check-in-by").value;
    // placeholder to add the X daysLeft variable:
    // const daysLeft = daysLeft(checkInBy)

    const newProfile = new Profile(firstName, lastInitial, notes, checkInBy);
    //localStorage doesn't store objects well--
    // objects first need to be serialized (converted to str) to be stored correctly.
    const newProfileSerialized = JSON.stringify(newProfile);
    console.log(newProfileSerialized)

    //this saves the new profile into localStorage
    return localStorage.setItem("CheckInProfile", newProfileSerialized)

}

// //snippet saved for later:
// //adds the inputted contact info to an array, in object format.
// contacts.push(contact);
// document.querySelector("form").reset();

document.querySelector("#submit")
.addEventListener("click", (e) => {
    //if e is present:
    e.preventDefault(); //this prevents the browser from reloading by default when submit button is clicked
    getProfileFromInput();
    toggleModal();


});

document.querySelector("#close")
.addEventListener("click", toggleModal);

//creating the checkin cards when a Profile is saved in localStorage
//i.e. if Profile item exists in localStorage
if (localStorage.getItem("CheckInProfile") !== null) {
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







/* COMMENTS

-Preventing past date input function was derived from StackOverFlow
and poses two immediate issues:
    1) solution only works for calendar popup, but user can still manually type in past date in text form.
        a) there will need to be an alert (etc.) function that prevents user from submitting the form entirely,
           if past date is typed in.
    2) allegedly the solution only works for Desktop, and not mobile.

-lastInitial was used instead of lastName.
    1) this was very much a deliberate choice, knowing that localStorage is not the most secure form of storage
        a) since the project is currently just MVP, it will continue to take in lastInitial
           until project is fully loaded and becomes full-stack-- where lastName is more a viable data to be stored
           since the storage will be in a server-side database (a lot more secure than browserbased localStorage.

*/
