/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 07 — App de Cadastro (GABARITO — Desafio Prático)
 *
 * Este é o gabarito completo do desafio proposto na aula.
 * Inclui os três níveis:
 *
 *  ⭐ Nível 1: App funcional com os 6 requisitos básicos
 *    - TextInput para Nome, E-mail e Senha
 *    - Botão 'Cadastrar' com TouchableOpacity estilizado
 *    - Texto que exibe o nome em tempo real
 *    - Layout com SafeAreaView e ScrollView
 *
 *  ⭐⭐ Nível 2: Validação de e-mail com aviso ao usuário
 *    - Verifica se o e-mail contém '@'
 *    - Exibe mensagem de erro inline
 *    - Destaca campo inválido com borda vermelha
 *
 *  ⭐⭐⭐ Nível 3: Limpar campos e mensagem de sucesso
 *    - Após cadastro válido, limpa todos os campos
 *    - Exibe banner de sucesso animado
 *    - Lista de usuários cadastrados na sessão
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, StyleSheet,
  KeyboardAvoidingView, Platform, Animated,
} from 'react-native';

// ── Funções de validação ────────────────────────────────────
const validarEmail  = (e) => e.includes('@') && e.includes('.');
const validarNome   = (n) => n.trim().length >= 2;
const validarSenha  = (s) => s.length >= 6;

export default function App() {
  // ── Estado dos campos ────────────────────────────────────
  const [nome,  setNome]  = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ── Estado de erros (Nível 2) ────────────────────────────
  const [erros, setErros] = useState({});

  // ── Estado de sucesso e lista (Nível 3) ─────────────────
  const [sucesso,   setSucesso]   = useState(false);
  const [usuarios,  setUsuarios]  = useState([]);

  // ── Lógica do botão Cadastrar ─────────────────────────────
  const handleCadastrar = () => {
    // ── Nível 2: validar todos os campos ────────────────────
    const novosErros = {};
    if (!validarNome(nome))   novosErros.nome  = 'Nome deve ter ao menos 2 caracteres.';
    if (!validarEmail(email)) novosErros.email = 'E-mail inválido. Deve conter "@" e ".".';
    if (!validarSenha(senha)) novosErros.senha = 'Senha deve ter ao menos 6 caracteres.';

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;                    // interrompe se houver erros
    }

    setErros({});                // limpa erros anteriores

    // ── Nível 3: adicionar à lista e limpar campos ──────────
    setUsuarios((prev) => [
      { id: Date.now(), nome: nome.trim(), email: email.trim() },
      ...prev,
    ]);

    setNome('');
    setEmail('');
    setSenha('');
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);  // esconde após 3s
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollConteudo}
          keyboardShouldPersistTaps="handled"
        >

          {/* ── Cabeçalho ─────────────────────────────── */}
          <View style={styles.cabecalho}>
            <Text style={styles.logo}>📱</Text>
            <Text style={styles.appNome}>CadastroApp</Text>
            <Text style={styles.appSub}>Crie sua conta gratuitamente</Text>
          </View>

          {/* ── Banner de sucesso (Nível 3) ───────────── */}
          {sucesso && (
            <View style={styles.bannerSucesso}>
              <Text style={styles.bannerTexto}>
                ✅ Cadastro realizado com sucesso!
              </Text>
            </View>
          )}

          {/* ── Formulário ──────────────────────────────── */}
          <View style={styles.formulario}>

            {/* Campo: Nome */}
            <View style={styles.campoGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={[styles.input, erros.nome && styles.inputErro]}
                placeholder="Ex: João Silva"
                placeholderTextColor="#475569"
                value={nome}
                onChangeText={(t) => {
                  setNome(t);
                  if (erros.nome) setErros((e) => ({ ...e, nome: null }));
                }}
                autoCapitalize="words"
                returnKeyType="next"
              />
              {/* Nível 2: mensagem de erro inline */}
              {erros.nome && <Text style={styles.msgErro}>⚠️ {erros.nome}</Text>}
              {/* Nível 1: exibição em tempo real */}
              {nome.length > 0 && !erros.nome && (
                <Text style={styles.previewNome}>👋 Olá, {nome}!</Text>
              )}
            </View>

            {/* Campo: E-mail */}
            <View style={styles.campoGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={[styles.input, erros.email && styles.inputErro]}
                placeholder="Ex: joao@email.com"
                placeholderTextColor="#475569"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (erros.email) setErros((e) => ({ ...e, email: null }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              {erros.email && <Text style={styles.msgErro}>⚠️ {erros.email}</Text>}
            </View>

            {/* Campo: Senha */}
            <View style={styles.campoGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={[styles.input, erros.senha && styles.inputErro]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#475569"
                value={senha}
                onChangeText={(t) => {
                  setSenha(t);
                  if (erros.senha) setErros((e) => ({ ...e, senha: null }));
                }}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleCadastrar}
              />
              {erros.senha && <Text style={styles.msgErro}>⚠️ {erros.senha}</Text>}
              {/* Indicador de força da senha */}
              {senha.length > 0 && (
                <ForcaSenha senha={senha} />
              )}
            </View>

            {/* Botão principal */}
            <TouchableOpacity
              style={[
                styles.btnCadastrar,
                (!nome || !email || !senha) && styles.btnDesabilitado,
              ]}
              onPress={handleCadastrar}
              activeOpacity={0.8}
            >
              <Text style={styles.btnTexto}>Criar Conta</Text>
            </TouchableOpacity>

          </View>

          {/* ── Lista de usuários cadastrados (Nível 3) ── */}
          {usuarios.length > 0 && (
            <View style={styles.listaSection}>
              <Text style={styles.listaTitulo}>
                👥 Usuários cadastrados nesta sessão ({usuarios.length})
              </Text>
              {usuarios.map((u) => (
                <View key={u.id} style={styles.usuarioCard}>
                  <View style={styles.usuarioAvatar}>
                    <Text style={styles.usuarioAvatarTexto}>
                      {u.nome.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.usuarioInfo}>
                    <Text style={styles.usuarioNome}>{u.nome}</Text>
                    <Text style={styles.usuarioEmail}>{u.email}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Componente: indicador de força da senha ────────────────
function ForcaSenha({ senha }) {
  const forca =
    senha.length >= 12 && /[A-Z]/.test(senha) && /[0-9]/.test(senha) ? 3 :
    senha.length >= 8  ? 2 :
    senha.length >= 6  ? 1 : 0;

  const labels = ['Fraca', 'Razoável', 'Boa', 'Forte'];
  const cores  = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];

  return (
    <View style={styles.forca}>
      <View style={styles.forcaBars}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[
              styles.forcaBar,
              { backgroundColor: n <= forca ? cores[forca] : '#1B2E45' },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.forcaLabel, { color: cores[forca] }]}>
        {labels[forca]}
      </Text>
    </View>
  );
}

// ── Estilos ────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#0D1B2A' },
  scroll: { flex: 1 },
  scrollConteudo: { padding: 20, paddingBottom: 60 },

  // cabeçalho
  cabecalho: { alignItems: 'center', marginBottom: 28, marginTop: 12 },
  logo:      { fontSize: 52, marginBottom: 8 },
  appNome:   { fontSize: 28, fontWeight: 'bold', color: '#F0F4F8' },
  appSub:    { fontSize: 14, color: '#64748B', marginTop: 4 },

  // banner sucesso
  bannerSucesso: {
    backgroundColor: '#14532D',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#22C55E',
    alignItems: 'center',
  },
  bannerTexto: { fontSize: 14, color: '#22C55E', fontWeight: 'bold' },

  // formulário
  formulario: {
    backgroundColor: '#1B2E45',
    borderRadius: 16,
    padding: 20,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  campoGroup: { marginBottom: 12 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#0D1B2A',
    borderWidth: 1,
    borderColor: '#243B55',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#F0F4F8',
  },
  inputErro: { borderColor: '#EF4444', borderWidth: 1.5 },

  msgErro:    { fontSize: 12, color: '#EF4444', marginTop: 4 },
  previewNome:{ fontSize: 13, color: '#00B4D8', marginTop: 4, fontStyle: 'italic' },

  // força senha
  forca:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  forcaBars: { flexDirection: 'row', gap: 4, flex: 1 },
  forcaBar:  { height: 4, flex: 1, borderRadius: 2 },
  forcaLabel:{ fontSize: 12, fontWeight: 'bold', minWidth: 50 },

  // botão
  btnCadastrar: {
    backgroundColor: '#00B4D8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDesabilitado: { opacity: 0.45 },
  btnTexto: { fontSize: 16, fontWeight: 'bold', color: '#0D1B2A' },

  // lista de usuários
  listaSection: { marginTop: 28 },
  listaTitulo:  { fontSize: 15, fontWeight: 'bold', color: '#CBD5E1', marginBottom: 12 },

  usuarioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B2E45',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  usuarioAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00B4D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usuarioAvatarTexto: { fontSize: 20, fontWeight: 'bold', color: '#0D1B2A' },
  usuarioInfo:  { flex: 1 },
  usuarioNome:  { fontSize: 15, fontWeight: 'bold', color: '#F0F4F8' },
  usuarioEmail: { fontSize: 12, color: '#64748B', marginTop: 2 },
});
