import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { getImgUrl } from '../../utils/getImgUrl'
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../../redux/features/cart/cartSlice'

const ChoiceDiet = ({ diet }) => {
    // const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        // dispatch(addToCart(product))
        console.log('Add to cart:', product)
    }

    return ( 
        <div className="rounded-2xl border hover:shadow-lg transition-shadow duration-300 p-4 bg-white">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">


                {/* Content Section */}
                <div className="flex-1">
                    <Link to={`/diet`}>
                        <h3 className="text-1xl font-semibold hover:text-blue-600 mb-2">
                            {diet?.diet}
                        </h3>
                    </Link>

                    {/* Nutrition Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                        <p> {diet.calories} Calories/day</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                        <FaAngleDoubleDown />
                        <span>{diet.weekly_weight_change} kg/week</span>
                    </div>

                
                </div>
            </div>
        </div>
    )
}

export default ChoiceDiet
