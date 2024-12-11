import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';

const ContactUs = () => {
  const handleCustomerServicePress = () => {
    const phoneNumber = 'tel:123456789';
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert('Error', 'Cannot open phone dialer')
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCustomerServicePress}>
        <Text style={styles.buttonText}>Customer Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default ContactUs;
