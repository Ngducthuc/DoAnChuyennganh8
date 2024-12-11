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
          'Content-Type': 'application/json', // Sử dụng 'application/json' nếu API yêu cầu như vậy
        },
      }
    );

    // Kiểm tra phản hồi từ API
    console.log('API response:', response.data);

    // Nếu phản hồi chứa dữ liệu sản phẩm
    if (response.data && response.data.products) {
      return response.data.products;  // Trả về danh sách sản phẩm
    } else {
      console.error('No products found or invalid response structure.');
      return [];
    }
  } catch (error) {
    // Xử lý lỗi và in ra thông tin chi tiết
    console.error('Error during search:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default searchProducts;
