import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import searchProducts from '../api/searchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Không tìm thấy token trong AsyncStorage.');
        return; // Token không có, không thực hiện tìm kiếm
      }
  
      // Gửi yêu cầu API với token và search trong body
      const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
        token: token,  // Gửi token trong body
        search: search,  // Tham số tìm kiếm
      });
  
      // Xử lý kết quả trả về
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        console.error('Dữ liệu không hợp lệ từ API:', response.data);
      }
    } catch (error) {
      console.error('Lỗi trong quá trình tìm kiếm:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  
 


  // Gọi tìm kiếm khi `search` thay đổi
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

    
      <View style={filterVisible ? styles.mutedContainer : null}>
        <Text style={styles.sectionTitle}>Recent Search</Text>
        <FlatList
          data={recentSearches} 
          numColumns={3}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item }) => (
            <View style={styles.recentSearchItem}>
              <Image source={item.image} style={styles.recentSearchImage} />
              <Text style={styles.recentSearchText}>{item}</Text>
            </View>
          )}
          columnWrapperStyle={{ justifyContent: 'flex-start' }} 
        />
      </View>

      {/* Hiển thị kết quả tìm kiếm */}
      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image
                source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.price}>{item.product_price_new}</Text>
            </View>
          )}
        />
      </View>
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
  recentSearchItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  recentSearchImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recentSearchText: {
    padding: 10,
    textAlign: 'center',
  },
});

export default SearchScreen;
