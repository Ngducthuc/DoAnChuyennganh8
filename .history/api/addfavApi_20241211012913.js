import axios from 'axios';

const addFavorite = async (token, product_id) => {
    try {
      const response = await axios.post(
        'https://doanchuyenganh.site/modelApp/FavouriteApp.php',
        { product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error.message);
      throw error;
    }
  };
export default addFavorite;