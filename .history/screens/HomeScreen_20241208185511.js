import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import fetchProducts from '../api/productApi';

//Ham cate
const CateSlide = ({ visible, onClose, onSelectCategory }) => {
  const slideAnim = useRef(new Animated.Value(-400)).current;

  const categories = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Outer' },
    { id: '3', name: 'Knitwear' },
    { id: '4', name: 'T-shirt' },
    { id: '5', name: 'Shirt' },
    { id: '6', name: 'Sweatershirt & Hoodie' },
    { id: '7', name: 'Bottoms' },
  ];

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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => onSelectCategory(item)}  
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

// Component Slider
const Slider = () => {
  const images = [
    { id: '1', source: require('../assets/images/Slider1.png') },
    { id: '2', source: require('../assets/images/Slider2.png') },
  ];

  return (
    <FlatList
      horizontal
      data={images}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.sliderItem}>
          <Image source={item.source} style={styles.sliderImage} />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.slider}
    />
  );
};


const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(true);
  const [token, setToken] = useState('');

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ';
  };

  // Lấy sản phẩm từ API
  const fetchProductData = async () => {
    try {
      // Kiểm tra token trước khi gọi API
      console.log('Token:', token);  // Kiểm tra token trước khi gọi API

      if (!token) {
        console.error('Token is required');  // Nếu không có token, báo lỗi
        return;
      }

      // Gọi fetchProducts với category và token
      const response = await fetchProducts('All', token);  // Đảm bảo truyền token vào hàm fetchProducts
      console.log('API Response:', response);  // Kiểm tra phản hồi từ API

      setProducts(response.products);  // Cập nhật sản phẩm vào state
      setLoading(false);  // Đổi trạng thái loading khi dữ liệu đã được tải
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);  // Đảm bảo trạng thái loading được cập nhật khi có lỗi
    }
  };

  useEffect(() => {
    fetchProductData();  // Gọi API khi màn hình load hoặc token thay đổi
  }, [token]);  // Kiểm tra thay đổi của token

  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;  // Hiển thị khi đang tải dữ liệu
  }
  
  // Hàm xử lý khi chọn danh mục
  const handleSelectCategory = (category) => {
    setSelectedCategory(category.name);
    setSliderVisible(false);
  };

  // Hàm load thêm sản phẩm
  const loadMoreProducts = () => {
    const currentProductCount = products.length;
    const remainingProducts = 5; // Giả sử bạn muốn tải thêm 5 sản phẩm mỗi lần

    if (remainingProducts > 0) {
      const nextProducts = products.slice(0, currentProductCount + remainingProducts);
      setProducts(nextProducts);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar: category & cart icons */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setSliderVisible(!sliderVisible)}>
          <Image source={require('../assets/images/cate_icon.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/cart_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Hiển thị trang trượt */}
      <CateSlide visible={sliderVisible} onClose={() => setSliderVisible(false)} onSelectCategory={handleSelectCategory} />

      {/* Hiển thị các sản phẩm */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.image.split('/').pop()}` }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{formatPrice(item.price_new)}</Text>
          </View>
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
