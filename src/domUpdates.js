// IMPORTS:
import {
    getTotalTravelCost,
    getDestination, 
    getPendingTrips,
    getApprovedTrips
} from './trips-data'

// QUERY SELECTORS:
var loginForm = document.querySelector('.login-form-container')
var announcements = document.querySelector('.announcements')
var travelQuote = document.querySelector('.travel-quote-placeholder-container')
var loginErrorHandling = document.querySelector('.error-handling-login')

var usernameInput = document.querySelector('#username-input')
var passwordInput = document.querySelector('#password-input')

// traveler menu 
var travelerMenu = document.querySelector('.traveler-menu-container')

// past trips
var pastTripDashboard = document.querySelector('.my-past-trips-container')
var tripDetailsDisplay = document.querySelector('.trip-details-display')
var totalCostDisplay = document.querySelector('.total-cost-display')

// pending trips
var pendingTripDashboard = document.querySelector('.my-trips-pending-container')
var pendingTripDetailsDisplay = document.querySelector('.pending-trip-details-display')
var noPendingTripsDisplay = document.querySelector('.no-pending-trips-details-display')

// request trip
var requestTripDisplay = document.querySelector('.request-trip-container')
var destinationContainer = document.querySelector('.display-destination-container')
var chooseDestinationDisplay = document.querySelector('.destinations-grid')
var formErrorDisplay = document.querySelector('.form-error-display')
var formErrorContainer = document.querySelector('.form-error-container')

// new trip confirmation
var displayNewTripContainer = document.querySelector('.display-new-trip-container')
var locationDisplay = document.querySelector('.location-container')


// DISPLAY LOGIN ERRORS
const displayEmptyInputError = () => {
    usernameInput.value = ''
    passwordInput.value = ''
    loginErrorHandling.classList.remove('hidden')
    loginErrorHandling.innerText = 'Please enter username and password.'
}

const displayIncorrectPasswordError = () => {
    usernameInput.value = ''
    passwordInput.value = ''
    loginErrorHandling.classList.remove('hidden')
    loginErrorHandling.innerText = 'Please enter correct password.'
}

const displayIncorrectUsernameError = () => {
    usernameInput.value = ''
    passwordInput.value = ''
    loginErrorHandling.classList.remove('hidden')
    loginErrorHandling.innerText = 'Please enter correct username.'
}

// DISPLAY REQUEST FORM
const displayRequestTripForm = () => {
    destinationContainer.classList.add('hidden')
    travelerMenu.classList.add('hidden')
    requestTripDisplay.classList.remove('hidden')
}

// DISPLAY FORM ERRORS
const resetForm = () => {
    let startDateValue = document.getElementById("start-date-input")
    let durationValue = document.getElementById("duration-input")
    let numTravelersValue = document.getElementById("travelers-input")

    startDateValue.value = ''
    durationValue.value = ''
    numTravelersValue.value = ''
}

const displayFutureDateError = () => {
    resetForm()
    formErrorDisplay.innerHTML = ''
  
    formErrorDisplay.classList.remove('hidden')
    formErrorDisplay.innerHTML += `
        <p class="error">Please enter future date.</p>`
}

const displayValidDateError = () => {
    resetForm()
    formErrorDisplay.innerHTML = ''
   
    formErrorDisplay.classList.remove('hidden')
    formErrorDisplay.innerText = 'Please enter valid date.'
}

const displayValidDurationError = () => {
    resetForm()
    formErrorDisplay.innerHTML = ''
   
    formErrorDisplay.classList.remove('hidden')
    formErrorDisplay.innerText = 'Please enter duration of at least 1 night.'
}

const displayValidTravelersError = () => {
    resetForm()
    formErrorDisplay.innerHTML = ''
    
    formErrorDisplay.classList.remove('hidden')
    formErrorDisplay.innerText = 'Please enter at least 1 traveler.'
}

const displayYearExpenses = (totalTripDetails) => {
    let totalCost = getTotalTravelCost(totalTripDetails)

    totalCostDisplay.innerText = `You've spent $${totalCost} on travel this year.`
}

// RETURN HOME BTNS 
const returnHomeFromPast = () => {
    pastTripDashboard.classList.add('hidden')
    travelerMenu.classList.remove('hidden')
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

const returnHomeFromPending = () => {
    travelerMenu.classList.remove('hidden')
    pendingTripDashboard.classList.add('hidden')
}

const returnHomeFromNewTrip = () => {
    travelerMenu.classList.remove('hidden')
    displayNewTripContainer.classList.add('hidden')
}

const removeLoginForm = () => {
    loginForm.classList.add('hidden')
    loginErrorHandling.classList.add('hidden')
    announcements.classList.remove('hidden')
}

const displayPastTripsDashboard = (totalTripDetails) => {
    travelerMenu.classList.add('hidden')
    pastTripDashboard.classList.remove('hidden')  
    renderTripDetails(totalTripDetails)
    displayYearExpenses(totalTripDetails)     
}

const displayPendingTrips = (totalTripDetails) => {
    travelerMenu.classList.add('hidden')
    pendingTripDashboard.classList.remove('hidden')
    renderPendingTrips(totalTripDetails)
}

const displayMenu = () => {
    travelerMenu.classList.remove('hidden')
    travelQuote.classList.add('hidden')
}

const displayDestinationsFromMenu = () => {
    travelerMenu.classList.add('hidden')
    destinationContainer.classList.remove('hidden')
    chooseDestinationDisplay.classList.remove('hidden')
}

const displayDestinationsFromPastTrips = (allDestinations) => {
    pastTripDashboard.classList.add('hidden') 
    destinationContainer.classList.remove('hidden')
    chooseDestinationDisplay.classList.remove('hidden')
    displayDestinations(allDestinations)
}

const displayDestinationsFromPendingTrips = (allDestinations) => {
    pendingTripDashboard.classList.add('hidden')
    destinationContainer.classList.remove('hidden')
    chooseDestinationDisplay.classList.remove('hidden') 
    displayDestinations(allDestinations)
}

// RENDER INNER HTML:
const renderTripDetails = (totalTripDetails) => {
    let approvedTrips = getApprovedTrips(totalTripDetails)
    tripDetailsDisplay.innerHTML = ''

    approvedTrips.map((trip) => {
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

const displayDestinations = (allDestinations) => {
    allDestinations.map((location) => {
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


const renderDestinationImage = (destinationId, allDestinations) => {
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
const renderNewTrip = (newTripDisplayData) => {

    displayNewTripContainer.classList.remove('hidden')
    requestTripDisplay.classList.add('hidden')
    pastTripDashboard.classList.add('hidden')

    let newTripDisplayObject = newTripDisplayData.find((trip) => trip)

    displayNewTripContainer.innerHTML = `
    <div class="new-trip-title-container">
        <p class="your-trip-status"> Your trip to ${newTripDisplayObject.location} is ${newTripDisplayObject.tripStatus}!</p>
    </div>
    <div class="new-trip-details-container">
        <p class="your-trip-details">Day of Departure: ${newTripDisplayObject.startDate}</p>
        <p class="your-trip-details">Number of Nights: ${newTripDisplayObject.tripDuration}</p>
        <p class="your-trip-details">Total Cost:${newTripDisplayObject.totalCost}</p>
    </div>
    <div class="new-trip-image-container">
        <img class="new-trip-image" src='${newTripDisplayObject.image}' alt='${newTripDisplayObject.alt}'>
    </div>
    <div class="btn-container-new-trips">
        <div class="return-home-container">
            <button id="return-home-from-new-btn" class="return-home-from-new-btn">RETURN HOME</button>
        </div>
    </div>
    `
}

const renderPendingTrips = (currentTravelerTotalTripInfo) => {
    let pendingTrips = getPendingTrips(currentTravelerTotalTripInfo)
    console.log('pendingTrips DOM', pendingTrips)

    pendingTripDetailsDisplay.innerHTML = ''
    noPendingTripsDisplay.innerHTML = ''

    if (pendingTrips === 'No pending trips') {
        noPendingTripsDisplay.innerHTML += `
        <div class='no-pending-container'>
            <p class="no-pending trip">You have no pending trips!</p>
        </div>
        `
    } else {
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
}

// EXPORTS:
export {
  // LOGIN
removeLoginForm,
displayMenu,

// LOGIN ERRORS
displayEmptyInputError, 
displayIncorrectPasswordError,
displayIncorrectUsernameError,

// FORM ERRORS
displayFutureDateError,
displayValidDateError,
displayValidDurationError,
displayValidTravelersError,

  // DISPLAY ON DOM
displayRequestTripForm,
displayDestinations,
displayPastTripsDashboard,
displayPendingTrips,
displayDestinationsFromPastTrips,
displayDestinationsFromPendingTrips,
displayDestinationsFromMenu,

  // RENDER INNER HTML
renderNewTrip,
renderDestinationImage,

  // RETURN HOME
returnHomeFromPast,
returnHomeFromDestinations,
returnHomeFromRequestForm,
returnHomeFromPending,
returnHomeFromNewTrip,
}




