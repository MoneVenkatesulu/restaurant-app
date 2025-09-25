import {IoCartOutline} from 'react-icons/io5'

import './index.css'

const Header = ({cartDishes}) => {
  const allOrderedDishes = cartDishes.reduce(
    (count, dish) => count + dish.count,
    0,
  )
  return (
    <div className="header-container">
      <h1 className="restaurant-name">UNI Resto Cafe</h1>
      <div className="order-section">
        <h4 className="order-text">My Orders</h4>
        <div className="cart-icon-container">
          <IoCartOutline className="cart-icon" />
          <span className="orders-count">{allOrderedDishes}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
