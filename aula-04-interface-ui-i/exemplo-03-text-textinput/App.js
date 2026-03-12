/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 03 — Text e TextInput
 *
 * Conceitos:
 *   - Text: exibir strings, aninhamento, numberOfLines, ellipsizeMode
 *   - TextInput: capturar digitação com estado (useState)
 *   - value + onChangeText: padrão "controlled input"
 *   - keyboardType, secureTextEntry, placeholder, autoCapitalize
 *   - Atualização reativa: texto exibido reflete o estado em tempo real
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function App() {
  // ── Estado dos campos ──────────────────────────────────
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [bio, setBio]         = useState('');
  const [senha, setSenha]     = useState('');

  return (
    // KeyboardAvoidingView: sobe o conteúdo quando o teclado aparece
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.tela} keyboardShouldPersistTaps="handled">

        {/* ── Cabeçalho ──────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitulo}>Text e TextInput</Text>
          <Text style={styles.headerSub}>Componentes de texto em React Native</Text>
        </View>

        {/* ════════════════════════════════════════════
            SEÇÃO 1 — Componente Text
        ════════════════════════════════════════════ */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>📝 Componente Text</Text>

          {/* Estilos de texto */}
          <Text style={styles.labelCampo}>Variações de estilo:</Text>
          <View style={styles.card}>
            <Text style={styles.textoNormal}>Texto normal (16pt)</Text>
            <Text style={styles.textoGrande}>Texto grande e negrito</Text>
            <Text style={styles.textoColorido}>Texto colorido (teal)</Text>
            <Text style={styles.textoItalico}>Texto em itálico</Text>

            {/* Aninhamento: o filho herda e sobrescreve estilos do pai */}
            <Text style={styles.textoNormal}>
              Texto com{' '}
              <Text style={{ fontWeight: 'bold' }}>negrito</Text>,{' '}
              <Text style={{ color: '#F4793B' }}>laranja</Text> e{' '}
              <Text style={{ textDecorationLine: 'underline' }}>sublinhado</Text>
              {' '}no mesmo parágrafo.
            </Text>
          </View>

          {/* numberOfLines e ellipsizeMode */}
          <Text style={styles.labelCampo}>numberOfLines + ellipsizeMode:</Text>
          <View style={styles.card}>
            <Text style={styles.textoNormal} numberOfLines={1} ellipsizeMode="tail">
              Este texto é longo demais para uma linha e será truncado no final com "..."
            </Text>
            <Text style={[styles.textoNormal, { marginTop: 8 }]}
              numberOfLines={2} ellipsizeMode="middle">
              Texto com numberOfLines=2 e ellipsizeMode="middle" — a parte central será substituída por reticências quando necessário.
            </Text>
          </View>
        </View>

        {/* ════════════════════════════════════════════
            SEÇÃO 2 — Componente TextInput
        ════════════════════════════════════════════ */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>⌨️ Componente TextInput</Text>

          {/* Campo: Nome */}
          <Text style={styles.labelCampo}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Maria Silva"
            placeholderTextColor="#64748B"
            value={nome}
            onChangeText={setNome}           // atualiza estado a cada tecla
            autoCapitalize="words"           // capitaliza cada palavra
            returnKeyType="next"
          />

          {/* Campo: E-mail */}
          <Text style={styles.labelCampo}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: maria@email.com"
            placeholderTextColor="#64748B"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"     // teclado com @ e .
            autoCapitalize="none"
            returnKeyType="next"
          />

          {/* Campo: Bio (multiline) */}
          <Text style={styles.labelCampo}>Biografia (multiline)</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Conte um pouco sobre você..."
            placeholderTextColor="#64748B"
            value={bio}
            onChangeText={setBio}
            multiline                        // permite múltiplas linhas
            numberOfLines={3}
            textAlignVertical="top"          // cursor começa no topo (Android)
          />

          {/* Campo: Senha */}
          <Text style={styles.labelCampo}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748B"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry                  // oculta os caracteres
            returnKeyType="done"
          />
        </View>

        {/* ════════════════════════════════════════════
            SEÇÃO 3 — Pré-visualização reativa
        ════════════════════════════════════════════ */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>👁️ Pré-visualização (reativa)</Text>
          <Text style={styles.labelCampo}>
            Os valores abaixo atualizam em tempo real conforme você digita:
          </Text>
          <View style={styles.preview}>
            <PreviewLinha label="Nome"  valor={nome}  />
            <PreviewLinha label="Email" valor={email} />
            <PreviewLinha label="Bio"   valor={bio}   multiline />
            <PreviewLinha label="Senha" valor={senha ? '•'.repeat(senha.length) : ''} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ── Componente auxiliar: linha de preview ─────────────────
function PreviewLinha({ label, valor, multiline }) {
  return (
    <View style={styles.previewLinha}>
      <Text style={styles.previewLabel}>{label}:</Text>
      <Text
        style={[styles.previewValor, !valor && styles.previewVazio]}
        numberOfLines={multiline ? 3 : 1}
      >
        {valor || '(vazio)'}
      </Text>
    </View>
  );
}

// ── Estilos ────────────────────────────────────────────────
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0D1B2A' },

  // header
  header: {
    backgroundColor: '#1B2E45',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitulo: { fontSize: 22, fontWeight: 'bold', color: '#00B4D8' },
  headerSub:    { fontSize: 13, color: '#8CA0B3', marginTop: 4 },

  // seções
  secao:       { marginTop: 20, paddingHorizontal: 16 },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#F4793B', marginBottom: 12 },
  labelCampo:  { fontSize: 13, color: '#CBD5E1', marginBottom: 6, marginTop: 10 },

  // card de exemplos de Text
  card: {
    backgroundColor: '#1B2E45',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  textoNormal:   { fontSize: 16, color: '#F0F4F8' },
  textoGrande:   { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  textoColorido: { fontSize: 16, color: '#00B4D8' },
  textoItalico:  { fontSize: 16, color: '#CBD5E1', fontStyle: 'italic' },

  // inputs
  input: {
    backgroundColor: '#1B2E45',
    borderWidth: 1,
    borderColor: '#243B55',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#F0F4F8',
  },
  inputMultiline: {
    height: 90,
    paddingTop: 12,
  },

  // preview
  preview: {
    backgroundColor: '#1B2E45',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  previewLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  previewLabel:  { fontSize: 13, color: '#00B4D8', fontWeight: 'bold', minWidth: 50 },
  previewValor:  { fontSize: 13, color: '#F0F4F8', flex: 1 },
  previewVazio:  { color: '#475569', fontStyle: 'italic' },
});
