// ============================================================
// PASSO 01 — Variáveis e Tipos na Tela
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Declarar variáveis com let, const e var e exibir
//           seus valores diretamente na interface React Native.
//
// CONCEITOS: var, let, const | string, number, boolean, null
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {

  // ── var (evite usar — escopo de função, comportamento imprevisível)
  var nomeCurso = 'Programação para Dispositivos Móveis';

  // ── let (use quando o valor pode mudar)
  let semestre = 1;
  let ativo = true;

  // ── const (use quando o valor NÃO muda — preferido!)
  const linguagem = 'JavaScript';
  const versaoExpo = 52;
  const preco = 0.0;        // number (decimal)
  const dadoAusente = null; // null = ausência intencional de valor

  // ── Exemplo de mudança de valor com let
  semestre = semestre + 1; // agora é 2

  return (
    <View style={estilos.container}>

      <Text style={estilos.titulo}>📦 Passo 01 — Variáveis</Text>

      {/* ── Exibindo strings */}
      <View style={estilos.bloco}>
        <Text style={estilos.label}>var nomeCurso:</Text>
        <Text style={estilos.valor}>{nomeCurso}</Text>
      </View>

      <View style={estilos.bloco}>
        <Text style={estilos.label}>const linguagem:</Text>
        <Text style={estilos.valor}>{linguagem}</Text>
      </View>

      {/* ── Exibindo numbers */}
      <View style={estilos.bloco}>
        <Text style={estilos.label}>let semestre (após +1):</Text>
        <Text style={estilos.valor}>{semestre}</Text>
      </View>

      <View style={estilos.bloco}>
        <Text style={estilos.label}>const versaoExpo:</Text>
        <Text style={estilos.valor}>{versaoExpo}</Text>
      </View>

      <View style={estilos.bloco}>
        <Text style={estilos.label}>const preco:</Text>
        <Text style={estilos.valor}>R$ {preco.toFixed(2)}</Text>
      </View>

      {/* ── Exibindo boolean — precisa converter para string! */}
      <View style={estilos.bloco}>
        <Text style={estilos.label}>let ativo (boolean):</Text>
        <Text style={[estilos.valor, ativo ? estilos.verde : estilos.vermelho]}>
          {ativo ? '✅ Verdadeiro' : '❌ Falso'}
        </Text>
      </View>

      {/* ── Exibindo null */}
      <View style={estilos.bloco}>
        <Text style={estilos.label}>const dadoAusente (null):</Text>
        <Text style={estilos.valor}>{dadoAusente === null ? 'null (sem valor)' : dadoAusente}</Text>
      </View>

      {/* ── Dica importante */}
      <View style={estilos.dica}>
        <Text style={estilos.dicaTitulo}>💡 Regra prática</Text>
        <Text style={estilos.dicaTexto}>
          Use <Text style={estilos.codigo}>const</Text> por padrão.{'\n'}
          Use <Text style={estilos.codigo}>let</Text> apenas se precisar reatribuir.{'\n'}
          Evite <Text style={estilos.codigo}>var</Text> — ele existe só em código legado.
        </Text>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 20,
    textAlign: 'center',
  },
  bloco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8',
  },
  label: {
    color: '#94a3b8',
    fontSize: 13,
    flex: 1,
  },
  valor: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  verde: { color: '#4ade80' },
  vermelho: { color: '#f87171' },
  dica: {
    backgroundColor: '#1c3a2f',
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4ade80',
  },
  dicaTitulo: { color: '#4ade80', fontWeight: 'bold', marginBottom: 6 },
  dicaTexto: { color: '#d1fae5', lineHeight: 22 },
  codigo: { color: '#fcd34d', fontFamily: 'monospace' },
});
