import axios from 'axios';

const fetchFavorite = async (token, productId) => {
  try {
    const data = {
      token: token,
      product_id: productId,
    };
    const response = await axios.post(
      'https://doanchuyenganh.site/modelApp/FavouriteApp.php',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Kết quả từ API:', response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Lỗi API:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Thêm sản phẩm yêu thích thất bại');
  }
};

export default fetchFavorite;
