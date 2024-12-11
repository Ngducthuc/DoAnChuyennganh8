import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import SignUpScreen from './screens/SignUpScreen';
import ForgetPassword from './screens/ForgetPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import TabNavigator from './navigation/TabNavigator'; 
import ProductDetailScreen from './screens/ProductDetailScreen';


//Thuộc của trang Profile
import AccountDetailsScreen from './screens/AccountDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import AddNewCardScreen from './screens/AddNewCardScreen';
import AddressesScreen from './screens/AddressesScreen';
import AddNewAddress from './screens/AddNewAddress';
import SecurityScreen from './screens/SecurityScreen'; 
import NotificationsScreen from './screens/NotificationsScreen'; 
import LanguageScreen from './screens/LanguageScreen'; 
import PrivacyPolicy from './screens/PrivacyPolicy'; 
import ContactUs from './screens/ContactUs'; 

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerTitle: 'Forget Password' }} />
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerTitle: 'Verification Code' }} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerTitle: 'Create New Password' }} />
      <Stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} />
      

      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ headerTitle: 'Account Details' }} />
      <Stack.Screen name="PaymentMethod" component={PaymentScreen} options={{ headerTitle: 'Payment Method' }} />
      <Stack.Screen name="AddNewCardScreen" component={AddNewCardScreen} options={{ headerTitle: 'Add credit card ' }} />
      <Stack.Screen name="AddressesScreen" component={AddressesScreen} options={{ headerTitle: 'Delivery Addresses ' }} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} options={{ headerTitle: 'Add New Address ' }} /> 
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} options={{ headerTitle: 'Security & Password ' }} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerTitle: 'Notifications ' }} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerTitle: 'Language ' }} />  
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerTitle: 'Privacy & Policy ' }} /> 
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerTitle: 'Contact Us ' }} /> 
    </Stack.Navigator>
    );
}

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
