import axios from 'axios';

const logoutApi = async (token) => {
  try {
    const data = {
      token: token,
    };
    const response = await axios.post('https://doanchuyenganh.site/modelApp/Token.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('API Response:', response.data);
    return response.data || response.data.message;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export default logoutApi;
