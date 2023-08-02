// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// IMPORTS:
import './css/styles.css';

import {
    getUserData,
    getTripData,
    getDestinationData
} from './trips-data'

// GLOBAL VARIABLES:
var currentTraveler = {
    id: 3,
    name: "Sibby Dawidowitsch",
    travelerType: "shopper"
}

var currentTravelersTrips;
var currentTravelersDestinations;

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
        currentTravelersTrips = getTripData(currentTraveler.id, data.trips)
        console.log('current travelers trips', currentTravelersTrips)
        
    })
}

const fetchDestinationData = () => {
    return fetch(`http://localhost:3001/api/v1/destinations`)
    .then(res => res.json())
    .then(data => {
        currentTravelersDestinations = getDestinationData(currentTravelersTrips, data.destinations)
        console.log('current travelers destinations', currentTravelersDestinations)
    })
}



console.log(fetchTravelerData())
console.log(fetchTripData())
console.log(fetchDestinationData())