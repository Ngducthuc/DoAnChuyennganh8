import axios from 'axios';

const fetchCategories = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/modelApp/ShowCartegory.php',
      {
        token: token,  
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }
    );

    // Log toàn bộ dữ liệu trả về để kiểm tra
    console.log('API response:', response.data);

    // Kiểm tra nếu phản hồi có chứa trường 'Code' = 200 và 'Data'
    if (response.data && response.data.Code === 200 && Array.isArray(response.data.Data)) {
      return response.data.Data;  // Trả về danh sách danh mục
    } else {
      console.error('Không tìm thấy danh mục hoặc cấu trúc phản hồi không đúng.');
      return [];  // Nếu không có danh mục, trả về mảng rỗng
    }
  } catch (error) {
    // Xử lý lỗi và in ra thông tin chi tiết
    console.error('Lỗi trong quá trình lấy danh mục:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default fetchCategories;
