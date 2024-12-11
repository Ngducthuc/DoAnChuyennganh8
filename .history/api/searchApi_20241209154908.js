import axios from 'axios';

const testSearch = async () => {
  const token = 'Ei7rYLzw6C1dNgCiMCENHvp12UMaMj';  // Token thực tế
  const searchText = 'football';  // Từ khoá tìm kiếm

  try {
    const products = await searchProducts(token, searchText);
    console.log('Search results:', products);  // Hiển thị kết quả tìm kiếm
  } catch (error) {
    console.error('Error during search:', error);
  }
};

testSearch();


export default testSearch;
