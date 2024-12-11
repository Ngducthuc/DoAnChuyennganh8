import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import fetchProductDetails from '../api/productdetailApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Lấy productId từ tham số điều hướng
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);


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



    getProductDetails();
  }, [productId]);

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
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>◀</Text>
      </TouchableOpacity>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `https://doanchuyenganh.site/admin/uploads/${productDetails.product_img}` }}
          style={styles.productImage}
          resizeMode="contain"
        />
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
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>1</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
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
    width: 200,
    height: 200,
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
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
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
