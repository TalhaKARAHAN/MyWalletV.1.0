import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { getGoals, addGoal, updateGoal, deleteGoal } from '../services/service/goalsService';
import styles from '../screenstyles/GoalsScreenStyles'; // Stil dosyasını import et

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null); // Track selected goal for update

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data || []);
      } catch (error) {
        console.error('Hedefler yüklenirken hata oluştu:', error);
        Alert.alert('Hata', 'Hedefler yüklenemedi.');
      }
    };
    loadGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!goalName || !targetAmount) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await addGoal({
        goalName: goalName,
        targetAmount: parseFloat(targetAmount),
        startDate: new Date().toISOString().split('T')[0],
      });
      Alert.alert('Başarılı', 'Hedef başarıyla eklendi.');
      setGoalName('');
      setTargetAmount('');
      setIsModalVisible(false);
      const updatedGoals = await getGoals();
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Hedef eklenirken hata oluştu:', error);
      Alert.alert('Hata', 'Hedef eklenemedi.');
    }
  };

  const handleUpdateGoal = async () => {
    if (!goalName || !targetAmount) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await updateGoal(selectedGoalId, {
        goalName: goalName,
        targetAmount: parseFloat(targetAmount),
        startDate: new Date().toISOString().split('T')[0],
      });
      Alert.alert('Başarılı', 'Hedef başarıyla güncellendi.');
      setGoalName('');
      setTargetAmount('');
      setIsModalVisible(false);
      const updatedGoals = await getGoals();
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Hedef güncellenirken hata oluştu:', error);
      Alert.alert('Hata', 'Hedef güncellenemedi.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    Alert.alert(
      'Hedef Silme',
      'Bu hedefi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await deleteGoal(goalId);
              Alert.alert('Başarılı', 'Hedef başarıyla silindi!');
              const updatedGoals = await getGoals();
              setGoals(updatedGoals); // Refresh the list after deletion
            } catch (error) {
              console.error('Hedef silinirken hata oluştu:', error.message);
              Alert.alert('Hata', 'Hedef silinemedi.');
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

  const calculateCompletionPercentage = (currentAmount, targetAmount) => {
    if (!targetAmount || targetAmount === 0) return 0;
    return Math.min((currentAmount / targetAmount) * 100, 100).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hedefler</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.GoalID.toString()}
        renderItem={({ item }) => {
          const completionPercentage = calculateCompletionPercentage(
            item.CurrentAmount,
            item.TargetAmount
          );

          return (
            <View style={styles.goalCard}>
              <Text style={styles.goalName}>{item.GoalName}</Text>
              <Text style={styles.goalProgress}>
                {item.CurrentAmount}₺ / {item.TargetAmount}₺ ({completionPercentage}%)
              </Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[styles.progressBar, { width: `${completionPercentage}%` }]}
                />
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setSelectedGoalId(item.GoalID);
                    setGoalName(item.GoalName);
                    setTargetAmount(item.TargetAmount.toString());
                    setIsModalVisible(true);
                  }}
                >
                  <Text style={styles.actionButtonText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteGoal(item.GoalID)}
                >
                  <Text style={styles.actionButtonText}>Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Yeni Hedef Ekle Butonu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setSelectedGoalId(null);
          setGoalName('');
          setTargetAmount('');
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>{selectedGoalId ? 'Hedef Güncelle' : 'Yeni Hedef Ekle'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Hedef Adı"
              value={goalName}
              onChangeText={setGoalName}
            />
            <TextInput
              style={styles.input}
              placeholder="Hedef Tutarı"
              keyboardType="numeric"
              value={targetAmount}
              onChangeText={setTargetAmount}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={selectedGoalId ? handleUpdateGoal : handleAddGoal}
            >
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
