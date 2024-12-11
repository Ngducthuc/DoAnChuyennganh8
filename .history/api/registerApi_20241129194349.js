import axios from 'axios';

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
        'Content-Type': 'application/json', // Đảm bảo gửi đúng định dạng JSON
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
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
