import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../screenstyles/SettingsScreenStyles'; // Stil dosyasını import et

export default function SettingsScreen() {
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    const getCurrency = async () => {
      const storedCurrency = await AsyncStorage.getItem('preferredCurrency');
      setCurrency(storedCurrency || '₺');
    };
    getCurrency();
  }, []);

  const changeCurrency = async (newCurrency) => {
    try {
      await AsyncStorage.setItem('preferredCurrency', newCurrency);
      setCurrency(newCurrency);
      Alert.alert('Başarılı', 'Para birimi güncellendi.');
    } catch (error) {
      Alert.alert('Hata', 'Para birimi güncellenemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ayarlar</Text>
      <Text style={styles.label}>
        Seçili Para Birimi: <Text style={styles.currency}>{currency}</Text>
      </Text>
      <View style={styles.buttons}>
        {/* TL Butonu */}
        <TouchableOpacity
          style={[styles.button, styles.tlButton]}
          onPress={() => changeCurrency('₺')}
        >
          <Ionicons name="cash-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>₺ TL</Text>
        </TouchableOpacity>

        {/* USD Butonu */}
        <TouchableOpacity
          style={[styles.button, styles.usdButton]}
          onPress={() => changeCurrency('$')}
        >
          <Ionicons name="logo-usd" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>$ USD</Text>
        </TouchableOpacity>

        {/* EUR Butonu */}
        <TouchableOpacity
          style={[styles.button, styles.eurButton]}
          onPress={() => changeCurrency('€')}
        >
          <Ionicons name="logo-euro" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>€ EUR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
