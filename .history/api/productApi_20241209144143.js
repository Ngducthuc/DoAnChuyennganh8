import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', {
      token: token,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default fetchProducts;
