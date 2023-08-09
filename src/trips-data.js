const dayjs = require('dayjs');

var today = dayjs().format("YYYY/MM/DD")

const getUserName = (userId, userList) => {
    let userName = userList.find((user) => user.id === userId)

    let wholeName = userName.name

    let firstName = wholeName.split(' ')[0]

    return firstName
}

const getTripsList = (userId, tripList) => {
    return tripList.filter((trip) => trip.userID === userId)
};

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
};

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
};

const getTotalTripDetails = (currentTravelersTrips, allDestinations) => {
    let tripExpenses = getTripCost(currentTravelersTrips, allDestinations)

    let totalTripDetails = currentTravelersTrips.reduce((array, trip) => {
        let destinationInfo = allDestinations.find((destination) => destination.id === trip.destinationID)
        let tripCosts = tripExpenses.find((trip) => trip.id === trip.id)
        
        array.push({
            trip: trip.id,
            tripStatus: trip.status,
            location: destinationInfo.destination,
            tripDuration: trip.duration,
            startDate: trip.date,
            numberOfTravelers: trip.travelers,
            flightCost: tripCosts.estimatedFlightsCost,
            lodgingCost: tripCosts.estimatedLodgingCost,
            totalCost: tripCosts.totalCost,
            image: destinationInfo.image,
            alt: destinationInfo.alt
        })
        return array
    }, [])

return totalTripDetails
};


const getNewTripDetails = (newTripDetails, allDestinations) => {
    let destinationInfo = allDestinations.filter((destination) => destination.id === newTripDetails.destinationID)  

    let newTripArray = [newTripDetails]
    let newTripCost = getTripCost(newTripArray, allDestinations)
    let newTripCostObject = newTripCost.find((trip) => trip)

    let newTripTotalDetails = destinationInfo.reduce((array, destination) => {

        array.push({
            id: newTripDetails.id,
            tripStatus: newTripDetails.status,
            location: destination.destination,
            tripDuration: newTripDetails.duration,
            startDate: newTripDetails.date,
            numberOfTravelers: newTripDetails.travelers,
            flightCost: newTripCostObject.estimatedFlightsCost,
            lodgingCost: newTripCostObject.estimatedLodgingCost,
            totalCost: newTripCostObject.totalCost,
            image: destination.image,
            alt: destination.alt
        })
        return array

    }, [])
        return newTripTotalDetails
}

const getTotalTravelCost = (totalTripDetails) => {
    let totalCost = totalTripDetails.reduce((sum, trip) => {
        sum += trip.totalCost
        return sum
        
    }, 0)

    let tenPercentFee = totalCost * .10

    return totalCost + tenPercentFee
};

const getTotalTravelCostYear = (totalTripDetails, today) => {
    let totalCost = totalTripDetails.reduce((sum, trip) => {
    
        let date = trip.startDate
        let thisYear = dayjs("2022/12/31").format("YYYY/MM/DD")
       
        if (dayjs(date).isBefore(today) && dayjs(date).isAfter(thisYear)) {
            
            sum += trip.totalCost
        return sum
        } else {
            return 0
        }
    }, 0)
    let tenPercentFee = totalCost * .10
    return totalCost + tenPercentFee
}


const getDestination = (destinationId, allDestinations) => {
    let destinationInfo = allDestinations.find((destination) => destination.id == destinationId)
    return destinationInfo
};

const getApprovedTrips = (currentTravelerTotalTripInfo) => {
    let approvedTrips = currentTravelerTotalTripInfo.filter((trip) => trip.tripStatus === 'approved')
    if (approvedTrips.length === 0) {
        return 'No approved trips'
    } else {
        return approvedTrips
    }
}

const getPendingTrips = (currentTravelerTotalTripInfo) => {
    let pendingTrips = currentTravelerTotalTripInfo.filter((trip) => trip.tripStatus == 'pending')
   if (pendingTrips.length === 0) {
    return 'No pending trips'
   } else {
    return pendingTrips
   }
}

export {
    getUserName,
    getTripsList,
    getTravelersDestinations,
    getTotalTripDetails,
    getTripCost,
    getTotalTravelCost,
    getDestination,
    getPendingTrips, 
    getApprovedTrips,
    getNewTripDetails,
    getTotalTravelCostYear
};