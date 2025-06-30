import React from 'react'
import { mockData } from '../data/mockData'

const ItemCard = ({ item, service, onAddToCart }) => {
  const renderItemDetails = () => {
    switch (service) {
      case 'food':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.restaurant}</p>
            <p className="text-xs text-gray-500 mb-2">{item.description}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-green-600">{item.deliveryTime}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
              </div>
            </div>
          </>
        )
      case 'flight':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.flightNumber}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.from} → {item.to}</p>
            <div className="text-xs text-gray-500 mb-2">
              <div>{item.departure} - {item.arrival}</div>
              <div>Duration: {item.duration}</div>
              <div>Aircraft: {item.aircraft}</div>
            </div>
          </>
        )
      case 'hotel':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.location}</p>
            <p className="text-xs text-gray-500 mb-2">{item.roomType}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-green-600">{item.checkIn} - {item.checkOut}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
              </div>
            </div>
          </>
        )
      case 'travel':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {item.trainName || item.busType}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{item.from} → {item.to}</p>
            <div className="text-xs text-gray-500 mb-2">
              <div>{item.departure} - {item.arrival}</div>
              <div>Duration: {item.duration}</div>
              <div>Class: {item.class}</div>
            </div>
          </>
        )
      case 'parcel':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.service}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <div className="text-xs text-gray-500 mb-2">
              <div>Duration: {item.duration}</div>
              <div>Weight: {item.weight}</div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      {renderItemDetails()}
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const ItemsList = ({ service, provider, onAddToCart, onStartBooking }) => {
  const items = mockData[service]?.[provider] || []

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Available {service === 'food' ? 'Food Items' : 
                    service === 'flight' ? 'Flights' :
                    service === 'hotel' ? 'Hotels' :
                    service === 'travel' ? 'Travel Options' : 'Services'}
        </h3>
        <button
          onClick={onStartBooking}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-600">No items available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              service={service}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemsList 