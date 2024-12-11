import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const data = { token };  // Truyền token vào body request
    console.log('Sending token:', token);  // Kiểm tra token đã được truyền đúng chưa

    const response = await axios.post(
      'https://doanchuyenganh.site/ModelApp/ProductApp.php',
      data,
      {
        headers: { 
          'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
        },
      }
    );

    console.log('API Response:', response.data);  // Kiểm tra phản hồi từ API

    // Kiểm tra xem phản hồi có phải là mảng sản phẩm không
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data;  // Trả về mảng sản phẩm nếu có
    } else {
      console.error("No products found in response");
      return [];  // Trả về mảng trống nếu không có sản phẩm
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Ném lỗi nếu gặp phải sự cố
  }
};

export default fetchProducts;
