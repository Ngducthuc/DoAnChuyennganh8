import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const response = await axios.get('YOUR_API_URL', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Gửi token vào header Authorization
      }
    });
    return response.data;  // Trả về dữ liệu nếu thành công
  } catch (error) {
    console.error('Error fetching products:', error.response || error);
    throw error;  // Ném lỗi nếu có
  }
};
