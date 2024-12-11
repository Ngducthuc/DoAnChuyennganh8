import axios from 'axios';

const loginApi = async (email, password) => {
  try {

    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',  
      },
    });

    console.log('Response:', response.data);
    return response.data.token || response.data;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export default loginApi;
