import axios from 'axios';

const BASE_URL = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

// Hàm thêm sản phẩm yêu thích
export const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(BASE_URL, { token, product_id });
    return response.data; // Đảm bảo trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi thêm yêu thích:', error.message);
    throw error;
  }
};

// Hàm lấy danh sách yêu thích
export const fetchFavorites = async (token) => {
  try {
    const response = await axios.get(BASE_URL, { params: { token } });
    return response.data.favorites || []; // Đảm bảo trả về danh sách yêu thích hoặc mảng rỗng
  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu thích:', error.message);
    throw error;
  }
};
