import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import DespesaFormulario from './components/DespesaFormulario';
import DespesasSaida from './components/DespesasSaida';
import { DESPESAS_INICIAIS } from './data/despesas-iniciais';

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const despesasFiltradas = useMemo(
    () => filtroCategoria === 'Todas'
      ? despesas
      : despesas.filter((despesa) => despesa.categoria === filtroCategoria),
    [despesas, filtroCategoria],
  );

  const despesaEmEdicao = despesas.find((despesa) => despesa.id === idEmEdicao) ?? null;

  function salvarDespesa(dados) {
    if (idEmEdicao) {
      setDespesas((atuais) => atuais.map((despesa) => (
        despesa.id === idEmEdicao ? { ...despesa, ...dados } : despesa
      )));
      setIdEmEdicao(null);
      return;
    }

    setDespesas((atuais) => [{ id: String(Date.now()), ...dados }, ...atuais]);
  }

  function removerDespesa(id) {
    setDespesas((atuais) => atuais.filter((despesa) => despesa.id !== id));
    if (idEmEdicao === id) setIdEmEdicao(null);
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7F5" />
      <KeyboardAvoidingView style={styles.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <DespesasSaida
          despesas={despesasFiltradas}
          formulario={(
            <DespesaFormulario
              key={idEmEdicao ?? 'nova-despesa'}
              onSalvar={salvarDespesa}
              despesaEmEdicao={despesaEmEdicao}
              onCancelarEdicao={() => setIdEmEdicao(null)}
            />
          )}
          filtroCategoria={filtroCategoria}
          onFiltroCategoria={setFiltroCategoria}
          quantidadeTotal={despesas.length}
          onEditar={setIdEmEdicao}
          onRemover={removerDespesa}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#F4F7F5' },
  tela: { flex: 1 },
});
