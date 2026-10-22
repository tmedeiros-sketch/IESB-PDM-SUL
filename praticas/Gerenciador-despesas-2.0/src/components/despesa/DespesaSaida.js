import { StyleSheet, View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodo, emptyTitle, emptyHint }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} emptyTitle={emptyTitle} emptyHint={emptyHint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
