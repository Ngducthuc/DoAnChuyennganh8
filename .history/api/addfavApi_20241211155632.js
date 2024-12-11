import axios from 'axios';

const addFavoriteProductApi = async (token, productId) => {
  const url = 'https://doanchuyenganh.site/modelApp/AddFavorite.php'; // Thay URL chính xác của bạn
  const data = {
    token: token,
    product_id: productId,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Nếu server yêu cầu
      },
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error adding favorite:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error adding favorite');
  }
};

export default addFavoriteProductApi;
