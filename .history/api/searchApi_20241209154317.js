import axios from 'axios';

const searchProducts = async (token, searchText = '') => {
  try {
    console.log('Sending request with:', { token, seach: searchText });

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,
      seach: searchText,  // Tìm kiếm theo từ khoá
    });

    // In kết quả trả về từ server
    console.log('API response:', response.data);

    // Kiểm tra dữ liệu trả về có chứa thuộc tính 'products'
    if (response.data && response.data.products) {
      return response.data.products; // Trả về danh sách sản phẩm
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
