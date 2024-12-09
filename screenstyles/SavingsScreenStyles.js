import { StyleSheet } from 'react-native';

const SavingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242627', // Koyu tema arka plan
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri
    marginVertical: 15,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  savingItem: {
    padding: 15,
    backgroundColor: '#2F3437', // Kart arka plan
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri
  },
  savingDescription: {
    fontSize: 14,
    color: '#A6A8AB', // Orta gri
  },
  savingDate: {
    fontSize: 12,
    color: '#777C81', // Hafif gri
  },
  deleteButton: {
    backgroundColor: '#F44336', // Kırmızı
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#FF9800', // Turuncu
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#4FC3F7', // Mavi
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Şeffaf koyu
  },
  modalContent: {
    backgroundColor: '#2F3437', // Modal arka plan
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#3A3E42', // Input arka plan
    color: '#E8EAED', // Input yazı rengi
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777C81', // Hafif gri
  },
});

export default SavingsScreenStyles;
