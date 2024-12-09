import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EmptyState = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default EmptyState;
