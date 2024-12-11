import axios from 'axios';

// Hàm lấy sản phẩm từ API
export const fetchProducts = async (category = 'All') => {
  try {
    const url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm

    const response = await axios.post(url, {
      category: category,  // Gửi tham số category trong body
    });

    return response.data;  // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
