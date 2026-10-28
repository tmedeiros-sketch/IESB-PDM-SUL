// components/CompromissoList.js
// Aula 05/06 - Componentização, props, FlatList e remoção com Pressable.

import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, onToggle, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
        ListEmptyComponent={<Text style={styles.textoVazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.itemTexto} onPress={() => onToggle(item.id)}>
              <Text style={[styles.texto, item.concluido && styles.textoConcluido]}>
                {item.texto}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onDelete(item.id)}
              android_ripple={{ color: '#FCA5A5' }}
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressed,
              ]}
            >
              <Text style={styles.botaoRemoverTexto}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemTexto: {
    flex: 1,
    marginRight: 8,
  },
  texto: {
    fontSize: 15,
    color: '#111827',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  botaoRemover: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  botaoRemoverPressed: {
    backgroundColor: '#FCA5A5',
  },
  botaoRemoverTexto: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: '600',
  },
});
