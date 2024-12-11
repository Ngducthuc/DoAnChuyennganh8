import axios from 'axios';

const addFavoriteProductApi = async (token, productId) => {
  try {
    const data = {
      token: token,
      product_id: productId,
    };

    const response = await axios.post(
      'https://doanchuyenganh.site/modelApp/FavouriteApp.php',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('API Response:', response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Adding favorite product failed');
  }
};

export default addFavoriteProductApi;
