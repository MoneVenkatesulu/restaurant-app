import {useState, useEffect, useContext} from 'react'

import Header from '../../components/Header'
import CategoryTabs from '../../components/CategoryTabs'
import DishItem from '../../components/DishItem'

import LoaderView from '../../components/LoaderView'
import FailureView from '../../components/FailureView'
import NoDishesView from '../../components/NoDishesView'
import CartContext from '../../context/CartContext'

import useFetchedData from '../../hooks/useFetchedData'
import fetchStatusConstraints from '../../constants/fetchStatusConstraints'

import './index.css'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('')
  const {restaurantData, addRestaurantData} = useContext(CartContext)
  const {data, status} = useFetchedData()

  useEffect(() => {
    if (status === fetchStatusConstraints.success) {
      addRestaurantData({data, status})
    }
  }, [data, status, addRestaurantData])

  useEffect(
    () =>
      setActiveCategory(
        restaurantData.data.table_menu_list?.[0].menu_category || '',
      ),
    [restaurantData.data],
  )

  const onSuccessView = () => {
    const dishList =
      restaurantData.data.table_menu_list.filter(
        item => item.menu_category === activeCategory,
      )[0]?.category_dishes || []

    return (
      <div className="home-container">
        <Header />

        <div className="home-content-container responsive-padding">
          <CategoryTabs
            activeCategory={activeCategory}
            changeActiveCategory={category => setActiveCategory(category)}
          />

          {dishList.length === 0 ? (
            <NoDishesView />
          ) : (
            <ul className="dish-list">
              {dishList.map(item => (
                <DishItem key={item.dish_id} dish={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  switch (restaurantData.status) {
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

export default Home
