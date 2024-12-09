import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E8EAED', // Açık gri yazı rengi
    marginBottom: 30,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#2F4F4F', // Daha koyu gri ton
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#1F2D3A', // Daha koyu input arka plan
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#4FBDBA', // Mavi-yeşil ton
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#4FBDBA', // Mavi-yeşil ton
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#4FBDBA', // Aynı ton
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreenStyles;
