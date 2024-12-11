import axios from 'axios';
import { Alert } from 'react-native';

const registerApi = async (nameUser, email, password) => {
  try {
    
    if (!nameUser || !email || !password) {
      throw new Error('Missing required fields');
    }

    
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/Register.php', {
      nameUser,   
      email,      
      password,   
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('API Response:', response.data); 

    if (response.data.success) {
      return response.data;  
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);

    if (error.response && error.response.data) {
      if (error.response.data.message === 'Email already registered') {
        Alert.alert('Error', 'This email is already registered. Please use another email.');
      } else {
        Alert.alert('Error', error.response.data.message || 'An error occurred during registration');
      }
    } else if (error.message === 'Network Error') {
      Alert.alert('Network Error', 'Unable to connect. Please check your internet connection.');
    } else {
      Alert.alert('Error', error.message || 'An error occurred during registration');
    }

    throw new Error(error.response?.data?.message || 'An error occurred during registration');
  }
};

export default registerApi;
