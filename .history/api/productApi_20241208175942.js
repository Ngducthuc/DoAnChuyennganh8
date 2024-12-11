// api/productApi.js
import axios from 'axios';
import qs from 'qs';  // Để mã hóa dữ liệu thành x-www-form-urlencoded

// Hàm lấy sản phẩm từ API
const fetchProducts = async (category = 'All') => {
  try {
    // Tạo dữ liệu để gửi đi dưới dạng x-www-form-urlencoded
    const data = qs.stringify({
      category: category,  // Tham số category
    });

    const url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm

    // Gửi yêu cầu POST với headers là x-www-form-urlencoded
    const response = await axios.post(url, data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Lấy token và dữ liệu sản phẩm từ API
    const token = response.data.token;
    const products = response.data.data;

    // Trả về dữ liệu (token và sản phẩm)
    return { token, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProducts;
