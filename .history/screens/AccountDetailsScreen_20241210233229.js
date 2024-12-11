import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getProfileApi from '../api/profileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const AccountDetailsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Gọi API để lấy thông tin người dùng dựa trên token
          const response = await axios.post('https://doanchuyenganh.site/modelApp/Profile.php', { token });
          if (response.data?.data) {
            setProfile({
              name: response.data.data.name || '',
              email: response.data.data.email || '',
              mobile: response.data.data.mobile || '',
            });
            // Lưu thông tin mới vào AsyncStorage
            await AsyncStorage.setItem('userProfile', JSON.stringify(response.data.data));
          } else {
            Alert.alert('Error', 'Unable to fetch user profile');
          }
        } else {
          Alert.alert('Error', 'Token is missing. Please login again.');
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user profile');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []); // Chỉ chạy một lần khi màn hình được mount
  
  const handleSave = async () => {
    setLoading(true);
    try {
      // Lưu thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
      setIsEditing(false); // Quay lại chế độ xem
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu thông tin');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Chuyển sang chế độ chỉnh sửa
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            placeholderTextColor="#A9A9A9"
            value={profile.name}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={profile.email}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, email: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor="#A9A9A9"
            value={profile.mobile}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, mobile: text }))
            }
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={isEditing ? handleSave : handleEdit}
          >
            <Text style={styles.editButtonText}>{isEditing ? 'Lưu' : 'Chỉnh sửa'}</Text>
          </TouchableOpacity>
        </>
      )}
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
