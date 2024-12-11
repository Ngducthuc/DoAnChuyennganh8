import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fetchFavorites from '../api/favApi';

  const FavoritesScreen = ({ token }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Gọi API lấy sản phẩm yêu thích
    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavorites(token);
        setData(favorites);  // Giả sử response.data chứa sản phẩm
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm yêu thích:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadFavorites();
    }, [token]);

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

  return (
    <View style={styles.container}>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
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
