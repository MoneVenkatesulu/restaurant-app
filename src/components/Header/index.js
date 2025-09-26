import {IoCartOutline} from 'react-icons/io5'

import './index.css'

const Header = ({cartDishes, restaurantName}) => {
  const allOrderedDishes = cartDishes.reduce(
    (count, dish) => count + dish.count,
    0,
  )
  return (
    <div className="header-container">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="order-section">
        <p className="order-text">My Orders</p>
        <div className="cart-icon-container">
          <IoCartOutline className="cart-icon" />
          <span className="orders-count">{allOrderedDishes}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
