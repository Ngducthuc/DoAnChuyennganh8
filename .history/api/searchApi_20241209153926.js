// searchApi.js
import axios from 'axios';

const searchProducts = async (token, searchText = '') => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,
      seach: searchText,  // Tìm kiếm theo từ khóa, có thể là rỗng
    });

    return response.data;
  } catch (error) {
    console.error('Error during search:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export default searchProducts;
