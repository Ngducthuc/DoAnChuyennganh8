import axios from 'axios';

const fetchCategories = async (token) => {
  try {
    console.log("Token for categories:", token); // Log token
    const response = await axios.post('https://doanchuyenganh.site/modelApp/ShowCartegory.php', { token }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log("Category API response:", response.data); // Log phản hồi API
    return response.data.categories || []; // Trả về danh mục
  } catch (error) {
    console.error("Error fetching categories:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};

export default fetchCategories;
