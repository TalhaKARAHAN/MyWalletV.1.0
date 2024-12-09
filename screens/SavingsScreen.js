import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getSavings, addSaving, deleteSaving, updateSaving } from '../services/service/savingService';
import styles from '../screenstyles/SavingsScreenStyles'; // Stil dosyasını import et

const screenWidth = Dimensions.get('window').width;

export default function SavingsScreen() {
  const [savings, setSavings] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('TL');
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSavingId, setSelectedSavingId] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const data = await getSavings();
        setSavings(data);
      } catch (error) {
        console.error('Birikimler alınırken hata oluştu:', error);
        Alert.alert('Hata', 'Birikimler alınamadı.');
      }
    };
    fetchSavings();
  }, []);

  const handleAddSaving = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Geçersiz Veri', 'Lütfen geçerli bir miktar girin.');
      return;
    }

    try {
      await addSaving({
        month: new Date().toISOString().slice(0, 7),
        amount: parseFloat(amount),
        type,
        description,
      });
      Alert.alert('Başarılı', 'Birikim başarıyla eklendi.');
      setAmount('');
      setType('TL');
      setDescription('');
      setIsModalVisible(false);
      const updatedSavings = await getSavings();
      setSavings(updatedSavings);
    } catch (error) {
      console.error('Birikim eklenirken hata oluştu:', error);
      Alert.alert('Hata', 'Birikim eklenemedi.');
    }
  };

  const handleDeleteSaving = async (SavingID) => {
    try {
      await deleteSaving(SavingID);
      Alert.alert('Başarılı', 'Birikim silindi.');
      const updatedSavings = await getSavings();
      setSavings(updatedSavings);
    } catch (error) {
      console.error('Birikim silinirken hata oluştu:', error);
      Alert.alert('Hata', 'Birikim silinemedi.');
    }
  };

  const handleUpdateSaving = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Geçersiz Veri', 'Lütfen geçerli bir miktar girin.');
      return;
    }

    try {
      await updateSaving(selectedSavingId, {
        month: new Date().toISOString().slice(0, 7),
        amount: parseFloat(amount),
        type,
        description,
      });
      Alert.alert('Başarılı', 'Birikim başarıyla güncellendi.');
      setAmount('');
      setType('TL');
      setDescription('');
      setIsModalVisible(false);
      const updatedSavings = await getSavings();
      setSavings(updatedSavings);
    } catch (error) {
      console.error('Birikim güncellenirken hata oluştu:', error);
      Alert.alert('Hata', 'Birikim güncellenemedi.');
    }
  };

  const savingsData = savings.map((saving) => ({
    name: saving.Type,
    amount: saving.Amount,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const monthlySavings = savings.reduce((acc, saving) => {
    acc[saving.Month] = (acc[saving.Month] || 0) + saving.Amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlySavings),
    datasets: [
      {
        data: Object.values(monthlySavings),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savings}
        keyExtractor={(item) => item.SavingsID.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.chartHeader}>Aylık Birikimler (Bar Grafik)</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#f9f9f9',
                backgroundGradientTo: '#f3f3f3',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              style={styles.chart}
            />
            <Text style={styles.chartHeader}>Birikim Türlerine Göre Dağılım (Pasta Grafik)</Text>
            <PieChart
              data={savingsData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.savingItem}>
            <Text style={styles.savingText}>
              {item.Amount} {item.Type}
            </Text>
            <Text style={styles.savingDescription}>{item.Description}</Text>
            <Text style={styles.savingDate}>{item.Month}</Text>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                setSelectedSavingId(item.SavingsID);
                setAmount(item.Amount.toString());
                setType(item.Type);
                setDescription(item.Description);
                setIsModalVisible(true);
              }}
            >
              <Text style={styles.updateButtonText}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteSaving(item.SavingsID)}
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              {selectedSavingId ? 'Birikim Güncelle' : 'Yeni Birikim Ekle'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Birikim Miktarı"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Birikim Türü (TL, Dolar, Euro)"
              value={type}
              onChangeText={setType}
            />
            <TextInput
              style={styles.input}
              placeholder="Açıklama"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Kaydet"
              onPress={selectedSavingId ? handleUpdateSaving : handleAddSaving}
            />
            <Button title="Kapat" color="red" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
