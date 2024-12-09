import axios from 'axios';

// API Base URL tanımlaması
// Vercel'de process.env kullanılır, yerel geliştirme ortamında @env modülü
let API_BASE_URL;
if (process.env.NODE_ENV === 'production') {
  API_BASE_URL = process.env.API_BASE_URL; // Vercel ortam değişkeni
} else {
  const { API_BASE_URL: LocalBaseURL } = require('@env');
  API_BASE_URL = LocalBaseURL;
}

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
