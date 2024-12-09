import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/service/expenseService';
import { getCategories } from '../services/service/categoryService';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../screenstyles/IncomeExpenseScreenStyles'; // Stil dosyasını import et

export default function IncomeExpenseScreen() {
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Gelir');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Gelir/Giderler alınırken hata oluştu:', error.message);
      Alert.alert('Hata', 'Gelir/Giderler alınamadı.');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriler alınırken hata oluştu:', error.message);
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !selectedCategory || isNaN(amount)) {
      Alert.alert('Hata', 'Tutar, kategori ve geçerli bir miktar seçilmelidir.');
      return;
    }

    const expense = {
      kullaniciID: 1,
      tarih: date.toISOString().split('T')[0],
      miktar: parseFloat(amount),
      kategoriID: parseInt(selectedCategory),
      aciklama: description,
      tip: type,
    };

    try {
      if (selectedExpenseId) {
        await updateExpense(selectedExpenseId, expense);
      } else {
        await addExpense(expense);
      }
      Alert.alert('Başarılı', 'Gelir/Gider başarıyla eklendi.');
      fetchExpenses();
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error('Gelir/Gider eklenirken hata oluştu:', error.response?.data || error.message);
      Alert.alert('Hata', 'Gelir/Gider eklenirken bir hata oluştu.');
    }
  };

  const handleDeleteExpense = async (selectedExpenseId) => {
    Alert.alert(
      'Gelir/Gider Silme',
      'Bu gelir/gideri silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await deleteExpense(selectedExpenseId);
              Alert.alert('Başarılı', 'Gelir/Gider başarıyla silindi!');
              fetchExpenses();
            } catch (error) {
              console.error('Gelir/Gider silinirken hata oluştu:', error.message);
              Alert.alert('Hata', 'Gelir/Gider silinemedi.');
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

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setSelectedCategory('');
    setType('Gelir');
    setSelectedExpenseId(null);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.GelirGiderID.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.expenseItem, { backgroundColor: '#2F3437' }]}
          >
            <Text style={styles.expenseTitle}>
              {item.Tip}:{' '}
              <Text style={{ color: item.Tip === 'Gelir' ? 'green' : 'red' }}>
                {item.Miktar}₺
              </Text>
            </Text>
            <Text style={styles.expenseDescription}>
              {item.Aciklama || 'Açıklama yok'}
            </Text>
            <Text style={styles.expenseDate}>Tarih: {item.Tarih}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setSelectedExpenseId(item.GelirGiderID);
                  setAmount(item.Miktar.toString());
                  setDescription(item.Aciklama);
                  setType(item.Tip);
                  setSelectedCategory(item.KategoriID.toString());
                  setModalVisible(true);
                }}
              >
                <Text style={styles.actionButtonText}>Güncelle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteExpense(item.GelirGiderID)}
              >
                <Text style={styles.actionButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz gelir/gider eklenmedi.</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Gelir/Gider Ekle</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Gelir/Gider Ekle</Text>
          <TextInput
            style={styles.input}
            placeholder="Tutar"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            value={description}
            onChangeText={setDescription}
          />
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Gelir" value="Gelir" />
            <Picker.Item label="Gider" value="Gider" />
          </Picker>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Kategori Seçin" value="" />
            {categories
              .filter((cat) => cat.Type === type)
              .map((cat) => (
                <Picker.Item
                  key={cat.CategoryID}
                  label={cat.CategoryName}
                  value={cat.CategoryID.toString()}
                />
              ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>Tarih: {date.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
              <Text style={styles.buttonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
