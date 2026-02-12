/**
 * Exemplo 01 — Olá, TADS!
 * 
 * Conceitos: View, Text, StyleSheet, estrutura básica de um componente React Native.
 * 
 * Referência: Slide 9 — "Exemplo de Código: Estrutura Básica"
 * 
 * Pontos de atenção para os alunos:
 * - Importamos componentes de 'react-native', não de HTML
 * - <View> substitui <div>
 * - <Text> substitui <p> — todo texto PRECISA estar dentro de <Text>
 * - Estilos são objetos JS criados com StyleSheet.create()
 * - flex: 1 faz o container ocupar toda a tela
 */

import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, TADS!</Text>
      <Text style={styles.subtitulo}>
        Meu primeiro app React Native 🚀
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#63FF00',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
