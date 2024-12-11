import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchProductDetails from '../api/productdetailApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useCart } from '../screens/CartContext';
import addFavoriteProductApi from '../api/addfavApi';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Lấy productId từ tham số điều hướng
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
  const { addToCart } = useCart();


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const details = await fetchProductDetails(productId); // Gọi API lấy chi tiết sản phẩm
        if (details?.Data?.length > 0) {
          setProductDetails(details.Data[0]); // Lấy thông tin sản phẩm đầu tiên từ Data
        } else {
          console.error('No product details found.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    // Kiểm tra sản phẩm có nằm trong danh sách yêu thích hay không
    const checkIfFavorite = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const favorites = await fetchFavorites(token); // Lấy danh sách yêu thích từ server
        const isFav = favorites.some((item) => item.product_id === productId); // Kiểm tra xem sản phẩm có trong danh sách không
        setIsFavorite(isFav); // Cập nhật trạng thái yêu thích
        console.log(
          `Trạng thái yêu thích của sản phẩm (ID: ${productId}): ${isFav}`
        );
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    getProductDetails();
    checkIfFavorite();
  }, [productId]);


  useEffect(() => {
    const fetchProductDetailsAndFavoriteStatus = async () => {
      setLoading(true);
      try {
        // Lấy chi tiết sản phẩm
        const details = await fetchProductDetails(productId);
        if (details?.Data?.length > 0) {
          setProductDetails(details.Data[0]);
        } else {
          console.error('Không tìm thấy thông tin sản phẩm.');
        }
  
        // Lấy danh sách yêu thích và kiểm tra trạng thái
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token không tồn tại.');
  
        const favorites = await fetchFavorites(token);
        console.log('Danh sách yêu thích:', favorites);
  
        const isFav = Array.isArray(favorites) && favorites.some((item) => item.product_id === productId);
        setIsFavorite(isFav);
        console.log(`Trạng thái yêu thích của sản phẩm (ID: ${productId}): ${isFav}`);
      } catch (error) {
        console.error('Lỗi đồng bộ trạng thái yêu thích:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetailsAndFavoriteStatus();
  }, [productId]);
    
  
  const handleAddToCart = () => {
    addToCart({
      id: productDetails.product_id,
      name: productDetails.product_name,
      price: parseInt(productDetails.product_price_new),
      image: `https://doanchuyenganh.site/admin/uploads/${productDetails.product_img}`,
      quantity,
    });

    Toast.show({
      type: 'success',
      text1: 'Sản phẩm đã được thêm vào giỏ hàng',
    });
  };
  
  const handleAddToFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token không tồn tại.');
      }
  
      await addFavorite(token, productId); // Gửi yêu cầu thêm sản phẩm yêu thích lên server
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState); // Đổi trạng thái yêu thích
  
      // Gọi lại API fetchFavorites để đồng bộ danh sách yêu thích
      const updatedFavorites = await fetchFavorites(token);
      console.log('Danh sách yêu thích được cập nhật:', updatedFavorites);
  
      Toast.show({
        type: 'success',
        text1: newFavoriteState
          ? 'Đã thêm vào mục yêu thích'
          : 'Đã xóa khỏi mục yêu thích',
      });
    } catch (error) {
      console.error('Error handling favorite:', error);
      Toast.show({
        type: 'error',
        text1: 'Không thể cập nhật mục yêu thích',
      });
    }
  };
  


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!productDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không thể tải chi tiết sản phẩm.</Text>
        <TouchableOpacity onPress={fetchProductDetails} style={styles.retryButton}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `https://doanchuyenganh.site/admin/uploads/${productDetails.product_img}` }}
          style={styles.productImage}
          resizeMode="contain"
        />
        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteIcon} onPress={handleAddToFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{productDetails.product_name}</Text>

        {/* Giá cũ và giá mới */}
        <View style={styles.priceContainer}>
          {productDetails.product_price && (
            <Text style={styles.productPriceOld}>
              {parseInt(productDetails.product_price).toLocaleString()}đ
            </Text>
          )}
          <Text style={styles.productPriceNew}>
            {parseInt(productDetails.product_price_new).toLocaleString()}đ
          </Text>
        </View>

        <Text style={styles.productDescription}>{productDetails.product_desc}</Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
        <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))} // Giảm, nhưng không nhỏ hơn 1
        >
            <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((prev) => prev + 1)} // Tăng
        >
            <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  productImageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%', // Chiều rộng chiếm 100% màn hình
    height: 300,   // Chiều cao tùy ý, bạn có thể điều chỉnh theo thiết kế
    resizeMode: 'contain', // Hoặc 'cover' nếu bạn muốn ảnh lấp đầy mà không giữ tỷ lệ
  },
  favoriteIcon: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 10, // Cách mép trên
    right: 10, // Cách mép phải
    backgroundColor: '#fff', // Nền trắng
    padding: 8, // Khoảng cách padding bên trong
    borderRadius: 20, // Bo tròn
    shadowColor: '#000', // Thêm bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Bóng cho Android
  },  
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#f00',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productPriceOld: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through', // Thêm dấu gạch ngang qua giá cũ
    marginRight: 10,
  },
  productPriceNew: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    textDecorationLine: 'none', // Giá mới không gạch ngang
  },
});

export default ProductDetailScreen;
