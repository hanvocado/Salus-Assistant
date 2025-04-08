import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../../redux/features/cart/cartSlice'

const DishCard = ({ dish }) => {
    // const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        // dispatch(addToCart(product))
        console.log('Add to cart:', product)
    }

    return (
        <div className="rounded-2xl w-full border hover:shadow-lg transition-shadow duration-300  bg-white">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                {/* Image Section */}
                <div className="sm:w-72 sm:h-72 flex-shrink-0 border rounded-lg overflow-hidden">
                    <Link to={`/dish/${dish?.id}`}>
                        <img
                            src={dish.imageUrl}
                            alt={dish?.dish_name || 'Dish'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                    <Link to={`/dish/${dish?.id}`}>
                        <h3 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                            {dish?.foodName}
                        </h3>
                    </Link>

                    {/* Nutrition Info */}
                    <div className="grid  text-sm text-gray-700">

                        <p><strong>Time up:</strong> {dish?.createAt}</p>
                        <br />
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 mb-4">
                        <p><strong>Calories:</strong> {dish?.calories} kcal</p>
                        <p><strong>Fat:</strong> {dish?.fat}</p>
                        <p><strong>Protein:</strong> {dish?.protein}</p>
                        <p><strong>Sugar:</strong> {dish?.sugar}</p>
                        <p><strong>Fiber:</strong> {dish?.fiber}</p>
                    </div>

                    {/* Price Display
                    <p className="text-lg font-medium text-gray-800 mb-4">
                        ${parseFloat(dish?.newPrice || 0).toFixed(2)}{' '}
                        {dish?.oldPrice && (
                            <span className="line-through text-gray-400 text-base ml-2">
                                ${parseFloat(dish.oldPrice).toFixed(2)}
                            </span>
                        )}
                    </p>

                    {/* Add to Cart Button */}
                    {/* <button
                        onClick={() => handleAddToCart(dish)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default DishCard
