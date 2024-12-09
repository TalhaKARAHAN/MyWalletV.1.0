import { StyleSheet } from 'react-native';

const SettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242627', // Koyu arka plan
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E8EAED', // Hafif gri metin
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#A6A8AB', // Daha açık gri
    textAlign: 'center',
  },
  currency: {
    color: '#4FC3F7', // Vurgulu renk
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  tlButton: {
    backgroundColor: '#4CAF50', // Yeşil (TL)
  },
  usdButton: {
    backgroundColor: '#FF9800', // Turuncu (USD)
  },
  eurButton: {
    backgroundColor: '#2196F3', // Mavi (EUR)
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default SettingsScreenStyles;
