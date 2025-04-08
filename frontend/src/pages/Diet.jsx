import React from 'react';
import { useFetchSuggestionQuery, useFetchSuggestFoodQuery } from '../redux/features/dish/foodApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import FoodSuggest from './Dish/FoodSuggest';

const Diet = () => {
  const { data, isLoading, error } = useFetchSuggestionQuery();
  const { data: dataFood, isLoading: isLoadingFood, error: errorFood } = useFetchSuggestFoodQuery();

  if (isLoading || isLoadingFood) return <div className="text-center py-6">⏳ Đang tải dữ liệu...</div>;
  if (error || errorFood) return <div className="text-center text-red-600 py-6">❌ Đã xảy ra lỗi khi tải dữ liệu.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        📋 Kế hoạch Dinh dưỡng
      </h1>

      <div className="bg-green-100 rounded-xl shadow p-6 grid grid-cols-2 gap-4 text-gray-800 mb-6">
        <div>
          <span className="font-semibold">🍽️ Calo:</span> {data.result.calories} kcal
        </div>
        <div>
          <span className="font-semibold">🥑 Chất béo:</span> {data.result.fat} g
        </div>
        <div>
          <span className="font-semibold">🍬 Đường:</span> {data.result.sugar} g
        </div>
        <div>
          <span className="font-semibold">🍗 Protein:</span> {data.result.protein} g
        </div>
        <div>
          <span className="font-semibold">🌾 Chất xơ:</span> {data.result.fiber} g
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2"></h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {data.result.reason}
        </p>
      </div>

      {dataFood?.result?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
            🥗 Gợi ý món ăn phù hợp
          </h2>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {dataFood.result.map((dish) => (
              <SwiperSlide key={dish.id} className="!w-[600px] mb-5">
                <FoodSuggest dish={dish} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Diet;
