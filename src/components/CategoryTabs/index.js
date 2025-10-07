import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'
import TabButton from './styled-components'

const CategoryTabs = props => {
  const {activeCategory, changeActiveCategory} = props

  const {restaurantData} = useContext(CartContext)

  const categoryList = restaurantData.data.table_menu_list.map(
    item => item.menu_category,
  )

  return (
    <nav>
      <ul className="categories-tabs">
        {categoryList.map(eachCategory => (
          <li key={eachCategory}>
            <TabButton
              type="button"
              onClick={() => changeActiveCategory(eachCategory)}
              $isActive={activeCategory === eachCategory}
            >
              {eachCategory}
            </TabButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryTabs
