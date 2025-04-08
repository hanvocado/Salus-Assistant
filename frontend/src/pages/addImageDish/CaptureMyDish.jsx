import React, { useState } from 'react';
import InputField from './InputField';
import { useAddDishMutation } from '../../redux/features/dish/foodApi';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const CaptureMyDish = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addDish, { isLoading, isError }] = useAddDishMutation();
    const [imageFileName, setimageFileName] = useState('');

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('foodName', data.title);
        formData.append('file', imageFile);

        try {
            await addDish(formData).unwrap();
            Swal.fire({
                title: "Thành công",
                text: "Món ăn của bạn đã được tải lên!",
                icon: "success",
            });
            reset();
            setimageFile(null);
            setimageFileName('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Lỗi',
                text: 'Không thể thêm món ăn. Vui lòng thử lại.',
                icon: 'error',
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thêm Món Ăn Mới</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Trường nhập tên món ăn */}
                    <InputField
                        label="Tên món ăn"
                        name="title"
                        placeholder="Nhập tên món ăn"
                        register={register}
                    />

                    {/* Trường chọn ảnh */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ảnh món ăn
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-2 w-full"
                        />
                        {imageFileName && (
                            <p className="text-sm text-gray-500">Đã chọn: {imageFileName}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Gửi món ăn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CaptureMyDish;
