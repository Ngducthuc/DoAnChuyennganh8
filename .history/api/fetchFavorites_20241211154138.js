import axios from 'axios';

const fetchFavorites = async (token) => {
    try {
      const response = await axios.get('https://doanchuyenganh.site/modelApp/FavouriteApp.php', {
        params: { token },
      });
  
      console.log('API Response:', response.data); // Thêm log để kiểm tra phản hồi thực tế
  
      if (response.data && Array.isArray(response.data.favorites)) {
        return response.data.favorites;
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
