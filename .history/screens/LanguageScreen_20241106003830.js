import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  const languages = [
    { id: '1', category: 'Suggested', name: 'English (US)' },
    { id: '2', category: 'Suggested', name: 'English (UK)' },
    { id: '3', category: 'Language', name: 'Mandarin' },
    { id: '4', category: 'Language', name: 'Hindi' },
    { id: '5', category: 'Language', name: 'Spanish' },
    { id: '6', category: 'Language', name: 'French' },
    { id: '7', category: 'Language', name: 'Arabic' },
    { id: '8', category: 'Language', name: 'Bengali' },
    { id: '9', category: 'Language', name: 'Russian' },
    { id: '10', category: 'Language', name: 'Indonesian' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages</Text>
      {languages.map((lang, index) => (
        <TouchableOpacity
          key={lang.id}
          style={styles.languageItem}
          onPress={() => setSelectedLanguage(lang.name)}
        >
          <Text style={styles.languageText}>{lang.name}</Text>
          {selectedLanguage === lang.name && (
            <Ionicons name="checkmark" size={20} color="black" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  languageText: {
    fontSize: 16,
  },
});

export default LanguageScreen;
