// src/api/registerApi.js
import axios from 'axios';

const registerApi = async (username, email, password) => {
  try {
    
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/Register.php', {
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
    });

    if (response.data.success) {
      return response.data; 
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
