import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getProfileApi from '../api/profileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const AccountDetailsScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    rule: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Lấy token từ AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token not found, please login again');
        }
        console.log('Token being sent:', token);

        // Gọi API với token
        const data = await getProfileApi(token);
        if (data.Code === 403) {
          throw new Error('Invalid token');
        }

        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        Alert.alert('Lỗi', 'Token không hợp lệ. Vui lòng đăng nhập lại.', [
          {
            text: 'Đăng nhập lại',
            onPress: async () => {
              await AsyncStorage.removeItem('userToken');
              navigation.navigate('LoginScreen');
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={profile.name}
        placeholder="Tên người dùng"
        placeholderTextColor="#A9A9A9"
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={profile.email}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={profile.rule}
        placeholder="Quyền"
        placeholderTextColor="#A9A9A9"
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  editButton: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountDetailsScreen;
