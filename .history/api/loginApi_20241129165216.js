import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    console.log('API Response:', response);  // Log toàn bộ phản hồi API
    if (response.data.token) {
      return response.data.token; // Trả về token nếu đăng nhập thành công
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    // Log chi tiết lỗi
    if (error.response) {
      // Khi có phản hồi từ server (lỗi server hoặc mã trạng thái không phải 2xx)
      console.error('Error Response:', error.response);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Khi không có phản hồi từ server (lỗi kết nối hoặc timeout)
      console.error('Error Request:', error.request);
      throw new Error('No response from server');
    } else {
      // Lỗi xảy ra khi thiết lập yêu cầu
      console.error('Error Message:', error.message);
      throw new Error(error.message || 'Unknown error occurred');
    }
  }
};

export default loginApi;
