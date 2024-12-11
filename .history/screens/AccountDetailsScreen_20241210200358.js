import React from 'react';
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
        console.log('Fetched Token:', token);

        // Gọi API với token
        const data = await getProfileApi(token);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = () => {
    Alert.alert('Thông báo', 'Đã lưu thay đổi thủ công thành công!', [
      { text: 'OK' },
    ]);
    console.log('Updated Profile:', profile);
  };

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
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />
      <TextInput
        style={styles.input}
        value={profile.email}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        onChangeText={(text) => setProfile({ ...profile, email: text })}
      />
      <TextInput
        style={styles.input}
        value={profile.rule}
        placeholder="Quyền"
        placeholderTextColor="#A9A9A9"
        editable={false} // Trường "Quyền" không chỉnh sửa
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
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
