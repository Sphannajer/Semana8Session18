import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemRow from '../components/ItemRow';

export default function HomeScreen({ isDark }) {
  const [text, setText] = useState('');
  const [qty, setQty] = useState('');
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Efecto de carga inicial
  useEffect(() => {
    loadList();
  }, []);

  // Efecto de guardado automático
  useEffect(() => {
    if (isLoaded) {
      saveList(list);
    }
  }, [list, isLoaded]);

  const loadList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('shoppingList');
      if (storedList !== null) {
        setList(JSON.parse(storedList));
      }
      setIsLoaded(true);
    } catch (e) {
      console.error(e);
    }
  };

  const saveList = async (newList) => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const addItem = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Ingrese el nombre de un producto');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      title: text.trim(),
      quantity: qty.trim(),
      done: false,
      createdAt: new Date().toLocaleString()
    };
    setList([...list, newItem]);
    setText('');
    setQty('');
  };

  const toggleItem = (id) => {
    const updatedList = list.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setList(updatedList);
  };

  const removeItem = (id) => {
    const updatedList = list.filter(item => item.id !== id);
    setList(updatedList);
  };

  const clearAll = () => {
    Alert.alert(
      'Borrar Todo',
      '¿Estás seguro de que deseas eliminar toda la lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            setList([]);
            await AsyncStorage.removeItem('shoppingList');
          }
        }
      ]
    );
  };

  const total = list.length;
  const bought = list.filter(item => item.done).length;
  const pending = total - bought;
  const textColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#444' : '#ccc';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>ShoppingList Utp</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: borderColor }]}
          placeholder="Ej: Manzanas"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={text}
          onChangeText={setText}
        />
        <TextInput
          style={[styles.input, styles.qtyInput, { color: textColor, borderColor: borderColor }]}
          placeholder="Cant."
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={qty}
          keyboardType="numeric"
          onChangeText={setQty}
        />
        <Button title="Agregar" onPress={addItem} />
      </View>

      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onToggle={toggleItem}
            onDelete={removeItem}
            isDark={isDark}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: textColor, textAlign: 'center', marginTop: 30 }}>
            Tu lista de compras está vacía.
          </Text>
        }
      />

      <View style={[styles.footer, { borderColor: borderColor }]}>
        <Text style={{ color: textColor, fontWeight: 'bold' }}>Total: {total}</Text>
        <Text style={{ color: '#ffa500', fontWeight: 'bold' }}>Pendientes: {pending}</Text>
        <Text style={{ color: '#4caf50', fontWeight: 'bold' }}>Comprados: {bought}</Text>
      </View>
      
      {list.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Button title="Borrar toda la lista" color="#ff4444" onPress={clearAll} />
        </View>
      )}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  qtyInput: {
    flex: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    marginTop: 10,
  }
});