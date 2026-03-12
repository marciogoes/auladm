// ============================================================
// AULA 03 - Exemplo 02: Funções e Arrow Functions
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Comparar declaração de função, expressão e arrow
//           functions. Demonstrar parâmetros default, rest e
//           closures de forma visual e interativa.
// SLIDES RELACIONADOS: Módulo 02 — Funções & Closures
//
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet
} from 'react-native';

// ── TRÊS FORMAS DE DECLARAR UMA FUNÇÃO ───────────────────────

// 1) Function Declaration — içada (hoisted) completa
function somar(a, b) {
  return a + b;
}

// 2) Function Expression — içada apenas como undefined
const subtrair = function (a, b) {
  return a - b;
};

// 3) Arrow Function (ES6) — preferida no React Native
//    Forma concisa (implicit return) quando tem uma única expressão:
const multiplicar = (a, b) => a * b;

//    Forma com bloco (explicit return) quando precisa de múltiplas linhas:
const dividir = (a, b) => {
  if (b === 0) return 'Erro: divisão por zero!';
  return a / b;
};

// ── PARÂMETROS AVANÇADOS ──────────────────────────────────────

// Default parameters — valor padrão se o argumento não for passado
const saudar = (nome = 'Visitante', curso = 'TADS') =>
  `Olá, ${nome} do ${curso}! 👋`;

// Rest parameters (...) — captura múltiplos argumentos como array
const somarTodos = (...numeros) =>
  numeros.reduce((acumulador, num) => acumulador + num, 0);

// ── CLOSURE — FUNÇÃO QUE LEMBRA DO ESCOPO EXTERNO ────────────
// A função interna (contarClick) "fecha sobre" a variável 'total'
// Cada chamada de criarContador() cria um contador independente
function criarContador(nome) {
  let total = 0; // esta variável é "privada" — só existe dentro de criarContador

  return {
    incrementar: () => {
      total++;
      return total;
    },
    decrementar: () => {
      total = Math.max(0, total - 1); // não deixa ficar negativo
      return total;
    },
    valor: () => total,
    nome,
  };
}

// Criamos dois contadores independentes — cada um tem seu próprio 'total'
const contadorA = criarContador('Contador A');
const contadorB = criarContador('Contador B');

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  // Estado para a calculadora interativa
  const [numA, setNumA] = useState('10');
  const [numB, setNumB] = useState('3');

  // Estado para os contadores (closure demo)
  const [valorA, setValorA] = useState(0);
  const [valorB, setValorB] = useState(0);

  // Estado para a demo de saudação
  const [nomeInput, setNomeInput] = useState('');

  // Obtém os números convertidos do estado (string → number)
  const a = parseFloat(numA) || 0;
  const b = parseFloat(numB) || 0;

  // Operações usando as funções declaradas acima
  const operacoes = [
    { simbolo: '+', nome: 'somar(a, b)', resultado: somar(a, b), tipo: 'declaration' },
    { simbolo: '−', nome: 'subtrair(a, b)', resultado: subtrair(a, b), tipo: 'expression' },
    { simbolo: '×', nome: 'multiplicar(a, b)', resultado: multiplicar(a, b), tipo: 'arrow' },
    { simbolo: '÷', nome: 'dividir(a, b)', resultado: dividir(a, b), tipo: 'arrow' },
  ];

  const corTipo = {
    declaration: '#E74C3C',
    expression:  '#F39C12',
    arrow:       '#27AE60',
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloApp}>Funções e Arrow Functions</Text>
        <Text style={styles.versaoTexto}>Aula 03 — Exemplo 02</Text>
      </View>

      {/* Legenda dos tipos de função */}
      <View style={styles.legendaContainer}>
        {[
          { cor: '#E74C3C', label: 'Function Declaration' },
          { cor: '#F39C12', label: 'Function Expression' },
          { cor: '#27AE60', label: 'Arrow Function ✅' },
        ].map((item) => (
          <View key={item.label} style={styles.legendaItem}>
            <View style={[styles.legendaDot, { backgroundColor: item.cor }]} />
            <Text style={styles.legendaTexto}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Calculadora Interativa ─────────────────────────────── */}
      <Text style={styles.secaoTitulo}>🧮 Calculadora Interativa</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Valor A</Text>
          <TextInput
            style={styles.input}
            value={numA}
            onChangeText={setNumA}
            keyboardType="numeric"
            placeholder="ex: 10"
            placeholderTextColor="#557"
          />
        </View>
        <Text style={styles.inputSeparador}>e</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Valor B</Text>
          <TextInput
            style={styles.input}
            value={numB}
            onChangeText={setNumB}
            keyboardType="numeric"
            placeholder="ex: 3"
            placeholderTextColor="#557"
          />
        </View>
      </View>

      {operacoes.map((op) => (
        <View key={op.simbolo} style={styles.operacaoCard}>
          <View style={[styles.operacaoBadge, { backgroundColor: corTipo[op.tipo] }]}>
            <Text style={styles.operacaoSimbolo}>{op.simbolo}</Text>
          </View>
          <View style={styles.operacaoInfo}>
            <Text style={styles.operacaoNome}>{op.nome}</Text>
            <Text style={styles.operacaoResultado}>
              = {a} {op.simbolo} {b} = <Text style={styles.operacaoValor}>{op.resultado}</Text>
            </Text>
          </View>
        </View>
      ))}

      {/* Demo de Rest params */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitulo}>Rest params: somarTodos(1, 2, 3, 4, 5)</Text>
        <Text style={styles.infoCardValor}>= {somarTodos(1, 2, 3, 4, 5)}</Text>
        <View style={styles.codigoBox}>
          <Text style={styles.codigo}>{'const somarTodos = (...nums) =>\n  nums.reduce((acc, n) => acc + n, 0);'}</Text>
        </View>
      </View>

      {/* Default params — saudação */}
      <Text style={styles.secaoTitulo}>💬 Default Parameters</Text>
      <TextInput
        style={styles.inputFull}
        value={nomeInput}
        onChangeText={setNomeInput}
        placeholder="Digite seu nome (ou deixe vazio)"
        placeholderTextColor="#557"
      />
      <View style={styles.resultadoBox}>
        <Text style={styles.resultadoTexto}>
          {saudar(nomeInput || undefined)}
        </Text>
        <Text style={styles.codigoInline}>
          {`saudar(${nomeInput ? `"${nomeInput}"` : '/* sem argumento */'})`}
        </Text>
      </View>

      {/* Closure Demo */}
      <Text style={styles.secaoTitulo}>🔒 Closure — Contadores Independentes</Text>
      <Text style={styles.descricaoTexto}>
        Cada contador é criado por <Text style={styles.destaque}>criarContador()</Text> e mantém seu próprio estado interno. Eles não interferem um no outro!
      </Text>

      {[
        {
          contador: contadorA,
          valor: valorA,
          setValor: setValorA,
          cor: '#00B4D8',
        },
        {
          contador: contadorB,
          valor: valorB,
          setValor: setValorB,
          cor: '#FF6B35',
        },
      ].map((item) => (
        <View key={item.contador.nome} style={[styles.contadorCard, { borderColor: item.cor }]}>
          <Text style={[styles.contadorNome, { color: item.cor }]}>{item.contador.nome}</Text>
          <Text style={styles.contadorValor}>{item.valor}</Text>
          <View style={styles.contadorBotoes}>
            <TouchableOpacity
              style={[styles.botao, { backgroundColor: '#E74C3C' }]}
              onPress={() => item.setValor(item.contador.decrementar())}
            >
              <Text style={styles.botaoTexto}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botao, { backgroundColor: item.cor }]}
              onPress={() => item.setValor(item.contador.incrementar())}
            >
              <Text style={styles.botaoTexto}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.codigoBox}>
        <Text style={styles.codigo}>
          {'function criarContador(nome) {\n  let total = 0; // variável "privada"\n  return {\n    incrementar: () => ++total,\n    decrementar: () => Math.max(0, --total),\n    valor: () => total\n  };\n}\n\nconst cA = criarContador("A"); // total=0\nconst cB = criarContador("B"); // total=0 (independente!)\ncA.incrementar(); // cA.total=1\ncA.incrementar(); // cA.total=2\ncB.incrementar(); // cB.total=1 (não afeta cA!)'}
        </Text>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>
          Próximo: Exemplo 03 — ES6+ Moderno
        </Text>
      </View>

    </ScrollView>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0D1B2A' },
  conteudo: { padding: 16, paddingBottom: 40 },

  cabecalho: {
    backgroundColor: '#1A2E45',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#FF6B35',
  },
  tituloApp: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  versaoTexto: { fontSize: 12, color: '#FF6B35', fontFamily: 'monospace' },

  legendaContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  legendaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendaDot: { width: 10, height: 10, borderRadius: 5 },
  legendaTexto: { fontSize: 11, color: '#8899AA' },

  secaoTitulo: {
    fontSize: 16, fontWeight: 'bold', color: '#FFFFFF',
    marginTop: 20, marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 8, marginBottom: 12,
  },
  inputWrapper: { flex: 1 },
  inputLabel: { fontSize: 11, color: '#8899AA', marginBottom: 4 },
  input: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 10,
    color: '#FFFFFF', fontSize: 16, textAlign: 'center',
    borderWidth: 1, borderColor: '#243B55', fontFamily: 'monospace',
  },
  inputSeparador: { fontSize: 14, color: '#8899AA', paddingBottom: 12 },
  inputFull: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 12,
    color: '#FFFFFF', fontSize: 14, marginBottom: 8,
    borderWidth: 1, borderColor: '#243B55',
  },

  operacaoCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A2E45', borderRadius: 8,
    padding: 12, marginBottom: 8, gap: 12,
  },
  operacaoBadge: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
  },
  operacaoSimbolo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  operacaoInfo: { flex: 1 },
  operacaoNome: { fontSize: 12, color: '#8899AA', fontFamily: 'monospace', marginBottom: 2 },
  operacaoResultado: { fontSize: 13, color: '#CCDDEE' },
  operacaoValor: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },

  infoCard: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 12,
    marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#27AE60',
  },
  infoCardTitulo: { fontSize: 12, color: '#27AE60', fontFamily: 'monospace', marginBottom: 4 },
  infoCardValor: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },

  codigoBox: {
    backgroundColor: '#0A1825', borderRadius: 6, padding: 10,
    borderWidth: 1, borderColor: '#243B55', marginTop: 8,
  },
  codigo: { fontFamily: 'monospace', fontSize: 11.5, color: '#7EC8A4', lineHeight: 20 },

  resultadoBox: {
    backgroundColor: '#0F2535', borderRadius: 8, padding: 14,
    borderWidth: 1, borderColor: '#243B55', marginBottom: 8,
  },
  resultadoTexto: { fontSize: 16, color: '#FFFFFF', marginBottom: 6 },
  codigoInline: { fontFamily: 'monospace', fontSize: 11, color: '#FFD166' },

  descricaoTexto: { fontSize: 13, color: '#8899AA', marginBottom: 12, lineHeight: 20 },
  destaque: { color: '#FFD166', fontFamily: 'monospace' },

  contadorCard: {
    backgroundColor: '#1A2E45', borderRadius: 12, padding: 16,
    marginBottom: 10, borderWidth: 1.5, alignItems: 'center',
  },
  contadorNome: { fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  contadorValor: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  contadorBotoes: { flexDirection: 'row', gap: 20 },
  botao: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  botaoTexto: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },

  rodape: {
    marginTop: 28, alignItems: 'center',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#243B55',
  },
  rodapeTexto: { fontSize: 12, color: '#8899AA' },
});
