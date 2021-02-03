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


const addCard = (e) => {
    let contact = {
        firstInput : document.getElementById("first-name").value,
        lastInput : document.getElementById("last-name").value,
        dateInput : document.getElementById("check-in-by").value
    };
    //adds the inputted contact info to an array, in object format.
    contacts.push(contact);
    document.querySelector("form").reset();
}



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
