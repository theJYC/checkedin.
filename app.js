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
    onSchedule() {
        return pass; // this function will calculate the time since last contact
    }
}

//created an array to be populated upon user 'add contact' submission
let profiles = [];

const fred = new Profile("Fredrick", "Thompson", "01/25/21", true);

console.log(fred.firstName);

console.log(fred.checkInBy);

console.log("-----")

let profile = {
        firstInput : document.getElementById("first-name").value,
        lastInput : document.getElementById("last-name").value,
        dateInput : document.getElementById("check-in-by").value
    };


//first creating a function that adds/removes display: hidden function of modal div
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};


document.querySelector(".addContact")
.addEventListener("click", toggleModal);


document.querySelector("#submit")
.addEventListener("click", (e) => {
    console.log(profile.firstInput);
    console.log(profile.lastInput);
    console.log(profile.dateInput);
    event.preventDefault(); //this prevents the browser from reloading by default when submit button is clicked
    toggleModal()
});

document.querySelector("#close")
.addEventListener("click", toggleModal);

