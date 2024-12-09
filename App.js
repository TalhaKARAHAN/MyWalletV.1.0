import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons library
import 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import IncomeExpenseScreen from './screens/IncomeExpenseScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import CurrencySelectionScreen from './screens/CurrencySelectionScreen';
import SettingsScreen from './screens/SettingsScreen';
import GoalsScreen from './screens/GoalsScreen';
import BudgetScreen from './screens/BudgetScreen';
import SavingsScreen from './screens/SavingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import TransactionsScreen from './screens/TransactionsScreen';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer with professional design
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: '#242627' }}
    >
      <View style={{ flex: 1 }}>
        {props.state.routes
          .filter((route) => route.name !== 'Ayarlar') // Filter out "Ayarlar" first
          .map((route, index) => (
            <DrawerItem
              key={index}
              label={({ color }) => (
                <Text style={{ color: '#E0E0E0', fontSize: 16, fontWeight: '500' }}>
                  {route.name}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              icon={({ focused, color }) =>
                getMenuIcon(route.name, focused ? '#4A90E2' : '#E0E0E0')
              }
              style={{ marginVertical: 5 }}
            />
          ))}

        {/* Ayarlar Button */}
        <DrawerItem
          label="Ayarlar"
          onPress={() => props.navigation.navigate('Ayarlar')}
          icon={({ focused, color }) => (
            <Ionicons name="settings-outline" size={20} color="#E0E0E0" />
          )}
          style={{ marginVertical: 5 }}
          labelStyle={{ color: '#E0E0E0', fontSize: 16, fontWeight: '500' }}
        />
      </View>

      {/* Çıkış Yap Button */}
      <View style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: '#4A4A4A' }}>
        <DrawerItem
          label="Çıkış Yap"
          onPress={() => {
            if (props.onLogout) {
              props.onLogout();
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }], // Reset to AuthStack
              });
            } else {
              console.error('onLogout fonksiyonu tanımlı değil!');
            }
          }}
          icon={({ focused, color }) => (
            <Ionicons name="log-out-outline" size={20} color="#E57373" />
          )}
          labelStyle={{ color: '#E57373', fontSize: 16, fontWeight: 'bold' }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

// Get menu icons based on route name
const getMenuIcon = (routeName, color) => {
  let iconName;
  switch (routeName) {
    case 'Anasayfa':
      iconName = 'home-outline';
      break;
    case 'Gelir/Gider Ekle':
      iconName = 'add-circle-outline';
      break;
    case 'İstatistikler':
      iconName = 'stats-chart-outline';
      break;
    case 'Bütçeler':
      iconName = 'wallet-outline';
      break;
    case 'Hedefler':
      iconName = 'flag-outline';
      break;
    case 'Birikimler':
      iconName = 'cash-outline';
      break;
    case 'HesapEkle':
      iconName = 'create-outline';
      break;
    case 'İşlemler':
      iconName = 'list-outline';
      break;
    case 'Ayarlar':
      iconName = 'settings-outline';
      break;
    default:
      iconName = 'ellipse-outline';
  }
  return <Ionicons name={iconName} size={20} color={color} />;
};

export default function App() {
  const [isCurrencySelected, setIsCurrencySelected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const currency = await AsyncStorage.getItem('preferredCurrency');
        const userToken = await AsyncStorage.getItem('userToken');
        setIsCurrencySelected(!!currency);
        setIsAuthenticated(!!userToken);
      } catch (error) {
        console.error('AsyncStorage Hatası:', error);
      }
    };

    checkAppState();
  }, []);

  const handleCurrencySelection = async (currency) => {
    await AsyncStorage.setItem('preferredCurrency', currency);
    setIsCurrencySelected(true);
  };

  const handleLogin = async (userToken) => {
    await AsyncStorage.setItem('userToken', userToken);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Çıkış işlemi sırasında hata:', error);
    }
  };

  function MainDrawer() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} onLogout={handleLogout} />
        )}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1F2022',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveBackgroundColor: '#4A90E2',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#E0E0E0',
          drawerStyle: {
            backgroundColor: '#242627',
          },
        }}
      >
        <Drawer.Screen name="Anasayfa" component={HomeScreen} />
        <Drawer.Screen name="Gelir/Gider Ekle" component={IncomeExpenseScreen} />
        <Drawer.Screen name="İstatistikler" component={StatisticsScreen} />
        <Drawer.Screen name="Ayarlar" component={SettingsScreen} />
        <Drawer.Screen name="Bütçeler" component={BudgetScreen} />
        <Drawer.Screen name="Hedefler" component={GoalsScreen} />
        <Drawer.Screen name="Birikimler" component={SavingsScreen} />
        <Drawer.Screen name="HesapEkle" component={AddAccountScreen} />
        <Drawer.Screen name="İşlemler" component={TransactionsScreen} />
      </Drawer.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="AuthStack"
            options={{ headerShown: false }}
            component={AuthStack}
          />
        ) : isCurrencySelected ? (
          <Stack.Screen
            name="Main"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="CurrencySelection"
            options={{ title: 'Para Birimi Seçimi' }}
          >
            {(props) => (
              <CurrencySelectionScreen
                {...props}
                onCurrencySelect={handleCurrencySelection}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
