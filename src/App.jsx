import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { bookingMachine } from './machines/bookingMachine'
import ServiceSelector from './components/ServiceSelector'
import BookingService from './components/BookingService'
import Cart from './components/Cart'

function App() {
  const [state, send] = useMachine(bookingMachine)
  const [showCart, setShowCart] = useState(false)

  const handleReset = () => {
    send('RESET')
  }

  const handleAddToCart = (item) => {
    send('ADD_TO_CART', { item })
  }

  const handleUpdateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      send('REMOVE_FROM_CART', { itemId })
    } else {
      send('UPDATE_CART_QUANTITY', { itemId, quantity })
    }
  }

  const handleRemoveFromCart = (itemId) => {
    send('REMOVE_FROM_CART', { itemId })
  }

  // Helper function to display nested state paths clearly
  const formatStateValue = (stateValue) => {
    if (typeof stateValue === 'string') {
      return stateValue
    }
    
    if (typeof stateValue === 'object' && stateValue !== null) {
      const keys = Object.keys(stateValue)
      if (keys.length === 1) {
        const key = keys[0]
        const nestedValue = stateValue[key]
        if (typeof nestedValue === 'string') {
          return `${key}.${nestedValue}`
        } else if (typeof nestedValue === 'object') {
          return `${key}.${formatStateValue(nestedValue)}`
        }
      }
    }
    
    return JSON.stringify(stateValue)
  }

  // Get current state with service-specific state if available
  const getCurrentStateDisplay = () => {
    const mainState = formatStateValue(state.value)
    
    // If we're in a service booking state, also show the service-specific state
    if (state.context.selectedService) {
      const serviceType = state.context.selectedService
      
      // Check if we're in a browsing flow
      if (mainState.includes('Booking')) {
        return `${mainState} (${serviceType}) → Browse Items Active`
      }
      
      return `${mainState} (${serviceType})`
    }
    
    return mainState
  }

  // Get state color based on current state
  const getStateColor = () => {
    const stateStr = state.value.toString()
    
    if (stateStr.includes('selectingService')) return 'bg-blue-500'
    if (stateStr.includes('selectingProvider')) return 'bg-purple-500'
    if (stateStr.includes('idle')) return 'bg-gray-500'
    if (stateStr.includes('browsing')) return 'bg-indigo-500'
    if (stateStr.includes('processing')) return 'bg-yellow-500'
    if (stateStr.includes('completed')) return 'bg-green-500'
    if (stateStr.includes('cancelled')) return 'bg-red-500'
    
    // Special color for when we're in a service booking flow
    if (state.context.selectedService && stateStr.includes('Booking')) {
      return 'bg-pink-500'
    }
    
    return 'bg-blue-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Booking System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your one-stop solution for all booking needs. Choose from food delivery, travel, flights, hotels, and parcel services.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStateColor()}`}></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    Current State: {getCurrentStateDisplay()}
                  </span>
                  <span className="text-xs text-gray-500">
                    Cart: {state.context.cart.length} items (${state.context.totalAmount.toFixed(2)})
                    {state.context.selectedService && ' • Browse Items Machine Active'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCart(true)}
                  className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>🛒</span>
                  <span>Cart</span>
                  {state.context.cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {state.context.cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>

            {state.matches('queryingBooking.selectingService') && (
              <ServiceSelector send={send} />
            )}

            {(state.matches('queryingBooking.foodBooking') ||
              state.matches('queryingBooking.flightBooking') ||
              state.matches('queryingBooking.hotelBooking') ||
              state.matches('queryingBooking.parcelBooking') ||
              state.matches('queryingBooking.travelBooking')) && (
              <BookingService 
                service={state.context.selectedService} 
                onBack={() => send('BACK')}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>

        <Cart
          cart={state.context.cart}
          totalAmount={state.context.totalAmount}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={() => console.log('Proceed to checkout')}
          isVisible={showCart}
          onClose={() => setShowCart(false)}
        />
      </div>
    </div>
  )
}

export default App 