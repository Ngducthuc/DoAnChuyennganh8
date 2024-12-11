import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Thêm các màn hình khác nếu có
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';

import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconPath;

          if (route.name === 'HomeScreen') {
            iconPath = focused
              ? require('../assets/images/home_icon_active.png')
              : require('../assets/images/home_icon.png');
          } else if (route.name === 'Search') {
            iconPath = focused
              ? require('../assets/images/search_icon_active.png')
              : require('../assets/images/search_icon.png');
          } else if (route.name === 'Favorites') {
            iconPath = focused
              ? require('../assets/images/favorite_icon_active.png')
              : require('../assets/images/favorite_icon.png');
          } else if (route.name === 'Cart') {
            iconPath = focused
              ? require('../assets/images/cart_icon_active.png')
              : require('../assets/images/cart_icon.png');
          } else if (route.name === 'Profile') {
            iconPath = focused
              ? require('../assets/images/profile_icon_active.png')
              : require('../assets/images/profile_icon.png');
          }

          // Return icon
          return <Image source={iconPath} style={{ width: 30, height: 30 }} />;
        },
        tabBarShowLabel: true, // Hiển thị tên các tab
        tabBarActiveTintColor: '#000000', // Màu sắc cho tab được chọn
        tabBarInactiveTintColor: '#BEBEBE', // Màu cho tab chưa chọn
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
