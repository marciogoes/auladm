// ============================================================
// PASSO 06 — Flexbox: Layouts do Zero ao Avançado
// Disciplina: Programação para Dispositivos Móveis
// Aula 04 — Interface de Usuário I
// ============================================================
//
// OBJETIVO: Dominar o sistema de layout do React Native com
//           Flexbox, desde o básico até layouts reais de apps.
//
// CONCEITOS: flexDirection, justifyContent, alignItems,
//            flex (proporção), flexWrap, gap, alignSelf
// ============================================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// ── Configurações interativas
const opcoesDirection   = ['column', 'row', 'column-reverse', 'row-reverse'];
const opcoesJustify     = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
const opcoesAlignItems  = ['flex-start', 'flex-end', 'center', 'stretch'];

export default function App() {
  const [direction, setDirection]  = useState('row');
  const [justify, setJustify]      = useState('space-between');
  const [align, setAlign]          = useState('center');

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>
      <Text style={s.titulo}>📐 Passo 06 — Flexbox</Text>

      {/* ── PARTE 1: flexDirection */}
      <Secao titulo="1. flexDirection — direção do eixo principal" />
      <Text style={s.desc}>
        'column' (padrão RN) = de cima para baixo{'\n'}
        'row' = da esquerda para a direita
      </Text>
      <View style={s.demo}>
        <View style={{ flexDirection: 'column', gap: 4, marginBottom: 12 }}>
          <Text style={s.demoLabel}>column (padrão)</Text>
          {['A','B','C'].map(l => <Caixinha key={l} label={l} cor="#38bdf8" />)}
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Text style={s.demoLabel}>row →  </Text>
          {['A','B','C'].map(l => <Caixinha key={l} label={l} cor="#f59e0b" />)}
        </View>
      </View>

      {/* ── PARTE 2: justifyContent */}
      <Secao titulo="2. justifyContent — distribuição no eixo principal" />
      {opcoesJustify.map(op => (
        <View key={op} style={{ marginBottom: 8 }}>
          <Text style={s.opLabel}>{op}</Text>
          <View style={[s.fila, { justifyContent: op }]}>
            {['●','●','●'].map((item, i) => (
              <Text key={i} style={s.bolinha}>{item}</Text>
            ))}
          </View>
        </View>
      ))}

      {/* ── PARTE 3: alignItems */}
      <Secao titulo="3. alignItems — alinhamento no eixo cruzado (cross axis)" />
      {opcoesAlignItems.map(op => (
        <View key={op} style={{ marginBottom: 8 }}>
          <Text style={s.opLabel}>{op}</Text>
          <View style={[s.filaAlta, { alignItems: op }]}>
            <Caixinha label="P" cor="#4ade80" size={28} />
            <Caixinha label="M" cor="#4ade80" size={44} />
            <Caixinha label="G" cor="#4ade80" size={60} />
          </View>
        </View>
      ))}

      {/* ── PARTE 4: flex proporcional */}
      <Secao titulo="4. flex — divisão proporcional do espaço" />
      <Text style={s.desc}>flex: 1 = espaço igual | flex: 2 = dobro do espaço</Text>
      <View style={{ flexDirection: 'row', height: 50, gap: 4, marginBottom: 8 }}>
        <View style={[s.fatia, { flex: 1, backgroundColor: '#1d4ed8' }]}>
          <Text style={s.fatiaTexto}>flex:1</Text>
        </View>
        <View style={[s.fatia, { flex: 2, backgroundColor: '#2563eb' }]}>
          <Text style={s.fatiaTexto}>flex:2</Text>
        </View>
        <View style={[s.fatia, { flex: 1, backgroundColor: '#3b82f6' }]}>
          <Text style={s.fatiaTexto}>flex:1</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', height: 50, gap: 4 }}>
        <View style={[s.fatia, { flex: 1, backgroundColor: '#7c3aed' }]}>
          <Text style={s.fatiaTexto}>25%</Text>
        </View>
        <View style={[s.fatia, { flex: 3, backgroundColor: '#6d28d9' }]}>
          <Text style={s.fatiaTexto}>75%</Text>
        </View>
      </View>

      {/* ── PARTE 5: Layout real de card de app */}
      <Secao titulo="5. Exemplo real — Card de Perfil" />
      <View style={s.card}>
        {/* Linha superior: avatar + info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={s.avatar}><Text style={{ fontSize: 28 }}>👤</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardNome}>Ana Paula</Text>
            <Text style={s.cardSub}>TADS · 4º Semestre</Text>
          </View>
          <Text style={s.badge}>ATIVO</Text>
        </View>
        {/* Linha inferior: 3 métricas com justifyContent: space-around */}
        <View style={s.metricas}>
          <Metrica valor="9.2" label="Média" />
          <View style={s.separador} />
          <Metrica valor="48" label="Aulas" />
          <View style={s.separador} />
          <Metrica valor="3" label="Faltas" />
        </View>
      </View>

      {/* ── PARTE 6: Sandbox interativo */}
      <Secao titulo="6. Playground Interativo" />
      <Text style={s.desc}>Toque para alternar os valores e observar o efeito:</Text>

      <Text style={s.propLabel}>flexDirection: <Text style={s.propVal}>{direction}</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {opcoesDirection.map(op => (
            <TouchableOpacity key={op} style={[s.chip, direction === op && s.chipAtivo]} onPress={() => setDirection(op)}>
              <Text style={[s.chipTexto, direction === op && s.chipTextoAtivo]}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={s.propLabel}>justifyContent: <Text style={s.propVal}>{justify}</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {opcoesJustify.map(op => (
            <TouchableOpacity key={op} style={[s.chip, justify === op && s.chipAtivo]} onPress={() => setJustify(op)}>
              <Text style={[s.chipTexto, justify === op && s.chipTextoAtivo]}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={s.propLabel}>alignItems: <Text style={s.propVal}>{align}</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {opcoesAlignItems.map(op => (
            <TouchableOpacity key={op} style={[s.chip, align === op && s.chipAtivo]} onPress={() => setAlign(op)}>
              <Text style={[s.chipTexto, align === op && s.chipTextoAtivo]}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[s.sandbox, { flexDirection: direction, justifyContent: justify, alignItems: align }]}>
        {['1','2','3','4'].map(n => (
          <View key={n} style={[s.sandboxItem, { backgroundColor: ['#38bdf8','#f59e0b','#4ade80','#f87171'][n-1] }]}>
            <Text style={{ color: '#0f172a', fontWeight: 'bold' }}>{n}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

// ── Sub-componentes
const Caixinha = ({ label, cor, size = 36 }) => (
  <View style={[s.caixa, { width: size, height: size, backgroundColor: cor + '33', borderColor: cor }]}>
    <Text style={[s.caixaTexto, { color: cor }]}>{label}</Text>
  </View>
);
const Secao = ({ titulo }) => (
  <Text style={s.secao}>{titulo}</Text>
);
const Metrica = ({ valor, label }) => (
  <View style={{ alignItems: 'center', flex: 1 }}>
    <Text style={{ color: '#38bdf8', fontSize: 22, fontWeight: 'bold' }}>{valor}</Text>
    <Text style={{ color: '#64748b', fontSize: 11 }}>{label}</Text>
  </View>
);

// ── Estilos
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  secao: { color: '#f59e0b', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 24, marginBottom: 8 },
  desc: { color: '#64748b', fontSize: 12, marginBottom: 10, lineHeight: 18 },
  demo: { backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 4 },
  demoLabel: { color: '#64748b', fontSize: 11, marginBottom: 4 },
  fila: {
    flexDirection: 'row', backgroundColor: '#1e293b',
    borderRadius: 8, padding: 8, height: 44, alignItems: 'center',
  },
  filaAlta: {
    flexDirection: 'row', backgroundColor: '#1e293b',
    borderRadius: 8, padding: 8, height: 80, gap: 6,
  },
  opLabel: { color: '#94a3b8', fontSize: 11, fontFamily: 'monospace', marginBottom: 2 },
  bolinha: { color: '#38bdf8', fontSize: 18 },
  caixa: {
    borderWidth: 1.5, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
  caixaTexto: { fontWeight: 'bold', fontSize: 12 },
  fatia: { borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  fatiaTexto: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  card: {
    backgroundColor: '#1e293b', borderRadius: 12, padding: 16,
    gap: 14,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center',
  },
  cardNome: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold' },
  cardSub: { color: '#64748b', fontSize: 12, marginTop: 2 },
  badge: {
    backgroundColor: '#052e16', color: '#4ade80', fontSize: 10,
    fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20,
  },
  metricas: {
    flexDirection: 'row', backgroundColor: '#0f172a',
    borderRadius: 10, padding: 12, alignItems: 'center',
  },
  separador: { width: 1, height: 30, backgroundColor: '#334155' },
  propLabel: { color: '#94a3b8', fontSize: 12, marginBottom: 4 },
  propVal: { color: '#fbbf24', fontFamily: 'monospace' },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: '#334155',
  },
  chipAtivo: { backgroundColor: '#f59e0b', borderColor: '#f59e0b' },
  chipTexto: { color: '#94a3b8', fontSize: 11 },
  chipTextoAtivo: { color: '#0f172a', fontWeight: 'bold' },
  sandbox: {
    backgroundColor: '#1e293b', borderRadius: 12,
    height: 160, padding: 8, flexWrap: 'wrap',
  },
  sandboxItem: {
    width: 50, height: 50, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
});
