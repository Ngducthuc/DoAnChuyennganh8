import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    // Dữ liệu cần gửi trong body
    const data = {
      token: token,  // Gửi token vào body
    };

    // Gọi API sản phẩm
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo header là đúng
      },
    });

    // Kiểm tra nếu API trả về dữ liệu sản phẩm
    if (response.data && response.data.products) {
      return response.data;  // Trả về danh sách sản phẩm
    } else {
      console.error("No products found in response");
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Đảm bảo bắt lỗi để xử lý khi cần
  }
};

export default fetchProducts;
