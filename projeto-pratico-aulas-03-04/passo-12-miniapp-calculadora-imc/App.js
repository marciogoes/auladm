// ============================================================
// PASSO 12 — Mini-App: Calculadora de IMC
// Disciplina: Programação para Dispositivos Móveis
// Aulas 03 + 04 — PROJETO INTEGRADOR
// ============================================================
//
// INTEGRA: var/const, arrow functions, operações matemáticas,
//          objetos, TextInput, useState, Flexbox, StyleSheet,
//          template literals, expressões condicionais
//
// NÍVEL: ⭐⭐☆ Intermediário
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

// ── Lógica de negócio (funções puras — separadas da UI)
const calcularIMC = (peso, altura) => peso / (altura * altura);

const classificarIMC = (imc) => {
  if (imc < 18.5) return { label: 'Abaixo do peso',  cor: '#60a5fa', emoji: '⬇️' };
  if (imc < 25.0) return { label: 'Peso normal',      cor: '#4ade80', emoji: '✅' };
  if (imc < 30.0) return { label: 'Sobrepeso',        cor: '#fbbf24', emoji: '⚠️' };
  if (imc < 35.0) return { label: 'Obesidade grau I', cor: '#fb923c', emoji: '🔶' };
  if (imc < 40.0) return { label: 'Obesidade grau II',cor: '#f87171', emoji: '🔴' };
  return           { label: 'Obesidade grau III',      cor: '#ef4444', emoji: '🚨' };
};

const pesoIdeal = (altura) => ({
  min: (18.5 * altura * altura).toFixed(1),
  max: (24.9 * altura * altura).toFixed(1),
});

// ── Tabela de classificações
const TABELA = [
  { faixa: '< 18,5',      label: 'Abaixo do peso',    cor: '#60a5fa' },
  { faixa: '18,5 – 24,9', label: 'Peso normal',        cor: '#4ade80' },
  { faixa: '25,0 – 29,9', label: 'Sobrepeso',          cor: '#fbbf24' },
  { faixa: '30,0 – 34,9', label: 'Obesidade grau I',   cor: '#fb923c' },
  { faixa: '35,0 – 39,9', label: 'Obesidade grau II',  cor: '#f87171' },
  { faixa: '≥ 40,0',      label: 'Obesidade grau III', cor: '#ef4444' },
];

// ────────────────────────────────────────────────────────────

export default function App() {
  const [peso,   setPeso]   = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const calcular = () => {
    const p = parseFloat(peso.replace(',', '.'));
    const h = parseFloat(altura.replace(',', '.'));

    if (isNaN(p) || isNaN(h) || p <= 0 || h <= 0 || h > 3) return;

    const imc = calcularIMC(p, h);
    const classificacao = classificarIMC(imc);
    const ideal = pesoIdeal(h);
    const novoResultado = {
      imc: imc.toFixed(2),
      ...classificacao,
      ideal,
      peso: p,
      altura: h,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setResultado(novoResultado);
    setHistorico(prev => [novoResultado, ...prev.slice(0, 3)]);
  };

  const limpar = () => { setPeso(''); setAltura(''); setResultado(null); };

  const inputValido = peso && altura &&
    !isNaN(parseFloat(peso.replace(',', '.'))) &&
    !isNaN(parseFloat(altura.replace(',', '.')));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0f172a' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={s.inner}>

        {/* ── Cabeçalho */}
        <Text style={s.titulo}>⚖️ Calculadora de IMC</Text>
        <Text style={s.subtitulo}>Índice de Massa Corporal</Text>

        {/* ── Formulário */}
        <View style={s.form}>
          <Campo
            label="Peso (kg)"
            placeholder="Ex: 70 ou 70,5"
            valor={peso}
            onMudar={setPeso}
          />
          <Campo
            label="Altura (m)"
            placeholder="Ex: 1,70 ou 1.75"
            valor={altura}
            onMudar={setAltura}
          />
          <View style={s.botoesRow}>
            <TouchableOpacity
              style={[s.btnCalcular, !inputValido && s.btnDesativado]}
              onPress={calcular}
              disabled={!inputValido}
              activeOpacity={0.8}
            >
              <Text style={s.btnCalcularTexto}>Calcular IMC</Text>
            </TouchableOpacity>
            {resultado && (
              <TouchableOpacity style={s.btnLimpar} onPress={limpar} activeOpacity={0.8}>
                <Text style={s.btnLimparTexto}>↺</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Resultado */}
        {resultado && (
          <View style={[s.resultadoBox, { borderTopColor: resultado.cor }]}>
            <Text style={s.imcNumero}>{resultado.imc}</Text>
            <Text style={s.imcLabel}>IMC</Text>
            <View style={[s.classBox, { backgroundColor: resultado.cor + '22' }]}>
              <Text style={[s.classTexto, { color: resultado.cor }]}>
                {resultado.emoji} {resultado.label}
              </Text>
            </View>
            <View style={s.pesoIdealBox}>
              <Text style={s.pesoIdealTitulo}>Faixa de peso ideal para {resultado.altura}m:</Text>
              <Text style={s.pesoIdealValor}>
                {resultado.ideal.min} kg – {resultado.ideal.max} kg
              </Text>
            </View>

            {/* ── Barra visual de IMC */}
            <Text style={s.barraLabel}>Onde você está na escala:</Text>
            <View style={s.barra}>
              {TABELA.map((t, i) => (
                <View key={i} style={[s.barraSegmento, { backgroundColor: t.cor }]} />
              ))}
              <View style={[
                s.barraMarcador,
                { left: `${Math.min(Math.max((resultado.imc - 10) / 35 * 100, 0), 95)}%` }
              ]}>
                <Text style={s.barraMarcadorTexto}>▲</Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Tabela de referência */}
        <Text style={s.secao}>📊 Tabela de Classificação (OMS)</Text>
        {TABELA.map((t, i) => (
          <View key={i} style={[s.tabelaLinha,
            resultado && resultado.label === t.label && { backgroundColor: t.cor + '22', borderWidth: 1, borderColor: t.cor }
          ]}>
            <View style={[s.tabelaCor, { backgroundColor: t.cor }]} />
            <Text style={s.tabelaFaixa}>{t.faixa}</Text>
            <Text style={[s.tabelaLabel, { color: t.cor }]}>{t.label}</Text>
          </View>
        ))}

        {/* ── Histórico */}
        {historico.length > 0 && (
          <>
            <Text style={s.secao}>🕐 Histórico recente</Text>
            {historico.map((h, i) => (
              <View key={i} style={s.historicItem}>
                <Text style={s.historicHora}>{h.hora}</Text>
                <Text style={s.historicInfo}>{h.peso}kg / {h.altura}m</Text>
                <Text style={[s.historicIMC, { color: h.cor }]}>{h.imc}</Text>
              </View>
            ))}
          </>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Campo = ({ label, placeholder, valor, onMudar }) => (
  <View style={s.campoWrap}>
    <Text style={s.campoLabel}>{label}</Text>
    <TextInput
      style={s.campoInput}
      placeholder={placeholder}
      placeholderTextColor="#475569"
      value={valor}
      onChangeText={onMudar}
      keyboardType="decimal-pad"
    />
  </View>
);

const s = StyleSheet.create({
  inner:             { padding: 24, paddingTop: 54, paddingBottom: 40 },
  titulo:            { fontSize: 26, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center' },
  subtitulo:         { color: '#64748b', textAlign: 'center', marginBottom: 24, fontSize: 13 },
  form:              { backgroundColor: '#1e293b', borderRadius: 14, padding: 16, marginBottom: 16 },
  campoWrap:         { marginBottom: 12 },
  campoLabel:        { color: '#94a3b8', fontSize: 12, marginBottom: 6 },
  campoInput: {
    backgroundColor: '#0f172a', color: '#f8fafc', borderRadius: 10,
    padding: 12, fontSize: 18, fontWeight: 'bold',
    borderWidth: 1.5, borderColor: '#334155', textAlign: 'center',
  },
  botoesRow:         { flexDirection: 'row', gap: 10 },
  btnCalcular: {
    flex: 1, backgroundColor: '#0ea5e9', borderRadius: 10,
    padding: 14, alignItems: 'center',
  },
  btnCalcularTexto:  { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnDesativado:     { backgroundColor: '#334155' },
  btnLimpar: {
    backgroundColor: '#334155', borderRadius: 10,
    paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center',
  },
  btnLimparTexto:    { color: '#94a3b8', fontSize: 20 },
  resultadoBox: {
    backgroundColor: '#1e293b', borderRadius: 14, padding: 20,
    alignItems: 'center', marginBottom: 16, borderTopWidth: 4,
  },
  imcNumero:         { fontSize: 64, fontWeight: 'bold', color: '#f8fafc', lineHeight: 70 },
  imcLabel:          { color: '#64748b', fontSize: 13, marginBottom: 10 },
  classBox:          { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 12 },
  classTexto:        { fontWeight: 'bold', fontSize: 15 },
  pesoIdealBox:      { backgroundColor: '#0f172a', borderRadius: 8, padding: 10, width: '100%', marginBottom: 12 },
  pesoIdealTitulo:   { color: '#64748b', fontSize: 11, textAlign: 'center' },
  pesoIdealValor:    { color: '#4ade80', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 4 },
  barraLabel:        { color: '#64748b', fontSize: 11, marginBottom: 6 },
  barra: {
    flexDirection: 'row', height: 16, borderRadius: 8,
    overflow: 'visible', width: '100%', position: 'relative',
  },
  barraSegmento:     { flex: 1 },
  barraMarcador:     { position: 'absolute', bottom: -4 },
  barraMarcadorTexto:{ color: '#f8fafc', fontSize: 12 },
  secao:             { color: '#f59e0b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  tabelaLinha: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b',
    borderRadius: 8, padding: 10, marginBottom: 4,
  },
  tabelaCor:         { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  tabelaFaixa:       { color: '#94a3b8', fontSize: 12, fontFamily: 'monospace', width: 90 },
  tabelaLabel:       { fontSize: 12, fontWeight: '600' },
  historicItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1e293b', borderRadius: 8, padding: 10, marginBottom: 4,
  },
  historicHora:      { color: '#64748b', fontSize: 11 },
  historicInfo:      { color: '#94a3b8', fontSize: 12 },
  historicIMC:       { fontWeight: 'bold', fontSize: 15 },
});
