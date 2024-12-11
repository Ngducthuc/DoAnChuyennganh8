import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const formData = new URLSearchParams();
    formData.append('token', token);

    const response = await axios.post(
      'https://doanchuyenganh.site/ModelApp/ProductApp.php',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Trả về toàn bộ dữ liệu từ API
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Ném lỗi để xử lý tại nơi gọi
  }
};

export default fetchProducts;
