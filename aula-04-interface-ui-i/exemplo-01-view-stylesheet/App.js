/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 01 — View e StyleSheet
 *
 * Conceitos:
 *   - View: container fundamental de layout
 *   - StyleSheet.create(): forma performática de definir estilos
 *   - Propriedades básicas: backgroundColor, width, height,
 *     borderRadius, padding, margin, borderWidth, borderColor
 *   - Aninhamento de Views
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    // View raiz: ocupa toda a tela e centraliza o conteúdo
    <View style={styles.container}>

      {/* ── Seção 1: caixa simples ─────────────────────────── */}
      <Text style={styles.titulo}>1. View simples</Text>
      <View style={styles.caixaSimples} />

      {/* ── Seção 2: caixa com borda e texto ─────────────── */}
      <Text style={styles.titulo}>2. View com borda e texto</Text>
      <View style={styles.caixaBorda}>
        <Text style={styles.textoDentro}>Estou dentro de uma View!</Text>
      </View>

      {/* ── Seção 3: Views aninhadas (nested) ─────────────── */}
      <Text style={styles.titulo}>3. Views aninhadas</Text>
      <View style={styles.caixaPai}>
        <View style={styles.caixaFilha1} />
        <View style={styles.caixaFilha2} />
        <View style={styles.caixaFilha3} />
      </View>

      {/* ── Seção 4: View com cantos arredondados ─────────── */}
      <Text style={styles.titulo}>4. Cantos arredondados</Text>
      <View style={styles.caixaArredondada}>
        <Text style={styles.textoDentro}>borderRadius: 20</Text>
      </View>

    </View>
  );
}

// StyleSheet.create() valida as propriedades e melhora performance
// ao criar os objetos de estilo apenas uma vez (fora do render)
const styles = StyleSheet.create({

  // ── Container principal ────────────────────────────────
  container: {
    flex: 1,                        // ocupa toda a altura disponível
    backgroundColor: '#F0F4F8',
    padding: 20,
  },

  // ── Títulos de seção ───────────────────────────────────
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#243B55',
    marginTop: 16,
    marginBottom: 6,
  },

  // ── 1. Caixa simples ───────────────────────────────────
  caixaSimples: {
    width: '100%',
    height: 60,
    backgroundColor: '#00B4D8',   // cor de fundo teal
  },

  // ── 2. Caixa com borda ─────────────────────────────────
  caixaBorda: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,               // espessura da borda
    borderColor: '#F4793B',       // cor da borda (laranja)
    justifyContent: 'center',     // centraliza filho verticalmente
    alignItems: 'center',         // centraliza filho horizontalmente
  },

  // ── 3. Container pai (row) ─────────────────────────────
  caixaPai: {
    flexDirection: 'row',         // filhos lado a lado
    width: '100%',
    height: 60,
    gap: 8,                       // espaço entre os filhos
  },
  caixaFilha1: { flex: 1, backgroundColor: '#0D1B2A' },
  caixaFilha2: { flex: 2, backgroundColor: '#00B4D8' },
  caixaFilha3: { flex: 1, backgroundColor: '#F4793B' },

  // ── 4. Caixa arredondada ───────────────────────────────
  caixaArredondada: {
    width: '100%',
    height: 60,
    backgroundColor: '#0D1B2A',
    borderRadius: 20,             // arredonda os cantos
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Texto dentro das caixas ────────────────────────────
  textoDentro: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
