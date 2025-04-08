import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { Link } from 'react-router-dom'

const FoodSuggest = ({ dish }) => {

    return (
        <div className="rounded-2xl w-full border hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                {/* Phần hình ảnh món ăn */}
                <div className="sm:w-72 sm:h-72 flex-shrink-0 border rounded-lg overflow-hidden">
                    <Link to={`/dish/${dish?.id}`}>
                        <img
                            src={dish.imageUrl}
                            alt={dish?.foodName || 'Món ăn'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Phần nội dung */}
                <div className="flex-1">
                    <Link to={`/dish/${dish?.id}`}>
                        <h3 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                            {dish?.foodName}
                        </h3>
                    </Link>

                    {/* Thông tin thêm */}
                    <div className="text-sm text-gray-700 mb-2">
                        {dish?.createAt && (
                            <p><strong>Thời gian đăng:</strong> {dish?.createAt}</p>
                        )}
                    </div>

                    {/* Thành phần dinh dưỡng */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 mb-4">
                        <p><strong>Năng lượng:</strong> {dish?.calories} kcal</p>
                        <p><strong>Chất béo:</strong> {dish?.fat} g</p>
                        <p><strong>Đường:</strong> {dish?.sugar} g</p>
                        <p><strong>Chất đạm:</strong> {dish?.protein} g</p>
                        <p><strong>Chất xơ:</strong> {dish?.fiber} g</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodSuggest
