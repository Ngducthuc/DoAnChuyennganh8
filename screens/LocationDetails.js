import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function LocationDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Details</Text>
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="Landmark" />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
