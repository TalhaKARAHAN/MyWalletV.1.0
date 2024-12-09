import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // İkonlar için
import { addAccount } from '../services/service/accountService'; // addAccount fonksiyonunu import et
import styles from '../screenstyles/AddAccountScreenStyles'; // Stilleri import et

export default function AddAccountScreen({ navigation }) {
  const [accountName, setAccountName] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [initialBalance, setInitialBalance] = useState(''); // Başlangıç bakiyesi

  const handleAddAccount = async () => {
    if (!accountName || !currency || !initialBalance) {
      Alert.alert('Hata', 'Hesap adı, para birimi ve başlangıç bakiyesi zorunludur!');
      return;
    }

    try {
      // Hesap ekleme servisi çağrılır
      await addAccount({
        AccountName: accountName,
        Currency: currency,
        Description: description,
        InitialBalance: parseFloat(initialBalance), // Başlangıç bakiyesi
        CurrentBalance: parseFloat(initialBalance), // Başlangıç bakiyesi ile eşit
        CreatedAt: new Date().toISOString(),
      });
      Alert.alert('Başarılı', 'Hesap başarıyla eklendi!');
      navigation.goBack(); // Ana ekrana dön
    } catch (error) {
      console.error('Hesap eklenirken hata oluştu:', error.message);
      Alert.alert('Hata', 'Hesap eklenemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hesap Ekle</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="wallet-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Hesap Adı"
          placeholderTextColor="#A6A8AB"
          value={accountName}
          onChangeText={setAccountName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Para Birimi (Örn: TL, USD)"
          placeholderTextColor="#A6A8AB"
          value={currency}
          onChangeText={setCurrency}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="chatbubble-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Açıklama (Opsiyonel)"
          placeholderTextColor="#A6A8AB"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Başlangıç Bakiyesi"
          placeholderTextColor="#A6A8AB"
          keyboardType="numeric"
          value={initialBalance}
          onChangeText={setInitialBalance}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
        <Text style={styles.addButtonText}>Hesap Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}
