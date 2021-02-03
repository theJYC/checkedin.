//Object constructor for 'Book'

class Profile {
    constructor(
        firstName = "Unknown",
        lastInitial = "Unknown",
        checkInBy = "0",
    ) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial; // e.g. "T"
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
    }
}

//created an array to be populated upon user 'add contact' submission
let contacts = [];

const fred = new Profile("Fredrick", "Thompson", "01/25/21");

console.log(fred.firstName);

console.log(fred.checkInBy);

console.log("-----")


//first creating a function that adds/removes display: hidden function of modal div
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", toggleModal);


//preventing user from selecting past date on date input
//found on StackOverFlow; solution does not work on mobile.
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);



//fetching the input values from 'add contact' form:
const getProfilefromInput = () => {
    const firstInput = document.getElementById("first-name").value;
    const lastInput = document.getElementById("last-name").value;
    const dateInput = document.getElementById("check-in-by").value;

    return new Profile(firstName, lastInitial, checkInBy)

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
