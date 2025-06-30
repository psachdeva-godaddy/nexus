import React from 'react'

const services = [
  {
    id: 'food',
    name: 'Food Delivery',
    description: 'Order food from your favorite restaurants',
    icon: '🍕',
    color: 'bg-red-500',
    action: 'SELECT_FOOD_BOOKING'
  },
  {
    id: 'flight',
    name: 'Flight Booking',
    description: 'Book domestic and international flights',
    icon: '✈️',
    color: 'bg-blue-500',
    action: 'SELECT_FLIGHT_BOOKING'
  },
  {
    id: 'hotel',
    name: 'Hotel Booking',
    description: 'Find and book hotels for your stay',
    icon: '🏨',
    color: 'bg-purple-500',
    action: 'SELECT_HOTEL_BOOKING'
  },
  {
    id: 'travel',
    name: 'Travel Booking',
    description: 'Book trains, buses and other travel options',
    icon: '🚆',
    color: 'bg-green-500',
    action: 'SELECT_TRAVEL_BOOKING'
  },
  {
    id: 'parcel',
    name: 'Parcel Delivery',
    description: 'Send parcels and packages anywhere',
    icon: '📦',
    color: 'bg-yellow-500',
    action: 'SELECT_PARCEL_BOOKING'
  }
]

const ServiceSelector = ({ send }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Choose Your Service
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => send(service.action)}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceSelector 