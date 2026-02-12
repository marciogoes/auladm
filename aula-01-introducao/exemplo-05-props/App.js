/**
 * Exemplo 05 — Passagem de Props
 * 
 * Conceitos: Props, desestruturação, interpolação JSX, componentes reutilizáveis.
 * 
 * Referência: Slide 9 — "Desafio Relâmpago: Props"
 * Pergunta: "Como passariam uma prop nome para esse componente 
 *            e exibiriam 'Olá, [nome]!' na tela?"
 * 
 * Pontos de atenção para os alunos:
 * - Props funcionam EXATAMENTE igual ao React Web
 * - Desestruturação de props: ({ nome, idade }) => ...
 * - Interpolação em JSX: {`Olá, ${nome}!`}
 * - Componentes reutilizáveis são a base do React (web e mobile)
 */

import { View, Text, StyleSheet, Image } from 'react-native';

// ============================================
// Componente reutilizável: CartaoAluno
// Recebe props via desestruturação
// ============================================
const CartaoAluno = ({ nome, curso, semestre, avatar }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.avatar}>{avatar}</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.saudacao}>Olá, {nome}!</Text>
        <Text style={styles.detalhe}>📚 {curso}</Text>
        <Text style={styles.detalhe}>📅 {semestre}º semestre</Text>
      </View>
    </View>
  );
};

// ============================================
// Componente reutilizável: InfoBox
// Mostra como props podem receber qualquer tipo de dado
// ============================================
const InfoBox = ({ titulo, valor, cor = '#1976D2' }) => (
  <View style={[styles.infoBox, { borderLeftColor: cor }]}>
    <Text style={styles.infoTitulo}>{titulo}</Text>
    <Text style={[styles.infoValor, { color: cor }]}>{valor}</Text>
  </View>
);

// ============================================
// Componente principal: App
// Demonstra como passar props para componentes filhos
// ============================================
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎓 Sistema de Alunos</Text>
      <Text style={styles.subtitulo}>
        Demonstração de Props e Componentes Reutilizáveis
      </Text>

      {/* Mesmo componente, dados diferentes via props */}
      <CartaoAluno
        nome="Maria Silva"
        curso="TADS"
        semestre={4}
        avatar="👩‍💻"
      />
      <CartaoAluno
        nome="João Santos"
        curso="TADS"
        semestre={4}
        avatar="👨‍💻"
      />
      <CartaoAluno
        nome="Ana Oliveira"
        curso="TADS"
        semestre={2}
        avatar="👩‍🎓"
      />

      {/* Componentes InfoBox reutilizáveis com prop de cor */}
      <View style={styles.infoContainer}>
        <InfoBox titulo="Total Alunos" valor="3" cor="#4CAF50" />
        <InfoBox titulo="Disciplina" valor="PDM" cor="#FF9800" />
        <InfoBox titulo="Aula" valor="01" cor="#9C27B0" />
      </View>

      <Text style={styles.dica}>
        💡 Mesmo conceito de Props do React Web!
        {'\n'}Desestruturação: {'({ nome, curso })'} =&gt; ...
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
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    fontSize: 40,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  saudacao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  infoTitulo: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  infoValor: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dica: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default App;
