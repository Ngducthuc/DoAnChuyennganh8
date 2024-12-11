import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoutApi from '../api/logoutApi';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const sections = [
    {
      title: 'General',
      data: [
        { icon: 'person-outline', label: 'Account Details', description: 'Edit your account information', screen: 'AccountDetails' },
        { icon: 'credit-card', label: 'Payment Method', description: 'Add your credit or debit Card', screen: 'PaymentMethod' },
        { icon: 'location-on', label: 'Delivery Addresses', description: 'Edit or add new address', screen: 'AddressesScreen' },
        { icon: 'lock-outline', label: 'Security & Password', description: 'Edit your password', screen: 'SecurityScreen' },
      ],
    },
    {
      title: 'Setting',
      data: [
        { icon: 'notifications-none', label: 'Notifications', description: 'Manage your notifications', screen: 'NotificationsScreen' },
        { icon: 'language', label: 'Language', description: 'Change app language', screen: 'LanguageScreen' },
        { icon: 'policy', label: 'Privacy & Policy', description: 'View privacy policies', screen: 'PrivacyPolicy' },
        { icon: 'phone', label: 'Contact Us', description: 'Get in touch with us', screen: 'ContactUs' },
      ],
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
              if (token) {
                await logoutApi(token); // Gọi API logout
                await AsyncStorage.removeItem('token'); // Xóa token khỏi AsyncStorage
                console.log('Token deleted successfully');
              }
              navigation.replace('Login'); // Điều hướng đến màn hình đăng nhập
            } catch (error) {
              console.error('Logout Error:', error.message);
              Alert.alert('Error', 'Logout failed. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>My Account</Text>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.data.map((dataItem) => (
              <TouchableOpacity 
                key={dataItem.label} 
                style={styles.item}
                onPress={() => navigation.navigate(dataItem.screen)}
              >
                <Icon name={dataItem.icon} size={24} color="#333" style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{dataItem.label}</Text>
                  <Text style={styles.description}>{dataItem.description}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#333" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 15, 
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  logoutButton: {
    marginTop: 3,
    paddingVertical:15,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ProfileScreen;
