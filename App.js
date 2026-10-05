import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('@prefs/theme');
      if (storedTheme !== null) {
        setIsDark(JSON.parse(storedTheme));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('@prefs/theme', JSON.stringify(newTheme));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.dark : styles.light]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.nav}>
        <Button title="Lista de Compras" onPress={() => setCurrentScreen('Home')} />
        <Button title="Configuración" onPress={() => setCurrentScreen('Settings')} />
      </View>
      
      {currentScreen === 'Home' ? (
        <HomeScreen isDark={isDark} />
      ) : (
        <SettingsScreen isDark={isDark} toggleTheme={toggleTheme} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  light: {
    backgroundColor: '#f5f5f5',
  },
  dark: {
    backgroundColor: '#121212',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  }
});