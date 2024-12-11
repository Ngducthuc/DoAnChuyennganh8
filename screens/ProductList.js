import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductList = ({ products, onProductPress }) => {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => onProductPress(item)}
    >
      <Image
        source={{ uri: `https://doanchuyenganh.site/admin/uploads/${item.product_img}` }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>
        {parseInt(item.product_price_new || item.product_price).toLocaleString()}đ
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.product_id.toString()}
      renderItem={renderProduct}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default ProductList;
