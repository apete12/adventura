

// pass through userId and array
// return specific traveler based on traveler id
const getUserData = (userId, array) => {
    return array.find((traveler) => traveler.id === userId)

}

const getTripData = (userId, array) => {
    return array.filter((trip) => trip.userID === userId)
}

const getDestinationData = (tripsList, allDestinations) => {
    let tripDestinations = allDestinations.reduce((list, destination) => {
        tripsList.forEach((trip) => {
            if(trip.destinationID === destination.id) {
                list.push(destination)
            }
        })
        return list
    }, [])
    return tripDestinations
}



export {
    getUserData,
    getTripData,
    getDestinationData
}