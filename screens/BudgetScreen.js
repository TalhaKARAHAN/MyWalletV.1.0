import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { getBudgets, addBudget, updateBudget, deleteBudget } from '../services/service/budgetService';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../screenstyles/BudgetScreenStyles'; // Stil dosyasını import et

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState('');
  const [month, setMonth] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const budgetData = await getBudgets();
        setBudgets(budgetData || []);
      } catch (error) {
        console.error('Bütçeler alınırken hata oluştu:', error);
        Alert.alert('Hata', 'Bütçeler alınamadı.');
      }
    };
    loadBudgets();
  }, []);

  const handleSaveBudget = async () => {
    if (!budgetLimit || isNaN(budgetLimit) || !month) {
      Alert.alert('Geçersiz Veri', 'Lütfen geçerli bir ay ve bütçe limiti girin.');
      return;
    }

    try {
      if (selectedBudgetId) {
        await updateBudget(selectedBudgetId, { month, budgetLimit: parseFloat(budgetLimit) });
      } else {
        await addBudget({ month: month.toISOString().split('T')[0], budgetLimit: parseFloat(budgetLimit) });
      }

      Alert.alert('Başarılı', 'Bütçe başarıyla kaydedildi.');
      setBudgetLimit('');
      setMonth(new Date());
      setIsModalVisible(false);
      setSelectedBudgetId(null); 
      const updatedBudgets = await getBudgets();
      setBudgets(updatedBudgets);
    } catch (error) {
      console.error('Bütçe kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Bütçe kaydedilemedi.');
    }
  };

  const handleDeleteBudget = async (id) => {
    Alert.alert(
      'Bütçe Silme',
      'Bu bütçeyi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await deleteBudget(id);
              Alert.alert('Başarılı', 'Bütçe başarıyla silindi!');
              const updatedBudgets = await getBudgets();
              setBudgets(updatedBudgets);
            } catch (error) {
              console.error('Bütçe silinirken hata oluştu:', error.message);
              Alert.alert('Hata', 'Bütçe silinemedi.');
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || month;
    setShowDatePicker(false);
    setMonth(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aylık Bütçeler</Text>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.BudgetID.toString()}
        renderItem={({ item }) => (
          <View style={styles.budgetCard}>
            <Text style={styles.budgetMonth}>{item.Month}</Text>
            <Text style={styles.budgetLimit}>Limit: {item.BudgetLimit.toFixed(2)}₺</Text>
            <Text
              style={[styles.budgetExpense, item.CurrentExpenses > item.BudgetLimit ? styles.overBudget : null]}
            >
              Harcanan: {item.CurrentExpenses.toFixed(2)}₺
            </Text>
  
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setSelectedBudgetId(item.BudgetID);
                  setMonth(new Date(item.Month)); 
                  setBudgetLimit(item.BudgetLimit.toString());
                  setIsModalVisible(true);
                }}
              >
                <Text style={styles.actionButtonText}>Güncelle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteBudget(item.BudgetID)}
              >
                <Text style={styles.actionButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
  
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
  
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Yeni Bütçe Ekle</Text>
  
            {/* Date Picker for selecting the month */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{month.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
  
            {showDatePicker && (
              <DateTimePicker
                value={month}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()} 
                style={styles.dateTimePicker}
              />
            )}
  
            <TextInput
              style={styles.input}
              placeholder="Bütçe Limiti Girin"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={budgetLimit}
              onChangeText={setBudgetLimit}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}




