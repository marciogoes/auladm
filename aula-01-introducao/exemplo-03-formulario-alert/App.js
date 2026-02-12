/**
 * Exemplo 03 — Formulário com Alert
 * 
 * Conceitos: TextInput, Button, Alert, useState para formulários.
 * 
 * Referência: Slide 12 — "Atividade de Hoje: Hands-on"
 * Tarefa: "Criar formulário TextInput + Button que mostra Alert"
 * 
 * Pontos de atenção para os alunos:
 * - TextInput é o equivalente ao <input> HTML
 * - Alert.alert() é a função nativa para exibir diálogos modais
 * - Controlamos o input com useState (componente controlado, igual na web)
 * - onChangeText recebe diretamente o texto (não precisa de event.target.value)
 */

import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const FormularioContato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarFormulario = () => {
    // Validação simples
    if (!nome.trim() || !email.trim()) {
      Alert.alert(
        '⚠️ Campos obrigatórios',
        'Por favor, preencha seu nome e e-mail.',
        [{ text: 'Entendi' }]
      );
      return;
    }

    // Alert com múltiplos botões
    Alert.alert(
      '✅ Dados Recebidos!',
      `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem || '(nenhuma)'}`,
      [
        {
          text: 'Limpar',
          onPress: () => {
            setNome('');
            setEmail('');
            setMensagem('');
          },
          style: 'destructive',
        },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Formulário de Contato</Text>
      <Text style={styles.descricao}>
        Preencha os campos abaixo e toque em Enviar
      </Text>

      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail *</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mensagem</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Escreva sua mensagem..."
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.botao}>
        <Button title="📩 Enviar" onPress={enviarFormulario} color="#1976D2" />
      </View>

      <Text style={styles.dica}>
        💡 No React Native, onChangeText já recebe o texto diretamente.
        {'\n'}Não precisa de event.target.value como na web!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FAFAFA',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#777',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputMultiline: {
    minHeight: 100,
  },
  botao: {
    marginTop: 24,
  },
  dica: {
    marginTop: 24,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default FormularioContato;
