import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'
import DotIcon from './styled-components'

const DishItem = ({dish}) => {
  const [quantity, setQuantity] = useState(1)
  const {addCartItem} = useContext(CartContext)

  const {
    dish_id: dishId,
    dish_Type: dishType,
    dish_name: dishName,
    dish_currency: dishCurrency,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    addonCat: addOnCat,
    dish_calories: dishCalories,
    dish_image: dishImage,
  } = dish

  const onAddToCart = () => {
    const item = {
      dishId,
      dishName,
      dishCurrency,
      dishPrice,
      quantity,
      dishImage,
    }
    addCartItem(item)
  }

  return (
    <li className="dish-card">
      <DotIcon $isVeg={dishType === 1} />

      <div className="dish-content">
        <h5>{dishName}</h5>

        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>

        <p className="dish-description">{dishDescription}</p>

        {dishAvailability ? (
          <div className="dish-items-add-button-container">
            <div className="dish-plus-minus-container">
              <button
                type="button"
                className="dish-plus-minus-buttons"
                onClick={() => setQuantity(prev => prev - 1)}
                disabled={quantity === 1}
              >
                -
              </button>
              {quantity}
              <button
                type="button"
                className="dish-plus-minus-buttons"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </div>
        ) : (
          <p className="dish-not-available-text">Not available</p>
        )}

        {addOnCat.length > 0 && (
          <p className="dish-customization-available-text">
            Customization Available
          </p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>

      <img src={dishImage} alt={`Dish - ${dishName}`} className="dish-img" />
    </li>
  )
}

export default DishItem
