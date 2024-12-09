import axios from 'axios';
import { API_BASE_URL } from '@env';


console.log('USERS API Base URLSS:', API_BASE_URL);

const userService = {
  // Kullanıcı Kayıt Olma
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/user/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Register Hatası:', error.response?.data || error.message); // Hatanın detaylı kaydı
      throw error.response?.data || { error: error.message };
    }
  },

  // Kullanıcı Giriş Yapma
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/user/login`, loginData);
      return response.data;
    } catch (error) {
      console.error('Login Hatası:', error.response?.data || error.message); // Hatanın detaylı kaydı
      throw error.response?.data || { error: error.message };
    }
  },
};

export default userService;
