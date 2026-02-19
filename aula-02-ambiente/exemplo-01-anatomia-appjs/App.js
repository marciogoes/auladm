// ============================================================
// AULA 02 - Exemplo 01: Anatomia do App.js
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Entender a estrutura mínima de um app React Native
// SLIDES RELACIONADOS: 17, 18, 19
//
// Como testar: cole este código em snack.expo.dev
// ============================================================

// ── IMPORTS ──────────────────────────────────────────────────
// Slide 19: Importamos componentes do React Native (não do HTML!)
// View  = equivalente à <div> do HTML
// Text  = equivalente ao <p> ou <span> do HTML
// StyleSheet = sistema de estilos (não é CSS real, é JavaScript!)

import { StatusBar } from 'expo-status-bar'; // barra de status do celular
import { StyleSheet, Text, View } from 'react-native';

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
// Slide 19: Todo app React Native precisa de um componente default exportado
// É um Functional Component - apenas uma função que retorna JSX

export default function App() {
  // O return retorna JSX - parece HTML mas é JavaScript disfarçado!
  // ATENÇÃO: sem HTML puro aqui, apenas componentes React Native
  return (
    // View: container que envolve tudo (como uma <div>)
    <View style={styles.container}>

      {/* Caixa de título com cor de fundo */}
      <View style={styles.titleBox}>
        <Text style={styles.titulo}>📱 React Native</Text>
        <Text style={styles.subtitulo}>TADS 2026.1</Text>
      </View>

      {/* Seção de informações */}
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>🏫 Disciplina</Text>
        <Text style={styles.infoValor}>Programação para Dispositivos Móveis</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>👨‍🏫 Professor</Text>
        <Text style={styles.infoValor}>Marcio Goes do Nascimento</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>🗓 Aula</Text>
        <Text style={styles.infoValor}>02 - Ambiente e Ecossistema Mobile</Text>
      </View>

      {/* Explicação técnica */}
      <View style={styles.destaque}>
        <Text style={styles.destaqueTexto}>
          💡 Este arquivo é o App.js{'\n'}
          O ponto de entrada do seu aplicativo!
        </Text>
      </View>

      {/* StatusBar controla a barra do topo do celular */}
      {/* style="light" = ícones brancos | "dark" = ícones escuros */}
      <StatusBar style="light" />
    </View>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
// Slide 19: StyleSheet.create() é como o CSS, mas em JavaScript
// Diferenças do CSS: camelCase (backgroundColor, não background-color)
// Unidades: números = dp (density-independent pixels), sem px, em, rem

const styles = StyleSheet.create({
  // container: o View principal que ocupa a tela toda
  container: {
    flex: 1,                      // flex: 1 = ocupa todo o espaço disponível
    backgroundColor: '#1A1A2A',   // cor de fundo escura
    alignItems: 'center',         // centraliza horizontalmente (eixo X)
    justifyContent: 'center',     // centraliza verticalmente (eixo Y)
    padding: 20,                  // espaço interno nas bordas
    gap: 12,                      // espaço entre os filhos (React Native 0.71+)
  },

  titleBox: {
    backgroundColor: '#00C6AE',   // teal (cor da marca da aula)
    borderRadius: 16,             // cantos arredondados
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',           // negrito
    color: '#FFFFFF',
  },

  subtitulo: {
    fontSize: 18,
    color: '#E0F7F4',
    marginTop: 4,
  },

  infoBox: {
    backgroundColor: '#252535',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    borderLeftWidth: 4,           // borda esquerda colorida
    borderLeftColor: '#FF6B35',   // laranja accent
  },

  infoLabel: {
    fontSize: 12,
    color: '#8CA0B3',             // cinza claro
    fontWeight: 'bold',
    textTransform: 'uppercase',   // MAIÚSCULAS
    marginBottom: 2,
  },

  infoValor: {
    fontSize: 15,
    color: '#FFFFFF',
  },

  destaque: {
    backgroundColor: '#0D2137',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#00C6AE',       // borda teal
  },

  destaqueTexto: {
    color: '#00C6AE',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,               // espaçamento entre linhas
  },
});
