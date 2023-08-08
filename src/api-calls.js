const fetchTravelerData = (dataType) => { 
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
     .then(res => res.json())
 }

 export const fetchTripData = () => { 
    return fetch(`http://localhost:3001/api/v1/trips`)
     .then(res => res.json())
 }
 
 export const promises = [
    fetchTravelerData('travelers'),
    fetchTravelerData('trips'),
    fetchTravelerData('destinations')
 ]