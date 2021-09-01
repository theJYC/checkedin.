/*
    this module contains all the logic pertaining to the constructing the Profile object,
    which serves as a template for each recorded form submission.
    upon construction, each Profile object will be saved as a contact (which lives in localStorage)
*/

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
