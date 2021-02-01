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

let myContacts = [];

//When "add contact" is pressed:
// const addContactButton = document.getElementById("contact");

// addContactButton.addEventListener("click", (e) => {
//     const target = e.target; // target attribute will return the specific button that is clicked
//     if (target.classList.contains("addContact")) {
//         alert("you sure you want to add contact?")
//     }
// });


