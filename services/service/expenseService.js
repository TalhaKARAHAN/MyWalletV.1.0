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
// Gelir/Giderleri getirme
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/expenses`);
    return response.data;
  } catch (error) {
    console.error('Gelir/Giderler alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Yeni Gelir/Gider ekleme
export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Gelir/Gider eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Gelir/Gider güncelleme
export const updateExpense = async (GelirGiderID, updatedExpense) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/expenses/${GelirGiderID}`, updatedExpense);
    return response.data;
  } catch (error) {
    console.error('Gelir/Gider güncellenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Gelir/Gider silme
export const deleteExpense = async (GelirGiderID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/expenses/${GelirGiderID}`);
    return response.data;
  } catch (error) {
    console.error('Gelir/Gider silinirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};
