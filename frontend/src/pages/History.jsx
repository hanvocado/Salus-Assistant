import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchHistoryQuery } from '../redux/features/dish/foodApi';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import DishCard from '../pages/Dish/DishCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const History = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Lượng calo ăn",
        data: [],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  });

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  // Lấy dữ liệu từ API
  const { data, isLoading, error } = useFetchHistoryQuery({
    from: formatDate(startDate),
    to: formatDate(endDate),
  });

  useEffect(() => {
    if (data && data.result) {
      const labels = data.result[0].foodHistoryList.map(item => item.date); // Lấy danh sách ngày
      const caloData = data.result[0].foodHistoryList.map(item => item.calories); // Lấy danh sách calo ăn

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Lượng calo ăn",
            data: caloData,
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      });
    }
  }, [data]);

  const handleFilter = () => {
    console.log("Filter from", startDate, "to", endDate);
    // Bạn có thể lọc dishes theo ngày nếu có trường "date" trong dữ liệu
  };

  return (
    <div className='px-4'>
      <div className='flex md:flex-row gap-4 mb-8'>
        <div className='flex flex-col'>
          <label className='mb-1 font-medium'>From</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className='border sma rounded px-2 py-1'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 font-medium'>To</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className='border rounded px-2 py-1'
          />
        </div>
        <button
          onClick={handleFilter}
          className='mt-2 md:mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          Filter
        </button>
      </div>

      {/* Swiper Slider */}
      <div className=''>
        <div className=''>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1180: {
                slidesPerView: 3,
                spaceBetween: 50,
              }
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >

            {data?.result?.[0]?.foodHistoryList?.map((dish, index) => (
              <SwiperSlide key={dish.id || index} className="!w-[600px] mb-5">
                <DishCard dish={dish} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto">
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Lượng Calo ăn theo ngày",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Ngày",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Calo (kcal)",
                },
                beginAtZero: true,
              },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default History;
