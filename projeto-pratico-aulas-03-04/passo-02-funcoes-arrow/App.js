// ============================================================
// PASSO 02 — Funções e Arrow Functions
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Criar funções tradicionais e arrow functions e
//           chamar seus resultados dentro do JSX.
//
// CONCEITOS: function, arrow function, parâmetros, retorno,
//            funções de cálculo, funções de formatação
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// ── 1. Função TRADICIONAL (declaração clássica)
function saudacao(nome) {
  return 'Olá, ' + nome + '!';
}

// ── 2. Arrow Function — forma curta (SEM chaves, retorno implícito)
const quadrado = (n) => n * n;

// ── 3. Arrow Function — forma longa (COM chaves, retorno explícito)
const calculaIMC = (peso, altura) => {
  const imc = peso / (altura * altura);
  return imc.toFixed(2);
};

// ── 4. Função que retorna uma string de classificação
const classificaIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25)   return 'Peso normal ✅';
  if (imc < 30)   return 'Sobrepeso';
  return 'Obesidade';
};

// ── 5. Função com valor padrão (default parameter — ES6)
const formatarMoeda = (valor, moeda = 'BRL') => {
  return `${moeda} ${valor.toFixed(2).replace('.', ',')}`;
};

// ── 6. Função que retorna componente JSX (componente simples!)
const CartaoInfo = ({ rotulo, resultado }) => (
  <View style={estilos.cartao}>
    <Text style={estilos.rotulo}>{rotulo}</Text>
    <Text style={estilos.resultado}>{resultado}</Text>
  </View>
);

// ── Dados para demonstração
const nomeAluno = 'Maria';
const pesoKg = 68;
const alturaM = 1.65;
const imcCalculado = parseFloat(calculaIMC(pesoKg, alturaM));

export default function App() {
  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.inner}>

      <Text style={estilos.titulo}>⚡ Passo 02 — Funções</Text>

      {/* ── Função tradicional */}
      <Text style={estilos.secao}>1. Função Tradicional</Text>
      <CartaoInfo rotulo="saudacao('Maria')" resultado={saudacao(nomeAluno)} />

      {/* ── Arrow function curta */}
      <Text style={estilos.secao}>2. Arrow Function Curta</Text>
      <CartaoInfo rotulo="quadrado(7)" resultado={String(quadrado(7))} />
      <CartaoInfo rotulo="quadrado(12)" resultado={String(quadrado(12))} />

      {/* ── Arrow function com múltiplos parâmetros */}
      <Text style={estilos.secao}>3. Arrow Function — Múltiplos Parâmetros</Text>
      <CartaoInfo
        rotulo={`calculaIMC(${pesoKg}, ${alturaM})`}
        resultado={String(imcCalculado)}
      />
      <CartaoInfo
        rotulo={`classificaIMC(${imcCalculado})`}
        resultado={classificaIMC(imcCalculado)}
      />

      {/* ── Default parameter */}
      <Text style={estilos.secao}>4. Parâmetro Padrão (default)</Text>
      <CartaoInfo rotulo="formatarMoeda(29.9)" resultado={formatarMoeda(29.9)} />
      <CartaoInfo rotulo="formatarMoeda(99.99, 'USD')" resultado={formatarMoeda(99.99, 'USD')} />

      {/* ── Comparação visual dos dois estilos */}
      <View style={estilos.comparacao}>
        <Text style={estilos.comparacaoTitulo}>📊 Tradicional × Arrow</Text>
        <Text style={estilos.codeBlock}>
          {'// Tradicional\nfunction soma(a, b) {\n  return a + b;\n}\n\n// Arrow curta\nconst soma = (a, b) => a + b;\n\n// Arrow longa\nconst soma = (a, b) => {\n  return a + b;\n};'}
        </Text>
      </View>

    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo: {
    fontSize: 20, fontWeight: 'bold', color: '#38bdf8',
    marginBottom: 20, textAlign: 'center',
  },
  secao: {
    color: '#f59e0b', fontSize: 13, fontWeight: 'bold',
    marginTop: 16, marginBottom: 6, textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cartao: {
    backgroundColor: '#1e293b', borderRadius: 8, padding: 12,
    marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderLeftWidth: 3, borderLeftColor: '#f59e0b',
  },
  rotulo: { color: '#94a3b8', fontSize: 13, fontFamily: 'monospace', flex: 1 },
  resultado: { color: '#4ade80', fontSize: 14, fontWeight: 'bold' },
  comparacao: {
    backgroundColor: '#1e293b', borderRadius: 8, padding: 14, marginTop: 20,
  },
  comparacaoTitulo: { color: '#f59e0b', fontWeight: 'bold', marginBottom: 10 },
  codeBlock: {
    color: '#e2e8f0', fontFamily: 'monospace', fontSize: 12,
    lineHeight: 20, backgroundColor: '#0f172a', padding: 10, borderRadius: 6,
  },
});
