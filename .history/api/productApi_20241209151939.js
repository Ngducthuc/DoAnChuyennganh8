const fetchProducts = async (token) => {
  try {
    const data = {
      token: token,
    };

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/ProductApp.php', data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data && Array.isArray(response.data)) {
      return response.data;  // Trả về trực tiếp mảng sản phẩm
    } else {
      console.error("No products found in response");
      return [];  // Nếu không có sản phẩm
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
