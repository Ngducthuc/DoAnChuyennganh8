// src/api/loginApi.js
import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    if (response.data.token) {
      return response.data.token; // Trả về token nếu đăng nhập thành công
    } else {
      throw new Error('Invalid credentials'); // Nếu không có token, trả về lỗi
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error occurred');
  }
};

export default loginApi;
