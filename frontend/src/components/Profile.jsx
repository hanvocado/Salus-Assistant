import React from 'react'

const Profile = () => {
  const data = {
    calories: 1500,
    fat: 50.0,
    sugar: 25.0,
    protein: 80.0,
    fiber: 30.0,
    reason:
      'Chào bạn! Với chiều cao 1m50 và cân nặng 90kg, mục tiêu của chúng ta là giảm cân một cách lành mạnh. Lượng calo 1500 sẽ giúp bạn tạo ra thâm hụt calo cần thiết để giảm cân. Chúng ta sẽ tăng protein để giúp bạn no lâu hơn và duy trì cơ bắp. Giảm đường và tăng chất xơ sẽ giúp kiểm soát lượng đường trong máu và cải thiện tiêu hóa. Lượng chất béo vừa phải để hỗ trợ các chức năng cơ thể. Với hoạt động thể thao cường độ thấp (1/7 ngày), chúng ta sẽ điều chỉnh dần khi bạn tăng cường độ tập luyện.',
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          📋 Kế hoạch Dinh dưỡng
        </h1>

        <div className="bg-green-100 rounded-xl shadow p-6 grid grid-cols-2 gap-4 text-gray-800 mb-6">
          <div>
            <span className="font-semibold">🍽️ Calo:</span> {data.calories} kcal
          </div>
          <div>
            <span className="font-semibold">🥑 Chất béo:</span> {data.fat} g
          </div>
          <div>
            <span className="font-semibold">🍬 Đường:</span> {data.sugar} g
          </div>
          <div>
            <span className="font-semibold">🍗 Protein:</span> {data.protein} g
          </div>
          <div>
            <span className="font-semibold">🌾 Chất xơ:</span> {data.fiber} g
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📌 Giải thích</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.reason}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
