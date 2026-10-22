import { StyleSheet, Text, View } from 'react-native';
import { formatarMoeda } from '../utils/dinheiro';

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  const acimaDoLimite = somaDespesas > 200;

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.selo}><Text style={styles.seloTexto}>◒</Text></View>
        <Text style={styles.periodo}>RESUMO DO PERÍODO</Text>
        <View style={styles.ponto} />
      </View>
      <Text style={styles.descricao}>Total das despesas exibidas</Text>
      <View style={styles.valorLinha}>
        <Text style={[styles.valor, acimaDoLimite && styles.valorAlerta]}>{formatarMoeda(somaDespesas)}</Text>
        <View style={[styles.contador, acimaDoLimite && styles.contadorAlerta]}>
          <Text style={[styles.contadorTexto, acimaDoLimite && styles.contadorTextoAlerta]}>{despesas.length} {despesas.length === 1 ? 'item' : 'itens'}</Text>
        </View>
      </View>
      <View style={styles.linhaRodape}>
        <View style={styles.barra}><View style={[styles.progresso, acimaDoLimite && styles.progressoAlerta]} /></View>
        <Text style={styles.rodape}>{acimaDoLimite ? 'Atenção ao limite de R$ 200' : 'Dentro do limite de R$ 200'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 19, marginTop: 17, padding: 18, borderRadius: 23, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#ECF0ED' },
  topo: { flexDirection: 'row', alignItems: 'center' },
  selo: { width: 25, height: 25, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECF7EE' },
  seloTexto: { color: '#287343', fontSize: 15 },
  periodo: { marginLeft: 8, color: '#75877A', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  ponto: { width: 6, height: 6, marginLeft: 7, borderRadius: 3, backgroundColor: '#70B582' },
  descricao: { marginTop: 13, color: '#526359', fontSize: 11, fontWeight: '600' },
  valorLinha: { marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  valor: { color: '#1D4B30', fontSize: 29, fontWeight: '800', letterSpacing: -0.8 },
  valorAlerta: { color: '#C94141' },
  contador: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20, backgroundColor: '#EFF6F0' },
  contadorAlerta: { backgroundColor: '#FFF0F0' },
  contadorTexto: { color: '#51735A', fontSize: 10, fontWeight: '700' },
  contadorTextoAlerta: { color: '#B13C3C' },
  linhaRodape: { marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 9 },
  barra: { width: 53, height: 5, overflow: 'hidden', borderRadius: 5, backgroundColor: '#EAF0EB' },
  progresso: { width: '62%', height: 5, borderRadius: 5, backgroundColor: '#70B582' },
  progressoAlerta: { width: '100%', backgroundColor: '#E57373' },
  rodape: { color: '#89968D', fontSize: 10, fontWeight: '600' },
});
