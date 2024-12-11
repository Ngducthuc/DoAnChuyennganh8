import axios from 'axios';

const fetchProductDetails = async (productId) => {
  const url = 'https://doanchuyenganh.site/ModelApp/DetailProduct.php';
  const data = { product_id: productId };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data?.Code === 200 && response.data.Data) {
      return response.data; // Trả về chi tiết sản phẩm
    } else {
      throw new Error('No product details found.');
    }
  } catch (error) {
    console.error('Error fetching product details:', error.response ? error.response.data : error.message);
    if (error.response?.status === 500) {
      console.error('Server error: Please check backend logic or database connection.');
    }
    throw error;
  }
};


export default fetchProductDetails; 
