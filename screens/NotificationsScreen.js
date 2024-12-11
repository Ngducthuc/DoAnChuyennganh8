import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  const [appNotification, setAppNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>App Notification</Text>
        <Switch
          value={appNotification}
          onValueChange={setAppNotification}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email Notification</Text>
        <Switch
          value={emailNotification}
          onValueChange={setEmailNotification}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>SMS Notification</Text>
        <Switch
          value={smsNotification}
          onValueChange={setSmsNotification}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#000000',
  },
});

export default NotificationsScreen;
