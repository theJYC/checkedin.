//Object constructor for 'Book'
class Book {
    constructor(title,author,pages,read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

const book1 = new Book("So Good They Can't Ignore You", "Cal Newport", "123", "not finished");

console.log(book1.title);

console.log(book1.info());

let myLibrary = [];

addBookToLibrary = () => {
    books = prompt("What book would you like to add to the Reading List?")
    for (i = 0; i < books.length; i++) {
        myLibrary += books;
    }
}

addBookToLibrary
//Prototypes are shareable objects with properties and methods
//so that you can access those methods within instances



