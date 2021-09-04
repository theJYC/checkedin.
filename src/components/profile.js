/*
    this module contains all the logic pertaining to the constructing the Profile object,
    which serves as a template for each recorded form submission.
    upon construction, each Profile object will be saved as a contact (which lives in localStorage)
*/

//a one-liner snippet to incorpate dayjs library
dayjs().format()

//constructor for every new Profile object (which is to be stored in profilesList array)
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

    //randomId is to be used to reference existing profileCard for update operation
    this.randomId = generateRandomId();

    //set checkedIn default value to false (i.e. "pending")
    //and staged for 'click' eventlistener that will convert it "complete"
    this.checkedIn = false;
    //n.b. ^this means that when "updating" an exisiting profile, even if the existing profile has been "complete",
    //the updated profilecard will show "pending".

    //this is a bug but a trivial one, since majority of use cases for "update" is prior to the check-in.
    //i.e. very unlikely that the user will want to update a profilecard if that check-in has been completed.

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

//profilesList is an array that will at once be populated by user input
//and later be saved to localStorage
let profilesList = [];

//day.js is to be used in lieu JS's native Date() object for more accuracy in date calulations
//(see: https://www.youtube.com/watch?v=-5wpm-gesOY)
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

    if (inXDays == -1) return `yesterday`
    else if (inXDays == 0) return "today"
    else if (inXDays < 0) return `${inXDays * -1} days ago`
    else if (inXDays == 1) return "tomorrow"
    else return `in ${inXDays} days`
}

const saveToLocalStorage = () => {
    localStorage.setItem(`profilesList`, JSON.stringify(profilesList));
}

//rendering the created profile objects onto the browser UI,
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
    });

    for (i = 0; i < profilesList.length; i++) {
        createProfile(profilesList[i]);
    };
};




//ensure all necessary things are included here!!
module.exports = Profile, addProfileToList, profilesList, calculateDueDate, saveToLocalStorage, render,
