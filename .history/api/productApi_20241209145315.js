import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', {
      token: token,  // Gửi token trong body của request
    });

    // Nếu API trả về dữ liệu sản phẩm, trả lại data đó
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default fetchProducts;
