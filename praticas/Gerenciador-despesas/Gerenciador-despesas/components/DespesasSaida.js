import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';
import SeletorCategoria from './SeletorCategoria';

function Cabecalho({
  despesas,
  formulario,
  filtroCategoria,
  onFiltroCategoria,
  quantidadeTotal,
}) {
  return (
    <View>
      <View style={styles.hero}>
        <View style={styles.marcaLinha}>
          <View style={styles.marca}><Text style={styles.marcaTexto}>↗</Text></View>
          <Text style={styles.marcaNome}>meu<Text style={styles.marcaDestaque}>saldo</Text></Text>
          <View style={styles.mesPill}><Text style={styles.mesTexto}>SEU CONTROLE</Text></View>
        </View>
        <Text style={styles.heroTitulo}>Pequenos gastos,{`\n`}grandes escolhas.</Text>
        <Text style={styles.heroDescricao}>Um olhar leve para o seu dia a dia financeiro.</Text>
      </View>

      <DespesaSumario despesas={despesas} />
      {formulario}

      <View style={styles.filtroSecao}>
        <View style={styles.filtroTituloLinha}>
          <View>
            <Text style={styles.sobretitulo}>VISÃO POR CATEGORIA</Text>
            <Text style={styles.filtroTitulo}>Onde você gastou?</Text>
          </View>
          <Text style={styles.iconeFiltro}>⌕</Text>
        </View>
        <SeletorCategoria value={filtroCategoria} onChange={onFiltroCategoria} mostrarTodas />
      </View>

      <View style={styles.listaCabecalho}>
        <View>
          <Text style={styles.sobretitulo}>MOVIMENTAÇÕES</Text>
          <Text style={styles.listaTitulo}>{filtroCategoria === 'Todas' ? 'Últimas despesas' : filtroCategoria}</Text>
        </View>
        <View style={styles.contador}><Text style={styles.contadorTexto}>{quantidadeTotal} no total</Text></View>
      </View>
    </View>
  );
}

export default function DespesasSaida({
  despesas,
  formulario,
  filtroCategoria,
  onFiltroCategoria,
  quantidadeTotal,
  onEditar,
  onRemover,
}) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem despesa={item} onEditar={() => onEditar(item.id)} onRemover={() => onRemover(item.id)} />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 9 }} />}
      ListHeaderComponent={(
        <Cabecalho
          despesas={despesas}
          formulario={formulario}
          filtroCategoria={filtroCategoria}
          onFiltroCategoria={onFiltroCategoria}
          quantidadeTotal={quantidadeTotal}
        />
      )}
      ListEmptyComponent={(
        <View style={styles.vazio}>
          <View style={styles.vazioIcone}><Text style={styles.vazioEmoji}>🌿</Text></View>
          <Text style={styles.vazioTitulo}>Tudo tranquilo por aqui</Text>
          <Text style={styles.vazioTexto}>Nenhuma despesa nesta categoria ainda.</Text>
        </View>
      )}
      contentContainerStyle={styles.conteudoLista}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  conteudoLista: { paddingBottom: 34 },
  hero: { paddingHorizontal: 23, paddingTop: 17 },
  marcaLinha: { flexDirection: 'row', alignItems: 'center' },
  marca: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: '#277345' },
  marcaTexto: { color: '#FFFFFF', fontSize: 21, lineHeight: 24, fontWeight: '700' },
  marcaNome: { marginLeft: 8, color: '#294333', fontSize: 15, fontWeight: '700' },
  marcaDestaque: { color: '#277345', fontWeight: '900' },
  mesPill: { marginLeft: 'auto', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 20, backgroundColor: '#E9F3EB' },
  mesTexto: { color: '#548160', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  heroTitulo: { marginTop: 18, color: '#203D2C', fontSize: 24, lineHeight: 29, fontWeight: '800', letterSpacing: -0.55 },
  heroDescricao: { marginTop: 6, color: '#7E8B82', fontSize: 11, lineHeight: 16 },
  filtroSecao: { marginTop: 23, paddingHorizontal: 20 },
  filtroTituloLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sobretitulo: { color: '#8A9A8F', fontSize: 8, fontWeight: '800', letterSpacing: 1.3 },
  filtroTitulo: { marginTop: 4, color: '#294333', fontSize: 16, fontWeight: '800' },
  iconeFiltro: { width: 31, height: 31, borderRadius: 11, textAlign: 'center', textAlignVertical: 'center', color: '#558063', backgroundColor: '#ECF4EE', fontSize: 22 },
  listaCabecalho: { marginTop: 24, marginBottom: 11, paddingHorizontal: 21, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  listaTitulo: { marginTop: 4, color: '#294333', fontSize: 16, fontWeight: '800' },
  contador: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, backgroundColor: '#EFF3F0' },
  contadorTexto: { color: '#78877D', fontSize: 9, fontWeight: '700' },
  vazio: { marginHorizontal: 19, paddingVertical: 30, paddingHorizontal: 20, alignItems: 'center', borderRadius: 20, borderWidth: 1, borderColor: '#E7ECE8', borderStyle: 'dashed', backgroundColor: '#FBFCFB' },
  vazioIcone: { width: 50, height: 50, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDF6EF' },
  vazioEmoji: { fontSize: 22 },
  vazioTitulo: { marginTop: 12, color: '#385343', fontSize: 13, fontWeight: '800' },
  vazioTexto: { marginTop: 5, color: '#859289', fontSize: 10 },
});
