// fetchProducts.js
import axios from 'axios';

const fetchProducts = async (category = 'All', token) => {
  try {
    const data = new URLSearchParams();
    data.append('category', category);
    data.append('token', token); // Đảm bảo token được gửi trong body

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo gửi đúng Content-Type
      },
    });

    return response.data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProducts;
