const getUserData = (userId, array) => {
    return array.find((traveler) => traveler.id === userId)

}

const getTripsList = (userId, array) => {
    return array.filter((trip) => trip.userID === userId)
}

const getTravelersDestinations = (currentTravelersTrips, allDestinations) => {
    let tripDestinations = allDestinations.reduce((list, destination) => {
        currentTravelersTrips.forEach((trip) => {
            if(trip.destinationID === destination.id) {
                list.push(destination)
            }
        })
        return list
    }, [])
    return tripDestinations
}

const getTripCost = (currentTravelersTrips, allDestinations) => {
    let tripCost = currentTravelersTrips.reduce((array, trip) => {
        let destinationCost = allDestinations.find((destination) => destination.id === trip.destinationID) 

        let estimatedFlightsCost = destinationCost.estimatedFlightCostPerPerson * trip.travelers;
        let estimatedLodgingCost = destinationCost.estimatedLodgingCostPerDay * trip.duration;
        let totalCost = estimatedFlightsCost + estimatedLodgingCost

        array.push({
            id: trip.id,
            location: destinationCost.destination,
            estimatedFlightsCost: estimatedFlightsCost,
            estimatedLodgingCost: estimatedLodgingCost,
            totalCost: totalCost
        })

        return array

    }, [])

    return tripCost
}

const getTotalTravelCost = (currentTravelersTrips, allDestinations) => {
    let tripsCostList = getTripCost(currentTravelersTrips, allDestinations)

    let totalCost = tripsCostList.reduce((sum, trip) => {
        sum += trip.totalCost

        return sum
    }, 0)

    let tenPercentFee = totalCost * .10

    return totalCost + tenPercentFee
}


const getTotalTripDetails = (currentTravelersTrips, allDestinations) => {
    let tripExpenses = getTripCost(currentTravelersTrips, allDestinations)

    let totalTripDetails = currentTravelersTrips.reduce((array, trip) => {
        let destinationCost = allDestinations.find((destination) => destination.id === trip.destinationID)
        let tripCosts = tripExpenses.find((trip) => trip.id === trip.id)
        
        array.push({
            trip: trip.id,
            tripStatus: trip.status,
            location: destinationCost.destination,
            tripDuration: trip.duration,
            startDate: trip.date,
            numberOfTravelers: trip.travelers,
            flightCost: tripCosts.estimatedFlightsCost,
            lodgingCost: tripCosts.estimatedLodgingCost,
            totalCost: tripCosts.totalCost
        })

        return array
    }, [])

return totalTripDetails
}

export {
    getUserData,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
    // getTripCost,
    getTotalTravelCost
}