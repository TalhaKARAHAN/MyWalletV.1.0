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

export const getTransactions = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/transactions`);
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await axios.post(`${API_BASE_URL}/api/transactions`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/transactions/${id}`);
  return response.data;
};
