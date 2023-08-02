// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import {
    getUserData,
    getTripData
} from './trips-data'

console.log('This is the JavaScript entry file - your code begins here.');

var currentTraveler = {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
}

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
        console.log(getTripData(currentTraveler.id, data.trips))
        
    })
}

console.log(fetchTravelerData())
console.log(fetchTripData())