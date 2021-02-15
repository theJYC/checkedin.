//a one-liner snippet to incorpate dayjs library
dayjs().format()

//a function that adds/removes display: hidden function of modal
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
};

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", toggleModal);

//another eventlistener for when "×" (close) button inside the modal is clicked
document.querySelector("#close").addEventListener("click", toggleModal);

//Object constructor for profile to-be-submitted
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

//profilesList is an array that will at once be populated by user input and be saved to localStorage
let profilesList = [
    //two manually entered input samples for debugging purposes
    {
        firstName : "Fredrick",
        lastInitial : "T.",
        notes : "promised to check-in more regularly while he's abroad",
        checkInBy : "2021-03-01",
        checkIn : false,
        daysLeft : "17 days left"
    },
    {
        firstName : "Ryan",
        lastInitial : "C.",
        notes : "routine family check-in",
        checkInBy : "2021-05-03",
        checkIn : false,
        daysLeft : "81 days left"
    },

];
let newProfile;

//day.js is to be used in lieu JS's native Date() object for more accuracy in date calulations
//
//(see COMMENTS below)

const calculateDueDate = date => {

    //retrieve today's date in "2021-02-05" format
    let dateToday = dayjs();
    let datePicked = dayjs(date);
    console.log("dayjs is working with no error");
    let inXDaysFloat = datePicked.diff(dateToday, "days", true);
    let inXDaysInt = datePicked.diff(dateToday,"days");

    //for debugging purposes
    console.log(`${inXDaysFloat} days in float`)

    //e.g. 1.1234 days need to be converted to 2 day(s), not 1 day(s). therefore Math.ceil():
    let inXDays = Math.ceil(inXDaysFloat);

    if (inXDays == -1) {
        return `1 day ago`
    }
    else if (inXDays == 0) {
        return "today"
    }
    else if (inXDays < 0) {
        return `${inXDays * -1} days ago`
    }
    else if (inXDays == 1) {
        return "tomorrow"
    }
    else {
        return `in ${inXDays} days`;
    }
}

//grabbing input values from 'add contact' form:
const addProfileToList = () => {
    //consoling out to debug function
    console.log("submitting new profile...");

    let firstNameStr = document.getElementById("first-name").value;

    this.firstName = firstNameStr[0].toUpperCase() + firstNameStr.substring(1);
    this.lastInitial = `${document.getElementById("last-name").value.toUpperCase()}.`;
    this.notes = document.getElementById("notes-input").value;
    this.checkInBy = document.getElementById("check-in-by").value;

    //set checkedIn default value to false (i.e. "pending" upon registration)
    this.checkedIn = false;
    //adding custom variable to count days left till assigned check-in date:
    this.daysLeft = `${calculateDueDate(this.checkInBy)}`;

    newProfile = new Profile(firstName, lastInitial, notes, checkInBy, daysLeft, checkedIn);
    console.log(newProfile);
    console.log(profilesList);

    //newly constructed profile to populate the profilesList array defined above
    profilesList.push(newProfile);

    saveToLocalStorage();
    console.log("saved to local storage");
    render();
    form.reset();

    //final console.log to make sure function is working from top to bottom
    console.log("profile submitted successfully")
}

// event listener to add profile to list when form is submitted
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProfileToList();
    toggleModal();
});


const saveToLocalStorage = () => {
    localStorage.setItem(`profilesList`, JSON.stringify(profilesList));
}

//preventing user from selecting past date on date input (further info. in COMMENTS)
const today = new Date().toISOString().split("T")[0];
document.getElementsByName("checkinby")[0].setAttribute("min", today);


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
    const notesSpan = document.createElement("span");
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
    dateTextDiv.textContent = "check in by:"
    profileDiv.appendChild(dateTextDiv);
    //next comes date
    dateDiv.classList.add("date");
    dateDiv.textContent = `${dayjs(item.checkInBy).format("MMM D")}`;
    profileDiv.appendChild(dateDiv);

    //next, display text for daysLeft
    daysLeftDiv.classList.add("daysLeft");
    daysLeftDiv.textContent = item.daysLeft;
    profileDiv.appendChild(daysLeftDiv);

    //next, add the notes (it'll be underlined 'notes' with content available on mouseover)
    notesSpan.classList.add("notes");
    notesSpan.textContent = "↠ notes ↞";
    if (item.notes) {
        notesSpan.setAttribute("aria-label", item.notes);
    }
    else {
        notesSpan.setAttribute("aria-label", "n/a");
    }
    profileDiv.appendChild(notesSpan);

    //add button wrapper to encapsulate the two btns and have them aligned side-by-side
    btnWrapper.classList.add("btnwrapper");
    profileDiv.appendChild(btnWrapper);

    //next, format the checkedInBtn
    checkedInBtn.classList.add("checkedinbtn");
    if (!item.checkedIn) {
        checkedInBtn.textContent = "pending"
        checkedInBtn.style.backgroundColor = "#768a80";
    } else {
        checkedInBtn.textContent = "complete";
        checkedInBtn.style.backgroundColor = "#607bbd";
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
    if(!localStorage.Profiles) {
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


/* DEBUG LIST (IN ORDER OF PRIORITY)

-with regards to diffInTime, the resulting number of days is rounding up,
and is not entirely accurate given the

*/
