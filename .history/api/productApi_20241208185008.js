import axios from 'axios';

// Hàm lấy sản phẩm từ API
export const fetchProducts = async (category = 'All') => {
  try {
    const data = new URLSearchParams();
    data.append('category', category);

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
