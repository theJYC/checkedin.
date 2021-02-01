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

const fred = new Profile("Fredrick", "Thompson", "01/25/21", true);

console.log(fred.firstName);

console.log(fred.checkInBy);


//first creating a function that adds/removes display: hidden function of modal div
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};


document.querySelector(".addContact")
.addEventListener("click", toggleModal);

document.querySelector("#submit")
.addEventListener("click", (e) => {
    event.preventDefault(); //this saves the user input into the input box;
    toggleModal()
});

document.querySelector("#close")
.addEventListener("click", toggleModal);
