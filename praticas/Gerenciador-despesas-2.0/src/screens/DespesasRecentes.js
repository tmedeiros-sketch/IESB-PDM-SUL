import { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getDataMenosDias } from '../util/data';
import { getTheme } from '../constants/theme';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = getTheme(useColorScheme());

  const recentes = useMemo(() => {
    const limite = getDataMenosDias(new Date(), 7);
    return expenses.filter((expense) => expense.date >= limite && expense.date <= new Date());
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DespesaSaida
        despesas={recentes}
        periodo="Últimos 7 dias"
        emptyTitle="Nenhuma despesa recente."
        emptyHint="Toque em + para adicionar."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
