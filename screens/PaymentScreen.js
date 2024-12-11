import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentScreen = ({ navigation }) => {

  const [selectedCard, setSelectedCard] = useState({
    id: '1',
    type: 'MasterCard',
    lastDigits: '7488',
    expiry: '01/25',
    holderName: 'Name Here'
  });

  const cards = [
    { id: '1', type: 'MasterCard', lastDigits: '7488', expiry: '01/25', holderName: 'Name Here' },
    { id: '2', type: 'Visa', lastDigits: '1234', expiry: '06/23', holderName: 'Another Name' },
  ];

 
  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectCard(item)}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardType}>{item.type} - {item.lastDigits}</Text>
        <Text style={styles.cardExpiry}>{item.expiry}</Text>
        <Ionicons
          name={selectedCard.id === item.id ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={selectedCard.id === item.id ? 'black' : 'grey'}
          style={styles.cardIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>My Cards</Text>

    
      <View style={styles.cardDisplay}>
        <Ionicons name="card" size={24} color="white" style={styles.cardIconDisplay} />
        <Text style={styles.cardNumber}>**** **** **** {selectedCard.lastDigits}</Text>
        <Text style={styles.cardHolder}>Card Holder</Text>
        <Text style={styles.cardName}>{selectedCard.holderName}</Text>
        <MaterialCommunityIcons name="credit-card" size={24} color="white" style={styles.cardTypeIcon} />
      </View>

    
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedCard} 
      />

     
      <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate('AddNewCardScreen')}>
        <Ionicons name="add" size={24} color="black" />
        <Text style={styles.addCardText}>Add credit card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#000000',
  },
  cardDisplay: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
  },
  cardIconDisplay: {
    marginBottom: 10,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  cardHolder: {
    color: 'grey',
    fontSize: 14,
  },
  cardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardExpiry: {
    color: 'grey',
  },
  cardIcon: {
    marginLeft: 'auto',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // Adjust the margin if necessary to position it closer
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  addCardText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
});

export default PaymentScreen;
