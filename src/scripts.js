// IMPORTS:
import './css/styles.css';
const dayjs = require('dayjs')

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
var allTrips;
var newDestinationId;
var newTripData;

var bookTripBtn = document.querySelector('.book-trip-btn')
var loginBtn = document.querySelector('.login-btn')
var returnHomeFromDestinationsBtn = document.querySelector('.exit-destination-btn')
var returnHomeBtn = document.querySelector('.return-home-btn')
var requestTripForm = document.querySelector('.request-trip-form')
var destinationGrid = document.querySelector('.destinations-grid')

// EVENT LISTENERS:
loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetchTravelerData(e)
    fetchTripData(e)
    fetchDestinationData(e)
    removeLoginForm()
})

bookTripBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleDestinations(allDestinations)
})

returnHomeFromDestinationsBtn.addEventListener('click', () => {
    returnHomeFromDestinations()
})

returnHomeBtn.addEventListener('click', () => {
    returnHome()
    newDestinationId = ''
})


destinationGrid.addEventListener('click', (e) => {
    let destinationButton = e.target

    if (destinationButton.id === 'lets-go-btn') {
        newDestinationId = destinationButton.parentElement.getAttribute('id')
        displayRequestTripForm()
        displayDestinationImage(newDestinationId, allDestinations)

    }

})

requestTripForm.addEventListener('click', (e) => {
    e.preventDefault()

    let targetSubmitBtn = e.target
    if (targetSubmitBtn.id === 'submit-request-btn') {
        let startDate = document.getElementById("start-date-input").value
        let duration = document.getElementById("duration-input").value
        let numTravelers = document.getElementById("travelers-input").value
        
        newTripData = {
            id: allTrips.length +1,
            userID: currentTraveler.id,
            destinationID: parseInt(newDestinationId),
            travelers: parseInt(numTravelers),
            date: dayjs(startDate).format('YYYY/MM/DD'),
            duration: parseInt(duration),
            status: 'pending',            
            suggestedActivities: [],
        }

        postNewtrip(newTripData)

    }
})

'Trip with id 204 successfully posted'




const postNewtrip = (newTripData) => {
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: "POST",
        body: JSON.stringify(newTripData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        fetchTravelerData()
        fetchTripData()
        fetchDestinationData()
    })
  }





// FETCH REQUESTS:
const fetchTravelerData = () => {
    return fetch(`http://localhost:3001/api/v1/travelers`)
    .then(res => res.json())
    .then(data => {
        getUserData(currentTraveler.id, data.travelers)
    })
}

const fetchTripData = () => {
    return fetch(`http://localhost:3001/api/v1/trips`)
    .then(res => res.json())
    .then(data => {
        allTrips = data.trips
        currentTravelersTrips = getTripsList(currentTraveler.id, data.trips)
    })
}

const fetchDestinationData = () => {
    return fetch(`http://localhost:3001/api/v1/destinations`)
    .then(res => res.json())
    .then(data => {
        allDestinations = data
        currentTravelersDestinations = getTravelersDestinations(currentTravelersTrips, allDestinations.destinations)
        currentTravelerTotalTripInfo = getTotalTripDetails(currentTravelersTrips, allDestinations.destinations)
        displayTravelerDashboard(currentTravelerTotalTripInfo)
       
    })
}


