import axios from 'axios';

// Hàm lấy sản phẩm từ API
export const fetchProducts = async (category = 'All') => {
  try {
    let url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm
    if (category !== 'All') {
      url = `https://doanchuyenganh.site/ModelApp/ProductApp.php?category=${category}`; // API lấy sản phẩm theo danh mục
    }

    const response = await axios.get(url);  // Gọi API

    // Kiểm tra nếu dữ liệu trả về hợp lệ
    if (response && response.data) {
      const token = response.data.token;  // giả sử có token trả về
      const products = response.data.products;  // giả sử có products trong response.data

      // Trả về dữ liệu (token và sản phẩm)
      return { token, products };  // Đảm bảo 'return' nằm trong hàm
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
