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


export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Kategoriler alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/categories`, category);
    return response.data;
  } catch (error) {
    console.error('Yeni kategori eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};
