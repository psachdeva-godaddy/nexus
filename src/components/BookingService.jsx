import React from 'react'
import { useMachine } from '@xstate/react'
import { foodBookingMachine } from '../machines/foodBookingMachine'
import { flightBookingMachine } from '../machines/flightBookingMachine'
import { hotelBookingMachine } from '../machines/hotelBookingMachine'
import { parcelBookingMachine } from '../machines/parcelBookingMachine'
import { travelBookingMachine } from '../machines/travelBookingMachine'
import ProviderSelector from './ProviderSelector'
import BookingFlow from './BookingFlow'

const machines = {
  food: foodBookingMachine,
  flight: flightBookingMachine,
  hotel: hotelBookingMachine,
  parcel: parcelBookingMachine,
  travel: travelBookingMachine
}

const serviceConfig = {
  food: {
    title: 'Food Delivery',
    icon: '🍕',
    color: 'bg-red-500'
  },
  flight: {
    title: 'Flight Booking',
    icon: '✈️',
    color: 'bg-blue-500'
  },
  hotel: {
    title: 'Hotel Booking',
    icon: '🏨',
    color: 'bg-purple-500'
  },
  parcel: {
    title: 'Parcel Delivery',
    icon: '📦',
    color: 'bg-yellow-500'
  },
  travel: {
    title: 'Travel Booking',
    icon: '🚆',
    color: 'bg-green-500'
  }
}

const BookingService = ({ service, onBack, onAddToCart }) => {
  const machine = machines[service]
  const [state, send] = useMachine(machine)
  const config = serviceConfig[service]

  const handleBack = () => {
    if (state.matches('selectingProvider')) {
      onBack()
    } else {
      send('BACK')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${config.color} rounded-full flex items-center justify-center text-xl`}>
            {config.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {config.title}
            </h2>
            <p className="text-sm text-gray-500">
              Current State: {state.value.toString()}
            </p>
          </div>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {state.matches('selectingProvider') && (
        <ProviderSelector service={service} send={send} />
      )}

      {/* Show BookingFlow for provider-specific states */}
      {!state.matches('selectingProvider') && (
        <BookingFlow 
          service={service} 
          provider={Object.keys(state.value)[0]} 
          state={state} 
          send={send}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  )
}

export default BookingService 