// App.js
// RotinaIESB — Atividade Integradora (Aulas 02 a 06)
// Programação para Dispositivos Móveis — IESB

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Aula 06 — useEffect de MONTAGEM: carrega a lista salva do AsyncStorage.
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar:', erro);
        Alert.alert('Erro', labels.erroCarregar);
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  // Aula 06 — useEffect DEPENDENTE da lista: salva sempre que ela mudar.
  // "carregado" evita sobrescrever o storage com [] antes da carga inicial.
  useEffect(() => {
    if (!carregado) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        console.log('Erro ao salvar:', erro);
        Alert.alert('Erro', labels.erroSalvar);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdicionar() {
    const textoLimpo = texto.trim();
    if (textoLimpo.length === 0) {
      Alert.alert(labels.alertaVazioTitulo, labels.alertaVazioMensagem);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    // Novo array (nunca mutar com push) — mantém o estado imutável.
    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function handleRemover(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  function handleToggleConcluido(id) {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  // Desafio opcional O3: contador de pendentes no cabeçalho.
  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.titulo}>{labels.tituloApp}</Text>
            <Text style={styles.subtitulo}>
              {labels.contadorPendentes(pendentes)}
            </Text>
          </View>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={handleRemover}
          onToggle={handleToggleConcluido}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subtitulo: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});
