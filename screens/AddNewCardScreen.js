import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewCardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.subtitle}>Add New Card</Text>


      <View style={styles.cardDisplay}>
        <Ionicons name="card" size={24} color="white" style={styles.cardIconDisplay} />
        <Text style={styles.cardNumber}>5698 56254 6786 9979</Text>
        <Text style={styles.cardHolder}>Card Holder</Text>
        <Text style={styles.cardName}>Name Here</Text>
        <MaterialCommunityIcons name="credit-card" size={24} color="white" style={styles.cardTypeIcon} />
      </View>

      <Text style={styles.informationText}>Enter Your Informations</Text>

   
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Card Holder"
        placeholderTextColor="#A9A9A9"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Exp date"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      {/* Save Card Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Card</Text>
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
  informationText: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 8,
    color: '#000000',
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  saveButton: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewCardScreen;
