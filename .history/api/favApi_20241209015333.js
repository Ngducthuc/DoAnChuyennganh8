import axios from 'axios';

// Hàm lấy sản phẩm yêu thích từ API
const fetchFavorites = async (token) => {
  try {
    const data = new URLSearchParams();
    data.append('Token', token);

    const response = await axios.post('https://doanchuyenganh.site/modelApp/FavouriteApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;  // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Failed to fetch favorites');
  }
};

export default fetchFavorites;
