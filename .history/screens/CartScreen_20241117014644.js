import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      image: 'https://via.placeholder.com/150', // Thay link hình ảnh sản phẩm Nike
      name: 'Jordan 1 Retro High Tie Dye',
      brand: 'Nike',
      price: 235.0,
      quantity: 1,
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150', // Thay link hình ảnh sản phẩm Adidas
      name: 'Jordan 1 Retro High Tie Dye',
      brand: 'Adidas',
      price: 235.0,
      quantity: 1,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <MaterialIcons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Ionicons name="cart-outline" size={100} color="#808080" />
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <TouchableOpacity style={styles.goShoppingButton}>
        <Text style={styles.goShoppingButtonText}>Go Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 35.0; // Giả định phí ship cố định
    const total = subtotal + shippingFee;
    return { subtotal, shippingFee, total };
  };

  const { subtotal, shippingFee, total } = calculateTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.summaryContainer}>
            <View style={styles.promoContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Have a Promo Code?"
              />
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Shipping Fee: ${shippingFee.toFixed(2)}</Text>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        renderEmptyCart()
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
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
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
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemBrand: {
    fontSize: 14,
    color: '#808080',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  checkoutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#808080',
    marginVertical: 16,
  },
  goShoppingButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  goShoppingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
