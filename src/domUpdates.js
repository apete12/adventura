// IMPORTS:

import {
    getTotalTravelCost,
    getDestination, 
    getPendingTrips,
} from './trips-data'

// QUERY SELECTORS:
var loginForm = document.querySelector('.login-form-container')

var travelQuote = document.querySelector('.travel-quote-placeholder-container')

// traveler menu 
var travelerMenu = document.querySelector('.traveler-menu-container')

// past trips
var pastTripDashboard = document.querySelector('.my-past-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')
var totalCostDisplay = document.querySelector('.total-cost-display')

// pending trips
var pendingTripDashboard = document.querySelector('.my-trips-pending-container')
var pendingTripDetailsDisplay = document.querySelector('.pending-trip-details-display')

// request trip
var requestTripDisplay = document.querySelector('.request-trip-container')
var destinationContainer = document.querySelector('.display-destination-container')
var chooseDestinationDisplay = document.querySelector('.destinations-grid')

// new trip confirmation
var displayNewTripContainer = document.querySelector('.display-new-trip-container')
var locationDisplay = document.querySelector('.location-container')


var returnHomeFromDestinationsButton = document.querySelector('.exit-destination-btn')

// FUNCTIONS:

const displayTripDetails = (totalTripDetails) => {
    totalTripDetails.map((trip) => {
        tripDetailsDisplay.innerHTML += `
    <div class='destination-container'>
        <p class="destination-name trip">${trip.location}</p>
        <p class="trip detail">Date: ${trip.startDate}</p>
        <p class="trip detail">Number of Days: ${trip.tripDuration}</p>
        <p class="trip detail">Group Size: ${trip.numberOfTravelers} Travelers</p>
        <p class="trip detail">Status: ${trip.tripStatus}</p>
        <p class="trip detail">Airfare: ${trip.flightCost}</p>
        <p class="trip detail">Lodging: ${trip.lodgingCost}</p>
        <p class="trip detail">Total Cost: ${trip.totalCost}</p>
    </div>
    `
    });
}

const displayYearExpenses = (totalTripDetails) => {
    let totalCost = getTotalTravelCost(totalTripDetails)

    totalCostDisplay.innerText = `You've spent $${totalCost} on travel this year.`
}

const returnHome = () => {
    pastTripDashboard.classList.remove('hidden')
    requestTripDisplay.classList.add('hidden')
}

const removeLoginForm = () => {
    loginForm.classList.add('hidden')
}

const renderPastTripsDashboard = (totalTripDetails) => {
    travelerMenu.classList.add('hidden')
    pastTripDashboard.classList.remove('hidden')  
    displayTripDetails(totalTripDetails)
    displayYearExpenses(totalTripDetails)     
}

const renderPendingTrips = (totalTripDetails) => {
    travelerMenu.classList.add('hidden')
    pendingTripDashboard.classList.remove('hidden')
    displayPendingTrips(totalTripDetails)
}

const renderMenu = () => {
    travelerMenu.classList.remove('hidden')
    travelQuote.classList.add('hidden')
}

// const displayTravelerDashboard = (totalTripDetails) => {
    // 
    // renderDashboard(totalTripDetails)
// }
// 
const toggleDestinations = () => {
    travelerMenu.classList.add('hidden')
    destinationContainer.classList.remove('hidden')

    // displayDestinations(allDestinations)
}

const renderDestinationsFromPastTrips = (allDestinations) => {
    pastTripDashboard.classList.add('hidden') 
    destinationContainer.classList.remove('hidden')
    chooseDestinationDisplay.classList.remove('hidden')
    displayDestinations(allDestinations)
}


const renderDestinationsFromPendingTrips = (allDestinations) => {
    pendingTripDashboard.classList.add('hidden')
    destinationContainer.classList.remove('hidden')
    chooseDestinationDisplay.classList.remove('hidden') 
    displayDestinations(allDestinations)
}

const displayDestinations = (allDestinations) => {
    allDestinations.destinations.map((location) => {
        chooseDestinationDisplay.innerHTML += `
    <div class='destination-details' id='${location.id}'>
        <div class='destination-location-container' id='${location.id}'>
            <p class="destination-location">${location.destination}</p>
        </div>
        <p class="destination-flight">Airfare: ${location.estimatedFlightCostPerPerson}</p>
        <p class="destination-lodging">Lodging: ${location.estimatedLodgingCostPerDay}</p>
        <button id="lets-go-btn" class="lets-go-btn">LETS GO</button>
    </div>
    `
    });
}


const returnHomeFromDestinations = () => {
    travelerMenu.classList.remove('hidden')
    chooseDestinationDisplay.classList.add('hidden')
    destinationContainer.classList.add('hidden')
}

const returnHomeFromRequestForm = () => {

    travelerMenu.classList.remove('hidden')
    requestTripDisplay.classList.add('hidden')
}


const displayRequestTripForm = () => {
    destinationContainer.classList.add('hidden')
    travelerMenu.classList.add('hidden')
    requestTripDisplay.classList.remove('hidden')
}


const displayDestinationImage = (destinationId, allDestinations) => {
    let destinationInfo = getDestination(destinationId, allDestinations)
    
    locationDisplay.innerHTML = `
    <div class="location-title-container">
        <p class="adventure-in">Adventure in...</p>
        <p class="destination-location">${destinationInfo.destination}</p>
    </div>
    <div class="location-image-container">
        <img class="locatin-image" src='${destinationInfo.image}' alt='${destinationInfo.alt}'>
    </div>
    `
}
const displayNewTrip = (currentTravelerTotalTripInfo) => {
    let copy = currentTravelerTotalTripInfo.map((trip) => trip)

    let latestTrip = copy.reverse()

    displayNewTripContainer.classList.remove('hidden')
    requestTripDisplay.classList.add('hidden')
    pastTripDashboard.classList.add('hidden')

    displayNewTripContainer.innerHTML = `
    <div class="new-trip-title-container">
        <p class="your-trip-status"> Your trip to ${latestTrip[0].location} is ${latestTrip[0].tripStatus}!</p>
    </div>
    <div class="new-trip-details-container">
        <p class="your-trip-details">Day of Departure: ${latestTrip[0].startDate}</p>
        <p class="your-trip-details">Number of Nights: ${latestTrip[0].tripDuration}</p>
        <p class="your-trip-details">Total Cost:${latestTrip[0].totalCost}</p>
    </div>
    <div class="new-trip-image-container">
        <img class="new-trip-image" src='${latestTrip[0].image}' alt='${latestTrip[0].alt}'>
    </div>
    `
}


const displayPendingTrips = (currentTravelerTotalTripInfo) => {
    let pendingTrips = getPendingTrips(currentTravelerTotalTripInfo)

    pendingTrips.map((trip) => {
        pendingTripDetailsDisplay.innerHTML += `
    <div class='destination-container'>
        <p class="destination-name trip">${trip.location}</p>
        <p class="trip detail">Date: ${trip.startDate}</p>
        <p class="trip detail">Number of Days: ${trip.tripDuration}</p>
        <p class="trip detail">Group Size: ${trip.numberOfTravelers} Travelers</p>
        <p class="trip detail">Status: ${trip.tripStatus}</p>
        <p class="trip detail">Airfare: ${trip.flightCost}</p>
        <p class="trip detail">Lodging: ${trip.lodgingCost}</p>
        <p class="trip detail">Total Cost: ${trip.totalCost}</p>
    </div>
    `
    });


}

// EXPORTS:
export {
    displayRequestTripForm,
    // displayTravelerDashboard,
    renderPastTripsDashboard,
    renderPendingTrips,
    returnHome,
    removeLoginForm,
    toggleDestinations,
    returnHomeFromDestinations,
    displayDestinationImage,
    displayNewTrip,
    displayPendingTrips,
    renderMenu,
    displayDestinations,
    returnHomeFromRequestForm,
    renderDestinationsFromPastTrips,
    renderDestinationsFromPendingTrips
}