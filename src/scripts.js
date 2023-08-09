// IMPORTS:
import './css/styles.css';
const dayjs = require('dayjs');

import {
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
    getNewTripDetails,
} from './trips-data';

import {
    checkUserLogin
} from './user-data'

import {
    promises,
    fetchTripData
} from './api-calls'

import {
// LOGIN
    removeLoginForm,
    displayMenu,
    displayTravelerName,
// LOGIN ERRORS
    displayEmptyInputError, 
    displayIncorrectPasswordError,
    displayIncorrectUsernameError,

// FORM ERRORS 
    displayFutureDateError,
    displayValidDateError,
    displayValidDurationError,
    displayValidTravelersError,

// DISPLAY ON DOM
    displayRequestTripForm,
    displayDestinations,
    displayPastTripsDashboard,
    displayPendingTrips,
    displayDestinationsFromPastTrips,
    displayDestinationsFromPendingTrips,
    displayDestinationsFromMenu,
// RENDER INNER HTML
    renderNewTrip,
    renderDestinationImage,
// RETURN HOME
    returnHomeFromPast,
    returnHomeFromDestinations,
    returnHomeFromRequestForm,
    returnHomeFromPending,
    returnHomeFromNewTrip
} from './domUpdates';

// GLOBAL VARIABLES:

var today = dayjs().format("YYYY/MM/DD")

var currentTravelerId;
var currentTravelersTrips;
var currentTravelersDestinations;
var currentTravelerTotalTripInfo;

var allTravelers;
var allDestinations;
var allTrips;
var newDestinationId;
var newTripData;

// QUERY SELECTORS 

var usernameInput = document.querySelector('#username-input')
var passwordInput = document.querySelector('#password-input')
var loginBtn = document.querySelector('.login-btn');

var returnHomeFromPastBtn = document.querySelector('.return-home-from-past-btn')
var returnHomeFromDestinationsBtn = document.querySelector('.exit-destination-btn');
var returnHomeFromForm = document.querySelector('.return-home-from-form-btn');
var returnHomeFromPendingBtn = document.querySelector('.return-home-from-pending-btn')
var displayNewTripContainer = document.querySelector('.display-new-trip-container')

var bookTripBtn = document.querySelector('.book-trip-btn');
var bookTripFromPastTripsBtn = document.querySelector('.book-trip-past-trips-btn');
var bookTripFromPendingBtn = document.querySelector('.book-trip-from-pending-btn');
var formErrorDisplay = document.querySelector('.form-error-display')
var submitButton = document.querySelector('.submit-request-btn')

var seePastTripsBtn = document.querySelector('.past-trips-btn');
var seePendingTripsBtn = document.querySelector('.pending-trips-btn');
var destinationGrid = document.querySelector('.destinations-grid');

// EVENT LISTENERS:
window.addEventListener('load', () => {
    Promise.all(promises)
    .then(results => {
        allTravelers = results[0].travelers
        allTrips = results[1].trips
        allDestinations = results[2].destinations
    }).catch(error => {
        console.error('Error initializing app:', error);
    });
})

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let username = usernameInput.value
    let password = passwordInput.value

    currentTravelerId = checkUserLogin(username, password)

    if (currentTravelerId == 'Empty Input'){
        displayEmptyInputError()

    } else if (currentTravelerId == 'Password Error'){
        displayIncorrectPasswordError()

    } else if (currentTravelerId == 'Username Error') {
        displayIncorrectUsernameError()

    } else {
        currentTravelersTrips = getTripsList(currentTravelerId, allTrips)
        currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, allDestinations)
        currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, allDestinations)
        removeLoginForm(e)
        displayMenu(e)
        displayTravelerName(currentTravelerId, allTravelers)
    }
});

bookTripBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearForm()
    displayDestinationsFromMenu()

    displayDestinations(allDestinations)
});

returnHomeFromDestinationsBtn.addEventListener('click', () => {
    returnHomeFromDestinations()
});

seePastTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    displayPastTripsDashboard(currentTravelerTotalTripInfo, today)
    
});

seePendingTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    displayPendingTrips(currentTravelerTotalTripInfo)
});

returnHomeFromPendingBtn.addEventListener('click', (e) => {
    returnHomeFromPending()
});

returnHomeFromPastBtn.addEventListener('click', (e) => {
    e.preventDefault()
    returnHomeFromPast()
});

returnHomeFromForm.addEventListener('click', (e) => {
    e.preventDefault()
    newDestinationId = ''
    returnHomeFromRequestForm()
});

bookTripFromPastTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearForm()
    displayDestinationsFromPastTrips(allDestinations)
});

bookTripFromPendingBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearForm()
    displayDestinationsFromPendingTrips(allDestinations)
});

displayNewTripContainer.addEventListener('click', (e) => {
    e.preventDefault()
    let returnHomeFromNewBtn = e.target

    if (returnHomeFromNewBtn.id === 'return-home-from-new-btn') {
        returnHomeFromNewTrip()
    } 
});

destinationGrid.addEventListener('click', (e) => {
    let destinationButton = e.target

    if (destinationButton.id === 'lets-go-btn') {
        newDestinationId = destinationButton.parentElement.getAttribute('id')

        displayRequestTripForm()

        renderDestinationImage(newDestinationId, allDestinations)
    }
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    formErrorDisplay.innerText = ''

    let startDateValue = document.getElementById("start-date-input").value
    let durationValue = document.getElementById("duration-input").value
    let numTravelersValue = document.getElementById("travelers-input").value

   if (dayjs(startDateValue).isBefore(today) || dayjs(startDateValue) === today){
        displayFutureDateError()
        return 'book trip in future'
    } else if (startDateValue === '' || startDateValue === 'null') {
        displayValidDateError()
        return 'please enter valid date'
    } else if (durationValue === '' || durationValue <= 0) {
        displayValidDurationError()
        return 'please enter duration of at least 1 night'
    } else if (numTravelersValue === '' || numTravelersValue <= 0) {
        displayValidTravelersError()
        return 'please enter at least 1 traveler'
    } else {
        newTripData = {
            id: allTrips.length +1,
            userID: currentTravelerId,
            destinationID: parseInt(newDestinationId),
            travelers: numTravelersValue,
            date: dayjs(startDateValue).format('YYYY/MM/DD'),
            duration: parseInt(durationValue),
            status: 'pending',            
            suggestedActivities: [],
           }

           let newTripDisplayData = getNewTripDetails(newTripData, allDestinations)
        renderNewTrip(newTripDisplayData) 
        postNewTrip(newTripData)
        .then(() => {
            return fetchTripData()
        })
        .then((data) => {
            allTrips = data.trips

            currentTravelersTrips = getTripsList(currentTravelerId, allTrips)
            currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, allDestinations)
            currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, allDestinations)

        })
    }
})


// POST NEW TRIP:
const postNewTrip = (newTripData) => {
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: "POST",
        body: JSON.stringify(newTripData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
};

// HELPER FUNCTION:
const clearForm = () => {
    formErrorDisplay.innerText = ''

    let startDateValue = document.getElementById("start-date-input")
    let durationValue = document.getElementById("duration-input")
    let numTravelersValue = document.getElementById("travelers-input")

    startDateValue.value = ''
    durationValue.value = ''
    numTravelersValue.value =''
}





























































































