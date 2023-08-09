import {
    displayServerErrors
} from './domUpdates';


const fetchTravelerData = (dataType) => { 
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then((response) => {
        if (!response.ok) {
            console.log(response)
            displayServerErrors()
            return 'Network response was not ok.'
        }
        return response.json();
      })
 }

 export const fetchTripData = () => { 
    return fetch(`http://localhost:3001/api/v1/trips`)
    .then((response) => {
        if (!response.ok) {
            displayServerErrors()
            return 'Network response was not ok.'
        }
        return response.json();
      })
 }
 
 export const promises = [
    fetchTravelerData('travelers'),
    fetchTravelerData('trips'),
    fetchTravelerData('destinations')
 ]

 
 
 
 
 
 
 