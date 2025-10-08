import {useState, useContext} from 'react'
import {FaCircle} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = ({dish}) => {
  const [quantity, setQuantity] = useState(0)
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
      <FaCircle
        $isVeg={dishType === 1}
        className="dot-icon"
        style={{
          color: dishType === 1 ? '#ff0000' : '#008000',
          border: dishType === 1 ? '1px solid #ff0000' : '1px solid #008000',
          backgroundColor: dishType === 1 ? '#ffe5e5' : '#e5ffe5',
        }}
      />

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
                disabled={quantity === 0}
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
            {quantity > 0 && (
              <button
                type="button"
                className="add-to-cart-btn"
                onClick={onAddToCart}
              >
                ADD TO CART
              </button>
            )}
          </div>
        ) : (
          <p className="dish-not-available-text">Not available</p>
        )}

        {addOnCat.length > 0 && (
          <p className="dish-customization-available-text">
            Customizations available
          </p>
        )}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>

      <img src={dishImage} alt={`Dish - ${dishName}`} className="dish-img" />
    </li>
  )
}

export default DishItem
