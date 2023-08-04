// IMPORTS:
import './css/styles.css';

import {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
} from './trips-data'

import {
    // displayDestinations,
    displayRequestTripForm,
    toggleDestinations,
    displayTravelerDashboard,
    returnHomeFromDestinations,
    returnHome,
    removeLoginForm,
    displayDestinationImage
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
var allDestinations;

var bookTripButton = document.querySelector('.book-trip-btn')
var loginButton = document.querySelector('.login-btn')
var returnHomeFromDestinationsButton = document.querySelector('.exit-destination-btn')
var returnHomeButton = document.querySelector('.return-home-btn')

var requestTripForm = document.querySelector('.request-trip-form')

var destinationGrid = document.querySelector('.destinations-grid')

// EVENT LISTENERS:
loginButton.addEventListener('click', (e) => {
    e.preventDefault()
    fetchTravelerData(e)
    fetchTripData(e)
    fetchDestinationData(e)
    removeLoginForm()
})

bookTripButton.addEventListener('click', (e) => {
    e.preventDefault()
    toggleDestinations(allDestinations)
})

returnHomeFromDestinationsButton.addEventListener('click', () => {
    returnHomeFromDestinations()
})


returnHomeButton.addEventListener('click', () => {
    returnHome()
    newDestinationId = ''
})


destinationGrid.addEventListener('click', (e) => {
    let destinationButton = e.target

    if (destinationButton.id === 'lets-go-btn') {
        let newDestinationId = destinationButton.parentElement.getAttribute('id')
        displayRequestTripForm()
        displayDestinationImage(newDestinationId, allDestinations)
    }

})

// requestTripForm.addEventListener('click', (e) => {
    // e.preventDefault()
// 
    // let targetSubmitBtn = e.target
    // if (targetSubmitBtn.id === 'submit-request-btn') {
        // let startDate = document.getElementById("start-date-input").value
        // let duration = document.getElementById("duration-input").value
        // let numTravelers = document.getElementById("travelers-input").value
// 
        // let newTripData = {
            // id: 
            // userID: currentTraveler.id,
            // destinationID: destination.id,
            // startDate: numTravelers,
            // duration: numTravelers,
            // numTravelers: numTravelers,
            // status: 'pending'
        // }
    // }
// })
// 
// {
    // id: <number>, 
    /* userID: <number>,  */
    /* destinationID: <number>,  */
    /* travelers: <number>,  */
    /* date: <string 'YYYY/MM/DD'>,  */
    /* duration: <number>,  */
    /* status: <string 'approved' or 'pending'>,  */
    /* suggestedActivities: <array of strings> */
        // }



// FETCH REQUESTS:
const fetchTravelerData = (e) => {
    return fetch(`http://localhost:3001/api/v1/travelers`)
    .then(res => res.json())
    .then(data => {
        getUserData(currentTraveler.id, data.travelers)
    })
}

const fetchTripData = (e) => {
    return fetch(`http://localhost:3001/api/v1/trips`)
    .then(res => res.json())
    .then(data => {
        currentTravelersTrips = getTripsList(currentTraveler.id, data.trips)
    })
}

const fetchDestinationData = (e) => {
    return fetch(`http://localhost:3001/api/v1/destinations`)
    .then(res => res.json())
    .then(data => {
        allDestinations = data
        currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, allDestinations.destinations)
        currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, allDestinations.destinations)
        displayTravelerDashboard(currentTravelerTotalTripInfo)
        // displayDestinations(allDestinations)
        // console.log(currentTravelersTrips)
    })
}


