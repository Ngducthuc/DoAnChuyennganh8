import axios from 'axios';

const BASE_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(BASE_URL, {
      token,
      product_id,
    });

    if (response.data && response.data.success) {
      console.log('Thêm sản phẩm yêu thích thành công:', response.data);
      return response.data;
    } else {
      throw new Error('Không thể thêm sản phẩm yêu thích');
    }
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm yêu thích:', error.message);
    throw error;
  }
};

export default addFavorite;
