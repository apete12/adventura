// IMPORTS:
import './css/styles.css';
const dayjs = require('dayjs');

import {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
    sortTripStatus
} from './trips-data';

import {
    displayRequestTripForm,
    toggleDestinations,
    renderMenu,
    // displayTravelerDashboard,
    renderPastTripsDashboard,
    returnHomeFromDestinations,
    returnHome,
    removeLoginForm,
    displayDestinationImage,
    displayNewTrip,
    displayDestinations,
    renderPendingTrips,
    returnHomeFromRequestForm, 
    renderDestinationsFromPastTrips,
    renderDestinationsFromPendingTrips,
} from './domUpdates';

// GLOBAL VARIABLES:
var currentTraveler = {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
};

var currentTravelersTrips;
var currentTravelersDestinations;
var currentTravelerTotalTripInfo;
var allDestinations;
var allTrips;
var newDestinationId;
var newTripData;

var bookTripBtn = document.querySelector('.book-trip-btn');
var loginBtn = document.querySelector('.login-btn');
var returnHomeFromDestinationsBtn = document.querySelector('.exit-destination-btn');
var bookTripFromPastTripsBtn = document.querySelector('.book-trip-past-trips-btn')
var bookTripFromPendingBtn = document.querySelector('.book-trip-from-pending-btn')
var returnHomeFromForm = document.querySelector('.return-home-from-form-btn')
var returnHomeBtn = document.querySelector('.return-home-btn');
var requestTripForm = document.querySelector('.request-trip-form');
var seePastTripsBtn = document.querySelector('.past-trips-btn')
var seePendingTripsBtn = document.querySelector('.pending-trips-btn')
var destinationGrid = document.querySelector('.destinations-grid');

// EVENT LISTENERS:
loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    removeLoginForm(e)
    renderMenu(e)
    loadTravelerData(e)
});

bookTripBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleDestinations()
    displayDestinations(allDestinations)
});

returnHomeFromDestinationsBtn.addEventListener('click', () => {
    returnHomeFromDestinations()
});

seePastTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    renderPastTripsDashboard(currentTravelerTotalTripInfo)
})

seePendingTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    renderPendingTrips(currentTravelerTotalTripInfo)
})

returnHomeFromForm.addEventListener('click', (e) => {
    e.preventDefault()
    newDestinationId = ''
    console.log(newDestinationId)
    returnHomeFromRequestForm()
})

bookTripFromPastTripsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    renderDestinationsFromPastTrips(allDestinations)
})

bookTripFromPendingBtn.addEventListener('click', (e) => {
    e.preventDefault()
    renderDestinationsFromPendingTrips(allDestinations)
})

// returnHomeBtn.addEventListener('click', () => {
    // returnHome()
    // newDestinationId = ''
// });

destinationGrid.addEventListener('click', (e) => {
    let destinationButton = e.target

    if (destinationButton.id === 'lets-go-btn') {
        newDestinationId = destinationButton.parentElement.getAttribute('id')
        displayRequestTripForm()
        displayDestinationImage(newDestinationId, allDestinations)
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
            userID: currentTraveler.id,
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

// LOAD TRAVELER DATA
function loadTravelerData() {
    fetchTravelerData()
        .then(travelerData => {
            return fetchTripData();
        })
        .then(tripData => {
            return fetchDestinationData();
        })
        .then(destinationData => {
        })
        .catch(error => {
            console.error('Error initializing app:', error);
        });
};

// LOAD UPDATED TRAVELER DATA
function loadUpdatedTravelData() {
    fetchTravelerData()
    .then(travelerData => {
        return fetchTripData();
    })
    .then(tripData => {
        return fetchDestinationData();
    })
    .then(destinationData => {
        console.log(currentTravelerTotalTripInfo)
        displayNewTrip(currentTravelerTotalTripInfo)
        // sortTripStatus(currentTravelerTotalTripInfo)
    })
    .catch(error => {
        console.error('Error initializing app:', error);
    });
}

// FETCH
function fetchTravelerData() {
    return fetch(`http://localhost:3001/api/v1/travelers`)
        .then(response => response.json())
        .then(data => {
            return data; 
        });
};

function fetchTripData() {
    return fetch(`http://localhost:3001/api/v1/trips`)
        .then(response => response.json())
        .then(data => {
            allTrips = data.trips
            currentTravelersTrips = getTripsList(currentTraveler.id, data.trips)
            return allTrips; 
        });
};

function fetchDestinationData() {
    return fetch(`http://localhost:3001/api/v1/destinations`)
        .then(response => response.json())
        .then(data => {
             allDestinations = data
            //  console.log(allDestinations)
             currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, allDestinations.destinations)
             currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, allDestinations.destinations)
            return allDestinations; 
        });
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






























































