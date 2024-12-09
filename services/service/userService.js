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
