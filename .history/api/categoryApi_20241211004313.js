import axios from 'axios';

const fetchCategories = async (token) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/modelApp/ShowCartegory.php',
      { token }, // Chỉ truyền token trong body
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log("Category API response:", response.data);
    return response.data.Data || []; // Trả về danh sách danh mục từ `Data`
  } catch (error) {
    console.error("Error fetching categories:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};

export default fetchCategories;
