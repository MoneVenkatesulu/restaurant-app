import {useState, useEffect} from 'react'

import {IoCartOutline} from 'react-icons/io5'

// import Header from './components/Header'
// import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'

import LoaderView from './components/LoaderView'
import NoDishesView from './components/NoDishesView'
import FailureView from './components/FailureView'

import './App.css'
import TabButton from './styled-components'

const fetchStatusConstraints = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [categories, setCategories] = useState([])
  const [menuData, setMenuData] = useState([])
  const [fetchStatus, setFetchStatus] = useState(
    fetchStatusConstraints.inProgress,
  )
  const [activeCategory, setActiveCategory] = useState(null)
  const [cartDishes, setCartDishes] = useState([])

  useEffect(() => {
    async function getMenu() {
      try {
        setFetchStatus(fetchStatusConstraints.inProgress)
        const response = await fetch(dishesApiUrl)

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        const menu = data[0]

        const categoryList = menu.table_menu_list.reduce(
          (list, eachItem) => [...list, eachItem.menu_category],
          [],
        )
        setCategories(categoryList)
        setActiveCategory(categoryList[0])

        setMenuData(menu)

        setFetchStatus(fetchStatusConstraints.success)
      } catch (error) {
        console.log(`Fetching Error: ${error.message}`)
        setFetchStatus(fetchStatusConstraints.failure)
      }
    }
    getMenu()
  }, [])

  const categoryList = () =>
    menuData.table_menu_list.find(
      eachItem => eachItem.menu_category === activeCategory,
    )?.category_dishes || []

  const updateCartDishes = (boolVal, dishId) => {
    setCartDishes(prevDish => {
      let newDishList = []
      const dish = prevDish.find(item => item.dishId === dishId)
      if (boolVal) {
        if (dish) {
          newDishList = prevDish.map(item =>
            item.dishId === dishId ? {...item, count: item.count + 1} : item,
          )
        } else {
          newDishList = [...prevDish, {dishId, count: 1}]
        }
      } else if (dish.count > 1) {
        newDishList = prevDish.map(item =>
          item.dishId === dishId ? {...item, count: item.count - 1} : item,
        )
      } else if (dish) {
        newDishList = prevDish.filter(item => item.dishId !== dishId)
      }
      return newDishList
    })
  }

  // <Header
  //   className="header-component"
  //   restaurantName={menuData.restaurant_name}
  //   cartDishes={cartDishes}
  // />

  //  <CategoryTabs
  //         categories={categories}
  //         activeCategory={activeCategory}
  //         changeActiveCategory={categoryName => setActiveCategory(categoryName)}
  //       />

  const onSuccessView = () => {
    const dishes = categoryList()
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="restaurant-name">{menuData.restaurant_name}</h1>
          <div className="order-section">
            <p className="order-text">My Orders</p>
            <div className="cart-icon-container">
              <IoCartOutline className="cart-icon" />
              <span className="orders-count">
                {cartDishes.reduce((count, dish) => count + dish.count, 0)}
              </span>
            </div>
          </div>
        </div>

        <nav>
          <ul className="categories-tabs">
            {categories.map(eachCategory => (
              <li key={eachCategory}>
                <TabButton
                  type="button"
                  onClick={() => setActiveCategory(eachCategory)}
                  $isActive={activeCategory === eachCategory}
                >
                  {eachCategory}
                </TabButton>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dish-list-container">
          {dishes.length === 0 ? (
            <NoDishesView />
          ) : (
            <ul className="dish-list">
              {dishes.map(eachItem => (
                <DishItem
                  key={eachItem.dish_id}
                  dish={eachItem}
                  cartDishes={cartDishes}
                  updateCartDishes={updateCartDishes}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  switch (fetchStatus) {
    case fetchStatusConstraints.inProgress:
      return <LoaderView />
    case fetchStatusConstraints.success:
      return onSuccessView()
    case fetchStatusConstraints.failure:
      return <FailureView />
    default:
      return null
  }
}

export default App
