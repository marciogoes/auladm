// ============================================================
// PASSO 08 — Botões: Button, TouchableOpacity e Pressable
// Disciplina: Programação para Dispositivos Móveis
// Aula 04 — Interface de Usuário I
// ============================================================
//
// OBJETIVO: Conhecer os três tipos de botões do React Native,
//           suas diferenças e quando usar cada um.
//
// CONCEITOS: Button, TouchableOpacity, Pressable,
//            activeOpacity, pressed state, feedback visual,
//            disabled, estilos dinâmicos no onPress
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, Button, TouchableOpacity,
  Pressable, StyleSheet, ScrollView,
} from 'react-native';

export default function App() {
  const [log, setLog] = useState([]);
  const [contadores, setContadores] = useState({ a: 0, b: 0, c: 0 });
  const [carregando, setCarregando] = useState(false);
  const [curtido, setCurtido] = useState(false);

  const registrar = (msg) => {
    setLog(prev => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 4)]);
  };

  const incrementar = (key) =>
    setContadores(prev => ({ ...prev, [key]: prev[key] + 1 }));

  const simularCarregamento = () => {
    setCarregando(true);
    registrar('Iniciando operação...');
    setTimeout(() => {
      setCarregando(false);
      registrar('Operação concluída ✅');
    }, 2000);
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>
      <Text style={s.titulo}>🔘 Passo 08 — Botões</Text>

      {/* ── LOG de eventos */}
      <View style={s.logBox}>
        <Text style={s.logTitulo}>📋 Log de eventos</Text>
        {log.length === 0
          ? <Text style={s.logVazio}>Toque em algum botão...</Text>
          : log.map((l, i) => <Text key={i} style={s.logLinha}>{l}</Text>)
        }
      </View>

      {/* ── 1. Button — componente nativo simples */}
      <Secao titulo="1. Button — nativo, sem estilo personalizado" />
      <Text style={s.desc}>Prático para protótipos. Não aceita filhos nem estilos customizados.</Text>
      <Button
        title="Pressione aqui"
        color="#0ea5e9"
        onPress={() => registrar('Button pressionado')}
      />
      <Button
        title="Botão Desativado"
        color="#64748b"
        disabled={true}
        onPress={() => registrar('Nunca vai executar')}
      />

      {/* ── 2. TouchableOpacity — o mais usado */}
      <Secao titulo="2. TouchableOpacity — o mais usado no mercado" />
      <Text style={s.desc}>Reduz opacidade ao tocar. Aceita qualquer filho e estilo completo.</Text>

      <TouchableOpacity
        style={s.btnPrimario}
        onPress={() => registrar('TouchableOpacity primário')}
        activeOpacity={0.7}
      >
        <Text style={s.btnTexto}>Botão Primário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={s.btnSecundario}
        onPress={() => registrar('TouchableOpacity outline')}
        activeOpacity={0.6}
      >
        <Text style={[s.btnTexto, { color: '#38bdf8' }]}>Botão Outline</Text>
      </TouchableOpacity>

      {/* activeOpacity: 1 = sem efeito, 0 = some completamente */}
      <Text style={s.codico}>activeOpacity: 1.0 → sem efeito visual</Text>
      <TouchableOpacity
        style={[s.btnPrimario, { backgroundColor: '#7c3aed' }]}
        onPress={() => registrar('activeOpacity=1.0')}
        activeOpacity={1.0}
      >
        <Text style={s.btnTexto}>activeOpacity = 1.0 (sem fade)</Text>
      </TouchableOpacity>

      {/* ── 3. Pressable — moderno, mais flexível */}
      <Secao titulo="3. Pressable — moderno e mais poderoso" />
      <Text style={s.desc}>
        Recebe o estado 'pressed' diretamente no style e children.
        Ideal para feedbacks visuais sofisticados.
      </Text>

      {/* Style dinâmico baseado no estado pressed */}
      <Pressable
        style={({ pressed }) => [
          s.pressable,
          pressed && s.pressableAtivo,
        ]}
        onPress={() => registrar('Pressable pressionado!')}
        onPressIn={() => registrar('↓ PressIn')}
        onPressOut={() => registrar('↑ PressOut')}
        onLongPress={() => registrar('⏳ LongPress!')}
      >
        {({ pressed }) => (
          <Text style={[s.pressableTexto, pressed && { color: '#0f172a' }]}>
            {pressed ? '⚡ Pressionando...' : 'Pressione (ou segure)'}
          </Text>
        )}
      </Pressable>

      {/* ── 4. Botão com loading */}
      <Secao titulo="4. Botão com estado de carregamento" />
      <TouchableOpacity
        style={[s.btnPrimario, carregando && s.btnDesativado]}
        onPress={simularCarregamento}
        disabled={carregando}
        activeOpacity={0.8}
      >
        <Text style={s.btnTexto}>
          {carregando ? '⏳ Aguarde...' : '🚀 Executar operação'}
        </Text>
      </TouchableOpacity>

      {/* ── 5. Botão de curtir com toggle */}
      <Secao titulo="5. Botão de toggle (curtir/descurtir)" />
      <TouchableOpacity
        style={[s.btnCurtir, curtido && s.btnCurtirAtivo]}
        onPress={() => {
          setCurtido(v => !v);
          registrar(curtido ? 'Descurtiu ❌' : 'Curtiu ❤️');
        }}
        activeOpacity={0.8}
      >
        <Text style={s.btnCurtirTexto}>
          {curtido ? '❤️  Curtido' : '🤍  Curtir'}
        </Text>
      </TouchableOpacity>

      {/* ── 6. Grade de contadores com Pressable */}
      <Secao titulo="6. Grade de botões — múltiplos estados" />
      <View style={s.grade}>
        {Object.entries(contadores).map(([key, val]) => (
          <Pressable
            key={key}
            style={({ pressed }) => [s.gradeItem, pressed && { opacity: 0.7 }]}
            onPress={() => { incrementar(key); registrar(`Contador ${key.toUpperCase()}: ${val + 1}`); }}
          >
            <Text style={s.gradeLetra}>{key.toUpperCase()}</Text>
            <Text style={s.gradeNumero}>{val}</Text>
            <Text style={s.gradeSub}>toques</Text>
          </Pressable>
        ))}
      </View>

      {/* ── Comparação final */}
      <View style={s.tabela}>
        <Text style={s.tabelaTitulo}>📊 Quando usar cada um?</Text>
        <LinhaTabela comp="Button"             uso="Protótipos rápidos"              icone="🔵" />
        <LinhaTabela comp="TouchableOpacity"   uso="Uso geral — o mais comum"        icone="🟢" />
        <LinhaTabela comp="Pressable"          uso="Feedbacks visuais avançados"      icone="🟡" />
      </View>
    </ScrollView>
  );
}

const Secao = ({ titulo }) => <Text style={s.secao}>{titulo}</Text>;
const LinhaTabela = ({ comp, uso, icone }) => (
  <View style={s.tabelaLinha}>
    <Text style={s.tabelaComp}>{icone} {comp}</Text>
    <Text style={s.tabelaUso}>{uso}</Text>
  </View>
);

const s = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#0f172a' },
  inner:            { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo:           { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 16, textAlign: 'center' },
  secao:            { color: '#f59e0b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  desc:             { color: '#64748b', fontSize: 12, marginBottom: 10, lineHeight: 18 },
  codico:           { color: '#475569', fontSize: 10, fontFamily: 'monospace', marginBottom: 4 },
  logBox:           { backgroundColor: '#0f1f35', borderRadius: 8, padding: 12, marginBottom: 16, minHeight: 70 },
  logTitulo:        { color: '#38bdf8', fontSize: 11, fontWeight: 'bold', marginBottom: 6 },
  logVazio:         { color: '#334155', fontSize: 11, fontStyle: 'italic' },
  logLinha:         { color: '#94a3b8', fontSize: 11, fontFamily: 'monospace', marginBottom: 2 },
  btnPrimario:      { backgroundColor: '#0ea5e9', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 8 },
  btnSecundario:    { borderWidth: 1.5, borderColor: '#38bdf8', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 8 },
  btnTexto:         { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  btnDesativado:    { backgroundColor: '#334155' },
  pressable: {
    backgroundColor: '#1e293b', borderRadius: 10, padding: 16,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#38bdf8', marginBottom: 8,
  },
  pressableAtivo:   { backgroundColor: '#38bdf8' },
  pressableTexto:   { color: '#38bdf8', fontWeight: 'bold', fontSize: 14 },
  btnCurtir: {
    backgroundColor: '#1e293b', borderRadius: 10, padding: 14,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#334155',
  },
  btnCurtirAtivo:   { backgroundColor: '#450a0a', borderColor: '#f87171' },
  btnCurtirTexto:   { color: '#f8fafc', fontWeight: 'bold', fontSize: 15 },
  grade:            { flexDirection: 'row', gap: 10 },
  gradeItem: {
    flex: 1, backgroundColor: '#1e293b', borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  gradeLetra:       { color: '#38bdf8', fontSize: 18, fontWeight: 'bold' },
  gradeNumero:      { color: '#f8fafc', fontSize: 32, fontWeight: 'bold' },
  gradeSub:         { color: '#475569', fontSize: 10 },
  tabela:           { backgroundColor: '#1e293b', borderRadius: 10, padding: 14, marginTop: 20 },
  tabelaTitulo:     { color: '#f59e0b', fontWeight: 'bold', marginBottom: 10 },
  tabelaLinha:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  tabelaComp:       { color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace', flex: 1 },
  tabelaUso:        { color: '#94a3b8', fontSize: 12, flex: 1, textAlign: 'right' },
});
