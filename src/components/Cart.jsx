import React from 'react'

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{item.image}</div>
        <div>
          <h4 className="font-semibold text-gray-800">
            {item.name || item.service || item.flightNumber || item.trainName || item.busType}
          </h4>
          <p className="text-sm text-gray-600">
            {item.restaurant || item.location || `${item.from} → ${item.to}` || item.description}
          </p>
          <p className="text-lg font-bold text-gray-800">₹{item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
          >
            +
          </button>
        </div>
        
        <div className="text-lg font-bold text-gray-800 w-20 text-right">
          ₹{item.price * item.quantity}
        </div>
        
        <button
          onClick={() => onRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

const Cart = ({ cart, totalAmount, onUpdateQuantity, onRemoveItem, onProceedToCheckout, isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="flex-1">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-green-600">₹{totalAmount}</span>
                </div>
                
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart 