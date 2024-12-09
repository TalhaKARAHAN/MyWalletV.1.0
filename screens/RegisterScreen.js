import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import userService from '../services/service/userService';
import styles from '../screenstyles/RegisterScreenStyles'; // Stil dosyasını import et

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Ad, e-posta ve şifre gereklidir.');
      return;
    }

    try {
      const response = await userService.register({ ad: name, eposta: email, sifre: password });
      Alert.alert('Başarılı', 'Kayıt başarılı.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      Alert.alert('Hata', error.error || 'Kayıt işlemi başarısız.');
    }
  };

  return (
    <LinearGradient colors={['#283E4A', '#121417']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/images/wallet-icon.png')} style={styles.walletIcon} />
        <Text style={styles.title}>Kayıt Ol</Text>
        <TextInput
          style={styles.input}
          placeholder="Ad"
          placeholderTextColor="#7D8285"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#7D8285"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#7D8285"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginRedirectButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginRedirectText}>Zaten bir hesabınız var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
