// ============================================================
// AULA 03 - Exemplo 01: Variáveis e Tipos de Dados
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Demonstrar var/let/const, tipos primitivos,
//           typeof e diferença entre valor e referência.
// SLIDES RELACIONADOS: Módulo 02 — Fundamentos do JavaScript
//
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// ── DEMONSTRAÇÕES DE VARIÁVEIS ────────────────────────────────
// const: referência fixa — use como PADRÃO sempre
const VERSAO_APP = '1.0.0';           // nunca muda
const TITULO = 'Variáveis e Tipos';

// let: pode ser reatribuída — use quando o valor mudar
let pontuacaoAtual = 0;
pontuacaoAtual = 10; // ✅ permitido

// var: evitar — escopo de função, não de bloco (legado)
// var nomeAntigo = 'legado'; // ⚠️ não use em código novo

// ── TIPOS PRIMITIVOS ─────────────────────────────────────────
// JavaScript tem 7 tipos primitivos; os mais usados são:
const tiposPrimitivos = [
  { tipo: 'string',    valor: 'React Native',  exemplo: '"React Native"' },
  { tipo: 'number',    valor: 42,              exemplo: '42  |  3.14  |  NaN' },
  { tipo: 'boolean',   valor: true,            exemplo: 'true  |  false' },
  { tipo: 'null',      valor: null,            exemplo: 'null (ausência intencional)' },
  { tipo: 'undefined', valor: undefined,       exemplo: 'variável não atribuída' },
];

// ── TIPOS DE REFERÊNCIA ───────────────────────────────────────
// Objetos e arrays são passados por REFERÊNCIA, não por valor
const aluno = {
  nome: 'Ana',
  curso: 'TADS',
  semestre: 3,
  notas: [9.5, 7.0, 8.5],
};

// const com objeto: a referência é fixa, mas os campos internos podem mudar
const configApp = { tema: 'escuro', idioma: 'pt-BR' };
configApp.tema = 'claro'; // ✅ isso funciona com const!
// configApp = {};        // ❌ TypeError: não pode reatribuir const

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  // useState retorna [valorAtual, funçãoParaMudar]
  // Veremos isso em detalhe na Aula 06 (Gerenciamento de Estado)
  const [secaoAberta, setSecaoAberta] = useState(null);

  // Função para descobrir o tipo de um valor em tempo de execução
  // typeof é um operador do JavaScript, não uma função
  const descobrirTipo = (valor) => {
    if (Array.isArray(valor)) return 'array';    // array é 'object' no typeof, corrigimos aqui
    if (valor === null) return 'null';            // null é 'object' no typeof (bug histórico!)
    return typeof valor;
  };

  // Função para formatar o valor para exibição na tela
  const formatarValor = (valor) => {
    if (valor === null) return 'null';
    if (valor === undefined) return 'undefined';
    if (typeof valor === 'string') return `"${valor}"`;
    return String(valor);
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* Cabeçalho ─────────────────────────────────────────── */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloApp}>{TITULO}</Text>
        <Text style={styles.versao}>v{VERSAO_APP} • Aula 03</Text>
      </View>

      {/* Seção 1: var vs let vs const ──────────────────────── */}
      <TouchableOpacity
        style={styles.acordeao}
        onPress={() => setSecaoAberta(secaoAberta === 1 ? null : 1)}
        activeOpacity={0.8}
      >
        <Text style={styles.acordeaoTitulo}>
          {secaoAberta === 1 ? '▼' : '▶'} var, let e const
        </Text>
      </TouchableOpacity>

      {secaoAberta === 1 && (
        <View style={styles.acordeaoConteudo}>

          {/* Card const */}
          <View style={[styles.card, { borderLeftColor: '#FF6B35' }]}>
            <Text style={styles.cardTitulo}>const — use como padrão</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>{'const PI = 3.14;\nconst nome = "TADS";\n// PI = 4; ← ❌ TypeError'}</Text>
            </View>
            <Text style={styles.cardDica}>
              🔒 A referência não pode ser reatribuída. Mas objetos e arrays internos ainda podem ser modificados.
            </Text>
          </View>

          {/* Card let */}
          <View style={[styles.card, { borderLeftColor: '#00B4D8' }]}>
            <Text style={styles.cardTitulo}>let — quando o valor muda</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>{'let pontos = 0;\npontos = pontos + 10; // ✅\npontos++;             // ✅'}</Text>
            </View>
            <Text style={styles.cardDica}>
              🔄 Escopo de bloco — só existe dentro do {'{ }'} onde foi declarada.
            </Text>
          </View>

          {/* Card var */}
          <View style={[styles.card, { borderLeftColor: '#E74C3C' }]}>
            <Text style={styles.cardTitulo}>var — evitar (legado)</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>{'// ⚠️ var tem escopo de FUNÇÃO\nif (true) {\n  var vazou = "fui criada no if";\n}\nconsole.log(vazou); // "fui criada no if"\n// let nunca faria isso!'}</Text>
            </View>
            <Text style={styles.cardDica}>
              ⚠️ Escopo de função — pode "vazar" para fora do bloco. Use apenas para código legado.
            </Text>
          </View>

        </View>
      )}

      {/* Seção 2: Tipos Primitivos ─────────────────────────── */}
      <TouchableOpacity
        style={styles.acordeao}
        onPress={() => setSecaoAberta(secaoAberta === 2 ? null : 2)}
        activeOpacity={0.8}
      >
        <Text style={styles.acordeaoTitulo}>
          {secaoAberta === 2 ? '▼' : '▶'} Tipos Primitivos e typeof
        </Text>
      </TouchableOpacity>

      {secaoAberta === 2 && (
        <View style={styles.acordeaoConteudo}>
          <Text style={styles.subtitulo}>
            Use <Text style={styles.destaque}>typeof</Text> para descobrir o tipo de um valor em tempo de execução:
          </Text>

          {tiposPrimitivos.map((item) => (
            <View key={item.tipo} style={styles.tipoRow}>
              <View style={styles.tipoBadge}>
                <Text style={styles.tipoBadgeTexto}>{item.tipo}</Text>
              </View>
              <View style={styles.tipoInfo}>
                <Text style={styles.tipoExemplo}>{item.exemplo}</Text>
                <Text style={styles.tipoResultado}>
                  typeof → '{descobrirTipo(item.valor)}'
                </Text>
              </View>
            </View>
          ))}

          {/* Pegadinha do typeof null */}
          <View style={[styles.alertaBox, { marginTop: 12 }]}>
            <Text style={styles.alertaTexto}>
              ⚠️  typeof null === 'object' — isso é um BUG histórico do JavaScript (desde 1995) que nunca foi corrigido para não quebrar sites antigos!
            </Text>
          </View>
        </View>
      )}

      {/* Seção 3: Objetos e Arrays ─────────────────────────── */}
      <TouchableOpacity
        style={styles.acordeao}
        onPress={() => setSecaoAberta(secaoAberta === 3 ? null : 3)}
        activeOpacity={0.8}
      >
        <Text style={styles.acordeaoTitulo}>
          {secaoAberta === 3 ? '▼' : '▶'} Objetos e Arrays (Referência)
        </Text>
      </TouchableOpacity>

      {secaoAberta === 3 && (
        <View style={styles.acordeaoConteudo}>

          {/* Exibir o objeto aluno */}
          <Text style={styles.subtitulo}>Objeto aluno:</Text>
          <View style={styles.codigoBox}>
            <Text style={styles.codigo}>
              {'const aluno = {\n  nome: "Ana",\n  curso: "TADS",\n  semestre: 3,\n  notas: [9.5, 7.0, 8.5]\n}'}
            </Text>
          </View>

          {/* Acessar propriedades */}
          <Text style={[styles.subtitulo, { marginTop: 12 }]}>Resultado na tela:</Text>
          <View style={styles.card}>
            <Text style={styles.resultadoTexto}>👤 {aluno.nome}</Text>
            <Text style={styles.resultadoTexto}>📚 {aluno.curso} — {aluno.semestre}º semestre</Text>
            <Text style={styles.resultadoTexto}>
              📊 Notas: {aluno.notas.join(' | ')}
            </Text>
            <Text style={styles.resultadoTexto}>
              📈 Média: {(aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length).toFixed(1)}
            </Text>
          </View>

          <View style={styles.alertaBox}>
            <Text style={styles.alertaTexto}>
              💡  aluno.notas é um array — usamos .reduce() para somar e depois dividimos pelo comprimento (.length) para obter a média. Veremos métodos de array em detalhe no Exemplo 03!
            </Text>
          </View>
        </View>
      )}

      {/* Rodapé ─────────────────────────────────────────────── */}
      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>
          Próximo: Exemplo 02 — Funções e Arrow Functions
        </Text>
      </View>

    </ScrollView>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 40,
  },

  // Cabeçalho
  cabecalho: {
    backgroundColor: '#1A2E45',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#00B4D8',
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  versao: {
    fontSize: 12,
    color: '#00B4D8',
    fontFamily: 'monospace',
  },

  // Acordeão
  acordeao: {
    backgroundColor: '#1A2E45',
    borderRadius: 8,
    padding: 14,
    marginBottom: 4,
  },
  acordeaoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  acordeaoConteudo: {
    backgroundColor: '#0F2535',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  // Cards
  card: {
    backgroundColor: '#1A2E45',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00B4D8',
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDica: {
    fontSize: 12,
    color: '#8899AA',
    marginTop: 8,
    lineHeight: 18,
  },

  // Código
  codigoBox: {
    backgroundColor: '#0A1825',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#243B55',
  },
  codigo: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#7EC8A4',
    lineHeight: 20,
  },

  // Tipos
  subtitulo: {
    fontSize: 13,
    color: '#8899AA',
    marginBottom: 8,
    lineHeight: 20,
  },
  destaque: {
    color: '#FFD166',
    fontFamily: 'monospace',
  },
  tipoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  tipoBadge: {
    backgroundColor: '#243B55',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 90,
    alignItems: 'center',
  },
  tipoBadgeTexto: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#00B4D8',
    fontWeight: 'bold',
  },
  tipoInfo: {
    flex: 1,
  },
  tipoExemplo: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#7EC8A4',
  },
  tipoResultado: {
    fontSize: 11,
    color: '#8899AA',
  },

  // Resultados e alertas
  resultadoTexto: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 22,
  },
  alertaBox: {
    backgroundColor: '#1C3250',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#00B4D8',
  },
  alertaTexto: {
    fontSize: 12,
    color: '#00B4D8',
    lineHeight: 18,
  },

  // Rodapé
  rodape: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#243B55',
  },
  rodapeTexto: {
    fontSize: 12,
    color: '#8899AA',
  },
});
