import axios from 'axios';

const fetchCategories = async (token) => {
  try {
    const response = await axios.post(
      'https://doanchuyenganh.site/modelApp/ShowCartegory.php',
      { token },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    console.log("Category API Response:", response.data);
    return response.data.Data || []; // Trả về mảng danh mục
  } catch (error) {
    console.error("Error fetching categories:", error.message || error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
export default fetchCategories;


export default fetchCategories;
