import axios from 'axios';

const BASE_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

// Lấy danh sách sản phẩm yêu thích
export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get('https://doanchuyenganh.site/modelApp/FavouriteApp.php', {
      params: { token },
    });

    if (response.data && response.data.favorites) {
      return response.data.favorites; // Trả về danh sách yêu thích
    } else {
      console.warn('Danh sách yêu thích rỗng hoặc không tồn tại:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu thích:', error.message);
    return [];
  }
};

// Thêm sản phẩm yêu thích
export const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(BASE_URL, { token, product_id });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm yêu thích:', error.message);
    throw error;
  }
};
