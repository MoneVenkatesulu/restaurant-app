import {useContext} from 'react'

import Header from '../../components/Header'
import CartDish from '../../components/CartDish'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const totalAmount = cartList.reduce(
    (amount, item) => amount + item.dishPrice * item.quantity,
    0,
  )

  const emptyCartView = () => (
    <div className="no-data-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="Empty Cart"
        className="no-data-img"
      />
      <h1>Your cart is empty!</h1>
    </div>
  )

  const cartListView = () => (
    <div className="cart-content responsive-padding">
      <div className="cart-sub-container">
        <h3>Cart Dishes</h3>
        <button
          type="button"
          className="cart-remove-all-btn"
          onClick={() => removeAllCartItems()}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-list">
        {cartList.map(dish => (
          <CartDish key={dish.dishId} dish={dish} />
        ))}
      </ul>
      <div className="cart-sub-container">
        <p>Total order amount: {totalAmount}</p>
        <button type="button" className="cart-place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  )

  return (
    <div className="cart-container">
      <Header />
      {cartList.length === 0 ? emptyCartView() : cartListView()}
    </div>
  )
}

export default Cart
