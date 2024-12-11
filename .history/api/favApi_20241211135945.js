import axios from 'axios';

const BASE_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

// Thêm sản phẩm yêu thích
export const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(BASE_URL, { token, product_id });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    throw error;
  }
};

// Lấy danh sách sản phẩm yêu thích
export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { token },
    });
    return response.data.favorites; // Giả sử danh sách trả về nằm trong `favorites`
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    throw error;
  }
};
