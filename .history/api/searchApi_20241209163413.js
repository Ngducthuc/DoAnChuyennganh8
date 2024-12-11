import axios from 'axios';

const searchProducts = async (token, search = '') => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,
      search: search
   }, {
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      }
   });
   

    console.log('API response:', response.data);

    // Kiểm tra nếu có sản phẩm trong response
    if (response.data && response.data.products) {
      return response.data.products;  // Trả về danh sách sản phẩm
    } else {
      console.error('No products found or invalid response structure.');
      return [];
    }
  } catch (error) {
    console.error('Error during search:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default searchProducts;
