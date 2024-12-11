import axios from 'axios';

const getProfileApi = async (token) => {
    try {
      const data = {
        token: token,
      };
      const response = await axios.post('https://doanchuyenganh.site/modelApp/Profile.php', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      console.log('API Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.message || 'Fetching profile failed');
    }
  };
  

export default getProfileApi;
