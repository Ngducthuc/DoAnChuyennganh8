import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    console.log('Response:', response.data);
    return response.data.token || response.data;
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export default loginApi;
