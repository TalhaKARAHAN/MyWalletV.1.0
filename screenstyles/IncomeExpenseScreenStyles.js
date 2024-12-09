import { StyleSheet } from 'react-native';

const IncomeExpenseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242627',
    padding: 10,
  },
  expenseItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8EAED',
  },
  expenseDescription: {
    color: '#FFFFFF',
  },
  expenseDate: {
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#c9fcfd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '2B2B2B',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#A6A8AB',
  },
  addButton: {
    backgroundColor: '#e43b2b',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8EAED',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2F3437',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    color: '#E8EAED',
  },
  picker: {
    backgroundColor: '#2F3437',
    marginBottom: 15,
    color: '#E8EAED',
  },
  dateText: {
    color: '#4FC3F7',
    marginBottom: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IncomeExpenseScreenStyles;
