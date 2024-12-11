import axios from 'axios';

const fetchFavoritesApi = async (token) => {
  try {
    const data = {
      token: token, // Gửi token vào body
    };

    const response = await axios.post('https://doanchuyenganh.site/modelApp/FavouriteApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Định dạng dữ liệu gửi
      },
    });

    console.log('API Response:', response.data);
    return response.data.data || response.data; // Trả về dữ liệu cần thiết
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Fetching favorites failed');
  }
};

export default fetchFavoritesApi;
