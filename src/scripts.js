// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORTS:
import './css/styles.css';

import {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
    // getTripCost,
    getTotalTravelCost
} from './trips-data'

import {
    displayTripDetails
} from './domUpdates'



// GLOBAL VARIABLES:
var currentTraveler = {
    id: 3,
    name: "Sibby Dawidowitsch",
    travelerType: "shopper"
}

var currentTravelersTrips;
var currentTravelersDestinations;
var currentTravelerTotalTripInfo;

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
        console.log(displayTripDetails(currentTravelerTotalTripInfo))
        console.log(currentTravelerTotalTripInfo)
    })
}



console.log(fetchTravelerData())
console.log(fetchTripData())
console.log(fetchDestinationData())