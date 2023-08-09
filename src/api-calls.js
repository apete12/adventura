const fetchTravelerData = (dataType) => { 
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then((response) => {
        if (!response.ok) {
            return 'Network response was not ok.'
        }
        return response.json();
      })
 }

 export const fetchTripData = () => { 
    return fetch(`http://localhost:3001/api/v1/trips`)
    .then((response) => {
        if (!response.ok) {
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

 
 
 
 
 
 
 