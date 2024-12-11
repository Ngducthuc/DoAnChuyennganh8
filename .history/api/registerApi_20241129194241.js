// src/api/registerApi.js
import axios from 'axios';

const registerApi = async (username, email, password) => {
  try {
    // Kiểm tra các tham số có đầy đủ không
    if (!nameUser || !email || !password) {
      throw new Error('Missing required fields');
    }

    // Gửi yêu cầu POST đến API đăng ký
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/Register.php', {
      nameUser,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json', // Đảm bảo gửi đúng định dạng JSON
      },
    });

    // Log phản hồi từ server
    console.log('API Response:', response.data);

    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu thành công
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
