import './index.css'
import TabButton from './styled-components'

const CategoryTabs = props => {
  const {categories, activeCategory, changeActiveCategory} = props

  return (
    <nav>
      <ul className="categories-tabs">
        {categories.map(eachCategory => (
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
