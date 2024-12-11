import axios from 'axios';

const searchProducts = async (token, search = '') => {
  try {
    const response = await axios.post(
      'https://doanchuyenganh.site/ModelApp/SeachApp.php',
      {
        token: token,  // Gửi token trong body
        search: search,  // Tham số tìm kiếm
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo kiểu dữ liệu là đúng
        },
      }
    );

    // Log toàn bộ dữ liệu trả về để kiểm tra
    console.log('API response:', response.data);

    // Kiểm tra nếu phản hồi có chứa sản phẩm
    if (response.data && response.data.products) {
      return response.data.products;  // Trả về danh sách sản phẩm
    } else {
      console.error('Không tìm thấy sản phẩm hoặc cấu trúc phản hồi không đúng.');
      return [];
    }
  } catch (error) {
    // Xử lý lỗi và in ra thông tin chi tiết
    console.error('Lỗi trong quá trình tìm kiếm:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default searchProducts;
