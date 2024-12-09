import { StyleSheet } from 'react-native';

const StatisticsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1e', // Koyu tema arka plan
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri yazı rengi
    textAlign: 'center',
    marginVertical: 15,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  pieChart: {
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  cardDate: {
    fontSize: 16,
    color: '#A6A8AB',
    marginBottom: 5,
  },
  cardIncome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#74e5e6', // Gelir için mavi
  },
  cardExpense: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e43b2b', // Gider için kırmızı
  },
  cardDescription: {
    fontSize: 14,
    color: '#A6A8AB',
    marginTop: 5,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E8EAED',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default StatisticsScreenStyles;
