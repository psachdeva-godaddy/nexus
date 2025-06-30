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

  // Helper function to format service state clearly
  const formatServiceState = (stateValue) => {
    if (typeof stateValue === 'string') {
      return stateValue
    }
    
    if (typeof stateValue === 'object' && stateValue !== null) {
      const keys = Object.keys(stateValue)
      if (keys.length === 1) {
        const provider = keys[0]
        const providerState = stateValue[provider]
        if (typeof providerState === 'string') {
          // Enhanced display for browsing state
          if (providerState === 'browsing') {
            return `${provider}.browsing → Browse Items Machine`
          }
          return `${provider}.${providerState}`
        } else if (typeof providerState === 'object') {
          const subKeys = Object.keys(providerState)
          if (subKeys.length === 1) {
            return `${provider}.${subKeys[0]}`
          }
        }
      }
    }
    
    return JSON.stringify(stateValue)
  }

  // Get state color for service-specific states
  const getServiceStateColor = () => {
    const stateStr = state.value.toString()
    
    if (state.matches('selectingProvider')) return 'bg-purple-500'
    if (stateStr.includes('idle')) return 'bg-gray-500'
    if (stateStr.includes('browsing')) return 'bg-pink-500 animate-pulse'
    if (stateStr.includes('processing')) return 'bg-yellow-500'
    if (stateStr.includes('completed')) return 'bg-green-500'
    if (stateStr.includes('cancelled')) return 'bg-red-500'
    
    return 'bg-blue-500'
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
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getServiceStateColor()}`}></div>
              <p className="text-sm text-gray-600 font-medium">
                {formatServiceState(state.value)}
              </p>
            </div>
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