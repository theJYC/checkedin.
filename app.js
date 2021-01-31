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

class profile {
    constructor(firstName, lastName, lastCheckedIn, priority) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.lastCheckedIn = lastCheckedIn; // MM/DD/YY
        this.timeSinceLastCheckIn = timeSinceLastCheckIn;
        this.priority = priority;
    }
}

const book1 = new Book("So Good They Can't Ignore You", "Cal Newport", "123", "not finished");

console.log(book1.title);

console.log(book1.info());

let myContacts = [];

//Prototypes are shareable objects with properties and methods
//so that you can access those methods within instances



