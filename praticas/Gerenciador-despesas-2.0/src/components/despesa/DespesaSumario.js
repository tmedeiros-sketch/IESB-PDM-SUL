import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { ALERT_LIMIT } from '../../constants/categorias';
import { getTheme } from '../../constants/theme';

export default function DespesaSumario({ despesas, periodo }) {
  const theme = getTheme(useColorScheme());
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.amount, 0);
  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.summary }]}>
      <View>
        <Text style={[styles.periodo, { color: theme.text }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: theme.textSecondary }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text
        style={[styles.soma, { color: theme.primary }, somaDespesas > ALERT_LIMIT && { color: '#dc2626' }]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 14, fontWeight: '600' },
  quantidade: { fontSize: 12, marginTop: 2 },
  soma: { fontSize: 18, fontWeight: 'bold' },
});
