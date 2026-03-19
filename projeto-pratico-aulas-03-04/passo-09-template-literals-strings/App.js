// ============================================================
// PASSO 09 — Template Literals e Formatação de Strings
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Usar template literals (crase) para montar textos
//           dinâmicos, formatação de datas, moedas e números.
//
// CONCEITOS: template literals (``), interpolação ${},
//            métodos de string, toFixed, toLocaleString,
//            padStart/padEnd, trim, replace, slice
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView,
} from 'react-native';

// ── Dados de exemplo
const aluno = { nome: 'Beatriz Santos', nota: 8.756, matricula: 42 };
const preco = 1234.5;
const hoje  = new Date();

// ── 1. Template literal — interpolação simples
const saudacao = `Olá, ${aluno.nome}! Sua nota é ${aluno.nota}.`;

// ── 2. Template com expressão
const situacao = `Aluno ${aluno.nota >= 7 ? 'APROVADO ✅' : 'REPROVADO ❌'} com ${aluno.nota.toFixed(1)}`;

// ── 3. Matrícula com zeros à esquerda (padStart)
const matriculaFormatada = `MAT-${String(aluno.matricula).padStart(5, '0')}`;
// Resultado: MAT-00042

// ── 4. Formatação de número (toFixed e toLocaleString)
const notaFixa      = aluno.nota.toFixed(2);          // "8.76"
const precoFormatado = preco.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL'
}); // "R$ 1.234,50"

// ── 5. Data formatada
const dataFormatada = hoje.toLocaleDateString('pt-BR', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
});
const horaFormatada = hoje.toLocaleTimeString('pt-BR', {
  hour: '2-digit', minute: '2-digit'
});

// ── 6. Métodos de string
const frase         = '  programação móvel  ';
const sempEspacos   = frase.trim();                // remove espaços nas bordas
const maiusculo     = frase.trim().toUpperCase();
const minusculo     = frase.trim().toLowerCase();
const substituido   = frase.trim().replace('móvel', 'React Native');
const primeiros5    = frase.trim().slice(0, 12);   // 'programação'
const partida       = frase.trim().includes('móvel'); // true

// ────────────────────────────────────────────────────────────

export default function App() {
  const [entrada, setEntrada] = useState('');

  // Operações ao vivo na string digitada
  const trimmed    = entrada.trim();
  const upper      = trimmed.toUpperCase();
  const palavras   = trimmed === '' ? 0 : trimmed.split(' ').filter(p => p).length;
  const chars      = trimmed.length;
  const inverso    = trimmed.split('').reverse().join('');
  const slug       = trimmed.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>
      <Text style={s.titulo}>💬 Passo 09 — Strings</Text>

      {/* ── Seção 1: Template literals */}
      <Secao titulo="1. Template Literals (crase)" />
      <Cartao rotulo="interpolação simples"   valor={saudacao} />
      <Cartao rotulo="com expressão ternária" valor={situacao} />
      <Cartao rotulo="padStart → matrícula"   valor={matriculaFormatada} />

      <View style={s.codeBox}>
        <Text style={s.code}>{`\`Olá, \${nome}!\`\n\`\${nota >= 7 ? 'APROVADO' : 'REPROVADO'}\`\n\`MAT-\${String(id).padStart(5, '0')}\``}</Text>
      </View>

      {/* ── Seção 2: Formatação de números */}
      <Secao titulo="2. Formatação de Números" />
      <Cartao rotulo="nota.toFixed(2)"         valor={notaFixa} />
      <Cartao rotulo="toLocaleString (BRL)"    valor={precoFormatado} />

      {/* ── Seção 3: Datas */}
      <Secao titulo="3. Datas Formatadas" />
      <Cartao rotulo="data longa (pt-BR)"  valor={dataFormatada} />
      <Cartao rotulo="hora"                valor={horaFormatada} />

      {/* ── Seção 4: Métodos de string */}
      <Secao titulo="4. Métodos de String" />
      <Cartao rotulo=".trim()"             valor={`"${sempEspacos}"`} />
      <Cartao rotulo=".toUpperCase()"      valor={maiusculo} />
      <Cartao rotulo=".toLowerCase()"      valor={minusculo} />
      <Cartao rotulo=".replace()"          valor={substituido} />
      <Cartao rotulo=".slice(0, 12)"       valor={primeiros5} />
      <Cartao rotulo=".includes('móvel')"  valor={String(partida)} />

      {/* ── Seção 5: Transformações ao vivo */}
      <Secao titulo="5. Transformações ao vivo — digite algo" />
      <TextInput
        style={s.input}
        placeholder="Digite uma frase aqui..."
        placeholderTextColor="#475569"
        value={entrada}
        onChangeText={setEntrada}
        autoCapitalize="none"
      />
      {entrada.length > 0 && (
        <View style={s.resultados}>
          <Cartao rotulo="MAIÚSCULO"     valor={upper} />
          <Cartao rotulo="Palavras"       valor={String(palavras)} />
          <Cartao rotulo="Caracteres"     valor={String(chars)} />
          <Cartao rotulo="Invertida"      valor={inverso} />
          <Cartao rotulo="Slug (URL)"     valor={slug} />
        </View>
      )}

      {/* ── Seção 6: Multiline template literal */}
      <Secao titulo="6. Template Literal Multilinha" />
      <View style={s.codeBox}>
        <Text style={s.code}>{`const mensagem = \`\n  Aluno: \${aluno.nome}\n  Nota:  \${aluno.nota.toFixed(1)}\n  Turma: TADS 2026.1\n\`;`}</Text>
      </View>
      <View style={s.msgBox}>
        <Text style={s.msgTexto}>{`Aluno: ${aluno.nome}\nNota:  ${aluno.nota.toFixed(1)}\nTurma: TADS 2026.1`}</Text>
      </View>

    </ScrollView>
  );
}

const Secao = ({ titulo }) => <Text style={s.secao}>{titulo}</Text>;
const Cartao = ({ rotulo, valor }) => (
  <View style={s.cartao}>
    <Text style={s.rotulo}>{rotulo}</Text>
    <Text style={s.valor} numberOfLines={1}>{valor}</Text>
  </View>
);

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner:     { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo:    { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  secao:     { color: '#f59e0b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  cartao: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1e293b', borderRadius: 8, padding: 10, marginBottom: 4,
    borderLeftWidth: 3, borderLeftColor: '#38bdf8',
  },
  rotulo:    { color: '#64748b', fontSize: 11, fontFamily: 'monospace', flex: 1 },
  valor:     { color: '#4ade80', fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'right' },
  codeBox:   { backgroundColor: '#020617', borderRadius: 8, padding: 12, marginVertical: 8 },
  code:      { color: '#7dd3fc', fontFamily: 'monospace', fontSize: 11, lineHeight: 20 },
  input: {
    backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    borderWidth: 1.5, borderColor: '#334155', marginBottom: 8,
  },
  resultados: { marginTop: 4 },
  msgBox:    { backgroundColor: '#1e293b', borderRadius: 8, padding: 14 },
  msgTexto:  { color: '#e2e8f0', fontFamily: 'monospace', fontSize: 13, lineHeight: 22 },
});
