import axios from 'axios';

const fetchProductDetails = async (productId) => {
  try {
    const data = { product_id: productId };

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/DetailProduct.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Kiểm tra cấu trúc phản hồi để lấy đúng dữ liệu
    if (response.data) {
      console.log('Product details fetched successfully:', response.data);
      return response.data; // Trả về chi tiết sản phẩm
    } else {
      console.error("No product details found in response");
      return null;
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export default fetchProductDetails; 
