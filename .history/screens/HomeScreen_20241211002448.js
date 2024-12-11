import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import fetchProducts from '../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchCategories from '../api/categoryApi'; 
import ProductList from '../screens/ProductList';



//Ham cate
const CateSlide = ({ visible, onClose, onSelectCategory, categories }) => {
  const slideAnim = useRef(new Animated.Value(-400)).current;


  const openSlide = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlide = () => {
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  useEffect(() => {
    if (visible) {
      openSlide();
    } else {
      closeSlide();
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity onPress={closeSlide} style={styles.closeButton}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.filterTitle}>Collection</Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.cartegory_id}  // Sử dụng cartegory_id làm key
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => onSelectCategory(item)}  // Truyền đối tượng danh mục khi chọn
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </Animated.View>
  );
};


const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ';
  };

  // Lấy token từ AsyncStorage
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Lấy danh mục từ API
  const fetchCategoryData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
      if (!storedToken) {
        console.error("Token not found");
        return;
      }
  
      const categories = await fetchCategories(storedToken); // Gọi API danh mục
      setCategories(categories); // Cập nhật danh mục vào state
    } catch (error) {
      console.error('Error fetching categories:', error.message || error);
    }
  };

  const fetchProductData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        console.error("Token not found");
        setLoading(false);
        return;
      }
  
      const response = await fetchProducts(storedToken);
      console.log('API Response:', response);
  
      if (Array.isArray(response) && response.length > 0) {
        setProducts(response);  // Gán mảng sản phẩm vào state
      } else {
        console.error("No products found in response");
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchProductData = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await fetchProducts(token);
      setProducts(response);
      setLoading(false);
    };

    fetchProductData();
  }, []);
  

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailScreen', { productId: product.product_id });
  };

  
  //ham su kien chon cate
  const handleSelectCategory = (category) => {
    setSelectedCategory(category.name);
    setSliderVisible(false);
  };

  // Hàm hiển thị sản phẩm
  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{
          uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}`,
        }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.price}>
        {item.product_price_new ? formatPrice(item.product_price_new) : formatPrice(item.product_price)} 
      </Text>
    </View>
  );

  //ham load them sp
  const loadMoreProducts = () => {
    const currentProductCount = products.length;
    const remainingProducts = 5;
    if (remainingProducts > 0) {
      const nextProducts = products.slice(0, currentProductCount + remainingProducts);
      setProducts(nextProducts);
    }
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  // Hiển thị nếu không có sản phẩm
  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar: category & cart icons */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setSliderVisible(!sliderVisible)}>
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
           <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
        </TouchableOpacity>
      </View>

      {/* Hiển thị trang trượt */}
      <CateSlide visible={sliderVisible} onClose={() => setSliderVisible(false)} onSelectCategory={handleSelectCategory} />

      {/* Hiển thị các sản phẩm */}
      <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.product_id ? item.product_id.toString() : item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.product_id })}
            >
              <Image 
                source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.image.split('/').pop()}` }} 
                style={styles.productImage} 
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{formatPrice(item.price_new)}</Text>
            </TouchableOpacity>
          )}  
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
        />
    </SafeAreaView>
  );
};

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    height: 40,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  sliderItem: {
    marginRight: 16,
  },
  sliderImage: {
    width: 420,
    height: 250,
    borderRadius: 0,
  },
  slider: {
    height: 200, // Adjust the height of the slider
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: '#000000',
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryList: {
    padding: 20,
  },
  categoryItem: {
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 18,
    color: '#000000',
  },
  productItem: {
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
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa tên sản phẩm
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Căn giữa các cột
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
