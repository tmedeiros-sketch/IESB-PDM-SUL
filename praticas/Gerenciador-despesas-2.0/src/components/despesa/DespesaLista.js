import { FlatList, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getTheme } from '../../constants/theme';

export default function DespesaLista({
  despesas,
  emptyTitle = 'Nenhuma despesa.',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const theme = getTheme(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1; // bônus: layout responsivo

  return (
    <FlatList
      key={numColumns}
      data={despesas}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View style={{ width: `${100 / numColumns}%` }}>
          <DespesaItem {...item} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={56} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>{emptyTitle}</Text>
          <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>{emptyHint}</Text>
        </View>
      }
      contentContainerStyle={despesas.length === 0 ? styles.emptyContainer : styles.content}
    />
  );
}

const styles = StyleSheet.create({
  row: { justifyContent: 'flex-start' },
  content: { paddingTop: 8, paddingBottom: 24 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  emptyHint: { marginTop: 4, textAlign: 'center' },
});
