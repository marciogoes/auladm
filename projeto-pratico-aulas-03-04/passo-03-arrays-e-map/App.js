// ============================================================
// PASSO 03 — Arrays, .map(), .filter() e .reduce()
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Manipular arrays com os métodos funcionais do ES6
//           e renderizar seus resultados com .map() no JSX.
//
// CONCEITOS: Array, .map(), .filter(), .reduce(), spread em array,
//            renderização de listas no React Native
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// ── Dados de exemplo (arrays de diferentes tipos)
const materias = ['React Native', 'TypeScript', 'Flexbox', 'Navegação', 'APIs'];

const notas = [8.5, 6.0, 9.2, 7.8, 5.5, 10.0, 4.3];

const alunos = [
  { id: 1, nome: 'Ana',    nota: 8.5, aprovado: true  },
  { id: 2, nome: 'Bruno',  nota: 4.0, aprovado: false },
  { id: 3, nome: 'Carla',  nota: 9.1, aprovado: true  },
  { id: 4, nome: 'Diego',  nota: 5.8, aprovado: false },
  { id: 5, nome: 'Elena',  nota: 7.5, aprovado: true  },
];

// ── .map() → transforma cada elemento (retorna novo array)
const materiasEmMaiusculo = materias.map(m => m.toUpperCase());

// ── .filter() → filtra por condição (retorna subarray)
const aprovados    = alunos.filter(a => a.aprovado === true);
const reprovados   = alunos.filter(a => a.aprovado === false);
const notasAltas   = notas.filter(n => n >= 7.0);

// ── .reduce() → reduz array a um único valor
const somaNotas  = notas.reduce((acumulador, nota) => acumulador + nota, 0);
const mediaNotas = (somaNotas / notas.length).toFixed(1);
const maiorNota  = notas.reduce((max, n) => n > max ? n : max, 0);

// ── Spread em array → cria novo array sem modificar o original
const notasOrdenadas = [...notas].sort((a, b) => b - a); // decrescente

// ──────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>

      <Text style={s.titulo}>📚 Passo 03 — Arrays</Text>

      {/* ── .map() básico em strings */}
      <Secao titulo="1. .map() — Transforma elementos" />
      <Text style={s.descricao}>materias.map(m {'=> m.toUpperCase()'})</Text>
      {materiasEmMaiusculo.map((item, index) => (
        <View key={index} style={s.item}>
          <Text style={s.badge}>{index + 1}</Text>
          <Text style={s.itemTexto}>{item}</Text>
        </View>
      ))}

      {/* ── .filter() */}
      <Secao titulo="2. .filter() — Filtra por condição" />
      <Text style={s.descricao}>alunos.filter(a {'=> a.aprovado'})</Text>
      <Text style={s.subLabel}>✅ Aprovados ({aprovados.length})</Text>
      {aprovados.map(a => (
        <AlunoCard key={a.id} aluno={a} />
      ))}
      <Text style={s.subLabel}>❌ Reprovados ({reprovados.length})</Text>
      {reprovados.map(a => (
        <AlunoCard key={a.id} aluno={a} />
      ))}

      {/* ── .reduce() */}
      <Secao titulo="3. .reduce() — Calcula totais" />
      <MetricaCard label="Notas originais" valor={notas.join(', ')} />
      <MetricaCard label="Soma total" valor={somaNotas.toFixed(1)} />
      <MetricaCard label="Média da turma" valor={mediaNotas} destaque />
      <MetricaCard label="Maior nota" valor={String(maiorNota)} />
      <MetricaCard label="Notas ≥ 7.0" valor={notasAltas.join(', ')} />

      {/* ── Spread + sort */}
      <Secao titulo="4. Spread + .sort() — Ordena sem modificar original" />
      <MetricaCard label="Original (desordenado)" valor={notas.join(', ')} />
      <MetricaCard label="Ordenado (decrescente)" valor={notasOrdenadas.join(', ')} destaque />

    </ScrollView>
  );
}

// ── Sub-componentes
const Secao = ({ titulo }) => (
  <Text style={s.secao}>{titulo}</Text>
);

const AlunoCard = ({ aluno }) => (
  <View style={[s.alunoCard, { borderLeftColor: aluno.aprovado ? '#4ade80' : '#f87171' }]}>
    <Text style={s.alunoNome}>{aluno.nome}</Text>
    <Text style={[s.alunoNota, { color: aluno.aprovado ? '#4ade80' : '#f87171' }]}>
      {aluno.nota.toFixed(1)}
    </Text>
  </View>
);

const MetricaCard = ({ label, valor, destaque = false }) => (
  <View style={[s.metrica, destaque && s.metricaDestaque]}>
    <Text style={s.metricaLabel}>{label}</Text>
    <Text style={[s.metricaValor, destaque && { color: '#fbbf24' }]}>{valor}</Text>
  </View>
);

// ── Estilos
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo: {
    fontSize: 20, fontWeight: 'bold', color: '#38bdf8',
    marginBottom: 20, textAlign: 'center',
  },
  secao: {
    color: '#f59e0b', fontSize: 13, fontWeight: 'bold',
    marginTop: 20, marginBottom: 4, textTransform: 'uppercase',
  },
  descricao: {
    color: '#64748b', fontSize: 11, fontFamily: 'monospace', marginBottom: 8,
  },
  subLabel: {
    color: '#94a3b8', fontSize: 12, marginTop: 8, marginBottom: 4,
  },
  item: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1e293b', borderRadius: 8,
    padding: 10, marginBottom: 4,
  },
  badge: {
    backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold',
    fontSize: 11, width: 22, height: 22, borderRadius: 11,
    textAlign: 'center', lineHeight: 22, marginRight: 10,
  },
  itemTexto: { color: '#f8fafc', fontSize: 13 },
  alunoCard: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#1e293b', borderRadius: 8, padding: 10,
    marginBottom: 4, borderLeftWidth: 3,
  },
  alunoNome: { color: '#e2e8f0', fontSize: 14 },
  alunoNota: { fontWeight: 'bold', fontSize: 15 },
  metrica: {
    backgroundColor: '#1e293b', borderRadius: 8, padding: 10,
    marginBottom: 4, flexDirection: 'row', justifyContent: 'space-between',
  },
  metricaDestaque: { backgroundColor: '#1c2a1c', borderWidth: 1, borderColor: '#fbbf24' },
  metricaLabel: { color: '#94a3b8', fontSize: 12, flex: 1 },
  metricaValor: { color: '#4ade80', fontSize: 12, fontFamily: 'monospace' },
});
