//Object constructor for 'Book'

class Profile {
    constructor(
        firstName = "Unknown",
        lastName = "Unknown",
        notes = "Unknown",
        checkInBy = "0",
    ) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastName = lastName; // e.g. "T"
        this.notes = notes;
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
    }
}

//created an array to be populated upon user 'add contact' submission
let contacts = [];

// Sample Profile: Fredrick Thompson
const fred = new Profile("Fredrick", "Thompson", "fulbright, taiwan", "06/07/21");

//testing sample Profile:
console.log("-----")
console.log(fred.firstName);
console.log(fred.lastName);
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


//grabbing input values from 'add contact' form:
const getProfilefromInput = () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const notes = document.getElementById("notes-input").value;
    const checkInBy = document.getElementById("check-in-by").value;

    return new Profile(firstName, lastName, notes, checkInBy);

}

// //snippet saved for later:
// //adds the inputted contact info to an array, in object format.
// contacts.push(contact);
// document.querySelector("form").reset();

document.querySelector("#submit")
.addEventListener("click", (e) => {
    //if e is present:
    e.preventDefault(); //this prevents the browser from reloading by default when submit button is clicked
    toggleModal();
    addCard();
    //write out the function that i would need by name (saveUserSubmission) saveUserSubmission
});

document.querySelector("#close")
.addEventListener("click", toggleModal);

//breaking down tasks into one actionable steps:


/* COMMENTS

-Preventing past date input function was derived from StackOverFlow
and poses two immediate issues:
    1) solution only works for calendar popup, but user can still manually type in past date in text form.
        a) there will need to be an alert (etc.) function that prevents user from submitting the form entirely,
           if past date is typed in.
    2) allegedly the solution only works for Desktop, and not mobile.

*/
