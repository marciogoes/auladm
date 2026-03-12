/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 02 — Flexbox Layouts
 *
 * Conceitos:
 *   - flexDirection: 'column' (padrão) vs 'row'
 *   - justifyContent: alinhamento no eixo principal
 *   - alignItems: alinhamento no eixo cruzado
 *   - flex: proporção de espaço
 *   - flexWrap: quebra de linha
 *   - gap: espaçamento entre elementos
 *
 * ⚠️  DIFERENÇA IMPORTANTE da web:
 *     No React Native, flexDirection padrão é 'column', não 'row'!
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// ── Dados das demonstrações ────────────────────────────────────────────────
const DEMOS = [
  {
    id: 'col',
    titulo: 'column (padrão)',
    descricao: 'flexDirection: "column"\nElementos empilhados verticalmente.',
    estilo: { flexDirection: 'column' },
  },
  {
    id: 'row',
    titulo: 'row',
    descricao: 'flexDirection: "row"\nElementos lado a lado.',
    estilo: { flexDirection: 'row' },
  },
  {
    id: 'jc_center',
    titulo: 'justifyContent: center',
    descricao: 'Centraliza no eixo principal (coluna = vertical).',
    estilo: { flexDirection: 'column', justifyContent: 'center' },
  },
  {
    id: 'jc_between',
    titulo: 'justifyContent: space-between',
    descricao: 'Distribui espaço igual entre os filhos.',
    estilo: { flexDirection: 'column', justifyContent: 'space-between' },
  },
  {
    id: 'jc_around',
    titulo: 'justifyContent: space-around',
    descricao: 'Espaço igual ao redor de cada filho.',
    estilo: { flexDirection: 'row', justifyContent: 'space-around' },
  },
  {
    id: 'ai_center',
    titulo: 'alignItems: center',
    descricao: 'Centraliza no eixo cruzado (coluna = horizontal).',
    estilo: { flexDirection: 'column', alignItems: 'center' },
  },
  {
    id: 'flex_prop',
    titulo: 'flex: proporção',
    descricao: 'Filhos com flex 1, 2, 1 dividem o espaço proporcionalmente.',
    flexFilhos: [1, 2, 1],
    estilo: { flexDirection: 'row' },
  },
  {
    id: 'wrap',
    titulo: 'flexWrap: wrap',
    descricao: 'Quebra de linha automática quando não cabe em uma linha.',
    wrap: true,
    estilo: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  },
];

const CORES = ['#00B4D8', '#F4793B', '#0D1B2A', '#4ADE80', '#F97316', '#818CF8'];

export default function App() {
  const [demoAtiva, setDemoAtiva] = useState(0);
  const demo = DEMOS[demoAtiva];

  // Quantos boxes exibir
  const qtd = demo.wrap ? 8 : 3;
  const filhos = demo.flexFilhos ?? null;

  return (
    <View style={styles.tela}>

      {/* ── Cabeçalho ─────────────────────────────────── */}
      <View style={styles.cabecalho}>
        <Text style={styles.cabTitulo}>Flexbox no React Native</Text>
        <Text style={styles.cabSub}>Toque para trocar a demo</Text>
      </View>

      {/* ── Seletor horizontal ───────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.seletorScroll}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
      >
        {DEMOS.map((d, i) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.chip, demoAtiva === i && styles.chipAtivo]}
            onPress={() => setDemoAtiva(i)}
          >
            <Text style={[styles.chipTexto, demoAtiva === i && styles.chipTextoAtivo]}>
              {d.titulo}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Descrição ─────────────────────────────────── */}
      <View style={styles.descricaoBox}>
        <Text style={styles.descricaoTitulo}>{demo.titulo}</Text>
        <Text style={styles.descricaoTexto}>{demo.descricao}</Text>
      </View>

      {/* ── Arena de demonstração ─────────────────────── */}
      <View style={styles.arenaContainer}>
        <Text style={styles.arenaLabel}>Resultado visual:</Text>
        <View style={[styles.arena, demo.estilo]}>
          {Array.from({ length: qtd }, (_, i) => (
            <View
              key={i}
              style={[
                styles.box,
                { backgroundColor: CORES[i % CORES.length] },
                filhos ? { flex: filhos[i] } : {},
              ]}
            >
              <Text style={styles.boxTexto}>
                {filhos ? `flex: ${filhos[i]}` : `Box ${i + 1}`}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Código do estilo ─────────────────────────── */}
      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Estilo aplicado:</Text>
        <Text style={styles.code}>
          {JSON.stringify(demo.estilo, null, 2)}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  // cabeçalho
  cabecalho: {
    backgroundColor: '#1B2E45',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  cabTitulo: { fontSize: 20, fontWeight: 'bold', color: '#00B4D8' },
  cabSub:    { fontSize: 12, color: '#8CA0B3', marginTop: 2 },

  // seletor
  seletorScroll: { maxHeight: 52, marginVertical: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1B2E45',
    borderWidth: 1,
    borderColor: '#243B55',
  },
  chipAtivo:  { backgroundColor: '#00B4D8', borderColor: '#00B4D8' },
  chipTexto:  { fontSize: 12, color: '#8CA0B3' },
  chipTextoAtivo: { color: '#0D1B2A', fontWeight: 'bold' },

  // descrição
  descricaoBox: {
    backgroundColor: '#1B2E45',
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  descricaoTitulo: { fontSize: 14, fontWeight: 'bold', color: '#F4793B', marginBottom: 4 },
  descricaoTexto:  { fontSize: 12, color: '#CBD5E1', lineHeight: 18 },

  // arena
  arenaContainer: { marginHorizontal: 12, marginBottom: 8 },
  arenaLabel: { fontSize: 12, color: '#8CA0B3', marginBottom: 6 },
  arena: {
    backgroundColor: '#243B55',
    height: 180,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#00B4D8',
    overflow: 'hidden',
  },

  // boxes dentro da arena
  box: {
    minWidth: 60,
    minHeight: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    margin: 2,
  },
  boxTexto: { fontSize: 10, color: '#fff', fontWeight: 'bold' },

  // código
  codeBox: {
    marginHorizontal: 12,
    backgroundColor: '#071020',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#243B55',
  },
  codeLabel: { fontSize: 11, color: '#8CA0B3', marginBottom: 4 },
  code:      { fontSize: 11, color: '#4EC994', fontFamily: 'monospace' },
});
