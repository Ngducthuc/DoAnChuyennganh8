import axios from 'axios';
import { Alert } from 'react-native';

const registerApi = async (nameUser, email, password) => {
  try {
    // Kiểm tra nếu có tham số bị thiếu
    if (!nameUser || !email || !password) {
      throw new Error('Missing required fields');
    }

    // Gửi yêu cầu POST đến API đăng ký
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/Register.php', {
      nameUser,   // Thay 'username' bằng 'nameUser'
      email,      // 'email' giữ nguyên
      password,   // 'password' giữ nguyên
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo gửi đúng định dạng JSON
      },
    });

    console.log('API Response:', response.data); // Log phản hồi từ API

    if (response.data.success) {
      return response.data;  // Trả về dữ liệu thành công
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);

    // Kiểm tra lỗi và hiển thị thông báo cho người dùng
    if (error.response && error.response.data) {
      // Nếu email đã đăng ký
      if (error.response.data.message === 'Email already registered') {
        Alert.alert('Error', 'This email is already registered. Please use another email.');
      } else {
        // Các lỗi khác
        Alert.alert('Error', error.response.data.message || 'An error occurred during registration');
      }
    } else if (error.message === 'Network Error') {
      // Nếu có lỗi mạng
      Alert.alert('Network Error', 'Unable to connect. Please check your internet connection.');
    } else {
      // Lỗi tổng quát
      Alert.alert('Error', error.message || 'An error occurred during registration');
    }

    // Ném lỗi để không bỏ qua
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
