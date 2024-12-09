import axios from 'axios';
import { API_BASE_URL } from '@env';


console.log('TRANSACTİONS API Base URLSS:', API_BASE_URL);

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
