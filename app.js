//a function that adds/removes display: hidden function of modal
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", toggleModal);

//when "X" (close) button inside the modal is clicked
document.querySelector("#close").addEventListener("click", toggleModal);

const $firstName = document.querySelector("#first-name");
const $lastInitial = document.querySelector("#last-name");
const $notes = document.querySelector("#notes-input");
const $checkInBy = document.querySelector("#check-in-by");

//Object constructor for 'Book'

class Profile {
    constructor(firstName, lastInitial, notes, checkInBy, daysLeft, checkedIn) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial; // e.g. "T."
        this.notes = notes; // e.g. working in taiwan. check in about fulbright cohort!
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
        this.daysLeft = daysLeft; // e.g. "3 days left"
        this.checkedIn = checkedIn;
    }
}

let profilesList = [
    //populate with sample profile for debugging purposes
    {
        firstName : "Jin Young",
        lastInitial : "C.",
        notes : "this guy fucks",
        checkInBy : "03-28-2021",
        checkIn : false,
        daysLeft : "51 DAY(S) LEFT"
    },
    {
        firstName : "Varun",
        lastInitial : "G.",
        notes : "currently working in Dallas.",
        checkInBy : "02-08-2021",
        checkIn : false,
        daysLeft : "3 DAY(S) LEFT"
    },
    {
        firstName : "Fredrick",
        lastInitial : "T.",
        notes : "currently doing fulbright in taiwan.",
        checkInBy : "03-01-2021",
        checkIn : false,
        daysLeft : "24 DAY(S) LEFT"
    },

    {
        firstName : "Jim",
        lastInitial : "T.",
        notes : "routine roommate check-in",
        checkInBy : "05-03-2021",
        checkIn : false,
        daysLeft : "75 DAY(S) LEFT"
    },

];
let newProfile;

//grabbing input values from 'add contact' form:
const addProfileToList = () => {

    e.preventDefault();
    console.log("submitted new profile")
    toggleModal();

    this.firstName = document.getElementById("").value;
    this.lastInitial = `${document.getElementById("").value}.`;
    this.notes = document.getElementById("").value;
    this.checkInBy = document.getElementById("").value;

    //set checkedIn default value to false (to be used later when profile submitted)
    this.checkedIn = false;
    //adding custom variable to count daysLeft till assigned checkin date:
    this.daysLeft = `${calculateDueDate(this.checkInBy)} DAY(S) LEFT`;

    newProfile = new Profile(firstName, lastInitial, notes, checkInBy, daysLeft, checkedIn);
    console.log(newProfile);
    console.log(profilesList);
    profilesList.push(newProfile);

    saveToLocalStorage();
    render();
    form.reset();
}

// event listener to add profile to list when form is submitted
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", addProfileToList);


const saveToLocalStorage = () => {
    localStorage.setItem(`profilesList`, JSON.stringify(profilesList));
}

saveToLocalStorage();

//preventing user from selecting past date on date input (further info. in COMMENTS)
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("checkinby")[0].setAttribute("min", today);

//N.B. momentsjs should be further looked into for more accurate days left count (see COMMENTS below)
const calculateDueDate = (date) => {

    //retrieve today's date in "2021-02-05" format
    let dateToday = new Date().toISOString().slice(0,10);
    let diffInTime = new Date(date) - new Date(dateToday);

    let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    return diffInDays;
}

const render = () => {
    const cardContainer = document.getElementById("card-container");
    const profiles = document.querySelectorAll(".profile");

    profiles.forEach(profile => cardContainer.removeChild(profile));

    for (i = 0; i < profilesList.length; i++) {
        createProfile(profilesList[i]);
    }
}

//the nitty-gritty in between when profile is submitted and card is displayed on homescreen.
const createProfile = (item) => {
    const cardContainer = document.getElementById("card-container");
    const profileDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const dateTextDiv = document.createElement("div");
    const dateDiv = document.createElement("div");
    const notesDiv = document.createElement("span");
    const daysLeftDiv = document.createElement("div");
    const btnWrapper = document.createElement("div");
    const checkedInBtn = document.createElement("button");
    const clearBtn = document.createElement("button");

    //shaping the profile with .card & indexing each profile
    profileDiv.classList.add("profile");
    profileDiv.setAttribute("id", profilesList.indexOf(item));

    //shaping the firstName + lastName display & appending it to profileDiv
    nameDiv.classList.add("name");
    nameDiv.textContent = `${item.firstName} ${item.lastInitial}`
    profileDiv.appendChild(nameDiv)

    //then the dateText (a.k.a. "check-in by:" string)
    dateTextDiv.classList.add("datetext");
    dateTextDiv.textContent = "check-in by:"
    profileDiv.appendChild(dateTextDiv);
    //next comes date
    dateDiv.classList.add("date");
    dateDiv.textContent = `${item.checkInBy}`;
    profileDiv.appendChild(dateDiv);

    //next, display text for daysLeft
    daysLeftDiv.classList.add("daysLeft");
    daysLeftDiv.textContent = item.daysLeft;
    profileDiv.appendChild(daysLeftDiv);

    //next, add the notes (it'll be underlined 'notes' with content available on mouseover)
    notesDiv.classList.add("notes");
    notesDiv.textContent = `notes`;
    notesDiv.setAttribute("aria-label", item.notes);
    profileDiv.appendChild(notesDiv);

    btnWrapper.classList.add("btnwrapper");
    profileDiv.appendChild(btnWrapper);

    //next, format the checkedInBtn
    checkedInBtn.classList.add("checkedinbtn");
    if (!item.checkedIn) {
        checkedInBtn.textContent = "pending"
        checkedInBtn.style.backgroundColor = "#768a80";
    } else {
        checkedInBtn.textContent = "complete";
        checkedInBtn.style.backgroundColor = "#5e6d91";
    }
    btnWrapper.appendChild(checkedInBtn);

    //lastly, format the clearBtn
    clearBtn.classList.add("clearbtn");
    clearBtn.textContent = "clear";
    clearBtn.setAttribute("id", "clearBtn")
    btnWrapper.appendChild(clearBtn);


    //finally, adding the fully-done profileDiv to the list (#card-container)
    cardContainer.appendChild(profileDiv);

    //eventlistener for when clear button is pressed
    clearBtn.addEventListener("click", () => {
        profilesList.splice(profilesList.indexOf(item),1);
        saveToLocalStorage();
        render();
    });

    //event listener for when checked in button is pressed
    checkedInBtn.addEventListener("click", () => {
        item.checkedIn = !item.checkedIn;
        saveToLocalStorage();
        render();
    });
};


const restore = () => {
    if(!localStorage.profilesList) {
        render();
    }
    else {
        //get profilesList from localStorage in order to feed render() function with new profiles
        let objects = localStorage.getItem("profilesList");
        objects = JSON.parse(objects);
        profilesList = objects;
        render();
    }
}

restore();




/* COMMENTS

-Preventing past date input function was derived from StackOverFlow
and poses two immediate issues:
    1) solution only works for calendar popup, but user can still manually type in past date in text form.
        a) there will need to be an alert (etc.) function that prevents user from submitting the form entirely,
           if past date is typed in.
    2) allegedly the solution only works for Desktop, and not mobile.

-daysLeft might not work with daylights savings;
    1) StackOverFlow shows that moments.js is a great workaround for datehandling in JavaScript.
        a) moments.js is not explored in this app since moments.js-- regardless of its size (only 5KB)
           -- is nonetheless a dependency that I did not want to introduce into this application.

*/
