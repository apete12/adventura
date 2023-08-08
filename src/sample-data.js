const sampleTravelersData = { travelers: [
    {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
    },
    {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
    },
    {
    id: 3,
    name: "Sibby Dawidowitsch",
    travelerType: "shopper"
    }
]}



const sampleTripsData = { trips: [
    {
    id: 1,
    userID: 1,
    destinationID: 10,
    travelers: 1,
    date: "2023/09/16",
    duration: 8,
    status: "pending",
    suggestedActivities: []
    },
    {
   id: 2,
   userID: 2,
   destinationID: 11,
   travelers: 5,
   date: "2022/10/04",
   duration: 18,
   status: "pending",
   suggestedActivities: []
    },
    {
   id: 4,
   userID: 3,
   destinationID: 12,
   travelers: 4,
   date: "2022/05/22",
   duration: 17,
   status: "approved",
   suggestedActivities: []
    },
    {
    id: 5,
    userID: 1,
    destinationID: 13,
    travelers: 2,
    date: "2023/02/25",
    duration: 10,
    status: "approved",
    suggestedActivities: []
    },
    {
    id: 6,
    userID: 2,
    destinationID: 10,
    travelers: 3,
    date: "2022/04/30",
    duration: 18,
    status: "pending",
    suggestedActivities: []
    },
    {
   id: 7,
   userID: 3,
   destinationID: 11,
   travelers: 3,
   date: "2022/06/29",
   duration: 9,
   status: "approved",
   suggestedActivities: []
    }]}

const user1Trips = [
    {
      id: 1,
      userID: 1,
      destinationID: 10,
      travelers: 1,
      date: '2023/09/16',
      duration: 8,
      status: 'pending',
      suggestedActivities: []
    },
    {
      id: 5,
      userID: 1,
      destinationID: 13,
      travelers: 2,
      date: '2023/02/25',
      duration: 10,
      status: 'approved',
      suggestedActivities: []
    }
  ]
  
const user2Trips = [
  {
    id: 2,
    userID: 2,
    destinationID: 11,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 6,
    userID: 2,
    destinationID: 10,
    travelers: 3,
    date: '2022/04/30',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  }
]

const sampleDestinationsData = { destinations: [
        {
        id: 10,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky"
        },
        {
        id: 11,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time"
        },
        {
        id: 12,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats"
        },
        {
        id: 13,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        alt: "boats at a dock during the day time"}
    ]}

const destinations1 = [
    {
      id: 10,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky'
    },
    {
      id: 13,
      destination: 'Cartagena, Colombia',
      estimatedLodgingCostPerDay: 65,
      estimatedFlightCostPerPerson: 350,
      image: 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      alt: 'boats at a dock during the day time'
    }
  ]

  const destinations2 = [
    {
      id: 10,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky'
    },
    {
      id: 11,
      destination: 'Stockholm, Sweden',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with boats on the water during the day time'
    }
  ]


const totalTripDetailsOne = [
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
    },
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

  const totalTripDetailsTwo = [
    {
      trip: 2,
      tripStatus: 'pending',
      location: 'Stockholm, Sweden',
      tripDuration: 18,
      startDate: '2022/10/04',
      numberOfTravelers: 5,
      flightCost: 3900,
      lodgingCost: 1800,
      totalCost: 5700,
      image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with boats on the water during the day time'
    },
    {
      trip: 6,
      tripStatus: 'pending',
      location: 'Lima, Peru',
      tripDuration: 18,
      startDate: '2022/04/30',
      numberOfTravelers: 3,
      flightCost: 3900,
      lodgingCost: 1800,
      totalCost: 5700,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky'
    }
  ]



export {
    sampleTravelersData,
    sampleTripsData,
    user1Trips,
    user2Trips,
    sampleDestinationsData,
    destinations1,
    destinations2,
    totalTripDetailsOne,
    totalTripDetailsTwo
}