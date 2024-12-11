import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchFavorites } from '../api/favApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        const favoritesData = await fetchFavorites(token); // Gọi API lấy danh sách yêu thích
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error loading favorites:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

    const handleRemoveFavorite = async (productId) => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');
    
        await addFavorite(token, productId); // Gọi API toggle
        setFavorites(favorites.filter((item) => item.product_id !== productId)); // Loại bỏ sản phẩm khỏi danh sách hiển thị
        Toast.show({
          type: 'success',
          text1: 'Đã xóa khỏi mục yêu thích',
        });
      } catch (error) {
        console.error('Error removing favorite:', error);
        Toast.show({
          type: 'error',
          text1: 'Không thể xóa khỏi mục yêu thích',
        });
      }
    };
    
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewText}>({item.reviews})</Text>
        </View>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>; // Hiển thị khi đang tải dữ liệu
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.product_id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text>{item.name}</Text>
        </View>
      )}
    />
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
