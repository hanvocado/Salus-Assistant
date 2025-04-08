import React from 'react';
import InputField from './addImageDish/InputField';
import SelectField from './addImageDish/SelectField';
import { useForm } from 'react-hook-form';
import { useAddInforMutation } from '../redux/features/dish/foodApi';
import Swal from 'sweetalert2';

const Home = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [addInfor, { isLoading, isError }] = useAddInforMutation();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
      sportActivity: Number(data.sportActivity),
      isVegetarian: Number(data.isVegetarian),
    };

    try {
      console.log(formattedData);
      const res = await addInfor(formattedData).unwrap(); 
      Swal.fire('Thành công', 'Dữ liệu đã được gửi thành công!', 'success');
      reset(); 
      console.log(res);
    } catch (error) {
      Swal.fire('Lỗi', 'Gửi dữ liệu thất bại!', 'error');
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tuổi */}
        <InputField
          label="Nhập tuổi của bạn"
          name="age"
          type="number"
          register={register}
          placeholder="Ví dụ: 25"
        />

        {/* Chiều cao */}
        <InputField
          label="Nhập chiều cao (cm)"
          name="height"
          type="number"
          register={register}
          placeholder="Ví dụ: 160"
        />

        {/* Cân nặng */}
        <InputField
          label="Nhập cân nặng (kg)"
          name="weight"
          type="number"
          register={register}
          placeholder="Ví dụ: 60"
        />

        {/* Mức độ hoạt động thể thao */}
        <SelectField
          label="Mức độ tập thể thao (ngày/tuần)"
          name="sportActivity"
          register={register}
          options={[
            { label: '1 ngày/tuần', value: '1' },
            { label: '2 ngày/tuần', value: '2' },
            { label: '3 ngày/tuần', value: '3' },
            { label: '4 ngày/tuần', value: '4' },
            { label: '5 ngày/tuần', value: '5' },
            { label: '6 ngày/tuần', value: '6' },
            { label: '7 ngày/tuần', value: '7' },
          ]}
        />

        {/* Chế độ ăn */}
        <SelectField
          label="Bạn có ăn chay không?"
          name="isVegetarian"
          register={register}
          options={[
            { label: 'Ăn chay', value: '1' },
            { label: 'Không ăn chay', value: '0' },
          ]}
        />

        {/* Vị ưa thích */}
        <SelectField
          label="Khẩu vị yêu thích"
          name="taste"
          register={register}
          options={[
            { label: 'Ngọt', value: 'sweet' },
            { label: 'Mặn', value: 'salty' },
            { label: 'Cay', value: 'spicy' },
            { label: 'Chua', value: 'sour' },
          ]}
        />

        
    

        <div className="text-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Gửi thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
