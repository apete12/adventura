
// IMPORTS:
import './css/styles.css';

import {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
} from './trips-data'

import {
    renderDashboard
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
        console.log(renderDashboard(currentTravelerTotalTripInfo))
    })
}


console.log(fetchTravelerData())
console.log(fetchTripData())
console.log(fetchDestinationData())