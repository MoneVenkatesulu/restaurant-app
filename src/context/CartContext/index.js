import React from 'react'

const CartContext = React.createContext({
  restaurantData: {},
  addRestaurantData: () => {},
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
