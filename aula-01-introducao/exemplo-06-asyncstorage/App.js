/**
 * Exemplo 06 — useEffect + AsyncStorage
 * 
 * Conceitos: useEffect, AsyncStorage (persistência local), ciclo de vida.
 * 
 * Referência: Slide 10 — "Desafio Relâmpago: AsyncStorage"
 * Pergunta: "Como vocês implementariam um useEffect que salva o valor 
 *            do contador no AsyncStorage toda vez que ele muda?"
 * 
 * Pontos de atenção para os alunos:
 * - AsyncStorage é o equivalente ao localStorage da web
 * - Diferença crucial: AsyncStorage é ASSÍNCRONO (usa async/await)
 * - useEffect com dependência [cont] dispara quando cont muda
 * - useEffect com [] vazio roda apenas na montagem (carrega dados salvos)
 * 
 * IMPORTANTE: No Expo Snack, adicione @react-native-async-storage/async-storage
 *             nas dependências do projeto.
 */

import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@contador_valor';

const ContadorPersistente = () => {
  const [cont, setCont] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [ultimoSalvo, setUltimoSalvo] = useState(null);

  // useEffect para CARREGAR dados salvos na montagem do componente
  // Equivalente a componentDidMount — roda uma vez
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const valorSalvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (valorSalvo !== null) {
          setCont(parseInt(valorSalvo, 10));
        }
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []); // Array vazio = executa apenas na montagem

  // useEffect para SALVAR quando o contador muda
  // Dependência [cont] faz com que execute toda vez que cont é atualizado
  useEffect(() => {
    // Não salva durante o carregamento inicial
    if (carregando) return;

    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, cont.toString());
        setUltimoSalvo(new Date().toLocaleTimeString('pt-BR'));
      } catch (erro) {
        console.error('Erro ao salvar dados:', erro);
      }
    };

    salvarDados();
  }, [cont]); // Executa toda vez que 'cont' muda

  const limparStorage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setCont(0);
    } catch (erro) {
      console.error('Erro ao limpar dados:', erro);
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.carregandoTexto}>Carregando dados salvos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>💾 Contador Persistente</Text>
      <Text style={styles.descricao}>
        Feche o app e abra novamente — o valor será mantido!
      </Text>

      <Text style={styles.valor}>{cont}</Text>

      {ultimoSalvo && (
        <Text style={styles.salvo}>
          Salvo automaticamente às {ultimoSalvo}
        </Text>
      )}

      <View style={styles.botoes}>
        <View style={styles.botao}>
          <Button
            title="➕ Somar"
            onPress={() => setCont((prev) => prev + 1)}
            color="#4CAF50"
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="➖ Subtrair"
            onPress={() => setCont((prev) => prev - 1)}
            color="#FF9800"
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="🗑️ Limpar Storage"
            onPress={limparStorage}
            color="#F44336"
          />
        </View>
      </View>

      <View style={styles.comparacao}>
        <Text style={styles.comparacaoTitulo}>🌐 Web vs 📱 Mobile</Text>
        <Text style={styles.comparacaoItem}>
          Web: localStorage.setItem('key', value)
        </Text>
        <Text style={styles.comparacaoItem}>
          Mobile: await AsyncStorage.setItem('key', value)
        </Text>
        <Text style={styles.comparacaoDestaque}>
          Diferença: AsyncStorage é assíncrono!
        </Text>
      </View>

      <Text style={styles.dica}>
        💡 useEffect com [cont] executa toda vez que cont muda
        {'\n'}useEffect com [] executa só na montagem
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  valor: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  salvo: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 16,
  },
  carregandoTexto: {
    marginTop: 12,
    fontSize: 16,
    color: '#777',
  },
  botoes: {
    width: '80%',
    marginBottom: 24,
  },
  botao: {
    marginVertical: 4,
  },
  comparacao: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  comparacaoTitulo: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1565C0',
    marginBottom: 8,
  },
  comparacaoItem: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#555',
    marginBottom: 4,
  },
  comparacaoDestaque: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E65100',
    marginTop: 6,
  },
  dica: {
    marginTop: 16,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default ContadorPersistente;
