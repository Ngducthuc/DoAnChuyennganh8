import axios from 'axios';

// Hàm tìm kiếm sản phẩm
const searchProducts = async (token, searchText) => {
  try {
    // Tạo data gửi đi
    const data = new URLSearchParams();
    data.append('token', token); // Thêm token vào request
    data.append('seach', searchText); // Thêm từ khóa tìm kiếm vào request (cho phép rỗng)

    // Gửi POST request tới API
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data; // Trả về dữ liệu
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw new Error('Failed to fetch search results');
  }
};

export default searchProducts;
