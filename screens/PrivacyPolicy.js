import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [expanded, setExpanded] = useState(null);

  const tabs = ['General', 'Account', 'Service', 'Payment'];

  const questionsByTab = {
    General: [
      { id: 1, question: 'What is Goldie?', answer: 'We are an unexpected concept proudly created by Vietnamese people.' },
      { id: 2, question: 'How does it work?', answer: 'Goldie creates a New Aesthetic by accessing technical fabrics, durable materials, experimental knitting techniques, and chemical dyeing treatments.' },
      { id: 3, question: 'Can I trust it?', answer: 'Our seasonal collections push the boundaries in creativity, also balance the timeless aesthetics and honoring futuristic values. Goldie expresses the chaos and contradictions of society standards, provoking more questions than answers.' },
    ],
    Account: [
      { id: 4, question: 'How to create an account?', answer: 'Creating an account is simple and free.' },
      { id: 5, question: 'Can I delete my account?', answer: 'Yes, you can delete your account anytime.' },
    ],
    Service: [
      { id: 6, question: 'What services are offered?', answer: 'We offer a wide range of services to cater to your needs.' },
      { id: 7, question: 'Is there a subscription?', answer: 'Subscriptions are available for premium services.' },
    ],
    Payment: [
      { id: 8, question: 'How do I make a payment?', answer: 'Payments can be made using various payment methods.' },
      { id: 9, question: 'Is my payment information secure?', answer: 'Your payment information is encrypted and secure.' },
    ],
  };

  const questions = questionsByTab[activeTab] || [];

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {questions.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.questionContainer}
          onPress={() => setExpanded(expanded === item.id ? null : item.id)}
        >
          <Text style={styles.questionText}>{item.question}</Text>
          {expanded === item.id && (
            <Text style={styles.answerText}>{item.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  questionContainer: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  answerText: {
    marginTop: 8,
    fontSize: 18,
    color: '#555',
  },
});

export default PrivacyPolicy;
