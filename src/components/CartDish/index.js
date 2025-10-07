import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const CartDish = ({dish}) => {
  const {
    cartList,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const {dishId, dishName, dishCurrency, dishPrice, quantity, dishImage} = dish

  console.log(cartList)

  return (
    <li className="cart-dish">
      <img src={dishImage} alt={dishName} className="cart-dish-img" />

      <div className="cart-dish-content">
        <h5>{dishName}</h5>

        <p className="cart-dish-price">
          Dish Price: {dishCurrency} {dishPrice}
        </p>

        <p className="cart-dish-price">Total Price: {quantity * dishPrice}</p>
      </div>

      <div className="cart-dish-increment-decrement-container">
        <button
          type="button"
          className="cart-dish-increment-decrement-btn"
          onClick={() => decrementCartItemQuantity(dishId)}
        >
          -
        </button>

        <p>{quantity}</p>

        <button
          type="button"
          className="cart-dish-increment-decrement-btn"
          onClick={() => incrementCartItemQuantity(dishId)}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="cart-dish-remove-btn"
        onClick={() => removeCartItem(dishId)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartDish
