// IMPORTS:
import {
    getTotalTravelCost
} from './trips-data'
// QUERY SELECTORS:

var travelQuote = document.querySelector('.travel-quote-placeholder-container')
var tripDashboard = document.querySelector('.my-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')
var totalCostDisplay = document.querySelector('.total-cost-display')

// const displayTripDetails = (myDestinationsArray, myTripsArray) => {
    // travelQuote.classList.add('hidden')
    // tripDashboard.classList.remove('hidden')
// 
    // myDestinationsArray.map((destination) => {
        // let matchTrip = myTripsArray.find((trip) => trip.destinationID === destination.id)
        // tripDetailsDisplay.innerHTML += `
    // <div class='destination-container'>
        // <p class="destination-name trip">${destination.destination}</p>
        // <p class="trip-date trip detail">Date: ${matchTrip.date}</p>
        // <p class="trip-date trip detail">Number of Days: ${matchTrip.duration}</p>
        // <p class="trip-date trip detail">Group Size: ${matchTrip.travelers} Travelers</p>
        // <p class="trip-date trip detail">Status: ${matchTrip.status}</p>
    // </div>
    // `
// });
// }

const displayTripDetails = (totalTripDetails) => {
    travelQuote.classList.add('hidden')
    tripDashboard.classList.remove('hidden')

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

// EXPORTS:
export {
    renderDashboard,
}