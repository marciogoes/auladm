// ============================================================
// PASSO 04 — Objetos, Destructuring e Spread
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Criar e manipular objetos JavaScript, usar
//           destructuring para extrair valores e spread para
//           copiar/mesclar objetos. Fundamental para entender
//           as props do React Native.
//
// CONCEITOS: object literal, dot notation, destructuring,
//            spread operator, Object.keys/values/entries
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// ── 1. Objeto literal — como "registros" de dados
const aluno = {
  id: 101,
  nome: 'Carlos Silva',
  curso: 'TADS',
  semestre: 4,
  ativo: true,
  notas: { p1: 8.0, p2: 7.5, final: 9.0 },
};

// ── 2. Destructuring — extrair propriedades em variáveis locais
const { nome, curso, semestre, ativo } = aluno;

// ── 2b. Destructuring com renomeação
const { id: matricula } = aluno;

// ── 2c. Destructuring aninhado
const { notas: { p1, p2, final } } = aluno;

// ── 3. Spread de objeto — copia sem mutar o original
const alunoAtualizado = { ...aluno, semestre: 5, ativo: false };

// ── 4. Mesclar dois objetos
const dadosContato = { email: 'carlos@email.com', telefone: '92 99999-0000' };
const alunoPerfil = { ...aluno, ...dadosContato };

// ── 5. Object.keys / .values / .entries (útil para iterar)
const chavesAluno = Object.keys(aluno);      // ['id','nome','curso',...]
const valoresNotas = Object.values(aluno.notas); // [8.0, 7.5, 9.0]

// ── Função que recebe objeto e usa destructuring no parâmetro
const calcularMedia = ({ p1, p2, final }) => {
  return ((p1 + p2 + final) / 3).toFixed(1);
};

// ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>

      <Text style={s.titulo}>🗂️ Passo 04 — Objetos & Destructuring</Text>

      {/* ── Objeto original */}
      <Label titulo="1. Objeto original" codigo="const aluno = { id, nome, curso... }" />
      <PropCard prop="id"       valor={String(aluno.id)} />
      <PropCard prop="nome"     valor={aluno.nome} />
      <PropCard prop="curso"    valor={aluno.curso} />
      <PropCard prop="semestre" valor={String(aluno.semestre)} />
      <PropCard prop="ativo"    valor={aluno.ativo ? 'true ✅' : 'false ❌'} />

      {/* ── Destructuring */}
      <Label
        titulo="2. Destructuring"
        codigo={'const { nome, curso, semestre } = aluno;'}
      />
      <PropCard prop="nome (extraído)"      valor={nome} />
      <PropCard prop="curso (extraído)"     valor={curso} />
      <PropCard prop="semestre (extraído)"  valor={String(semestre)} />
      <PropCard prop="id renomeado → matricula" valor={String(matricula)} />

      {/* ── Destructuring aninhado */}
      <Label titulo="3. Destructuring aninhado" codigo="const { notas: { p1, p2, final } } = aluno;" />
      <PropCard prop="p1"    valor={String(p1)} />
      <PropCard prop="p2"    valor={String(p2)} />
      <PropCard prop="final" valor={String(final)} />
      <PropCard prop="média calculada" valor={calcularMedia(aluno.notas)} destaque />

      {/* ── Spread */}
      <Label titulo="4. Spread — copia sem mutar" codigo="{ ...aluno, semestre: 5 }" />
      <View style={s.comparaRow}>
        <View style={s.comparaCol}>
          <Text style={s.comparaLabel}>Original</Text>
          <Text style={s.comparaVal}>semestre: {aluno.semestre}</Text>
          <Text style={s.comparaVal}>ativo: {String(aluno.ativo)}</Text>
        </View>
        <View style={s.comparaCol}>
          <Text style={s.comparaLabel}>Atualizado</Text>
          <Text style={[s.comparaVal, { color: '#fbbf24' }]}>semestre: {alunoAtualizado.semestre}</Text>
          <Text style={[s.comparaVal, { color: '#f87171' }]}>ativo: {String(alunoAtualizado.ativo)}</Text>
        </View>
      </View>

      {/* ── Object.keys */}
      <Label titulo="5. Object.keys() e Object.values()" codigo="Object.keys(aluno)" />
      <Text style={s.descricao}>Chaves: {chavesAluno.join(', ')}</Text>
      <Text style={s.descricao}>Valores das notas: {valoresNotas.join(', ')}</Text>

      {/* ── Dica de props */}
      <View style={s.dica}>
        <Text style={s.dicaTitulo}>💡 Por que isso importa no React Native?</Text>
        <Text style={s.dicaTexto}>
          No React Native, <Text style={s.cod}>props</Text> são objetos!{'\n\n'}
          Quando você escreve <Text style={s.cod}>{'<Aluno nome="Ana" nota={9} />'}</Text>,{'\n'}
          o componente recebe: <Text style={s.cod}>{'{ nome: "Ana", nota: 9 }'}</Text>{'\n\n'}
          E com destructuring no parâmetro:{'\n'}
          <Text style={s.cod}>{'const Aluno = ({ nome, nota }) => ...'}</Text>
        </Text>
      </View>

    </ScrollView>
  );
}

// ── Sub-componentes
const Label = ({ titulo, codigo }) => (
  <View style={{ marginTop: 20, marginBottom: 6 }}>
    <Text style={s.secao}>{titulo}</Text>
    {codigo && <Text style={s.codigo}>{codigo}</Text>}
  </View>
);

const PropCard = ({ prop, valor, destaque = false }) => (
  <View style={[s.card, destaque && s.cardDestaque]}>
    <Text style={s.prop}>{prop}</Text>
    <Text style={[s.val, destaque && { color: '#fbbf24', fontWeight: 'bold' }]}>{valor}</Text>
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
  secao: { color: '#f59e0b', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase' },
  codigo: { color: '#94a3b8', fontSize: 11, fontFamily: 'monospace', marginTop: 2 },
  descricao: { color: '#4ade80', fontSize: 12, fontFamily: 'monospace', marginBottom: 4 },
  card: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#1e293b', borderRadius: 6, padding: 10, marginBottom: 4,
    borderLeftWidth: 3, borderLeftColor: '#38bdf8',
  },
  cardDestaque: { backgroundColor: '#1a2a1a', borderLeftColor: '#fbbf24' },
  prop: { color: '#94a3b8', fontSize: 12, flex: 1 },
  val: { color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace' },
  comparaRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  comparaCol: {
    flex: 1, backgroundColor: '#1e293b', borderRadius: 8, padding: 12,
  },
  comparaLabel: { color: '#64748b', fontSize: 11, marginBottom: 6, fontWeight: 'bold' },
  comparaVal: { color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace', marginBottom: 2 },
  dica: {
    backgroundColor: '#1a1a2e', borderRadius: 8, padding: 14,
    marginTop: 20, borderLeftWidth: 4, borderLeftColor: '#a78bfa',
  },
  dicaTitulo: { color: '#a78bfa', fontWeight: 'bold', marginBottom: 8 },
  dicaTexto: { color: '#ddd6fe', lineHeight: 22, fontSize: 12 },
  cod: { color: '#fcd34d', fontFamily: 'monospace' },
});
