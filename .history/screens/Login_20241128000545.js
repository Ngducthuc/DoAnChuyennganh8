import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import loginApi from '../api/loginApi';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    navigation.navigate('LoginScreen'); 
  };

const handleSignIn = async () => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }

  try {
    const token = await loginApi(email, password); // Gọi API đăng nhập
    Alert.alert('Success', 'Logged in successfully');
    console.log('Received token:', token);

  console.log('User is  to sign in with:', email, password);

  Alert.alert('Success', `Logged in with email: ${email}`);
  
  navigation.navigate('HomeScreen');
};

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.brandName}>
        Login to your account using email or {'\n'} social networks
      </Text>

      <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Apple')}>
        <Image source={require('../assets/images/apple_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Google')}>
        <Image source={require('../assets/images/google_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with social account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 30,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  brandName: {
    fontSize: 15,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialText: {
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
