import axios from 'axios';

// Hàm lấy sản phẩm từ API
const fetchProducts = async (category = 'All', token) => {
  try {
    // Tạo dữ liệu để gửi đi (category)
    const data = new URLSearchParams();
    data.append('category', category);

    // Gửi yêu cầu API với token trong headers
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo gửi đúng Content-Type
        'Authorization': `Bearer ${token}`,  // Thêm token vào header
      },
    });

    return response.data;  // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Export function
export default fetchProducts;
