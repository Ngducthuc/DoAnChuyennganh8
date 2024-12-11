import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    // Gửi token vào body với key là "token"
    const response = await axios.post(
      'https://doanchuyenganh.site/ModelApp/ProductApp.php',
      { token: token },  // Gửi token trong body
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default fetchProducts;
