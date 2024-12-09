import axios from 'axios';
import { API_BASE_URL } from '@env';

console.log('SAVİNGS API Base URLSS:', API_BASE_URL);

// Tüm birikimleri getirme
export const getSavings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/savings`);
    return response.data;
  } catch (error) {
    console.error('Birikimler alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Yeni birikim ekleme
export const addSaving = async (saving) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/savings`, saving);
    return response.data;
  } catch (error) {
    console.error('Birikim eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Birikim güncelleme
export const updateSaving = async (id, updatedSaving) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/savings/${id}`, updatedSaving);
    return response.data;
  } catch (error) {
    console.error('Birikim güncellenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Birikim silme
export const deleteSaving = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/savings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Birikim silinirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};
