import axios from 'axios';

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/LoginApp.php', {
      email,
      password,
    });

    console.log('API Response:', response);
    
    if (response.status === 200 && response.data.token) {
      return response.data.token; 
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error.message || error);
    throw new Error('Login failed');
  }
};

export default loginApi; 
