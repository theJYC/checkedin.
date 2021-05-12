//a one-liner snippet to incorpate dayjs library
dayjs().format()
//a function that resets placholder text for modal popup
// (important feature with the update functionality in mind)

//Object constructor for profile to-be-submitted
class Profile {
    constructor(firstName, lastInitial, notes, checkInBy, checkInTime, daysLeft, checkedIn, randomId) {
        this.firstName = firstName; // e.g. "Fredrick"
        this.lastInitial = lastInitial; // e.g. "T."
        this.notes = notes; // e.g. working in taiwan. check in about fulbright cohort!
        this.checkInBy = checkInBy; // e.g. "01/22/21" (MM/DD/YY)
        this.checkInTime = checkInTime; // e.g. "3:00pm"
        this.daysLeft = daysLeft; // e.g. "3 days left"
        this.checkedIn = checkedIn; // e.g. boolean; default is false (pending) and toggled to true (complete)
        this.randomId = randomId; // e.g. "6ab811e529". this is the unique identifier for each created profile (and reference when updated)
    }
}

const resetModal = () => {
    document.getElementById("modaltitle").innerHTML = "new check-in";
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("notes-input").value = "";
    document.getElementById("check-in-by").value = "";
    document.getElementById("check-in-time").value = "09:00";
}
//a function that displays/hides modal popup
const toggleModal = () => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //"turning off" the classlist that hides the class
};

//eventlistener for when 'esc' is pressed; to close modalform:
document.addEventListener("keydown", e => {
    if(e.keyCode == 27) {
        if (!document.getElementById("submit").classList.contains("button--hidden")) {
            document.getElementById("submit").classList.toggle("button--hidden");
        }
        else if (!document.getElementById("update").classList.contains("button--hidden")) {
            document.getElementById("update").classList.toggle("button--hidden");
        }
        toggleModal();
    }
});

//eventlistener for when 'add contact' button is pressed
document.querySelector(".addContact").addEventListener("click", () => {
    //invoking resetModal() function is integral
    //since otherwise the form will be filled with [update] values of existing profilecard

    //display submit button (by removing button--hidden class)
    document.getElementById("submit").classList.toggle("button--hidden")
    resetModal();
    toggleModal();
});
//another eventlistener for when "×" (close) button inside the modal is clicked
document.querySelector("#close").addEventListener("click", () => {

    if (!document.getElementById("submit").classList.contains("button--hidden")) {
        document.getElementById("submit").classList.toggle("button--hidden");
    }

    if (!document.getElementById("update").classList.contains("button--hidden")) {
    document.getElementById("update").classList.toggle("button--hidden");
    }
    toggleModal();
    resetModal();
});
//a function that adds/removes display:hidden function of *prefilled* modal form
//for the purpose of updating profile:
const toggleUpdate = (item) => {
    document.querySelector(".modal") //selecting the modal element
    .classList.toggle("modal--hidden"); //call the classlist that hides the class
    document.getElementById("modaltitle").innerHTML = "edit check-in";


    //prefill the fields with the profile card values:
    console.log("profile to update:", item.randomId) // output is the specific Profile object

    document.getElementById("first-name").value = item.firstName;
    document.getElementById("last-name").value = item.lastInitial ? item.lastInitial[0] : "";
    //then, prefilling the notes text box with the notes (str format in localStorage)
    document.getElementById("notes-input").value = item.notes;
    //then, the date (stored as e.g. "2021-04-21", and time (e.g. "06:00"):
    document.getElementById("check-in-by").value = item.checkInBy;
    document.getElementById("check-in-time").value = item.checkInTime;

    //if update is submitted, reset the modal & delete the existing card (which can be found via randomId):
    document.querySelector("#update").addEventListener("click", (event) => {

    //this removes the existing profileCard from profilesList
    removeExistingProfile(item);
    event.preventDefault();
    addProfileToList();
    resetModal();
    toggleModal();

    //to hide "update" button from modal display:
    document.getElementById("update").classList.toggle("button--hidden");
    });
};

//separate function to run when update is clicked, to remove existing profileCard from profilesList
//based on its randomId

const removeExistingProfile = (item) => {
    console.log(item.randomId);

    const index = profilesList.findIndex(profile => profile.randomId === item.randomId);
    if (index > -1) {
        console.log("removed: ", item.randomId);
        profilesList.splice(index, 1);
    }
    else {
        console.log("failed to remove: ", item);
    }
};

//to make sure that once the [x] is clicked on updatemodal, the field values are reset.
document.querySelector("#close").addEventListener("click", resetModal);


//profilesList is an array that will at once be populated by user input
//and later be saved to localStorage
let profilesList = [];
//day.js is to be used in lieu JS's native Date() object for more accuracy in date calulations
//(see COMMENTS footnote)
const calculateDueDate = date => {
    //retrieve today's date in "YYYY-MM-DD" format
    let dateToday = dayjs();
    //retrieve the user-input check-in date in "YYYY-MM-DD" format
    let datePicked = dayjs(date);

    //diff. between current date & check-in date was calculated to its floating point value
    //instead of the integer value, since the former gives more accurate date calc.
    let inXDaysFloat = datePicked.diff(dateToday, "days", true);

    //e.g. 1.1234 days need to be converted to 2 day(s), not 1 day(s). therefore Math.ceil():
    let inXDays = Math.ceil(inXDaysFloat);

    if (inXDays == -1) {
        return `yesterday`
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
//initialising newProfile as an undefined variable on the global scope
//to be used locally in addProfileToList:
let newProfile;

// added post-crUd functionality integration! ---
//in order to best reference profile cards other than referencing via their indexes,
// (which was discovered to be problematic when the update functionality is involved
//  since the list will be dynamically changing; i.e. when the checkin profile is updated to a different date
//  which will change the order (i.e. change its index in the profilesList array)
//the function below generates a random hex string to give as id attribute to each profile card
//so that each profile card can be referenced more precisely when performing crUd algorithm:
const generateRandomId = () => {
    let output = '';
    //this is to create a 15-digit random hexadecimal string (10 digits so that id overlap btwn profiles is ~slim~)
    for (let i = 0; i < 10; i++) {
        output += (Math.floor(Math.random() * 16)).toString(16);
    }
    return output;
}
// -------
//grabbing input values from 'add contact' form:
const addProfileToList = () => {
    //firstname to be stored as a variable to be manipulated for formatting below
    let firstNameStr = document.getElementById("first-name").value;
    //firstname input to make sure formatted output is e.g. 'Firstname'
    this.firstName = firstNameStr[0].toUpperCase() + firstNameStr.substring(1).toLowerCase();
    //last initial input to be formatted to uppercase e.g. 'L'

    //stored as variable to check whether user has included a lastname or not
    //which will determine whether formatting is necessary or not
    let lastInitialStr = document.getElementById("last-name").value;
    //format the lastInitial from "c" to "C." if user inputs a lastInitial value
    if (lastInitialStr) {
        this.lastInitial = `${document.getElementById("last-name").value.toUpperCase()}.`
    //if user doesn't input a lastInitial, return empty str.
    } else {
        this.lastInitial = '';
    }
    //notes input will have no additional formatting; just plain string data e.g. 'sample note'
    this.notes = document.getElementById("notes-input").value;
    //checkInBy will also be displayed as is inputted (via calendar widget or manual entry) e.g. 'YYYY-MM-DD'
    this.checkInBy = document.getElementById("check-in-by").value;
    this.checkInTime = document.getElementById("check-in-time").value;
    this.randomId = generateRandomId();
    //set checkedIn default value to false (i.e. "pending")
    //and staged for 'click' eventlistener that will convert it "complete"
    this.checkedIn = false;
    //adding custom variable to count days left till assigned check-in date:
    this.daysLeft = `${calculateDueDate(this.checkInBy)}`;
    //newProfile to be created and populated with the grabbed user input
    newProfile = new Profile(firstName, lastInitial, notes, checkInBy, checkInTime, daysLeft, checkedIn, randomId);
    console.log("new profile:", newProfile);
    //newly constructed profile to populate the profilesList array defined above
    profilesList.push(newProfile);
    //log profilesList array with the user input pushed as last index.
    console.log(profilesList);
    saveToLocalStorage();
    render();
    form.reset();
}
// event listener to add profile to list when form is submitted
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (event) => {
    if (!document.getElementById("submit").classList.contains("button--hidden")) {
        document.getElementById("submit").classList.toggle("button--hidden");
    }
    //preventDefault prevents the form from its default activity; adding to the root url with form input queries.
    event.preventDefault();
    toggleModal();
    addProfileToList();
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
    //sorting by checkInDate (does not incorporate checkInTime, as of 03/02/2021)
    profilesList.sort(function (a,b) {
        if (a.checkInBy < b.checkInBy) {
            return -1;
        }
        else if (a.checkInBy > b.checkInBy) {
            return 1;
        }
        return 0;
    })
    for (i = 0; i < profilesList.length; i++) {
        createProfile(profilesList[i]);
    }
}
//createProfile function enables user input to be displayed as profile cards.
const createProfile = (item) => {
    const cardContainer = document.getElementById("card-container");
    const profileDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const dateTextDiv = document.createElement("div");
    const dateDiv = document.createElement("div");
    const timeDiv = document.createElement("div");
    const notesSpan = document.createElement("span");
    const daysLeftDiv = document.createElement("div");
    const btnWrapper = document.createElement("div");
    const updateBtn = document.createElement("button");
    const clearBtn = document.createElement("button");
    const checkedInWrapper = document.createElement("div");
    const checkedInBtn = document.createElement("button");
    //shaping the profile with .card & indexing each profile
    //if the contact is past-due on CheckedIn, paint the card container red!
    if ((dayjs(item.checkInBy).diff(dayjs(), "days", true)) <= -1) {
        profileDiv.classList.add("profile");
        profileDiv.classList.add("overdue");
        nameDiv.classList.add("name");
        nameDiv.classList.add("nameOverDue")
    } else {
        profileDiv.classList.add("profile");
        nameDiv.classList.add("name")
    }
    //populating the name div with user-input contact name
    nameDiv.textContent = `${item.firstName} ${item.lastInitial}`
    //indexing each contact for ease-of-reference
    profileDiv.setAttribute("id", profilesList.indexOf(item));
    profileDiv.appendChild(nameDiv)
    //then the dateText (a.k.a. "check-in by:" string)
    dateTextDiv.classList.add("datetext");
    dateTextDiv.textContent = "check in by:"
    profileDiv.appendChild(dateTextDiv);
    //next comes date
    dateDiv.classList.add("date");
    dateDiv.textContent = `${dayjs(item.checkInBy).format("MMM D")}`;
    profileDiv.appendChild(dateDiv);
    //next, the time of CheckIn
    timeDiv.classList.add("time");

    //firstly, checking that item.checkInTime input exists;
    //this is the debug solution to item.checkInTime.slice() method throwing an error on undefined
    //when no profile has been added to localstorage.
    if (!item.checkInTime) {
        return;
    }
    //formatting the time input raw value (e.g. "23:30")
    //to more palatable format (e.g. "11:30pm")
    let checkInHourStr = item.checkInTime.slice(0,2); //grabbing hour (00 to 23)
    //converting hour to int in order to perform int calculations for am/pm determination
    let checkInHourInt = parseInt(checkInHourStr);
    let checkInMinutes = item.checkInTime.slice(3); // grabbing minutes (00 to 59)
    let formattedTime = "";

    if (checkInHourInt == 0) {
        checkInHourInt = 12;
        formattedTime = `${checkInHourInt}:${checkInMinutes}am`;
    }
    else if (checkInHourInt < 13) {
        checkInHourInt.toString();
        formattedTime = `${checkInHourInt}:${checkInMinutes}am`;
    } else {
        checkInHourInt -= 12; //format "23" to "11"
        formattedTime = `${checkInHourInt}:${checkInMinutes}pm`;
    }
    timeDiv.textContent = formattedTime;
    profileDiv.appendChild(timeDiv);
    //next, display text for daysLeft
    daysLeftDiv.classList.add("daysLeft");
    daysLeftDiv.textContent = calculateDueDate(item.checkInBy);
    profileDiv.appendChild(daysLeftDiv);
    //next, add the notes display ('↠ notes ↞', with content available on mouseover)
    notesSpan.classList.add("notes");
    notesSpan.textContent = "↠note↞";
    if (item.notes) {
        //setting the aria-label attribute will display note text when mouse-hovered
        notesSpan.setAttribute("aria-label", item.notes);
    }
    else {
        notesSpan.setAttribute("aria-label", "n/a");
    }
    profileDiv.appendChild(notesSpan);
    //add button wrapper to encapsulate the two btns on top and have them aligned side-by-side
    btnWrapper.classList.add("btnwrapper");
    profileDiv.appendChild(btnWrapper);
    //next, format the updateBtn; this will be to the left of clearBtn
    updateBtn.classList.add("updatebtn");
    updateBtn.textContent = "update";
    btnWrapper.appendChild(updateBtn);
    //format the clearBtn
    clearBtn.classList.add("clearbtn");
    clearBtn.textContent = "clear";
    btnWrapper.appendChild(clearBtn);
    //checkedInBtn is going to be double width of other two btns,
    //so will be enclosed within a separate wrapper:
    checkedInWrapper.classList.add("checkedinwrapper");
    profileDiv.appendChild(checkedInWrapper);
    //then, format the checkedInBtn & append to its own wrapper
    checkedInBtn.classList.add("checkedinbtn");
    if (!item.checkedIn) {
        checkedInBtn.textContent = "pending"
        checkedInBtn.style.backgroundColor = "#768a80";
    } else {
        checkedInBtn.textContent = "complete";
        checkedInBtn.style.backgroundColor = "#607bbd";
    }
    checkedInWrapper.appendChild(checkedInBtn);
    //finally, adding the fully-done profileDiv to the list (#card-container)
    cardContainer.appendChild(profileDiv);
    //eventlistener for when update button is pressed
    updateBtn.addEventListener("click", () => {

        //displaying the updateform button (selectively, rather than also displaying "update" form btn):
        if (document.getElementById("update").classList.contains("button--hidden")) {
            document.getElementById("update").classList.toggle("button--hidden");
        }
        //arg (item) for toggleUpdate to be the specific profile object created via createProfile():
        toggleUpdate(item);
    })
    //eventlistener for when clear button is pressed
    clearBtn.addEventListener("click", () => {
        profilesList.splice(profilesList.indexOf(item),1);
        saveToLocalStorage();
        render();
    });
    //event listener for when checked in button is pressed
    checkedInBtn.addEventListener("click", () => {
        //when green pending btn is clicked, display the reverse state-- blue 'complete'
        item.checkedIn = !item.checkedIn;
        //making sure to save the new reversed logic to localStorage
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
