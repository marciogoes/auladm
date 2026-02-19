// ============================================================
// AULA 02 - Exemplo 03: Desafio Prático - GABARITO
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Gabarito comentado do desafio do Slide 23
//
// O DESAFIO PEDIA:
// 1. Criar o projeto via terminal
// 2. Alterar a StatusBar para uma cor diferente
// 3. Centralizar um texto com seu nome e o curso
//
// Este arquivo mostra o gabarito COM EXTENSÕES que explicam
// cada decisão de código para o aluno
// ============================================================

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

// ── Dados do aluno - ALTERE AQUI! ─────────────────────────────
const NOME_ALUNO = 'Seu Nome Aqui';
const CURSO = 'TADS 2026.1';
const COR_FAVORITA = '#6C63FF'; // Experimente mudar esta cor!

export default function App() {
  // Slide 22: cada vez que você editar e salvar, o Fast Refresh atualiza aqui!
  const [corFundo, setCorFundo] = useState('#0D1B2A');
  const [temaClaro, setTemaClaro] = useState(false);

  function alternarTema() {
    // Demonstração de useState alterando o visual
    const novoTema = !temaClaro;
    setTemaClaro(novoTema);
    setCorFundo(novoTema ? '#F0F4F8' : '#0D1B2A');
    Alert.alert(
      'Tema Alterado!',
      `Fast Refresh atualiza o UI automaticamente.\nTema: ${novoTema ? 'Claro ☀️' : 'Escuro 🌙'}`,
      [{ text: 'Legal!' }]
    );
  }

  const textoPrincipal = temaClaro ? '#1C2B3A' : '#FFFFFF';
  const textoSecundario = temaClaro ? '#4A5568' : '#8CA0B3';

  return (
    // View principal com flex:1 ocupa a tela toda
    // alignItems + justifyContent centralizam o conteúdo
    <View style={[styles.container, { backgroundColor: corFundo }]}>

      {/* ── SEÇÃO: IDENTIFICAÇÃO DO ALUNO ───────────────────── */}
      {/* Esta é a parte principal do desafio do Slide 23 */}
      <View style={[styles.cartaoAluno, { borderColor: COR_FAVORITA }]}>
        {/* Ícone de estudante */}
        <View style={[styles.avatar, { backgroundColor: COR_FAVORITA }]}>
          <Text style={styles.avatarTexto}>👨‍💻</Text>
        </View>

        {/* NOME - centralizado (Requisito do Desafio) */}
        <Text style={[styles.nome, { color: textoPrincipal }]}>
          {NOME_ALUNO}
        </Text>

        {/* CURSO - centralizado (Requisito do Desafio) */}
        <Text style={[styles.curso, { color: COR_FAVORITA }]}>
          {CURSO}
        </Text>

        <Text style={[styles.subtexto, { color: textoSecundario }]}>
          Programação para Dispositivos Móveis
        </Text>
      </View>

      {/* ── SEÇÃO: EXPLICAÇÃO DO STATUSBAR ──────────────────── */}
      <View style={styles.explicacaoBox}>
        <Text style={[styles.explicacaoTitulo, { color: textoPrincipal }]}>
          📱 StatusBar (Slide 23)
        </Text>
        <Text style={[styles.explicacaoTexto, { color: textoSecundario }]}>
          A <Text style={{ color: COR_FAVORITA, fontWeight: 'bold' }}>{'<StatusBar>'}</Text> controla
          os ícones e a cor da barra superior do celular.{'\n\n'}
          • style="light" → ícones brancos{'\n'}
          • style="dark"  → ícones escuros{'\n'}
          • backgroundColor → cor de fundo (Android)
        </Text>
      </View>

      {/* ── SEÇÃO: DICAS DE ESTILO ──────────────────────────── */}
      <View style={styles.dicasContainer}>
        {[
          { label: 'alignItems: center', desc: 'Centraliza na horizontal' },
          { label: 'justifyContent: center', desc: 'Centraliza na vertical' },
          { label: 'flex: 1', desc: 'Ocupa toda a tela' },
        ].map((dica, i) => (
          <View key={i} style={[styles.dicaItem, { borderLeftColor: COR_FAVORITA }]}>
            <Text style={styles.dicaLabel}>{dica.label}</Text>
            <Text style={[styles.dicaDesc, { color: textoSecundario }]}>{dica.desc}</Text>
          </View>
        ))}
      </View>

      {/* Botão para alternar tema - demonstra useState + interatividade */}
      <TouchableOpacity
        style={[styles.botao, { backgroundColor: COR_FAVORITA }]}
        onPress={alternarTema}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoTexto}>
          {temaClaro ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </Text>
      </TouchableOpacity>

      {/* SOLUÇÃO DO DESAFIO: StatusBar com estilo personalizado */}
      {/* style="light" = ícones brancos no topo do celular      */}
      {/* backgroundColor só funciona no Android                  */}
      <StatusBar
        style={temaClaro ? 'dark' : 'light'}
        backgroundColor={temaClaro ? '#F0F4F8' : '#0D1B2A'}
      />
    </View>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
// Slide 19: StyleSheet.create() organiza os estilos como objetos JS
// Lembre-se: camelCase! (backgroundColor, não background-color)
const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Ocupa toda a tela
    alignItems: 'center',         // Centraliza horizontalmente ← REQUISITO DO DESAFIO
    justifyContent: 'center',     // Centraliza verticalmente   ← REQUISITO DO DESAFIO
    padding: 20,
    gap: 16,
  },

  // Cartão com nome e curso
  cartaoAluno: {
    width: '100%',
    backgroundColor: '#1B2A3B',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',         // conteúdo interno também centralizado
    gap: 8,
    borderWidth: 2,
    // borderColor vem das props dinâmicas (COR_FAVORITA)
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,             // círculo perfeito
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarTexto: { fontSize: 36 },

  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',          // texto centralizado ← REQUISITO DO DESAFIO
  },
  curso: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',          // texto centralizado ← REQUISITO DO DESAFIO
  },
  subtexto: {
    fontSize: 13,
    textAlign: 'center',
  },

  // Caixa de explicação
  explicacaoBox: {
    width: '100%',
    backgroundColor: '#1B2A3B',
    borderRadius: 14,
    padding: 16,
  },
  explicacaoTitulo: {
    fontSize: 16, fontWeight: 'bold', marginBottom: 8,
  },
  explicacaoTexto: {
    fontSize: 13, lineHeight: 20,
  },

  // Dicas de estilo
  dicasContainer: { width: '100%', gap: 6 },
  dicaItem: {
    backgroundColor: '#1B2A3B',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
  },
  dicaLabel: {
    color: '#A8D8FF', fontFamily: 'monospace', fontSize: 13, fontWeight: 'bold',
  },
  dicaDesc: { fontSize: 12, marginTop: 2 },

  // Botão
  botao: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF', fontSize: 16, fontWeight: 'bold',
  },
});
