// IMPORTS:
import './css/styles.css';

import {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
} from './trips-data'

import {
    displayRequestTripForm,
    displayTravelerDashboard,
    returnHome,
    removeLoginForm
} from './domUpdates'

// GLOBAL VARIABLES:
var currentTraveler = {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
}

var currentTravelersTrips;
var currentTravelersDestinations;
var currentTravelerTotalTripInfo;

var bookTripButton = document.querySelector('.book-trip-btn')
var loginButton = document.querySelector('.login-btn')
var returnHomeButton = document.querySelector('.return-home-btn')

// EVENT LISTENERS:
loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    displayTravelerDashboard(currentTravelerTotalTripInfo)
    removeLoginForm()
})

bookTripButton.addEventListener('click', () => {
    displayRequestTripForm()
})

returnHomeButton.addEventListener('click', () => {
    returnHome()
})

// FETCH REQUESTS:
const fetchTravelerData = () => {
    return fetch(`http://localhost:3001/api/v1/travelers`)
    .then(res => res.json())
    .then(data => {
        console.log(getUserData(currentTraveler.id, data.travelers))
    })
}

const fetchTripData = () => {
    return fetch(`http://localhost:3001/api/v1/trips`)
    .then(res => res.json())
    .then(data => {
        currentTravelersTrips = getTripsList(currentTraveler.id, data.trips)
    })
}

const fetchDestinationData = () => {
    return fetch(`http://localhost:3001/api/v1/destinations`)
    .then(res => res.json())
    .then(data => {
        currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, data.destinations)
        currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, data.destinations)
    })
}


console.log(fetchTravelerData())
console.log(fetchTripData())
console.log(fetchDestinationData())