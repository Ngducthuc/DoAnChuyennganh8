const saveRecentSearch = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/RecentSeach.php', {
      token: token,
      // Thêm các thông tin khác nếu API yêu cầu, ví dụ: product_id, product_name
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error saving recent search', error.response?.data || error.message);
  }
};
