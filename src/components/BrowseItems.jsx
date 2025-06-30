import React from 'react'
import { useMachine } from '@xstate/react'
import { browseItemsMachine } from '../machines/browseItemsMachine'
import { mockData } from '../data/mockData'

const ItemCard = ({ item, service, selectedItems, onAddItem, onUpdateQuantity }) => {
  const selectedItem = selectedItems.find(selected => selected.id === item.id)
  const quantity = selectedItem ? selectedItem.quantity : 0

  const renderItemDetails = () => {
    switch (service) {
      case 'food':
        return (
          <>
            <div className="text-2xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.restaurant}</p>
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
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
        {quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(item.id, quantity - 1)}
              className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
            >
              -
            </button>
            <span className="font-medium text-gray-800 min-w-[20px] text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
              className="w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddItem(item)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

const BrowseItems = ({ service, provider, onAddToCart }) => {
  const [state, send] = useMachine(browseItemsMachine, {
    input: {
      currentService: service,
      currentProvider: provider,
    }
  })

  const items = mockData[service]?.[provider] || []
  const { selectedItems, totalAmount, searchQuery, selectedCategory } = state.context

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedCategory === 'all') return matchesSearch
    
    // Add category filtering logic here based on service type
    return matchesSearch
  })

  const handleAddItem = (item) => {
    send({ type: 'ADD_ITEM', item })
    if (onAddToCart) {
      onAddToCart(item)
    }
  }

  const handleUpdateQuantity = (itemId, quantity) => {
    send({ type: 'UPDATE_QUANTITY', itemId, quantity })
  }

  const handleSearch = (query) => {
    send({ type: 'SEARCH', query })
  }

  const handleProceedToCheckout = () => {
    send({ type: 'PROCEED_TO_CHECKOUT' })
  }

  if (state.matches('loading')) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading items...</p>
      </div>
    )
  }

  if (state.matches('checkout.reviewOrder')) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h3>
          
          <div className="space-y-4 mb-6">
            {selectedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => send({ type: 'EDIT_ORDER' })}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Edit Order
            </button>
            <button
              onClick={() => send({ type: 'CONFIRM_ORDER' })}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (state.matches('checkout.processing')) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing your order...</p>
      </div>
    )
  }

  if (state.matches('checkout.completed')) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-600 mb-4">Order Completed!</h3>
        <p className="text-gray-600 mb-6">Your order has been successfully processed.</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-green-800">
            Total Amount: ₹{totalAmount.toFixed(2)}<br/>
            Items Ordered: {selectedItems.length}
          </p>
        </div>
      </div>
    )
  }

  // Get browse state color
  const getBrowseStateColor = () => {
    if (state.matches('loading')) return 'bg-blue-500'
    if (state.matches('browsing')) return 'bg-indigo-500'
    if (state.matches('checkout.reviewOrder')) return 'bg-orange-500'
    if (state.matches('checkout.processing')) return 'bg-yellow-500'
    if (state.matches('checkout.completed')) return 'bg-green-500'
    return 'bg-gray-500'
  }

  // Format browse state display
  const formatBrowseState = () => {
    if (state.matches('loading')) return 'Loading Items'
    if (state.matches('browsing')) return 'Browsing Items'
    if (state.matches('checkout.reviewOrder')) return 'Review Order'
    if (state.matches('checkout.processing')) return 'Processing Order'
    if (state.matches('checkout.completed')) return 'Order Completed'
    return state.value.toString()
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Browse State Visibility Header */}
      <div className="mb-4 bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getBrowseStateColor()}`}></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              Browse State: {formatBrowseState()}
            </span>
            <span className="text-xs text-gray-500">
              Selected: {selectedItems.length} items • Total: ₹{totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            {selectedItems.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedItems.length} items • ₹{totalAmount.toFixed(2)}
              </div>
            )}
            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedItems.length > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Available {service === 'food' ? 'Food Items' : 
                    service === 'flight' ? 'Flights' :
                    service === 'hotel' ? 'Hotels' :
                    service === 'travel' ? 'Travel Options' : 'Services'}
        </h3>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-gray-600">No items available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                service={service}
                selectedItems={selectedItems}
                onAddItem={handleAddItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <h4 className="font-semibold text-gray-800 mb-2">Cart Summary</h4>
          <div className="space-y-1 text-sm text-gray-600 mb-3">
            {selectedItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {selectedItems.length > 3 && (
              <div className="text-gray-500">+{selectedItems.length - 3} more items...</div>
            )}
          </div>
          <div className="border-t border-gray-200 pt-2 mb-3">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default BrowseItems 