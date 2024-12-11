import axios from 'axios';

// Hàm lấy sản phẩm từ API
const fetchProducts = async (token) => {
  try {
    // Tạo đối tượng form data chứa token
    const data = new URLSearchParams();
    data.append('token', token);

    // Gửi POST request với dữ liệu là token
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo Content-Type là đúng
      },
    });

    // Trả về dữ liệu sản phẩm
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProducts;
