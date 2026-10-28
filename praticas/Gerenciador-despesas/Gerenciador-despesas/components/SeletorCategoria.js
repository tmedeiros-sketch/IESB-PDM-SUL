import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CATEGORIAS } from '../data/categorias';

export default function SeletorCategoria({ value, onChange, mostrarTodas = false }) {
  const opcoes = mostrarTodas ? [{ id: 'Todas', icon: '✦', color: '#E8F3EB' }, ...CATEGORIAS] : CATEGORIAS;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lista}>
      {opcoes.map((categoria) => {
        const selecionada = value === categoria.id;
        return (
          <Pressable
            key={categoria.id}
            accessibilityRole="button"
            accessibilityState={{ selected: selecionada }}
            onPress={() => onChange(categoria.id)}
            style={[styles.opcao, selecionada && styles.opcaoSelecionada]}
          >
            <View style={[styles.icone, { backgroundColor: selecionada ? '#DDF0E2' : categoria.color }]}>
              <Text style={styles.emoji}>{categoria.icon}</Text>
            </View>
            <Text style={[styles.texto, selecionada && styles.textoSelecionado]}>{categoria.id}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: { gap: 9, paddingVertical: 2, paddingRight: 4 },
  opcao: { minWidth: 78, alignItems: 'center', gap: 7, paddingVertical: 9, paddingHorizontal: 9, borderRadius: 15, borderWidth: 1, borderColor: 'transparent' },
  opcaoSelecionada: { backgroundColor: '#F0F8F1', borderColor: '#A8D3B0' },
  icone: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 18 },
  texto: { color: '#6C7771', fontSize: 11, fontWeight: '600' },
  textoSelecionado: { color: '#225C38', fontWeight: '800' },
});
