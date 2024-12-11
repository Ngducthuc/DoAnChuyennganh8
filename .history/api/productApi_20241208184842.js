// productApi.js
import axios from 'axios';

const fetchProducts = async (category = 'All') => {
  try {
    const url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php'; // API lấy tất cả sản phẩm
    if (category !== 'All') {
      url = `https://doanchuyenganh.site/ModelApp/ProductApp.php?category=${category}`; // API lấy sản phẩm theo danh mục
    }

    const response = await axios.get(url);
    return response.data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProducts;  // Export default
