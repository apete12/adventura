// IMPORTS:

import {
    getTotalTravelCost,
    getDestination
} from './trips-data'

// QUERY SELECTORS:

var travelQuote = document.querySelector('.travel-quote-placeholder-container')
var tripDashboard = document.querySelector('.my-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')
var totalCostDisplay = document.querySelector('.total-cost-display')
var destinationContainer = document.querySelector('.display-destination-container')
var chooseDestinationDisplay = document.querySelector('.destinations-grid')
var requestTripDisplay = document.querySelector('.request-trip-container')
var loginForm = document.querySelector('.login-form-container')
var returnHomeFromDestinationsButton = document.querySelector('.exit-destination-btn')
var locationDisplay = document.querySelector('.location-container')

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

const renderDashboard = (totalTripDetails) => {
    displayTripDetails(totalTripDetails)
    displayYearExpenses(totalTripDetails)
}

const displayTravelerDashboard = (totalTripDetails) => {
    travelQuote.classList.add('hidden')
    tripDashboard.classList.remove('hidden')
    renderDashboard(totalTripDetails)
}

const toggleDestinations = (allDestinations) => {
    tripDashboard.classList.add('hidden')
    destinationContainer.classList.remove('hidden')

    displayDestinations(allDestinations)
}

const displayDestinations = (allDestinations) => {
    allDestinations.destinations.map((location) => {
        chooseDestinationDisplay.innerHTML += `
    <div class='destination-details' id='${location.id}'>
        <p class="destination-location">${location.destination}</p>
        <p class="destination-flight">Airfare: ${location.estimatedFlightCostPerPerson}</p>
        <p class="destination-lodging">Lodging: ${location.estimatedLodgingCostPerDay}</p>
        <button id="lets-go-btn" class="lets-go-btn">LETS GO</button>
    </div>
    `
    });
}

const returnHomeFromDestinations = () => {
    tripDashboard.classList.remove('hidden')
    chooseDestinationDisplay.classList.add('hidden')
    destinationContainer.classList.add('hidden')
}

const displayRequestTripForm = () => {
    destinationContainer.classList.add('hidden')
    requestTripDisplay.classList.remove('hidden')
}

const displayDestinationImage = (destinationId, allDestinations) => {
    let destinationInfo = getDestination(destinationId, allDestinations)
    console.log(destinationInfo)
    
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

const returnHome = () => {
    tripDashboard.classList.remove('hidden')
    requestTripDisplay.classList.add('hidden')
}

const removeLoginForm = () => {
    loginForm.classList.add('hidden')
}



// EXPORTS:
export {
    displayRequestTripForm,
    displayTravelerDashboard,
    returnHome,
    removeLoginForm,
    toggleDestinations,
    // displayDestinations,
    returnHomeFromDestinations,
    displayDestinationImage
}