import chai from 'chai';
const expect = chai.expect;

import {
  getUserName,
  getTripsList,
  getTravelersDestinations,
  getTripCost,
  getTotalTripDetails,
  getTotalTravelCostYear,
  getDestination,
  getPendingTrips, 
  getApprovedTrips,
} from '../src/trips-data'

import {
  checkUserLogin
} from '../src/user-data'

import { 
  sampleTravelersData,
  sampleTripsData,
  user1Trips,
  user2Trips,
  sampleDestinationsData,
  destinations1,
  destinations2,
  totalTripDetailsOne,
  totalTripDetailsTwo,
} from '../src/sample-data';

describe('Check travelers login', function() {
  it('should return user id with successful login', function() {
    let username1 = 'traveler1'
    let username2 = 'traveler2'
    let username3 = 'traveler3'
    let password = 'travel'

    let user1 = checkUserLogin(username1, password)
    let user2 = checkUserLogin(username2, password)
    let user3 = checkUserLogin(username3, password)

    expect(user1).to.equal(1);
    expect(user2).to.equal(2);
    expect(user3).to.equal(3);
  });

  it('should return Empty Input with missing username', function() {
    let username = ''
    let password = 'travel'

    let user1 = checkUserLogin(username, password)

    expect(user1).to.equal('Empty Input');
  });

  it('should return Empty Input with missing password', function() {
    let username = 'traveler1'
    let password = ''

    let user1 = checkUserLogin(username, password)
  
    expect(user1).to.equal('Empty Input');
  });

  it('should return Password Error with incorrect password', function() {
    let username = 'traveler1'
    let password = 'TRAVEL'
    let user1 = checkUserLogin(username, password)
    
    expect(user1).to.equal('Password Error');
  });

  it('should return Username Error with incorrect username', function() {
    let username1 = 'traveler100'
    let username2 = 'travel1'
    let password = 'travel'

    let user1 = checkUserLogin(username1, password)
    let user2 = checkUserLogin(username2, password)
    
    expect(user1).to.equal('Username Error');
    expect(user2).to.equal('Username Error');
  });

});

describe('Get travelers first name', function() {
  let userIdOne = 1
  let userList = sampleTravelersData.travelers

  let userOneName = getUserName(userIdOne, userList)

  it('should return users first name', function() {

    expect(userOneName).to.equal('Ham');
  });
});


describe('Travelers trips list', function() {
  let userIdOne = 1
  let userIdTwo = 2
  let userIdThree = 3

  let tripsList = sampleTripsData.trips

  let user1 = getTripsList(userIdOne, tripsList)
  let user2 = getTripsList(userIdTwo, tripsList)
  let user3 = getTripsList(userIdThree, tripsList)

  it('should return array', function() {

    expect(user1).to.be.an('array');
    expect(user2).to.be.an('array');
    expect(user3).to.be.an('array');
  });

  it('should return array of objects', function() {

     expect(user1).to.deep.equal(user1Trips);
     expect(user2).to.deep.equal(user2Trips);
  });

  it('objects should contain trip id', function() {
    let user1TripId = user1.map((trip) => {
      return trip.id
    })

    expect(user1TripId).to.deep.equal([ 1, 5 ]);
 });

  it('objects should contain destination ids', function() {
    let user1TripDestinationID = user1.map((trip) => {
      return trip.destinationID
  })

    expect(user1TripDestinationID).to.deep.equal([ 10, 13 ]);
  });

  it('objects should contain trip status', function() {
    let user1TripStatus = user1.map((trip) => {
      return trip.status
    })

    expect(user1TripStatus).to.deep.equal([ 'pending', 'approved' ]);
  });

});

describe('Travelers destinations list', function() {
  let userIdOne = 1
  let userIdTwo = 2

  let tripsList = sampleTripsData.trips
  let destinationsList = sampleDestinationsData.destinations

  let user1Trips = getTripsList(userIdOne, tripsList)
  let user2Trips = getTripsList(userIdTwo, tripsList)

  let user1Destinations = getTravelersDestinations(user1Trips, destinationsList)
  let user2Destinations = getTravelersDestinations(user2Trips, destinationsList)


  it('should return array of objects', function() {

    expect(user1Destinations).to.deep.equal(destinations1);
    expect(user2Destinations).to.deep.equal(destinations2);
  });

  it('objects should contain destination name', function() {

    expect(user1Destinations).to.deep.equal(destinations1);
    expect(user2Destinations).to.deep.equal(destinations2);
  });

  it('objects should contain destination name', function() {

    expect(user1Destinations).to.deep.equal(destinations1);
    expect(user2Destinations).to.deep.equal(destinations2);
  });

});

describe('Travelers trip total cost', function() {

  let destinationsList = sampleDestinationsData.destinations

  let userOne = getTripCost(user1Trips, destinationsList)
  let userTwo = getTripCost(user2Trips, destinationsList)

  let user1Cost = userOne.map((trip) => {
    return trip.totalCost
  })

  let user2Cost = userTwo.map((trip) => {
    return trip.totalCost
  })

  it('should return array of trip objects that each contain property of total cost', function() {

    expect(user1Cost).to.deep.equal([ 960, 1350 ]);
    expect(user2Cost).to.deep.equal([ 5700, 2460 ]);
  });

});

describe('Travelers total trip details', function() {

  let destinationsList = sampleDestinationsData.destinations

  let userOne = getTotalTripDetails(user1Trips, destinationsList)
  let userTwo = getTotalTripDetails(user2Trips, destinationsList)

  it('should return array of trip objects', function() {

    expect(userOne).to.deep.equal(totalTripDetailsOne);
    expect(userTwo).to.deep.equal(totalTripDetailsTwo);
  });

});

describe('Travelers total expenses this year', function() {

  it('should return 0 if past trips are not in current year', function() {

    let userTwo = getTotalTravelCostYear(totalTripDetailsTwo)

    expect(userTwo).to.equal(0);
  });

  it('should return a cost of all users travel in year of current date', function() {

    let userOne = getTotalTravelCostYear(totalTripDetailsOne)
    
    expect(userOne).to.equal(1056);
  });

});

describe('Get destination from destination id', function() {

  let destinationsList = sampleDestinationsData.destinations

  let destinationId = 12

  let destinationOne = getDestination(destinationId, destinationsList)

  let destinationOneDetails = {
    id: 12,
    destination: 'Sydney, Austrailia',
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'opera house and city buildings on the water with boats'
  }

  it('should return an object of destination information', function() {

    expect(destinationOne).to.deep.equal(destinationOneDetails);
  });


  it('should return an object destination matching id of parameter id', function() {

    expect(destinationOne.id).to.deep.equal(destinationId);
  });

});

describe('Get travelers approved trips', function() {

  let destinationsList = sampleDestinationsData.destinations

  let userTwoTotalTrips = getTotalTripDetails(user2Trips, destinationsList)

  let userTwoPending = getApprovedTrips(userTwoTotalTrips)


  it('should return alert if user does not have any approved trips', function() {

    expect(userTwoPending).to.deep.equal('No approved trips');
  });

  let userOne = getApprovedTrips(totalTripDetailsOne)

  let userOneApprovedList = [
    {
      trip: 5,
      tripStatus: 'approved',
      location: 'Cartagena, Colombia',
      tripDuration: 10,
      startDate: '2023/02/25',
      numberOfTravelers: 2,
      flightCost: 400,
      lodgingCost: 560,
      totalCost: 960,
      image: 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      alt: 'boats at a dock during the day time'
    }
  ]

  it('should return an object of destination information', function() {

    expect(userOne).to.deep.equal(userOneApprovedList);
  });
});

describe('Get travelers pending trips', function() {
  let userIdThree = 3

  let tripsList = sampleTripsData.trips
  let destinationsList = sampleDestinationsData.destinations

  let user3Trips = getTripsList(userIdThree, tripsList)

  let userThreeTotalTrips = getTotalTripDetails(user3Trips, destinationsList)

  let userThreePending = getPendingTrips(userThreeTotalTrips)

  it('should return alert if user does not have any pending trips', function() {

    expect(userThreePending).to.deep.equal('No pending trips');
  });

  let user1Trips = getTripsList(1, tripsList)
  let userOneTotalTrips = getTotalTripDetails(user1Trips, destinationsList)
  let userOnePending = getPendingTrips(userOneTotalTrips)

  let pendingTrips = [
    {
      trip: 1,
      tripStatus: 'pending',
      location: 'Lima, Peru',
      tripDuration: 8,
      startDate: '2023/09/16',
      numberOfTravelers: 1,
      flightCost: 400,
      lodgingCost: 560,
      totalCost: 960,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky'
    }
  ]

  it('should return an array of objects containing pending trip', function() {

    expect(userOnePending).to.deep.equal(pendingTrips);
  });
});



