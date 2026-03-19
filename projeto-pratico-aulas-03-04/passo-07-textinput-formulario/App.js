// ============================================================
// PASSO 07 — TextInput + Formulário com Validação
// Disciplina: Programação para Dispositivos Móveis
// Aula 04 — Interface de Usuário I
// ============================================================
//
// OBJETIVO: Capturar entradas do usuário com TextInput,
//           armazenar no estado e validar antes de exibir.
//
// CONCEITOS: TextInput, onChangeText, placeholder,
//            keyboardType, secureTextEntry, validação de campos
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function App() {
  // ── Estado de cada campo
  const [nome,  setNome]  = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');

  // ── Estado de erros e resultado
  const [erros,   setErros]   = useState({});
  const [enviado, setEnviado] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  // ── Função de validação
  const validar = () => {
    const novosErros = {};

    if (!nome.trim())
      novosErros.nome = 'Nome é obrigatório';
    else if (nome.trim().length < 3)
      novosErros.nome = 'Nome deve ter ao menos 3 caracteres';

    if (!email.trim())
      novosErros.email = 'E-mail é obrigatório';
    else if (!email.includes('@') || !email.includes('.'))
      novosErros.email = 'E-mail inválido';

    if (!senha)
      novosErros.senha = 'Senha é obrigatória';
    else if (senha.length < 6)
      novosErros.senha = 'Senha deve ter ao menos 6 caracteres';

    if (!idade)
      novosErros.idade = 'Idade é obrigatória';
    else if (isNaN(Number(idade)) || Number(idade) < 1 || Number(idade) > 120)
      novosErros.idade = 'Idade inválida (1–120)';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // true = sem erros
  };

  const handleEnviar = () => {
    if (validar()) setEnviado(true);
  };

  const handleLimpar = () => {
    setNome(''); setEmail(''); setSenha(''); setIdade('');
    setErros({}); setEnviado(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0f172a' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={s.inner}>
        <Text style={s.titulo}>📝 Passo 07 — TextInput</Text>

        {/* ── Campo: Nome */}
        <Label texto="Nome completo" obrigatorio />
        <TextInput
          style={[s.input, erros.nome && s.inputErro]}
          placeholder="Ex: Maria da Silva"
          placeholderTextColor="#475569"
          value={nome}
          onChangeText={setNome}  // atualiza estado a cada tecla
          autoCapitalize="words"
        />
        {erros.nome && <Erro msg={erros.nome} />}

        {/* ── Campo: E-mail */}
        <Label texto="E-mail" obrigatorio />
        <TextInput
          style={[s.input, erros.email && s.inputErro]}
          placeholder="Ex: maria@email.com"
          placeholderTextColor="#475569"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"   // abre teclado de e-mail
          autoCapitalize="none"
          autoCorrect={false}
        />
        {erros.email && <Erro msg={erros.email} />}

        {/* ── Campo: Senha (secureTextEntry) */}
        <Label texto="Senha" obrigatorio />
        <View style={[s.inputWrap, erros.senha && s.inputErro]}>
          <TextInput
            style={[s.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#475569"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}   // esconde/mostra caracteres
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(v => !v)} style={s.olho}>
            <Text>{senhaVisivel ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        {erros.senha && <Erro msg={erros.senha} />}

        {/* ── Campo: Idade (teclado numérico) */}
        <Label texto="Idade" obrigatorio />
        <TextInput
          style={[s.input, erros.idade && s.inputErro]}
          placeholder="Ex: 21"
          placeholderTextColor="#475569"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"            // teclado somente números
          maxLength={3}
        />
        {erros.idade && <Erro msg={erros.idade} />}

        {/* ── Botões */}
        <TouchableOpacity style={s.btnEnviar} onPress={handleEnviar} activeOpacity={0.8}>
          <Text style={s.btnEnviarTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnLimpar} onPress={handleLimpar} activeOpacity={0.8}>
          <Text style={s.btnLimparTexto}>Limpar tudo</Text>
        </TouchableOpacity>

        {/* ── Resultado após envio */}
        {enviado && (
          <View style={s.sucesso}>
            <Text style={s.sucessoTitulo}>✅ Cadastro realizado!</Text>
            <Linha label="Nome:"  valor={nome} />
            <Linha label="E-mail:" valor={email} />
            <Linha label="Senha:" valor={'*'.repeat(senha.length)} />
            <Linha label="Idade:" valor={`${idade} anos`} />
          </View>
        )}

        {/* ── Dica didática */}
        <View style={s.dica}>
          <Text style={s.dicaTitulo}>💡 Propriedades úteis do TextInput</Text>
          <Text style={s.dicaTexto}>
            {`onChangeText  → captura cada tecla\nvalue         → controla o valor (estado)\nplaceholder   → texto de dica\nkeyboardType  → tipo de teclado\nsecureTextEntry → oculta caracteres\nautoCapitalize → maiúsculas automáticas\nmaxLength     → limite de caracteres`}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Label = ({ texto, obrigatorio }) => (
  <Text style={s.label}>
    {texto}{obrigatorio && <Text style={{ color: '#f87171' }}> *</Text>}
  </Text>
);
const Erro  = ({ msg }) => <Text style={s.erro}>{msg}</Text>;
const Linha = ({ label, valor }) => (
  <View style={s.linhaResultado}>
    <Text style={s.linhaLabel}>{label}</Text>
    <Text style={s.linhaValor}>{valor}</Text>
  </View>
);

const s = StyleSheet.create({
  inner:          { padding: 24, paddingTop: 50, paddingBottom: 40 },
  titulo:         { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 24, textAlign: 'center' },
  label:          { color: '#94a3b8', fontSize: 13, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    borderWidth: 1.5, borderColor: '#334155', marginBottom: 2,
  },
  inputErro:      { borderColor: '#f87171' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1e293b', borderRadius: 10, borderWidth: 1.5,
    borderColor: '#334155', marginBottom: 2, paddingRight: 12,
  },
  olho:           { padding: 4 },
  erro:           { color: '#f87171', fontSize: 11, marginBottom: 4 },
  btnEnviar: {
    backgroundColor: '#0ea5e9', borderRadius: 10, padding: 14,
    alignItems: 'center', marginTop: 24,
  },
  btnEnviarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  btnLimpar: {
    borderWidth: 1.5, borderColor: '#334155', borderRadius: 10, padding: 12,
    alignItems: 'center', marginTop: 10,
  },
  btnLimparTexto: { color: '#64748b', fontSize: 14 },
  sucesso: {
    backgroundColor: '#052e16', borderRadius: 10, padding: 16, marginTop: 20,
    borderWidth: 1, borderColor: '#4ade80',
  },
  sucessoTitulo:  { color: '#4ade80', fontWeight: 'bold', fontSize: 15, marginBottom: 10 },
  linhaResultado: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  linhaLabel:     { color: '#86efac', fontSize: 12 },
  linhaValor:     { color: '#f0fdf4', fontSize: 12, fontWeight: 'bold' },
  dica: {
    backgroundColor: '#1e293b', borderRadius: 8, padding: 14,
    marginTop: 20, borderLeftWidth: 4, borderLeftColor: '#38bdf8',
  },
  dicaTitulo:     { color: '#38bdf8', fontWeight: 'bold', marginBottom: 8 },
  dicaTexto:      { color: '#94a3b8', fontSize: 11, fontFamily: 'monospace', lineHeight: 20 },
});
