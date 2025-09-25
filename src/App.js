import {useState, useEffect} from 'react'

import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'

import LoaderView from './components/LoaderView'
import NoDishesView from './components/NoDishesView'
import FailureView from './components/FailureView'

import './App.css'

const fetchStatusConstraints = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const App = () => {
  const [categories, setCategories] = useState([])
  const [menuData, setMenuData] = useState([])
  const [fetchStatus, setFetchStatus] = useState(
    fetchStatusConstraints.inProgress,
  )
  const [activeCategory, setActiveCategory] = useState(null)
  const [cartDishes, setCartDishes] = useState([])

  async function getMenu() {
    try {
      setFetchStatus(fetchStatusConstraints.inProgress)
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      const menu = data[0].table_menu_list

      const categoryList = menu.reduce(
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

  useEffect(() => getMenu(), [])

  const categoryList = () =>
    menuData.find(eachItem => eachItem.menu_category === activeCategory)
      ?.category_dishes || []

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

  const menuView = () => {
    const dishes = categoryList()
    switch (fetchStatus) {
      case fetchStatusConstraints.inProgress:
        return <LoaderView />
      case fetchStatusConstraints.success:
        return dishes.length === 0 ? (
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
        )

      case fetchStatusConstraints.failure:
        return <FailureView reFetchData={() => getMenu()} />
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <Header className="header-component" cartDishes={cartDishes} />

      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          changeActiveCategory={categoryName => setActiveCategory(categoryName)}
        />
      )}

      <div className="dish-list-container">{menuView()}</div>
    </div>
  )
}

export default App
