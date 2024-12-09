import axios from 'axios';
import { API_BASE_URL } from '@env';

console.log('BUDGET API Base URLSSS:', API_BASE_URL);

// Yeni bütçe ekleme
export const addBudget = async (budget) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/budgets`, budget);
    return response.data;
  } catch (error) {
    console.error('Bütçe eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Bütçe görüntüleme
export const getBudget = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/budgets?month=${month}`);
    return response.data;
  } catch (error) {
    console.error('Bütçe bilgisi alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Bütün bütçeleri görüntüleme
export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/budgets`);
    return response.data;
  } catch (error) {
    console.error('Bütçeler alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Bütçe güncelleme
export const updateBudget = async (budgetId, updatedBudget) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/budgets/${budgetId}`, updatedBudget);
    return response.data;
  } catch (error) {
    console.error('Bütçe güncellenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Bütçe silme
export const deleteBudget = async (budgetId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/budgets/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error('Bütçe silinirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};
