import axios from 'axios';

const testSearch = async () => {
  const token = 'Ei7rYLzw6C1dNgCiMCENHvp12UMaMj';  // Thay thế bằng token thực tế
  const searchText = 'football';  // Từ khoá tìm kiếm

  try {
    const data = await searchProducts(token, searchText);
    console.log('Search results:', data);
  } catch (error) {
    console.error('Error during search:', error);
  }
};

testSearch();


export default testSearch;
