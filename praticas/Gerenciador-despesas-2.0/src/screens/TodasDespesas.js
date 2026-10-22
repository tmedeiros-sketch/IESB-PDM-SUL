import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIES } from '../constants/categorias';
import { getTheme } from '../constants/theme';

const FILTER_OPTIONS = ['Todas', ...CATEGORIES];

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const theme = getTheme(useColorScheme());

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const debouncedSearch = useDebounce(search, 300);

  // Busca (sem diferenciar maiúsculas) combinada com o filtro de categoria
  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses.filter(
      (expense) =>
        (selectedCategory === 'Todas' || expense.category === selectedCategory) &&
        expense.description.toLowerCase().includes(term)
    );
  }, [expenses, debouncedSearch, selectedCategory]);

  function confirmClearAll() {
    Alert.alert('Limpar tudo', 'Deseja remover todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const hasExpenses = expenses.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[styles.search, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.textSecondary}
        autoCorrect={false}
      />

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTER_OPTIONS.map((option) => {
            const active = option === selectedCategory;
            return (
              <Pressable
                key={option}
                onPress={() => setSelectedCategory(option)}
                style={[styles.chip, { backgroundColor: active ? theme.primary : theme.tagBackground }]}
              >
                <Text style={{ color: active ? theme.onPrimary : theme.tagText, fontWeight: '600' }}>{option}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {hasExpenses && (
          <Pressable onPress={confirmClearAll} style={styles.clear}>
            <Text style={{ color: theme.error, fontWeight: '600' }}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>

      <DespesaSaida
        despesas={filtered}
        periodo={selectedCategory === 'Todas' ? 'Total' : selectedCategory}
        emptyTitle={hasExpenses ? 'Nenhum resultado.' : 'Nenhuma despesa.'}
        emptyHint={hasExpenses ? 'Tente outro termo ou categoria.' : 'Toque em + para adicionar.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  chips: { gap: 8, paddingRight: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 },
  clear: { paddingLeft: 8 },
});
