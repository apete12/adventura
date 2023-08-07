// IMPORTS:
import './css/styles.css';
const dayjs = require('dayjs');

import {
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
} from './trips-data';

import {
    checkUserLogin
} from './user-data'

import {
    promises
} from './api-calls'

import {
// LOGIN
    removeLoginForm,
    displayMenu,
    // displayUserName,

// LOGIN ERRORS
    displayEmptyInputError, 
    displayIncorrectPasswordError,
    displayIncorrectUsernameError,

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

// var currentTravelerInfo;
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

var requestTripForm = document.querySelector('.request-trip-form');
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
    }
});

bookTripBtn.addEventListener('click', (e) => {
    e.preventDefault()
    displayDestinationsFromMenu()
    displayDestinations(allDestinations)
});

returnHomeFromDestinationsBtn.addEventListener('click', () => {
    returnHomeFromDestinations()
});

seePastTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    displayPastTripsDashboard(currentTravelerTotalTripInfo)
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
    displayDestinationsFromPastTrips(allDestinations)
});

bookTripFromPendingBtn.addEventListener('click', (e) => {
    e.preventDefault()
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

requestTripForm.addEventListener('click', (e) => {
    e.preventDefault()

    let targetSubmitBtn = e.target
    if (targetSubmitBtn.id === 'submit-request-btn') {
        let startDate = document.getElementById("start-date-input").value
        let duration = document.getElementById("duration-input").value
        let numTravelers = document.getElementById("travelers-input").value
        
        newTripData = {
            id: allTrips.length +1,
            userID: currentTravelerId,
            destinationID: parseInt(newDestinationId),
            travelers: parseInt(numTravelers),
            date: dayjs(startDate).format('YYYY/MM/DD'),
            duration: parseInt(duration),
            status: 'pending',            
            suggestedActivities: [],
        }
        postNewtrip(newTripData)
    }
});


// LOAD UPDATED TRAVELER DATA
const loadUpdatedTravelData = () => {
    Promise.all(promises)
    .then(results => {
        allTravelers = results[0].travelers
        allTrips = results[1].trips
        allDestinations = results[2].destinations
        renderNewTrip(currentTravelerTotalTripInfo)
    })

    .catch(error => {
        console.error('Error initializing app:', error);
    })
};


// POST NEW TRIP:
const postNewtrip = (newTripData) => {
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: "POST",
        body: JSON.stringify(newTripData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        loadUpdatedTravelData()
    })
};






























































