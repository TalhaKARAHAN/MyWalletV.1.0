import axios from 'axios';
import { API_BASE_URL } from '@env';


console.log('CATEGORİES API Base URS:', API_BASE_URL);


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
