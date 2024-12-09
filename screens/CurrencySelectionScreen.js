import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../screenstyles/CurrencySelectionScreenStyles'; // Stil dosyasını import et

export default function CurrencySelectionScreen({ onCurrencySelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Para Birimi Seçin</Text>
      
      {/* TL Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onCurrencySelect('₺')}
      >
        <Ionicons name="logo-bitcoin" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>₺ TL</Text>
      </TouchableOpacity>

      {/* USD Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onCurrencySelect('$')}
      >
        <Ionicons name="logo-usd" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>$ USD</Text>
      </TouchableOpacity>

      {/* EUR Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onCurrencySelect('€')}
      >
        <Ionicons name="logo-euro" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>€ EUR</Text>
      </TouchableOpacity>
    </View>
  );
}
