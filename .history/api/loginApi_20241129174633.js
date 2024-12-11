// src/api/loginApi.js
import axios from 'axios';

// Định nghĩa API đăng nhập
const loginApi = async (email, password) => {
  try {
    // Gửi yêu cầu POST đến API login
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,    // Gửi email như là tham số
      password, // Gửi mật khẩu như là tham số
    });

    // Giả sử API trả về token hoặc dữ liệu khác sau khi đăng nhập thành công
    return response.data.token || response.data;  // Hoặc bạn có thể tùy chỉnh cách xử lý dữ liệu trả về từ API
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed'); // Xử lý lỗi nếu có
  }
};

export default loginApi;
