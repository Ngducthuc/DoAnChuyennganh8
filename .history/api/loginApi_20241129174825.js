// src/api/loginApi.js
import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    // Kiểm tra dữ liệu trả về từ server
    console.log('Response:', response.data);

    // Nếu API trả về token hoặc dữ liệu, trả nó lại
    return response.data.token || response.data;
  } catch (error) {
    // Log lỗi chi tiết
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export default loginApi;
