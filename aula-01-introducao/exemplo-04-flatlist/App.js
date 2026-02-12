/**
 * Exemplo 04 — FlatList (substituindo map)
 * 
 * Conceitos: FlatList, renderItem, keyExtractor, listas otimizadas.
 * 
 * Referência: Slide 7 — "Desafio Relâmpago: FlatList"
 * Pergunta: "Se no React Web vocês usam map() para renderizar listas,
 *            como fariam isso no React Native usando FlatList?"
 * 
 * Pontos de atenção para os alunos:
 * - Na web: array.map(item => <div>{item}</div>)
 * - No mobile: <FlatList data={array} renderItem={({item}) => <View>...} />
 * - FlatList é MUITO mais eficiente que map() para listas grandes
 *   porque implementa "virtualização" (só renderiza itens visíveis)
 * - keyExtractor evita warnings e melhora performance
 */

import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Dados de exemplo — lista de linguagens/frameworks
const dadosIniciais = [
  { id: '1', nome: 'JavaScript', emoji: '🟨', tipo: 'Linguagem' },
  { id: '2', nome: 'React', emoji: '⚛️', tipo: 'Biblioteca' },
  { id: '3', nome: 'React Native', emoji: '📱', tipo: 'Framework' },
  { id: '4', nome: 'TypeScript', emoji: '🔷', tipo: 'Linguagem' },
  { id: '5', nome: 'Node.js', emoji: '🟢', tipo: 'Runtime' },
  { id: '6', nome: 'Python', emoji: '🐍', tipo: 'Linguagem' },
  { id: '7', nome: 'Firebase', emoji: '🔥', tipo: 'Plataforma' },
  { id: '8', nome: 'Expo', emoji: '🚀', tipo: 'Framework' },
];

const App = () => {
  const [tecnologias, setTecnologias] = useState(dadosIniciais);
  const [novaTec, setNovaTec] = useState('');

  const adicionarTecnologia = () => {
    if (!novaTec.trim()) return;
    
    const nova = {
      id: Date.now().toString(),
      nome: novaTec.trim(),
      emoji: '✨',
      tipo: 'Personalizado',
    };
    
    setTecnologias([nova, ...tecnologias]);
    setNovaTec('');
  };

  const removerTecnologia = (id) => {
    setTecnologias(tecnologias.filter((item) => item.id !== id));
  };

  // Esta função é chamada para CADA item da lista
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => removerTecnologia(item.id)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cardTexto}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.tipo}>{item.tipo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📚 Tecnologias</Text>
      <Text style={styles.subtitulo}>
        FlatList — a forma correta de renderizar listas no React Native
      </Text>

      {/* Formulário para adicionar */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nova tecnologia..."
          value={novaTec}
          onChangeText={setNovaTec}
        />
        <Button title="Adicionar" onPress={adicionarTecnologia} color="#4CAF50" />
      </View>

      <Text style={styles.contador}>
        Total: {tecnologias.length} itens (segure para remover)
      </Text>

      {/* FlatList — substitui o map() da web */}
      <FlatList
        data={tecnologias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma tecnologia na lista</Text>
        }
      />

      <Text style={styles.dica}>
        💡 Na web: items.map(i =&gt; &lt;div&gt;...&lt;/div&gt;)
        {'\n'}No mobile: &lt;FlatList data=... renderItem=... /&gt;
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F0F4F8',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  subtitulo: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#FFF',
  },
  contador: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emoji: {
    fontSize: 28,
    marginRight: 14,
  },
  cardTexto: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  tipo: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  vazio: {
    textAlign: 'center',
    color: '#AAA',
    marginTop: 40,
    fontSize: 16,
  },
  dica: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 12,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default App;
