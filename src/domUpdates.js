// IMPORTS:

// QUERY SELECTORS:

var travelQuote = document.querySelector('.travel-quote-placeholder-container')
var tripDashboard = document.querySelector('.my-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')

const displayTripDetails = (myDestinationsArray, myTripsArray) => {
    travelQuote.classList.add('hidden')
    tripDashboard.classList.remove('hidden')

    myDestinationsArray.map((destination) => {
        let matchTrip = myTripsArray.find((trip) => trip.destinationID === destination.id)
        tripDetailsDisplay.innerHTML += `
    <div class='destination-container'>
        <p class="destination-name trip">${destination.destination}</p>
        <p class="trip-date trip detail">Date: ${matchTrip.date}</p>
        <p class="trip-date trip detail">Number of Days: ${matchTrip.duration}</p>
        <p class="trip-date trip detail">Group Size: ${matchTrip.travelers} Travelers</p>
        <p class="trip-date trip detail">Status: ${matchTrip.status}</p>
    </div>
    `
});

  
}

// EXPORTS:
export {
    displayTripDetails,
}