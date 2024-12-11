const addFavoriteProductApi = async (token, productId) => {
  const url = 'https://doanchuyenganh.site/modelApp/AddFavorite.php';
  const data = {
    token: token,
    product_id: productId,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data?.Code === 200) {
      return response.data;
    } else {
      throw new Error('Failed to add favorite.');
    }
  } catch (error) {
    console.error('Error adding favorite:', error.response ? error.response.data : error.message);
    throw error;
  }
};
