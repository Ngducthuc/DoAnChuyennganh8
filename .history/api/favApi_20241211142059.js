import axios from 'axios';

// URL API của bạn
const BASE_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

// Thêm sản phẩm yêu thích hoặc xóa sản phẩm yêu thích
export const toggleFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(BASE_URL, { token, product_id });
    console.log(`Response from server:`, response.data);
    return response.data; // Server trả về trạng thái hoặc thông báo
  } catch (error) {
    console.error('Error toggling favorite:', error.message);
    throw error;
  }
};

// Lấy danh sách sản phẩm yêu thích
export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { token },
    });
    return response.data.favorites; // Server trả về danh sách yêu thích
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    throw error;
  }
};
