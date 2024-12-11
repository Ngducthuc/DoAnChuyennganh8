import axios from 'axios';

// URL của API để lưu lịch sử tìm kiếm
const API_URL = 'https://doanchuyenganh.site/ModelApp/RecentSeach.php';

/**
 * Lưu lịch sử tìm kiếm lên server
 * @param {string} token - Token của người dùng
 * @returns {Promise<boolean>} - Trả về true nếu lưu thành công, false nếu có lỗi
 */
const saveRecentSearch = async (token) => {
  try {
    // Gửi token đến API để lưu lịch sử tìm kiếm
    const response = await axios.post(API_URL,
      {
        token: token,  // Gửi token trong body
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo kiểu dữ liệu là đúng
        },
      }
    );

    // Log toàn bộ dữ liệu trả về để kiểm tra
    console.log('API response:', response.data);

    // Kiểm tra nếu phản hồi từ API là success
    if (response.data.status === 'success') {
      console.log('Lịch sử tìm kiếm đã được lưu');
      return true;
    } else {
      console.error('Không thể lưu lịch sử tìm kiếm');
      return false;
    }
  } catch (error) {
    // Xử lý lỗi và in ra thông tin chi tiết
    console.error('Lỗi trong quá trình lưu lịch sử tìm kiếm:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default saveRecentSearch;
