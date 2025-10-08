import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

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
            <button
              type="button"
              className="tab-btn"
              style={{
                color: activeCategory === eachCategory ? '#ff0000' : '#000000',
                borderBottom:
                  activeCategory === eachCategory
                    ? '2px solid #ff0000'
                    : 'none',
              }}
              onClick={() => changeActiveCategory(eachCategory)}
            >
              {eachCategory}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryTabs
