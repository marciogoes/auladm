// ============================================================
// PASSO 13 — Mini-App: Lista de Tarefas (To-Do List)
// Disciplina: Programação para Dispositivos Móveis
// Aulas 03 + 04 — PROJETO INTEGRADOR
// ============================================================
//
// INTEGRA: const/let, arrow functions, arrays (.map, .filter,
//          .reduce), objetos, spread, TextInput, useState,
//          Flexbox, template literals, Pressable, ScrollView
//
// NÍVEL: ⭐⭐⭐ Completo
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

// ── Categorias com emoji e cor
const CATEGORIAS = [
  { id: 'todas',    label: '📋 Todas',    cor: '#38bdf8' },
  { id: 'estudos',  label: '📚 Estudos',  cor: '#a78bfa' },
  { id: 'projeto',  label: '💻 Projeto',  cor: '#34d399' },
  { id: 'pessoal',  label: '🏠 Pessoal',  cor: '#fb923c' },
];

// ── Tarefas iniciais de demonstração
const TAREFAS_INICIAIS = [
  { id: 1, texto: 'Estudar Flexbox',        categoria: 'estudos', concluida: true,  prioridade: 'alta' },
  { id: 2, texto: 'Criar App da Aula 04',   categoria: 'projeto', concluida: false, prioridade: 'alta' },
  { id: 3, texto: 'Ler documentação Expo',  categoria: 'estudos', concluida: false, prioridade: 'media' },
  { id: 4, texto: 'Fazer exercícios físicos', categoria: 'pessoal', concluida: false, prioridade: 'baixa' },
  { id: 5, texto: 'Revisar TypeScript',     categoria: 'estudos', concluida: true,  prioridade: 'media' },
];

let proximoId = 6;

// ── Função pura: gera nova tarefa (objeto)
const criarTarefa = (texto, categoria, prioridade) => ({
  id: proximoId++,
  texto,
  categoria,
  concluida: false,
  prioridade,
  criadaEm: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
});

// ────────────────────────────────────────────────────────────

export default function App() {
  const [tarefas,     setTarefas]     = useState(TAREFAS_INICIAIS);
  const [novoTexto,   setNovoTexto]   = useState('');
  const [categoria,   setCategoria]   = useState('estudos');
  const [prioridade,  setPrioridade]  = useState('media');
  const [filtroAtivo, setFiltroAtivo] = useState('todas');
  const [mostrarForm, setMostrarForm] = useState(false);

  // ── Operações de array com spread (sem mutar o estado original)
  const adicionarTarefa = () => {
    if (!novoTexto.trim()) return;
    const nova = criarTarefa(novoTexto.trim(), categoria, prioridade);
    setTarefas(prev => [...prev, nova]); // spread → adiciona ao final
    setNovoTexto('');
    setMostrarForm(false);
  };

  const alternarConclusao = (id) => {
    setTarefas(prev =>
      prev.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
      // .map() retorna novo array | spread de objeto atualiza só 'concluida'
    );
  };

  const removerTarefa = (id) => {
    setTarefas(prev => prev.filter(t => t.id !== id)); // .filter() remove o item
  };

  const limparConcluidas = () => {
    setTarefas(prev => prev.filter(t => !t.concluida));
  };

  // ── Dados derivados (sem novo estado — calculados na hora)
  const tarefasFiltradas = filtroAtivo === 'todas'
    ? tarefas
    : tarefas.filter(t => t.categoria === filtroAtivo);

  const total      = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes  = total - concluidas;
  const porcento   = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  const corPrioridade = { alta: '#f87171', media: '#fbbf24', baixa: '#4ade80' };
  const catInfo = (id) => CATEGORIAS.find(c => c.id === id) || CATEGORIAS[0];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0f172a' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={s.inner}>

        {/* ── Cabeçalho com progresso */}
        <Text style={s.titulo}>✅ Lista de Tarefas</Text>

        <View style={s.progresso}>
          <View style={s.progressoTextos}>
            <Text style={s.progressoNumer}>{concluidas}/{total}</Text>
            <Text style={s.progressoLabel}>concluídas</Text>
          </View>
          <View style={s.progressoBarraWrap}>
            <View style={[s.progressoBarra, { width: `${porcento}%` }]} />
          </View>
          <Text style={s.progressoPorcento}>{porcento}%</Text>
        </View>

        <View style={s.statsRow}>
          <Stat label="Total"    valor={total}     cor="#38bdf8" />
          <Stat label="Pendentes" valor={pendentes}  cor="#f59e0b" />
          <Stat label="Feitas"   valor={concluidas} cor="#4ade80" />
        </View>

        {/* ── Filtros de categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtros}>
          {CATEGORIAS.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[s.filtroChip, filtroAtivo === cat.id && { backgroundColor: cat.cor + '33', borderColor: cat.cor }]}
              onPress={() => setFiltroAtivo(cat.id)}
              activeOpacity={0.8}
            >
              <Text style={[s.filtroTexto, filtroAtivo === cat.id && { color: cat.cor }]}>
                {cat.label}
                {cat.id !== 'todas' && ` (${tarefas.filter(t => t.categoria === cat.id).length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Lista de tarefas */}
        {tarefasFiltradas.length === 0 ? (
          <View style={s.vazio}>
            <Text style={s.vazioTexto}>Nenhuma tarefa nesta categoria 🎉</Text>
          </View>
        ) : (
          tarefasFiltradas.map(tarefa => {
            const cat = catInfo(tarefa.categoria);
            return (
              <Pressable
                key={tarefa.id}
                style={({ pressed }) => [
                  s.tarefaCard,
                  tarefa.concluida && s.tarefaConcluida,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() => alternarConclusao(tarefa.id)}
                onLongPress={() => removerTarefa(tarefa.id)}
              >
                {/* Checkbox */}
                <View style={[s.check, tarefa.concluida && s.checkFeito]}>
                  {tarefa.concluida && <Text style={s.checkmark}>✓</Text>}
                </View>

                {/* Conteúdo */}
                <View style={{ flex: 1 }}>
                  <Text style={[s.tarefaTexto, tarefa.concluida && s.tarefaRiscada]}>
                    {tarefa.texto}
                  </Text>
                  <View style={s.tarefaMeta}>
                    <Text style={[s.catTag, { color: cat.cor }]}>{cat.label}</Text>
                    {tarefa.criadaEm && (
                      <Text style={s.criadaEm}> · {tarefa.criadaEm}</Text>
                    )}
                  </View>
                </View>

                {/* Prioridade */}
                <View style={[s.prioBadge, { backgroundColor: corPrioridade[tarefa.prioridade] + '22' }]}>
                  <Text style={[s.prioTexto, { color: corPrioridade[tarefa.prioridade] }]}>
                    {tarefa.prioridade}
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}

        <Text style={s.dica}>💡 Toque para concluir · Segure para remover</Text>

        {/* ── Botão de adicionar */}
        <TouchableOpacity
          style={s.btnAdicionar}
          onPress={() => setMostrarForm(v => !v)}
          activeOpacity={0.8}
        >
          <Text style={s.btnAdicionarTexto}>{mostrarForm ? '✕ Cancelar' : '+ Nova Tarefa'}</Text>
        </TouchableOpacity>

        {/* ── Formulário de nova tarefa */}
        {mostrarForm && (
          <View style={s.form}>
            <TextInput
              style={s.input}
              placeholder="O que precisa ser feito?"
              placeholderTextColor="#475569"
              value={novoTexto}
              onChangeText={setNovoTexto}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={adicionarTarefa}
            />

            <Text style={s.formLabel}>Categoria</Text>
            <View style={s.opcoeRow}>
              {CATEGORIAS.slice(1).map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[s.opceChip, categoria === cat.id && { borderColor: cat.cor, backgroundColor: cat.cor + '22' }]}
                  onPress={() => setCategoria(cat.id)}
                >
                  <Text style={[s.opceTexto, categoria === cat.id && { color: cat.cor }]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.formLabel}>Prioridade</Text>
            <View style={s.opcoeRow}>
              {['alta', 'media', 'baixa'].map(p => (
                <TouchableOpacity
                  key={p}
                  style={[s.opceChip, prioridade === p && { borderColor: corPrioridade[p], backgroundColor: corPrioridade[p] + '22' }]}
                  onPress={() => setPrioridade(p)}
                >
                  <Text style={[s.opceTexto, prioridade === p && { color: corPrioridade[p] }]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[s.btnSalvar, !novoTexto.trim() && s.btnDesativado]}
              onPress={adicionarTarefa}
              disabled={!novoTexto.trim()}
            >
              <Text style={s.btnSalvarTexto}>Adicionar Tarefa</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Limpar concluídas */}
        {concluidas > 0 && (
          <TouchableOpacity style={s.btnLimpar} onPress={limparConcluidas} activeOpacity={0.8}>
            <Text style={s.btnLimparTexto}>🗑️ Remover {concluidas} concluída(s)</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Stat = ({ label, valor, cor }) => (
  <View style={s.stat}>
    <Text style={[s.statValor, { color: cor }]}>{valor}</Text>
    <Text style={s.statLabel}>{label}</Text>
  </View>
);

const s = StyleSheet.create({
  inner:             { padding: 20, paddingTop: 54, paddingBottom: 50 },
  titulo:            { fontSize: 24, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center', marginBottom: 16 },
  progresso:         { backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 12 },
  progressoTextos:   { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 8 },
  progressoNumer:    { color: '#f8fafc', fontSize: 22, fontWeight: 'bold' },
  progressoLabel:    { color: '#64748b', fontSize: 12 },
  progressoBarraWrap:{ height: 8, backgroundColor: '#0f172a', borderRadius: 4, overflow: 'hidden', flex: 1, marginRight: 8 },
  progressoBarra:    { height: '100%', backgroundColor: '#4ade80', borderRadius: 4 },
  progressoPorcento: { color: '#4ade80', fontWeight: 'bold', fontSize: 14 },
  statsRow:          { flexDirection: 'row', gap: 8, marginBottom: 12 },
  stat:              { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 10, alignItems: 'center' },
  statValor:         { fontSize: 22, fontWeight: 'bold' },
  statLabel:         { color: '#64748b', fontSize: 10, marginTop: 2 },
  filtros:           { marginBottom: 12 },
  filtroChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    borderWidth: 1, borderColor: '#334155', marginRight: 8,
  },
  filtroTexto:       { color: '#94a3b8', fontSize: 12 },
  vazio:             { backgroundColor: '#1e293b', borderRadius: 10, padding: 24, alignItems: 'center' },
  vazioTexto:        { color: '#64748b', fontSize: 14 },
  tarefaCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 6,
  },
  tarefaConcluida:   { opacity: 0.55 },
  check: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#334155',
    alignItems: 'center', justifyContent: 'center',
  },
  checkFeito:        { backgroundColor: '#4ade80', borderColor: '#4ade80' },
  checkmark:         { color: '#0f172a', fontWeight: 'bold', fontSize: 12 },
  tarefaTexto:       { color: '#f8fafc', fontSize: 14, marginBottom: 2 },
  tarefaRiscada:     { textDecorationLine: 'line-through', color: '#64748b' },
  tarefaMeta:        { flexDirection: 'row', alignItems: 'center' },
  catTag:            { fontSize: 11 },
  criadaEm:          { color: '#475569', fontSize: 10 },
  prioBadge:         { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  prioTexto:         { fontSize: 10, fontWeight: 'bold' },
  dica:              { color: '#334155', fontSize: 11, textAlign: 'center', marginBottom: 12 },
  btnAdicionar: {
    backgroundColor: '#0ea5e9', borderRadius: 12, padding: 14,
    alignItems: 'center', marginBottom: 10,
  },
  btnAdicionarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  form:              { backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 10 },
  input: {
    backgroundColor: '#0f172a', color: '#f8fafc', borderRadius: 8,
    padding: 12, fontSize: 14, borderWidth: 1.5, borderColor: '#334155', marginBottom: 12,
  },
  formLabel:         { color: '#94a3b8', fontSize: 12, marginBottom: 6 },
  opcoeRow:          { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  opceChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    borderWidth: 1, borderColor: '#334155',
  },
  opceTexto:         { color: '#94a3b8', fontSize: 12 },
  btnSalvar: {
    backgroundColor: '#0ea5e9', borderRadius: 8, padding: 12, alignItems: 'center',
  },
  btnSalvarTexto:    { color: '#fff', fontWeight: 'bold' },
  btnDesativado:     { backgroundColor: '#334155' },
  btnLimpar: {
    borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 12,
    alignItems: 'center', marginTop: 4,
  },
  btnLimparTexto:    { color: '#64748b', fontSize: 13 },
});
