import axios from 'axios';

const searchProducts = async (token, searchText = '') => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,  // Gửi token vào body
      seach: searchText,  // Gửi từ khoá tìm kiếm vào body
    });

    return response.data;  // Trả về kết quả từ API
  } catch (error) {
    if (error.response) {
      // In ra thông báo lỗi từ server
      console.error('Server responded with:', error.response.data);
      console.error('Status code:', error.response.status);
    } else {
      // Nếu không có lỗi từ server, in ra lỗi của client
      console.error('Error during request:', error.message);
    }
    throw error;  // Ném lại lỗi cho phần xử lý tiếp theo
  }
};

export default searchProducts;
