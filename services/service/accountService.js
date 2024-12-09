import axios from 'axios';
import { API_BASE_URL } from '@env';

console.log('ACCOUNTS API Base URLsss:', API_BASE_URL);

// Tüm hesapları getirme
export const getAccounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/accounts`);
    return response.data;
  } catch (error) {
    console.error('Hesaplar alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Hesap ID'sine göre hesap bilgilerini getirme
export const getAccountById = async (accountId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Hesap alınırken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Yeni hesap ekleme
export const addAccount = async (account) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/accounts`, account);
    return response.data;
  } catch (error) {
    console.error('Hesap eklenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Hesap güncelleme
export const updateAccount = async (id, updatedAccount) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/accounts/${id}`, updatedAccount);
    return response.data;
  } catch (error) {
    console.error('Hesap güncellenirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};

// Hesap silme
export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Hesap silinirken hata oluştu:', error.response?.data || error.message);
    throw error;
  }
};