import { StyleSheet } from 'react-native';

const RegisterScreenStyles = StyleSheet.create({
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D9E1E8',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#3A4C5A',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#1C252C',
    color: '#FFFFFF',
    fontSize: 16,
  },
  registerButton: {
    width: '90%',
    backgroundColor: '#4FBDBA',
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
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectButton: {
    marginTop: 15,
  },
  loginRedirectText: {
    color: '#4FBDBA',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreenStyles;
