import {Switch, Route, Redirect} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'

import CartContext from './context/CartContext'
import useFetchedData from './hooks/useFetchedData'
import fetchStatusConstraints from './constants/fetchStatusConstraints'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantData, setRestaurantData] = useState({
    data: {},
    status: fetchStatusConstraints.inProgress,
  })
  const {data, status} = useFetchedData()

  useEffect(() => {
    document.title = 'Restaurant App'
  }, [])

  useEffect(() => {
    setRestaurantData({data, status})
  }, [data, status])

  const addCartItem = item => {
    const alreadyAdded = cartList.find(
      eachDish => eachDish.dishId === item.dishId,
    )
    if (!alreadyAdded) {
      setCartList(prev => [...prev, item])
    } else {
      setCartList(prev =>
        prev.map(eachDish =>
          eachDish.dishId === item.dishId
            ? {
                ...eachDish,
                quantity: eachDish.quantity + item.quantity,
              }
            : eachDish,
        ),
      )
    }
  }

  const removeAllCartItems = () => setCartList([])

  const removeCartItem = dishId => {
    setCartList(prev => prev.filter(item => item.dishId !== dishId))
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prev =>
      prev.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    const getDish = cartList.find(item => item.dishId === dishId)
    if (getDish.quantity === 1) {
      removeCartItem(dishId)
      return
    }

    setCartList(prev =>
      prev.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity - 1} : item,
      ),
    )
  }

  return (
    <div className="app-container">
      <CartContext.Provider
        value={{
          restaurantData,
          cartList,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    </div>
  )
}

export default App
