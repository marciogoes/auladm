// ============================================================
// PASSO 05 — useState: Estado e Interação
// Disciplina: Programação para Dispositivos Móveis
// Aulas 03 + 04 — Linguagem + Interface de Usuário I
// ============================================================
//
// OBJETIVO: Introduzir o conceito de estado com useState.
//           O app reage a ações do usuário sem recarregar.
//           Aqui começamos a COMBINAR JS com componentes de UI.
//
// CONCEITOS: useState, re-render, TouchableOpacity, contador,
//            expressões condicionais no JSX (ternário, &&)
// ============================================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {

  // ── useState retorna [valorAtual, funcaoDeAtualização]
  // Sintaxe: const [estado, setEstado] = useState(valorInicial)

  // Estado 1 — Contador simples
  const [contador, setContador] = useState(0);

  // Estado 2 — Toggle (liga/desliga)
  const [ligado, setLigado] = useState(false);

  // Estado 3 — Cor de tema
  const cores = ['#38bdf8', '#f59e0b', '#4ade80', '#f87171', '#a78bfa'];
  const [indiceCor, setIndiceCor] = useState(0);
  const corAtual = cores[indiceCor];

  // Estado 4 — Pontuação de quiz
  const [pontos, setPontos] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [ultimaResposta, setUltimaResposta] = useState(null);

  // ── Funções de manipulação de estado
  const incrementar = () => setContador(prev => prev + 1);
  const decrementar = () => setContador(prev => prev - 1);
  const resetar     = () => setContador(0);

  const alternarLuz = () => setLigado(prev => !prev);

  const trocarCor = () => setIndiceCor(prev => (prev + 1) % cores.length);

  const responder = (estaCorreta) => {
    setTentativas(prev => prev + 1);
    if (estaCorreta) {
      setPontos(prev => prev + 10);
      setUltimaResposta('✅ Correto! +10 pontos');
    } else {
      setUltimaResposta('❌ Errado! Tente novamente.');
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>
      <Text style={s.titulo}>🔄 Passo 05 — useState</Text>

      {/* ── EXEMPLO 1: Contador */}
      <Bloco titulo="1. Contador — incrementar / decrementar / resetar">
        <Text style={s.numeroGrande}>{contador}</Text>
        <View style={s.botaoRow}>
          <Btn label="−" onPress={decrementar} cor="#f87171" />
          <Btn label="Reset" onPress={resetar} cor="#64748b" />
          <Btn label="+" onPress={incrementar} cor="#4ade80" />
        </View>
        <Text style={s.dica}>
          {contador === 0 && 'Pressione + para começar'}
          {contador > 0 && contador < 5 && '🙂 Indo bem!'}
          {contador >= 5 && contador < 10 && '🔥 Continua!'}
          {contador >= 10 && '🏆 Duas cifras!'}
          {contador < 0 && '😅 Valor negativo...'}
        </Text>
      </Bloco>

      {/* ── EXEMPLO 2: Toggle */}
      <Bloco titulo="2. Toggle — estado booleano">
        <View style={[s.lampada, { backgroundColor: ligado ? '#fbbf24' : '#1e293b' }]}>
          <Text style={{ fontSize: 48 }}>{ligado ? '💡' : '🌑'}</Text>
        </View>
        <Text style={[s.textoToggle, { color: ligado ? '#fbbf24' : '#64748b' }]}>
          {ligado ? 'LIGADO' : 'DESLIGADO'}
        </Text>
        <Btn label={ligado ? 'Apagar' : 'Acender'} onPress={alternarLuz} cor={ligado ? '#f87171' : '#fbbf24'} />
        <Text style={s.dica}>setLigado(prev {'=> !prev'}) — inverte o booleano</Text>
      </Bloco>

      {/* ── EXEMPLO 3: Cor dinâmica */}
      <Bloco titulo="3. Estado de índice — cor dinâmica">
        <View style={[s.circulo, { backgroundColor: corAtual }]}>
          <Text style={s.circuloTexto}>{indiceCor + 1}/{cores.length}</Text>
        </View>
        <Btn label="Próxima cor →" onPress={trocarCor} cor={corAtual} />
        <Text style={s.dica}>(indiceCor + 1) % cores.length — volta ao início</Text>
      </Bloco>

      {/* ── EXEMPLO 4: Quiz simples */}
      <Bloco titulo="4. Múltiplos estados — quiz rápido">
        <Text style={s.pergunta}>Qual hook gerencia estado em React Native?</Text>
        <View style={s.botaoRow}>
          <Btn label="useEffect" onPress={() => responder(false)} cor="#f87171" />
          <Btn label="useState"  onPress={() => responder(true)}  cor="#4ade80" />
          <Btn label="useRef"    onPress={() => responder(false)} cor="#f87171" />
        </View>
        {ultimaResposta && <Text style={s.feedback}>{ultimaResposta}</Text>}
        <View style={s.placar}>
          <Text style={s.placarTexto}>Pontos: {pontos}</Text>
          <Text style={s.placarTexto}>Tentativas: {tentativas}</Text>
          <Text style={s.placarTexto}>
            Taxa: {tentativas > 0 ? ((pontos / (tentativas * 10)) * 100).toFixed(0) : 0}%
          </Text>
        </View>
      </Bloco>

    </ScrollView>
  );
}

// ── Sub-componentes reutilizáveis
const Bloco = ({ titulo, children }) => (
  <View style={s.bloco}>
    <Text style={s.blocoTitulo}>{titulo}</Text>
    {children}
  </View>
);

const Btn = ({ label, onPress, cor }) => (
  <TouchableOpacity
    style={[s.btn, { borderColor: cor }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[s.btnTexto, { color: cor }]}>{label}</Text>
  </TouchableOpacity>
);

// ── Estilos
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo: {
    fontSize: 20, fontWeight: 'bold', color: '#38bdf8',
    marginBottom: 20, textAlign: 'center',
  },
  bloco: {
    backgroundColor: '#1e293b', borderRadius: 12, padding: 16,
    marginBottom: 16, alignItems: 'center',
  },
  blocoTitulo: {
    color: '#f59e0b', fontSize: 12, fontWeight: 'bold',
    textTransform: 'uppercase', marginBottom: 16, textAlign: 'center',
  },
  numeroGrande: {
    fontSize: 72, fontWeight: 'bold', color: '#38bdf8', lineHeight: 80,
  },
  botaoRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  btn: {
    borderWidth: 2, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10,
    minWidth: 80, alignItems: 'center',
  },
  btnTexto: { fontWeight: 'bold', fontSize: 14 },
  dica: {
    color: '#64748b', fontSize: 11, marginTop: 10, textAlign: 'center', fontStyle: 'italic',
  },
  lampada: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  textoToggle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  circulo: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  circuloTexto: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  pergunta: {
    color: '#e2e8f0', fontSize: 14, textAlign: 'center', marginBottom: 14, lineHeight: 20,
  },
  feedback: {
    marginTop: 10, fontSize: 14, fontWeight: 'bold', textAlign: 'center',
    color: '#f8fafc',
  },
  placar: {
    flexDirection: 'row', gap: 16, marginTop: 12, backgroundColor: '#0f172a',
    borderRadius: 8, padding: 10,
  },
  placarTexto: { color: '#94a3b8', fontSize: 12 },
});
