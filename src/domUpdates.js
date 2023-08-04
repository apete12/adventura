// IMPORTS:

import {
    getTotalTravelCost
} from './trips-data'

// QUERY SELECTORS:

var travelQuote = document.querySelector('.travel-quote-placeholder-container')
var tripDashboard = document.querySelector('.my-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')
var totalCostDisplay = document.querySelector('.total-cost-display')
var requestTripDisplay = document.querySelector('.request-trip-container')
var loginForm = document.querySelector('.login-form-container')

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
    console.log('hi')
    travelQuote.classList.add('hidden')
    tripDashboard.classList.remove('hidden')
    renderDashboard(totalTripDetails)
}

const displayRequestTripForm = () => {
    tripDashboard.classList.add('hidden')
    requestTripDisplay.classList.remove('hidden')
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
    removeLoginForm
}