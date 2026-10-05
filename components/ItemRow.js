import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemRow({ item, onToggle, onDelete, isDark }) {
  const textColor = isDark ? '#fff' : '#000';
  const subTextColor = isDark ? '#aaa' : '#666';

  return (
    <View style={[styles.row, isDark ? styles.rowDark : styles.rowLight]}>
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.info}>
        <Text style={{ 
          color: item.done ? subTextColor : textColor, 
          textDecorationLine: item.done ? 'line-through' : 'none', 
          fontWeight: 'bold',
          fontSize: 16
        }}>
          {item.title}
        </Text>
        {item.quantity ? <Text style={{ color: textColor }}>Cantidad: {item.quantity}</Text> : null}
        <Text style={{ color: subTextColor, fontSize: 11, marginTop: 4 }}>{item.createdAt}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  rowLight: {
    backgroundColor: '#fff',
  },
  rowDark: {
    backgroundColor: '#1e1e1e',
  },
  info: {
    flex: 1,
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  }
});