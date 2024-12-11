import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import fetchFavorites from '../api/favApi';
import Toast from 'react-native-toast-message';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token không tồn tại.');
        }
    
        const favoriteProducts = await fetchFavorites(token); // Lấy danh sách yêu thích từ server
        const products = favoriteProducts.flatMap(item => item.data_product_id); // Lọc sản phẩm từ data_product_id
    
        // Loại bỏ các mục trùng lặp dựa trên `product_id`
        const uniqueProducts = products.filter(
          (product, index, self) =>
            index === self.findIndex(p => p.product_id === product.product_id)
        );
    
        setFavorites(uniqueProducts || []); // Cập nhật danh sách yêu thích
      } catch (error) {
        console.error('Lỗi khi tải danh sách yêu thích:', error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchFavoriteProducts();
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại.');
  
      // Gọi API để xóa sản phẩm khỏi danh sách yêu thích
      const response = await axios.post(
        'https://doanchuyenganh.site/modelApp/FavouriteApp.php', // Endpoint API
        new URLSearchParams({
          token, // Đưa token vào body
          product_id: productId, // Đưa product_id vào body
        }).toString(), // Chuyển đổi thành x-www-form-urlencoded
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Đảm bảo Content-Type phù hợp
          },
        }
      );
  
      console.log('Phản hồi từ API:', response.data);
  
      // Kiểm tra phản hồi thành công
      if (response.data?.Code === 200) {
        // Cập nhật danh sách yêu thích sau khi xóa thành công
        setFavorites(favorites.filter((item) => item.product_id !== productId));
        Toast.show({
          type: 'success',
          text1: 'Đã xóa khỏi mục yêu thích',
        });
      } else {
        throw new Error(response.data?.Message || 'Không thể xóa sản phẩm');
      }
    } catch (error) {
      console.error('Lỗi khi xóa khỏi mục yêu thích:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Không thể xóa khỏi mục yêu thích',
      });
    }
  };
  
  

    const renderFavoriteItem = ({ item }) => (
      <View style={styles.itemContainer}>
        {/* Hình ảnh sản phẩm */}
        <Image source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }} style={styles.itemImage} />
        
        {/* Thông tin sản phẩm */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product_name}</Text>
          <Text style={styles.itemPrice}>{parseInt(item.product_price_new, 10).toLocaleString()}đ</Text>
        </View>

        {/* Nút yêu thích */}
        <TouchableOpacity onPress={() => handleRemoveFavorite(item.product_id)}>
          <Ionicons name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );


    const filteredFavorites = favorites.filter((item) =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
  
    if (favorites.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Không có sản phẩm yêu thích nào.</Text>
        </View>
      );
    }

  return (
    <View style={styles.container}>

      {/* Danh sách yêu thích */}
      {filteredFavorites.length > 0 ? (
        <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => `${item.product_id}`} // Sử dụng product_id làm key
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Không có sản phẩm yêu thích nào.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemBrand: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 14,
    color: '#808080',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default FavoritesScreen;