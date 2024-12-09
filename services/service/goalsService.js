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

// Add Goal
export const addGoal = async (goal) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/goals`, goal);
    return response.data;
  } catch (error) {
    console.error('Hedef eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Get All Goals
export const getGoals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/goals`);
    return response.data;
  } catch (error) {
    console.error('Hedefler alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Update Goal
export const updateGoal = async (goalId, updatedGoal) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/goals/${goalId}`, updatedGoal);
    return response.data;
  } catch (error) {
    console.error('Hedef güncellenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Delete Goal
export const deleteGoal = async (goalId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/goals/${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Hedef silinirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};