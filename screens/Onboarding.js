// screens/Onboarding.js
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default function Onboarding({ navigation }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
    >
      <View style={styles.slide}>
        <Image
          source={require('../assets/images/Onboarding1.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Discover Our New Collection</Text>
          <Text style={styles.text}>
            Easy shopping for all your needs just in hand, trusted by millions of people in the world.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => swiperRef.current.scrollBy(1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require('../assets/images/Onboarding2.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Discover Our New Collection</Text>
          <Text style={styles.text}>
            Easy shopping for all your needs just in hand, trusted by millions of people in the world.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => swiperRef.current.scrollBy(1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require('../assets/images/Onboarding3.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Discover Our New Collection</Text>
          <Text style={styles.text}>
            Easy shopping for all your needs just in hand, trusted by millions of people in the world.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});
