import axios from 'axios';

const fetchProducts = async (token) => {
  try {
    const data = { token };  // Truyền token vào body request
    const response = await axios.post(
      'https://doanchuyenganh.site/ModelApp/FetchProducts.php',
      data,
      {
        headers: { 
          'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
        },
      }
    );

    if (response.data && Array.isArray(response.data)) {
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
