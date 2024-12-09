import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAccountById, updateAccount, deleteAccount } from '../services/service/accountService'; // accountService'den doğru import edilmesi gerekiyor

export default function TransactionsScreen({ route, navigation }) {
  const { accountId, accountName } = route.params;

  const [accountData, setAccountData] = useState({
    AccountName: '',
    Currency: '',
    Description: '',
    InitialBalance: '',
    CurrentBalance: ''
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountById(accountId); // getAccountById fonksiyonu çağrılıyor
        setAccountData(data);
      } catch (error) {
        console.error('Hesap bilgileri alınırken hata oluştu:', error);
        Alert.alert('Hata', 'Hesap bilgileri yüklenemedi.');
      }
    };
    fetchAccountData();
  }, [accountId]);

  const handleUpdateAccount = async () => {
    // Hesap adı ve para birimi zorunlu alanlar
    if (!accountData.AccountName || !accountData.Currency) {
      Alert.alert('Hata', 'Hesap adı ve para birimi zorunludur!');
      return;
    }

    try {
      // Sayı formatında olmasını sağlıyoruz
      const updatedData = {
        ...accountData,
        InitialBalance: parseFloat(accountData.InitialBalance),
        CurrentBalance: parseFloat(accountData.CurrentBalance),
      };

      await updateAccount(accountId, updatedData);
      Alert.alert('Başarılı', 'Hesap başarıyla güncellendi!');
      navigation.goBack(); // Ana ekrana dön
    } catch (error) {
      console.error('Hesap güncellenirken hata oluştu:', error.message);
      Alert.alert('Hata', 'Hesap güncellenemedi.');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Hesap Silme',
      'Bu hesabı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await deleteAccount(accountId);
              Alert.alert('Başarılı', 'Hesap başarıyla silindi!');
              navigation.goBack(); // Ana ekrana dön
            } catch (error) {
              console.error('Hesap silinirken hata oluştu:', error.message);
              Alert.alert('Hata', 'Hesap silinemedi.');
            }
          },
        },
        {
          text: 'Hayır',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hesap Detayları</Text>

      {/* Hesap Güncelleme Formu */}
      <View style={styles.inputContainer}>
        <Ionicons name="wallet-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Hesap Adı"
          placeholderTextColor="#A6A8AB"
          value={accountData.AccountName}
          onChangeText={(text) => setAccountData({ ...accountData, AccountName: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Para Birimi (Örn: TL, USD)"
          placeholderTextColor="#A6A8AB"
          value={accountData.Currency}
          onChangeText={(text) => setAccountData({ ...accountData, Currency: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Başlangıç Bakiyesi"
          placeholderTextColor="#A6A8AB"
          value={accountData.InitialBalance.toString()}
          onChangeText={(text) => setAccountData({ ...accountData, InitialBalance: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Mevcut Bakiyesi"
          placeholderTextColor="#A6A8AB"
          value={accountData.CurrentBalance.toString()}
          onChangeText={(text) => setAccountData({ ...accountData, CurrentBalance: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="chatbubble-outline" size={24} color="#A6A8AB" />
        <TextInput
          style={styles.input}
          placeholder="Açıklama (Opsiyonel)"
          placeholderTextColor="#A6A8AB"
          value={accountData.Description}
          onChangeText={(text) => setAccountData({ ...accountData, Description: text })}
        />
      </View>

      {/* Güncelleme Butonu */}
      <TouchableOpacity style={styles.addButton} onPress={handleUpdateAccount}>
        <Text style={styles.addButtonText}>Hesap Güncelle</Text>
      </TouchableOpacity>

      {/* Silme Butonu */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.addButtonText}>Hesap Sil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Koyu arka plan
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3E42', // Koyu gri arka plan
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#E8EAED', // Açık gri
    fontSize: 16,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#4FC3F7', // Mavi buton
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336', // Kırmızı buton
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
