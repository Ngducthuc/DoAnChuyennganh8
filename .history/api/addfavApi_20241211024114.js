import axios from 'axios';

const addFavorite = async (token, product_id) => {
  try {
    const response = await axios.post(
      'https://doanchuyenganh.site/modelApp/FavouriteApp.php',
      { token, product_id }, // Gửi token và product_id trong body
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    throw error;
  }
};

export default addFavorite;
