const searchProducts = async (token, searchText = '') => {
  try {
    console.log('Sending Request:', {
      token,
      seach: searchText,
    });

    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,
      seach: searchText,  // Tìm kiếm theo từ khóa, có thể là rỗng
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};
