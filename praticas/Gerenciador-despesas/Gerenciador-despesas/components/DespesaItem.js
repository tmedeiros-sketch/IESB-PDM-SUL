import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIAS } from '../data/categorias';
import { dataParaTexto } from '../utils/data';
import { formatarMoeda } from '../utils/dinheiro';

export default function DespesaItem({ despesa, onEditar, onRemover }) {
  const categoria = CATEGORIAS.find((item) => item.id === despesa.categoria);

  return (
    <View style={styles.card}>
      <View style={[styles.icone, { backgroundColor: categoria?.color ?? '#EEF2EF' }]}>
        <Text style={styles.emoji}>{categoria?.icon ?? '•'}</Text>
      </View>
      <View style={styles.conteudo}>
        <Text numberOfLines={1} style={styles.descricao}>{despesa.descricao}</Text>
        <View style={styles.detalhes}>
          <Text style={styles.data}>{dataParaTexto(despesa.data)}</Text>
          <View style={styles.separador} />
          <View style={styles.tag}><Text style={styles.categoria}>{despesa.categoria}</Text></View>
        </View>
      </View>
      <View style={styles.ladoValor}>
        <Text style={styles.valor}>{formatarMoeda(despesa.valor)}</Text>
        <View style={styles.acoes}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Editar ${despesa.descricao}`} onPress={onEditar} hitSlop={6} style={styles.acao}>
            <Text style={styles.editar}>Editar</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={`Excluir ${despesa.descricao}`} onPress={onRemover} hitSlop={6} style={styles.acao}>
            <Text style={styles.excluir}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 76, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EDF1EE' },
  icone: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 19 },
  conteudo: { flex: 1, minWidth: 0, marginLeft: 11 },
  descricao: { color: '#294333', fontSize: 12, fontWeight: '800' },
  detalhes: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 7 },
  data: { color: '#89968D', fontSize: 10, textTransform: 'capitalize' },
  separador: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#C1CCC4' },
  tag: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 7, backgroundColor: '#F1F4F2' },
  categoria: { color: '#65746A', fontSize: 9, fontWeight: '700' },
  ladoValor: { alignItems: 'flex-end', marginLeft: 6 },
  valor: { color: '#284B34', fontSize: 12, fontWeight: '800' },
  acoes: { flexDirection: 'row', gap: 8, marginTop: 7 },
  acao: { paddingVertical: 1 },
  editar: { color: '#42805A', fontSize: 9, fontWeight: '700' },
  excluir: { color: '#A16B68', fontSize: 9, fontWeight: '700' },
});
