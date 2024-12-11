import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', 
      new URLSearchParams({ token }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo rằng kiểu dữ liệu là đúng
        },
      });

    return response.data;  // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProducts;
