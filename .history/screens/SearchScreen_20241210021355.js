import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import searchProducts from '../api/searchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import fetchCategories from '../api/recentsearchApi';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(0);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const navigation = useNavigation(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');  // Đảm bảo token được truyền vào đúng
  const [recentSearches, setRecentSearches] = useState([]);


  const categories = [
    'All',
    'Outer',
    'Knitwear',
    'T-shirt',
    'Polo Shirt',
    'Shirt',
    'Sweatershirt & Hoodie',
    'Bottoms',
  ];

  // Hàm lấy token từ AsyncStorage
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        console.log("Token retrieved:", storedToken);
        setToken(storedToken);
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Hàm lưu sản phẩm vào lịch sử tìm kiếm trên server
  const saveRecentSearch = async (token, product) => {
    try {
      const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
        token,
        product_id: product.product_id,
        product_name: product.product_name,
        product_img: product.product_img,
        product_price_new: product.product_price_new,
      });
      console.log('Recent search saved', response.data);
    } catch (error) {
      console.error('Error saving recent search', error);
    }
  };

  // Lưu sản phẩm vào AsyncStorage
  const saveRecentSearchLocally = async (product) => {
    try {
      const storedSearches = await AsyncStorage.getItem('recentSearches');
      const recentSearches = storedSearches ? JSON.parse(storedSearches) : [];
      const updatedSearches = [product, ...recentSearches.filter(item => item.product_id !== product.product_id)];
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving recent search locally', error);
    }
  };

  const handleSearch = async () => {
    if (!token) {
      console.error("Token không có sẵn");
      return;
    }
  
    console.log("Token:", token);  // In token ra để kiểm tra
    setLoading(true);
    
    try {
      const response = await searchProducts(token, search);
      console.log("API Response:", response);  // Log toàn bộ phản hồi API
      
      // Kiểm tra nếu phản hồi là mảng và có sản phẩm
      if (Array.isArray(response) && response.length > 0) {
        setProducts(response);  // Cập nhật danh sách sản phẩm
      } else {
        // Nếu không có sản phẩm hoặc mảng rỗng
        console.error("Không tìm thấy sản phẩm");
        setProducts([]);  // Đảm bảo đặt sản phẩm thành mảng rỗng nếu không có sản phẩm
      }
    } catch (error) {
      // Log lỗi chi tiết để giúp xác định nguyên nhân
      console.error("Lỗi trong quá trình tìm kiếm:", error.response ? error.response.data : error.message);
      setProducts([]);  // Đảm bảo danh sách sản phẩm là rỗng khi có lỗi
    } finally {
      setLoading(false);  // Dừng loading khi xong
    }
  };

  // Hàm xử lý khi nhấn vào sản phẩm
  const handleProductClick = async (product) => {
    setRecentSearches((prev) => {
      const exists = prev.find((item) => item.product_id === product.product_id);
      if (exists) return prev;
      return [product, ...prev];
    });

    // Lưu sản phẩm vào AsyncStorage và Backend
    if (token) {
      await saveRecentSearch(token, product);
    } else {
      console.error("User not logged in");
    }
    await saveRecentSearchLocally(product);
  };

  // Đọc lại danh sách Recent Search từ AsyncStorage hoặc API
  const loadRecentSearches = async () => {
    try {
      // Đọc từ AsyncStorage
      const storedSearches = await AsyncStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches', error);
    }

    // Nếu cần, bạn cũng có thể gọi API để lấy lịch sử tìm kiếm từ backend
    if (token) {
      try {
        const response = await axios.get('https://yourapi.com/api/recent-search', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setRecentSearches(response.data);
      } catch (error) {
        console.error('Error fetching recent searches from server', error);
      }
    }
  };
  
  // Gọi getToken khi component mount
  useEffect(() => {
    getToken();
  }, []);

  // Gọi handleSearch khi search thay đổi
  useEffect(() => {
    if (search.trim() !== '') {
      handleSearch();
    }
  }, [search]);

  //ham loc
  const toggleFilter = () => {
    const toValue = filterVisible ? 300 : 0;
    setFilterVisible(!filterVisible);
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCategoryPress = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
  };

  const applyFilters = () => {
    toggleFilter();
  };


  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

     
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={text => setSearch(text)} // Cập nhật search (text))
          />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

     
      {filterVisible && <View style={styles.overlay} />}

   
      <Animated.View style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.filterContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleFilter}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.filterTitle}>Filter</Text>
         
     
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category} 
                style={[
                  styles.categoryButton, 
                  selectedCategories.includes(category) && styles.selectedCategory
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          
          <View style={styles.priceFilter}>
            <Text style={styles.priceTitle}>Price: {price.toLocaleString()}đ</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={5000000} 
              step={10000} 
              value={price} 
              onValueChange={(value) => setPrice(value)} 
              minimumTrackTintColor="black" 
              maximumTrackTintColor="#d3d3d3" 
              thumbTintColor="black"
            />

            <View style={styles.priceLabelContainer}>
              <Text style={styles.priceLabel}>0đ</Text>
              <Text style={styles.priceLabel}>5,000,000đ</Text>
            </View>
          </View>

        
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Text style={styles.sectionTitle}>Recent Search</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.product_id.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.recentSearchItem}>
            <Image
              source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }}
              style={styles.recentSearchImage}
              resizeMode="cover"
            />
            <Text style={styles.recentSearchText}>{item.product_name}</Text>
          </View>
        )}
      />


      {/* Hiển thị kết quả tìm kiếm */}
      <Text style={styles.sectionTitle}>Search Results</Text>
      <FlatList
      data={products}
      keyExtractor={(item) => item.product_id.toString()}
      numColumns={2} // Hiển thị theo dạng grid với 2 cột
      contentContainerStyle={styles.searchResultsContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
         style={styles.productItem}
         onPress={() => handleProductClick(item)}>
           <Image
             source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }}
              style={styles.productImage}
            resizeMode="cover"
          />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>{item.product_price_new}đ</Text>
    </TouchableOpacity>
  )}
/>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 0, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white', 
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    zIndex: 1,
  },
  filterContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  categoriesTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  categoryButton: {
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginVertical: 6,
    alignSelf: 'flex-start', 
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
  priceFilter: {
    marginVertical: 20,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  priceLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'white', 
    padding: 10,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  applyButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  clearButtonText: {
    color: 'gray',
    textAlign: 'center',
  },
  applyButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000000',
  },
  mutedContainer: {
    opacity: 0.3,
  },
  recentSearchContainer: {
    marginBottom: 30, // Đảm bảo không bị che bởi phần sau
  },
  
  recentSearchItem: {
    width: 150, // Điều chỉnh kích thước cho cân đối
    height: 180, // Điều chỉnh chiều cao cho cân bằng
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 5, // Thêm padding để căn chỉnh nội dung tốt hơn
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center', // Căn giữa nội dung
    justifyContent: 'flex-start', // Căn nội dung lên phía trên
  },
  
  recentSearchImage: {
    width: '100%', // Đảm bảo ảnh chiếm toàn bộ chiều rộng của container
    height: 120, // Đảm bảo chiều cao của ảnh
    borderTopLeftRadius: 10, // Bo tròn các góc trên của ảnh
    borderTopRightRadius: 10, // Bo tròn các góc trên của ảnh
    resizeMode: 'cover', // Đảm bảo ảnh bao phủ toàn bộ container, có thể bị cắt nhưng giữ tỷ lệ
  },
  
  recentSearchText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', // Màu chữ tối hơn cho dễ đọc
    textAlign: 'center',
    marginBottom: 10, // Khoảng cách giữa văn bản và hình ảnh
    paddingHorizontal: 5,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333', // Màu chữ tối cho tiêu đề
  },
  
  flatListContainer: {
    flexDirection: 'row',
    paddingVertical: 10, 
    flexWrap: 'wrap', // Cho phép các mục cuộn sang dòng tiếp theo
    justifyContent: 'flex-start', // Căn trái các mục
  },
  
  // Style cho kết quả tìm kiếm để tránh bị che bởi phần trên
  searchResultsContainer: {
    marginTop: 40, // Đảm bảo khoảng cách giữa các phần
  },
  searchResultsContainer: {
    marginTop: 20, // Khoảng cách trên cùng
    marginBottom: 20, // Khoảng cách dưới cùng
    justifyContent: 'space-between',
  },

  // Style cho từng item sản phẩm
  productItem: {
    width: '48%', // Đảm bảo mỗi sản phẩm chiếm 48% chiều rộng của màn hình
    marginBottom: 20, // Khoảng cách giữa các sản phẩm
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },

  productImage: {
    width: '100%',
    height: 150, // Điều chỉnh chiều cao của ảnh
    borderRadius: 10, // Bo góc ảnh
    resizeMode: 'cover',
    marginBottom: 10, // Khoảng cách giữa ảnh và tên sản phẩm
  },

  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },

  productPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchScreen;
