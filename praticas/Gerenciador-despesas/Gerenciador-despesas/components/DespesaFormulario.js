import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../data/categorias';
import { dataParaTexto, dataParaValor, paraDataLocal } from '../utils/data';
import SeletorCategoria from './SeletorCategoria';

const VALOR_VALIDO = /^\d*\.?\d{0,2}$/;

export default function DespesaFormulario({ onSalvar, despesaEmEdicao, onCancelarEdicao }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [erro, setErro] = useState('');

  function limparFormulario() {
    setDescricao('');
    setValor('');
    setCategoria('');
    setData(new Date());
    setErro('');
  }

  useEffect(() => {
    if (!despesaEmEdicao) {
      limparFormulario();
      return;
    }
    setDescricao(despesaEmEdicao.descricao);
    setValor(String(despesaEmEdicao.valor));
    setCategoria(despesaEmEdicao.categoria);
    setData(paraDataLocal(despesaEmEdicao.data));
    setErro('');
  }, [despesaEmEdicao?.id]);

  function alterarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (VALOR_VALIDO.test(normalizado)) setValor(normalizado);
    if (erro) setErro('');
  }

  function enviar() {
    const nome = descricao.trim();
    const numero = Number(valor);
    if (!nome || !valor || !categoria || !Number.isFinite(numero) || numero <= 0) {
      setErro('Preencha a descrição, o valor e a categoria com dados válidos.');
      return;
    }

    onSalvar({ descricao: nome, valor: numero, categoria, data: dataParaValor(data) });
    limparFormulario();
  }

  function fecharEdicao() {
    limparFormulario();
    onCancelarEdicao();
  }

  return (
    <View style={styles.card}>
      <View style={styles.tituloLinha}>
        <View>
          <Text style={styles.sobretitulo}>{despesaEmEdicao ? 'ATUALIZE OS DADOS' : 'NOVO LANÇAMENTO'}</Text>
          <Text style={styles.titulo}>{despesaEmEdicao ? 'Editar despesa' : 'Anote uma despesa'}</Text>
        </View>
        <View style={styles.estrela}><Text style={styles.estrelaTexto}>＋</Text></View>
      </View>

      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={(texto) => { setDescricao(texto); if (erro) setErro(''); }}
        placeholder="Ex.: Mercado, transporte..."
        placeholderTextColor="#9AA69E"
        maxLength={60}
        style={styles.input}
        returnKeyType="next"
      />

      <View style={styles.linhaCampos}>
        <View style={styles.campoValor}>
          <Text style={styles.rotulo}>Valor</Text>
          <View style={styles.valorInputWrap}>
            <Text style={styles.prefixo}>R$</Text>
            <TextInput
              value={valor}
              onChangeText={alterarValor}
              placeholder="0,00"
              placeholderTextColor="#9AA69E"
              keyboardType="decimal-pad"
              style={styles.valorInput}
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={styles.campoData}>
          <Text style={styles.rotulo}>Data</Text>
          <Pressable onPress={() => setMostrarData((aberta) => !aberta)} style={styles.dataBotao}>
            <Text style={styles.calendario}>▦</Text>
            <Text style={styles.dataTexto}>{dataParaTexto(data)}</Text>
          </Pressable>
        </View>
      </View>

      {mostrarData && Platform.OS === 'ios' && (
        <View style={styles.dataIos}>
          <DateTimePicker value={data} mode="date" display="spinner" onChange={(_, novaData) => novaData && setData(novaData)} />
          <Pressable onPress={() => setMostrarData(false)} style={styles.prontoBotao}><Text style={styles.prontoTexto}>Pronto</Text></Pressable>
        </View>
      )}
      {mostrarData && Platform.OS !== 'ios' && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(evento, novaData) => {
            setMostrarData(false);
            if (evento.type === 'set' && novaData) setData(novaData);
          }}
        />
      )}

      <Text style={styles.rotuloCategoria}>Categoria</Text>
      <SeletorCategoria value={categoria} onChange={(novaCategoria) => { setCategoria(novaCategoria); if (erro) setErro(''); }} />

      {!!erro && <Text accessibilityRole="alert" style={styles.erro}>{erro}</Text>}

      <View style={styles.acoes}>
        {despesaEmEdicao && <Pressable onPress={fecharEdicao} style={styles.cancelar}><Text style={styles.cancelarTexto}>Cancelar</Text></Pressable>}
        <Pressable onPress={enviar} style={styles.salvar}>
          <Text style={styles.salvarTexto}>{despesaEmEdicao ? 'Salvar alterações' : 'Adicionar despesa'}</Text>
          <Text style={styles.seta}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 19, marginTop: 19, padding: 18, borderRadius: 24, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#ECF0ED', shadowColor: '#254B34', shadowOpacity: 0.045, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 2 },
  tituloLinha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  sobretitulo: { color: '#7F9385', fontSize: 9, fontWeight: '800', letterSpacing: 1.4, marginBottom: 5 },
  titulo: { color: '#183D28', fontSize: 18, fontWeight: '800' },
  estrela: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECF7EE' },
  estrelaTexto: { color: '#287343', fontSize: 23, lineHeight: 26, fontWeight: '500' },
  rotulo: { color: '#526359', fontSize: 11, fontWeight: '700', marginBottom: 8 },
  input: { minHeight: 47, paddingHorizontal: 13, borderRadius: 13, borderWidth: 1, borderColor: '#E7ECE8', color: '#183D28', fontSize: 13, backgroundColor: '#FBFCFB' },
  linhaCampos: { flexDirection: 'row', gap: 11, marginTop: 15 },
  campoValor: { flex: 1 },
  campoData: { flex: 1.17 },
  valorInputWrap: { height: 47, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', borderRadius: 13, borderWidth: 1, borderColor: '#E7ECE8', backgroundColor: '#FBFCFB' },
  prefixo: { marginRight: 8, color: '#43805A', fontSize: 12, fontWeight: '800' },
  valorInput: { flex: 1, padding: 0, color: '#183D28', fontSize: 13, fontWeight: '700' },
  dataBotao: { height: 47, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 13, borderWidth: 1, borderColor: '#E7ECE8', backgroundColor: '#FBFCFB' },
  calendario: { color: '#43805A', fontSize: 16 },
  dataTexto: { color: '#33483A', fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  dataIos: { marginTop: 8, borderRadius: 16, overflow: 'hidden', backgroundColor: '#F6F8F6' },
  prontoBotao: { alignSelf: 'flex-end', paddingHorizontal: 14, paddingVertical: 10 },
  prontoTexto: { color: '#287343', fontWeight: '800' },
  rotuloCategoria: { color: '#526359', fontSize: 11, fontWeight: '700', marginTop: 17, marginBottom: 6 },
  erro: { marginTop: 9, color: '#B13C3C', fontSize: 11, lineHeight: 16 },
  acoes: { flexDirection: 'row', gap: 9, marginTop: 15 },
  salvar: { minHeight: 48, flex: 1, paddingHorizontal: 15, borderRadius: 15, backgroundColor: '#277345', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  salvarTexto: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  seta: { color: '#D9F0DE', fontSize: 19, lineHeight: 21 },
  cancelar: { minHeight: 48, paddingHorizontal: 14, borderRadius: 15, borderWidth: 1, borderColor: '#DDE5DF', alignItems: 'center', justifyContent: 'center' },
  cancelarTexto: { color: '#526359', fontSize: 12, fontWeight: '700' },
});
