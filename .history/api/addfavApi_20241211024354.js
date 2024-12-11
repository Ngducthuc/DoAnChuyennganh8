import axios from 'axios';

const addFavorite = async (token) => {
  try {
    const response = await axios.post(
      'https://doanchuyenganh.site/modelApp/FavouriteApp.php',
      { token } // Chỉ gửi token trong body
    );
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    throw error;
  }
};

export default addFavorite;
