import {useContext} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const history = useHistory()
  const {restaurantData, cartList} = useContext(CartContext)

  const onLogout = () => {
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container responsive-padding">
      <Link to="/" className="restaurant-name-link">
        <h1 className="restaurant-name">
          {restaurantData.data.restaurant_name}
        </h1>
      </Link>

      <div className="cart-icon-logout-container">
        <Link to="/cart" className="header-cart-text-icon" data-testid="cart">
          <p className="header-cart-text">My Orders</p>

          <IoCartOutline aria-label="Cart Icon" className="header-cart-icon" />
        </Link>

        <span className="cart-items-count">{cartList.length}</span>

        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
