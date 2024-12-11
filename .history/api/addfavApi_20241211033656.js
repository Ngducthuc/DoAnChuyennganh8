import axios from 'axios';

// URL API chung
const API_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

// Hàm thêm sản phẩm vào danh sách yêu thích
export const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(API_URL, { token, product_id });
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Hàm lấy danh sách sản phẩm yêu thích
export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Trả về danh sách yêu thích từ phản hồi
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export default {
  addFavorite,
  fetchFavorites,
};
