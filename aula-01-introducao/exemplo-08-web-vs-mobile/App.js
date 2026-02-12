/**
 * Exemplo 08 — Web vs Mobile: Comparação Visual
 * 
 * Conceitos: Diferenças entre componentes HTML e React Native.
 * 
 * Referência: Slides 6-7 — "Web vs. Mobile: A Grande Mudança"
 * 
 * Este exemplo demonstra visualmente a tabela de equivalência:
 * <div> → <View>
 * <p> → <Text>
 * <img> → <Image>
 * <ul> → <FlatList>
 * <input> → <TextInput>
 * <button> → <Button> / <TouchableOpacity>
 * 
 * Pontos de atenção para os alunos:
 * - Os componentes mudam, mas a LÓGICA JavaScript permanece a mesma
 * - Todo texto DEVE estar dentro de <Text> (senão dá erro!)
 * - Não existe CSS externo — tudo é StyleSheet
 */

import { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Dados das equivalências
const equivalencias = [
  { id: '1', web: '<div>', mobile: '<View>', desc: 'Container / agrupador de elementos' },
  { id: '2', web: '<p> / <span>', mobile: '<Text>', desc: 'Qualquer texto na tela' },
  { id: '3', web: '<img>', mobile: '<Image>', desc: 'Exibir imagens' },
  { id: '4', web: '<ul> + map()', mobile: '<FlatList>', desc: 'Listas com scroll otimizado' },
  { id: '5', web: '<input>', mobile: '<TextInput>', desc: 'Campo de entrada de texto' },
  { id: '6', web: '<button>', mobile: '<TouchableOpacity>', desc: 'Elemento clicável customizável' },
  { id: '7', web: 'onClick', mobile: 'onPress', desc: 'Evento de toque/clique' },
  { id: '8', web: 'className + .css', mobile: 'style + StyleSheet', desc: 'Aplicar estilos' },
  { id: '9', web: 'localStorage', mobile: 'AsyncStorage', desc: 'Persistência local' },
  { id: '10', web: 'window.alert()', mobile: 'Alert.alert()', desc: 'Diálogos do sistema' },
];

const App = () => {
  const [filtro, setFiltro] = useState('');

  const dadosFiltrados = equivalencias.filter(
    (item) =>
      item.web.toLowerCase().includes(filtro.toLowerCase()) ||
      item.mobile.toLowerCase().includes(filtro.toLowerCase()) ||
      item.desc.toLowerCase().includes(filtro.toLowerCase())
  );

  const renderEquivalencia = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.coluna}>
          <Text style={styles.labelWeb}>🌐 WEB</Text>
          <Text style={styles.codigoWeb}>{item.web}</Text>
        </View>
        <Text style={styles.seta}>→</Text>
        <View style={styles.coluna}>
          <Text style={styles.labelMobile}>📱 MOBILE</Text>
          <Text style={styles.codigoMobile}>{item.mobile}</Text>
        </View>
      </View>
      <Text style={styles.descricao}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔄 Web vs Mobile</Text>
      <Text style={styles.subtitulo}>
        Componentes mudam, lógica permanece!
      </Text>

      {/* Demonstração real de componentes React Native */}
      <View style={styles.demoBox}>
        <Text style={styles.demoTitulo}>Demo ao vivo:</Text>
        <View style={styles.demoRow}>
          {/* Image — equivalente ao <img> */}
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.demoImagem}
          />
          <View style={styles.demoTextos}>
            {/* Text — equivalente ao <p> */}
            <Text style={styles.demoNome}>React Native</Text>
            {/* TextInput — equivalente ao <input> */}
            <TextInput
              style={styles.demoInput}
              placeholder="Buscar equivalência..."
              value={filtro}
              onChangeText={setFiltro}
            />
          </View>
        </View>
      </View>

      {/* FlatList — equivalente ao <ul> + map() */}
      <FlatList
        data={dadosFiltrados}
        renderItem={renderEquivalencia}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma equivalência encontrada</Text>
        }
      />

      <View style={styles.rodape}>
        <Text style={styles.dica}>
          💡 A lógica JS (useState, useEffect, map, filter) é 100% igual!
        </Text>
      </View>
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
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  demoBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  demoTitulo: {
    color: '#63FF00',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoImagem: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  demoTextos: {
    flex: 1,
  },
  demoNome: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  demoInput: {
    backgroundColor: '#2A2A4E',
    borderRadius: 6,
    padding: 8,
    color: '#FFF',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  coluna: {
    flex: 1,
    alignItems: 'center',
  },
  labelWeb: {
    fontSize: 10,
    color: '#E65100',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  labelMobile: {
    fontSize: 10,
    color: '#1565C0',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  codigoWeb: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#E65100',
    fontWeight: '600',
  },
  codigoMobile: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#1565C0',
    fontWeight: '600',
  },
  seta: {
    fontSize: 20,
    color: '#AAA',
    marginHorizontal: 8,
  },
  descricao: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  vazio: {
    textAlign: 'center',
    color: '#AAA',
    marginTop: 30,
  },
  rodape: {
    paddingVertical: 12,
  },
  dica: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
