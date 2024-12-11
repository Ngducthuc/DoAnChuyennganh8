import axios from 'axios';

// Lấy danh sách sản phẩm yêu thích
const fetchFavorites = async (token) => {
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

export default fetchFavorites;
