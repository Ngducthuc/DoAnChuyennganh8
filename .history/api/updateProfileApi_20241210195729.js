import axios from 'axios';

const updateProfileApi = async (token, name, email) => {
  try {
    const data = {
      token: token,
      name: name,
      email: email,
    };
    const response = await axios.post('https://doanchuyenganh.site/modelApp/UpdateProfile.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response:', response.data);
    return response.data.message || response.data;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Updating profile failed');
  }
};

export default updateProfileApi;
