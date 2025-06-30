import React from 'react'
import ItemsList from './ItemsList'

const providerNames = {
  // Food providers
  swiggy: 'Swiggy',
  zomato: 'Zomato',
  ubereats: 'Uber Eats',
  // Flight providers
  indigo: 'IndiGo',
  spicejet: 'SpiceJet',
  airindia: 'Air India',
  // Hotel providers
  oyo: 'OYO',
  treebo: 'Treebo',
  zostel: 'Zostel',
  // Parcel providers
  dunzo: 'Dunzo',
  shiprocket: 'Shiprocket',
  delhivery: 'Delhivery',
  // Travel providers
  ixigo: 'Ixigo',
  makemytrip: 'MakeMyTrip',
  goibibo: 'Goibibo'
}

const BookingFlow = ({ service, provider, state, send, onAddToCart }) => {
  const providerName = providerNames[provider] || provider
  const currentState = state.value[provider]

  const getStateDisplay = (currentState) => {
    switch (currentState) {
      case 'idle':
        return { text: 'Ready to Book', color: 'text-blue-600', bg: 'bg-blue-50' }
      case 'processing':
        return { text: 'Processing...', color: 'text-yellow-600', bg: 'bg-yellow-50' }
      case 'completed':
        return { text: 'Completed', color: 'text-green-600', bg: 'bg-green-50' }
      case 'cancelled':
        return { text: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50' }
      default:
        return { text: currentState, color: 'text-gray-600', bg: 'bg-gray-50' }
    }
  }

  const stateDisplay = getStateDisplay(currentState)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Booking with {providerName}
        </h3>
        
        <div className={`inline-block px-6 py-3 rounded-full ${stateDisplay.bg} ${stateDisplay.color} font-semibold mb-8`}>
          {stateDisplay.text}
        </div>

        {currentState === 'idle' && (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Ready to browse {providerName} offerings
            </p>
            <button
              onClick={() => send('BROWSE_ITEMS')}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
            >
              Browse Items
            </button>
          </div>
        )}

        {currentState === 'browsing' && (
          <ItemsList
            service={service}
            provider={provider}
            onAddToCart={onAddToCart}
            onStartBooking={() => send('START_BOOKING')}
          />
        )}

        {currentState === 'processing' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
            <p className="text-gray-600 mb-6">
              Processing your booking with {providerName}...
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => send('CONFIRM_BOOKING')}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => send('CANCEL_BOOKING')}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        )}

        {currentState === 'completed' && (
          <div className="space-y-4">
            <div className="text-6xl mb-4">✅</div>
            <h4 className="text-xl font-semibold text-green-600 mb-2">
              Booking Confirmed!
            </h4>
            <p className="text-gray-600">
              Your booking with {providerName} has been successfully confirmed.
            </p>
          </div>
        )}

        {currentState === 'cancelled' && (
          <div className="space-y-4">
            <div className="text-6xl mb-4">❌</div>
            <h4 className="text-xl font-semibold text-red-600 mb-2">
              Booking Cancelled
            </h4>
            <p className="text-gray-600">
              Your booking with {providerName} has been cancelled.
            </p>
            <button
              onClick={() => send('START_BOOKING')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Browse More Items
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingFlow 