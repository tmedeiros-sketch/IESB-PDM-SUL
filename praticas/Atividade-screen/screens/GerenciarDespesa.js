import { StyleSheet, Text, View } from 'react-native';

export default function GerenciarDespesa() {
  return <View style={styles.container}><Text style={styles.title}>Gerenciar Despesa</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f7fa' },
  title: { fontSize: 24, fontWeight: '600', color: '#16324f' },
});
