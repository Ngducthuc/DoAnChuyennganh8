import axios from 'axios';

// Hàm lấy sản phẩm từ API
export const fetchProducts = async () => {
  try {
    const url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm

    const response = await axios.get(url);
    return response.data;  // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
