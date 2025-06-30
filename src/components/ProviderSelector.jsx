import React from 'react'

const providers = {
  food: [
    { id: 'swiggy', name: 'Swiggy', logo: '🔥', action: 'SELECT_SWIGGY', color: 'bg-orange-500' },
    { id: 'zomato', name: 'Zomato', logo: '🍽️', action: 'SELECT_ZOMATO', color: 'bg-red-500' },
    { id: 'ubereats', name: 'Uber Eats', logo: '🚗', action: 'SELECT_UBEREATS', color: 'bg-black' }
  ],
  flight: [
    { id: 'indigo', name: 'IndiGo', logo: '🛩️', action: 'SELECT_INDIGO', color: 'bg-blue-600' },
    { id: 'spicejet', name: 'SpiceJet', logo: '🌶️', action: 'SELECT_SPICEJET', color: 'bg-red-600' },
    { id: 'airindia', name: 'Air India', logo: '✈️', action: 'SELECT_AIRINDIA', color: 'bg-orange-600' }
  ],
  hotel: [
    { id: 'oyo', name: 'OYO', logo: '🏨', action: 'SELECT_OYO', color: 'bg-red-600' },
    { id: 'treebo', name: 'Treebo', logo: '🌳', action: 'SELECT_TREEBO', color: 'bg-green-600' },
    { id: 'zostel', name: 'Zostel', logo: '🎒', action: 'SELECT_ZOSTEL', color: 'bg-purple-600' }
  ],
  parcel: [
    { id: 'dunzo', name: 'Dunzo', logo: '📦', action: 'SELECT_DUNZO', color: 'bg-yellow-600' },
    { id: 'shiprocket', name: 'Shiprocket', logo: '🚀', action: 'SELECT_SHIPROCKET', color: 'bg-blue-600' },
    { id: 'delhivery', name: 'Delhivery', logo: '📮', action: 'SELECT_DELHIVERY', color: 'bg-green-600' }
  ],
  travel: [
    { id: 'ixigo', name: 'Ixigo', logo: '🚂', action: 'SELECT_IXIGO', color: 'bg-orange-600' },
    { id: 'makemytrip', name: 'MakeMyTrip', logo: '🧳', action: 'SELECT_MAKEMYTRIP', color: 'bg-red-600' },
    { id: 'goibibo', name: 'Goibibo', logo: '✈️', action: 'SELECT_GOIBIBO', color: 'bg-blue-600' }
  ]
}

const ProviderSelector = ({ service, send }) => {
  const serviceProviders = providers[service] || []

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Choose Your Provider
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => send(provider.action)}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${provider.color} rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {provider.logo}
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                {provider.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProviderSelector 