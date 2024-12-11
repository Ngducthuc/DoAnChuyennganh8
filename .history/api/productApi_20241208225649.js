import axios from 'axios';

// Hàm lấy sản phẩm từ API (theo dạng form data)
const fetchProducts = async (token) => {
  try {
    const data = new URLSearchParams();
    data.append('token', token);  // Gửi token vào request

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo gửi đúng Content-Type
      },
    });

    return response.data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Export function
export default fetchProducts;
