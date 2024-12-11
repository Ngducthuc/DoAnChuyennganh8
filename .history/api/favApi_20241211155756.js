import axios from 'axios';

const fetchFavorites = async (token) => {
  const url = 'https://doanchuyenganh.site/modelApp/FavouriteApp.php'; // Endpoint API
  const data = {
    token: token,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Nếu server yêu cầu
      },
    });
    return response.data.data || response.data; // Trả về dữ liệu cần thiết
  } catch (error) {
    console.error('Error fetching favorites:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error fetching favorites');
  }
};

export default fetchFavorites;
