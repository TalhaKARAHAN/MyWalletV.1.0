import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAccounts } from '../services/service/accountService';
import styles from '../screenstyles/HomeScreenStyles'; // Stil dosyasını import et

export default function HomeScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]);

  // Hesapları API'den yükleme
  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data); // Hesap verilerini günceller
    } catch (error) {
      console.error('Hesaplar yüklenirken hata oluştu:', error);
      Alert.alert('Hata', 'Hesaplar yüklenemedi.');
    }
  };

  // useEffect yalnızca component mount olduğunda çalışır
  useEffect(() => {
    fetchAccounts(); // İlk mount olduğunda verileri çekiyoruz
  }, []); // Boş bağımlılık dizisi, yalnızca bir kez çalışacak.

  // Hesap güncelleme veya silme sonrası veri yenileme
  const handleRefresh = () => {
    fetchAccounts(); // Veriyi tekrar yükleyerek güncelleme sağlar.
  };

  return (
    <View style={styles.container}>
      {/* Üst Tab */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Anasayfa')}
        >
          <Ionicons name="wallet-outline" size={24} color="#b0bec5" />
          <Text style={styles.tabText}>HESAPLAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Bütçeler')}
        >
          <Ionicons name="pie-chart-outline" size={24} color="#b0bec5" />
          <Text style={styles.tabText}>BÜTÇELER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Birikimler')}
        >
          <Ionicons name="cash-outline" size={24} color="#b0bec5" />
          <Text style={styles.tabText}>BİRİKİMLER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Hedefler')}
        >
          <Ionicons name="flag-outline" size={24} color="#b0bec5" />
          <Text style={styles.tabText}>HEDEFLER</Text>
        </TouchableOpacity>
      </View>

      {/* Hesap Listesi */}
      <View style={styles.accountList}>
        <Text style={styles.sectionHeader}>Hesaplar</Text>
        <FlatList
          data={accounts}
          keyExtractor={(item) => item?.AccountID ? item.AccountID.toString() : 'defaultKey'} // Güncellenmiş keyExtractor
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.accountItem}
              onPress={() =>
                item.AccountID && navigation.navigate('İşlemler', {
                  accountId: item.AccountID,
                  accountName: item.AccountName,
                })
              }
            >
              {/* Nakit Hesap İkonu */}
              <Ionicons name="wallet" size={32} color="#c9fcfd" style={styles.accountIcon} />
              <View style={styles.accountDetails}>
                <Text style={styles.accountName}>{item.AccountName}</Text>
                <Text style={styles.accountType}>{item.Type}</Text>
                {/* Mevcut bakiye ve para birimi */}
                <Text style={styles.accountBalance}>
                  {item.CurrentBalance !== undefined && item.CurrentBalance !== null
                    ? item.CurrentBalance.toFixed(2)
                    : '0.00'}{' '}
                  {item.Currency}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          refreshing={false}
          onRefresh={handleRefresh}
        />
      </View>

      {/* Hesap Ekle Butonu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('HesapEkle')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>HESAP EKLE</Text>
      </TouchableOpacity>
    </View>
  );
}
