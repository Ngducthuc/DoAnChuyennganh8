import axios from 'axios';

const handleSearch = async () => {
  setLoading(true);
  try {
     const token = await AsyncStorage.getItem('token');
     if (token) {
        const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
           token: token,
           search: search,
        });

        if (response.data && response.data.products) {
           setProducts(response.data.products);
        } else {
           console.error('Dữ liệu không hợp lệ từ API:', response.data);
        }
     } else {
        console.error('Không tìm thấy token trong AsyncStorage.');
     }
  } catch (error) {
     console.error('Lỗi trong quá trình tìm kiếm:', error.response ? error.response.data : error.message);
  } finally {
     setLoading(false);
  }
};

export default searchProducts;
