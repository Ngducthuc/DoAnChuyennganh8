import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    // Log toàn bộ phản hồi API
    console.log('API Response:', response);
    
    if (response.data.token) {
      return response.data.token; // Trả về token nếu đăng nhập thành công
    } else {
      throw new Error('Invalid credentials'); // Nếu không có token, trả về lỗi
    }
  } catch (error) {
    // Log chi tiết lỗi
    if (error.response) {
      console.error('Error Response:', error.response);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      console.error('Error Request:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error Message:', error.message);
      throw new Error(error.message || 'Unknown error occurred');
    }
  }
};

export default loginApi;
