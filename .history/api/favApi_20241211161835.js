import axios from 'axios';

const fetchFavorites = async (token) => {
  const url = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php';

  try {
    const response = await axios.post(url, { token }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (response.data?.data) {
      return response.data.data; // Trả về danh sách sản phẩm yêu thích
    } else {
      throw new Error('No favorite data received from the server.');
    }
  } catch (error) {
    console.error('Error fetching favorites:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error fetching favorites');
  }
};

export default fetchFavorites;
