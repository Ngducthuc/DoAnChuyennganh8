import axios from 'axios';

// Hàm lấy sản phẩm từ API
export const fetchProducts = async (category = 'All') => {
  try {
    let url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm
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
