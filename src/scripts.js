// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

var currentTraveler = {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
}

const fetchTravelerData = () => {
    return fetch(`http://localhost:3001/api/v1/travelers`)
    .then(res => res.json())
    .then(data => console.log(data))
}

console.log(fetchTravelerData())