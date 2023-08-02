

// pass through userId and array
// return specific traveler based on traveler id
const getUserData = (userId, array) => {
    return array.find((traveler) => traveler.id === userId)

}

const getTripData = (userId, array) => {
    return array.filter((trip) => trip.userID === userId)
}

export {
    getUserData,
    getTripData,
}