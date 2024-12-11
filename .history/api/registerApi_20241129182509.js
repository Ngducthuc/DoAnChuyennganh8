// src/api/registerApi.js
import axios from 'axios';

const registerApi = async (username, email, password) => {
  try {
    // Gửi yêu cầu POST đến API đăng ký
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/Register.php', {
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo dữ liệu là JSON
      },
    });

    // Kiểm tra phản hồi từ API
    if (response.data.success) {
      return response.data; // Trả về dữ liệu thành công nếu có
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
