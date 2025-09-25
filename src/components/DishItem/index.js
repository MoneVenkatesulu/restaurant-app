import './index.css'
import DotIcon from './styled-components'

const DishItem = props => {
  const {dish, cartDishes, updateCartDishes} = props
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

  const orderedDish = cartDishes.find(item => item.dishId === dishId)
  const dishCount = orderedDish ? orderedDish.count : 0

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
          <span className="dish-plus-minus-container">
            <button
              type="button"
              className="dish-plus-minus-buttons"
              onClick={() => updateCartDishes(false, dishId)}
              disabled={dishCount === 0}
            >
              -
            </button>
            {dishCount}
            <button
              type="button"
              className="dish-plus-minus-buttons"
              onClick={() => updateCartDishes(true, dishId)}
            >
              +
            </button>
          </span>
        ) : (
          <p className="dish-not-available-text">Not available</p>
        )}

        {addOnCat.length !== 0 && (
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
