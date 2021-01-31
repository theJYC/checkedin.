//Object constructor for 'Book'
class Book {
    constructor(title,author,pages,isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    }
}

class Profile {
    constructor(firstName, lastName, checkInBy, priority) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial; // e.g. "T"
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
        this.priority = priority; // e.g. true/false (Y/N)
    }
    onSchedule() {
        return pass; // this function will calculate the time since last contact
    }
}

const fred = new Profile("Fredrick", "Thompson", "01/25/21", true);

console.log(fred.firstName);

console.log(fred.priority);

let myContacts = [];

//When "add contact" is pressed:
const addContactButton = document.getElementById("addContact");

addContactButton.addEventListener("click", (e) => {
    const target = e.target; // target attribute will return the specific button that is clicked
    if (target.classList.contains("add-contact")) {
        alert("you sure you want to add contact?")
    }
}


