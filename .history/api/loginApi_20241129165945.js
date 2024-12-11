import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    // Log mã trạng thái và dữ liệu trả về từ API
    console.log('HTTP Status Code:', response.status);  // Mã trạng thái HTTP
    console.log('API Response Data:', response.data);    // Dữ liệu trả về từ API

    if (response.status === 200) {
      // Nếu mã trạng thái là 200 OK, trả về token
      if (response.data.token) {
        return response.data.token;
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      // Xử lý lỗi khi mã trạng thái không phải là 2xx
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    // Log chi tiết lỗi
    if (error.response) {
      // Khi có phản hồi từ server (lỗi server hoặc mã trạng thái không phải 2xx)
      console.error('Error Response:', error.response);
      console.error('HTTP Status Code:', error.response.status);  // Mã trạng thái HTTP
      console.error('Error Data:', error.response.data);  // Thông báo lỗi từ server
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Khi không có phản hồi từ server (lỗi kết nối hoặc timeout)
      console.error('Error Request:', error.request);
      throw new Error('No response from server');
    } else {
      // Lỗi khi thiết lập yêu cầu
      console.error('Error Message:', error.message);
      throw new Error(error.message || 'Unknown error occurred');
    }
  }
};

export default loginApi;
