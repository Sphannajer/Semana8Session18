import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen({ isDark, toggleTheme }) {
  const textColor = isDark ? '#fff' : '#000';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Configuración</Text>
      
      <View style={[styles.settingRow, { borderBottomColor: isDark ? '#444' : '#ccc' }]}>
        <Text style={[styles.settingText, { color: textColor }]}>Activar Modo Oscuro</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 18,
  }
});