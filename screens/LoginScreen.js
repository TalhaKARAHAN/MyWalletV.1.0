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
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/service/userService';
import styles from '../screenstyles/LoginScreenStyles'; // Stil dosyasını import et

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'E-posta ve şifre gereklidir.');
      return;
    }

    try {
      const response = await userService.login({ eposta: email, sifre: password });
      Alert.alert('Başarılı', 'Giriş başarılı.');
      await AsyncStorage.setItem('userToken', response.token);
      onLogin(response.token); // onLogin çağırılıyor
    } catch (error) {
      console.error('Giriş işlemi sırasında hata:', error);
      Alert.alert('Hata', error.error || 'Giriş işlemi başarısız.');
    }
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']} // Yeni palet renkleri
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/wallet-icon.png')} style={styles.walletIcon} />
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#A0B9C9"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#A0B9C9"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
