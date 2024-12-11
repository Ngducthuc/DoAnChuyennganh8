import axios from 'axios';

// Hàm lưu sản phẩm vào recent search trên server
const saveRecentSearch = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/RecentSeach.php', {
      token: token,
    });
    console.log('Recent search saved', response.data);
  } catch (error) {
    console.error('Error saving recent search', error);
  }
};


export default saveRecentSearch;
