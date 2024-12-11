const fetchProducts = async (token) => {
  try {
    const data = { token: token };

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Kiểm tra cấu trúc phản hồi để lấy đúng dữ liệu
    if (response.data && response.data.products && response.data.products.length > 0) {
      console.log('Products fetched successfully:', response.data.products);
      return response.data.products;  // Trả về danh sách sản phẩm
    } else {
      console.error("No products found in response");
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
