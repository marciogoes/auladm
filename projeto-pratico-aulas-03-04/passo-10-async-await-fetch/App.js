// ============================================================
// PASSO 10 — Async/Await + useEffect + Dados Simulados
// Disciplina: Programação para Dispositivos Móveis
// Aula 03 — Estrutura e Linguagem (JavaScript/TypeScript)
// ============================================================
//
// OBJETIVO: Entender programação assíncrona com async/await,
//           simular chamada de API com setTimeout e usar
//           useEffect para executar código após a renderização.
//
// CONCEITOS: async, await, Promise, useEffect, setTimeout,
//            loading state, error state, try/catch/finally
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';

// ── "Banco de dados" simulado (como se fosse uma API)
const DADOS_FALSOS = [
  { id: 1, nome: 'Ana Souza',    curso: 'TADS', nota: 9.2, cidade: 'Manaus'   },
  { id: 2, nome: 'Bruno Lima',   curso: 'ADS',  nota: 7.8, cidade: 'Parintins' },
  { id: 3, nome: 'Carla Melo',   curso: 'TADS', nota: 8.5, cidade: 'Itacoatiara' },
  { id: 4, nome: 'Diego Farias', curso: 'SI',   nota: 6.1, cidade: 'Manaus'   },
  { id: 5, nome: 'Elena Costa',  curso: 'TADS', nota: 9.8, cidade: 'Coari'    },
];

// ── Função assíncrona que simula uma chamada de API
// (retorna uma Promise que resolve após 1.5 segundo)
const buscarAlunos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const falhar = Math.random() < 0.2; // 20% de chance de "erro de rede"
      if (falhar) {
        reject(new Error('Falha na conexão. Verifique sua internet.'));
      } else {
        resolve(DADOS_FALSOS);
      }
    }, 1500);
  });
};

// ── Versão com async/await (modo preferido)
const buscarUmAluno = async (id) => {
  // Simula latência de rede
  await new Promise(r => setTimeout(r, 800));
  const aluno = DADOS_FALSOS.find(a => a.id === id);
  if (!aluno) throw new Error(`Aluno #${id} não encontrado`);
  return aluno;
};

// ────────────────────────────────────────────────────────────

export default function App() {
  // ── Estados da lista
  const [alunos,    setAlunos]    = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro,      setErro]      = useState(null);
  const [tentativas, setTentativas] = useState(0);

  // ── Estado do detalhe individual
  const [detalhe,       setDetalhe]       = useState(null);
  const [carregandoDet, setCarregandoDet] = useState(false);
  const [erroDet,       setErroDet]       = useState(null);

  // ── useEffect → executa ao montar o componente (como "constructor")
  useEffect(() => {
    carregarAlunos();
  }, []); // [] = executa só uma vez, ao montar

  // ── Função de carregamento com try/catch/finally
  const carregarAlunos = async () => {
    setCarregando(true);
    setErro(null);
    setTentativas(prev => prev + 1);

    try {
      const dados = await buscarAlunos(); // aguarda a Promise
      setAlunos(dados);
    } catch (e) {
      setErro(e.message); // captura o erro
    } finally {
      setCarregando(false); // sempre executa (sucesso ou erro)
    }
  };

  const verDetalhe = async (id) => {
    setCarregandoDet(true);
    setErroDet(null);
    setDetalhe(null);
    try {
      const aluno = await buscarUmAluno(id);
      setDetalhe(aluno);
    } catch (e) {
      setErroDet(e.message);
    } finally {
      setCarregandoDet(false);
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>
      <Text style={s.titulo}>⚡ Passo 10 — Async/Await</Text>

      {/* ── Diagrama do fluxo */}
      <View style={s.diagrama}>
        <Text style={s.diagramaTitulo}>Fluxo de uma chamada assíncrona</Text>
        <Text style={s.diagramaTexto}>
          {`1. chamar função async\n2. estado: carregando = true\n3. await resolve/reject\n4a. sucesso → setDados(resultado)\n4b. erro   → setErro(mensagem)\n5. finally → carregando = false`}
        </Text>
      </View>

      {/* ── Lista de alunos */}
      <Secao titulo="Lista de Alunos (simula API)" />
      <View style={s.statusBar}>
        <Text style={s.statusTexto}>Tentativas: {tentativas}</Text>
        <TouchableOpacity style={s.btnRecarregar} onPress={carregarAlunos} disabled={carregando}>
          <Text style={s.btnRecarregarTexto}>{carregando ? '⏳' : '🔄'} Recarregar</Text>
        </TouchableOpacity>
      </View>

      {/* Estado: carregando */}
      {carregando && (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#38bdf8" />
          <Text style={s.loadingTexto}>Buscando dados...</Text>
        </View>
      )}

      {/* Estado: erro */}
      {erro && (
        <View style={s.erroBox}>
          <Text style={s.erroTitulo}>❌ Erro de rede</Text>
          <Text style={s.erroTexto}>{erro}</Text>
          <TouchableOpacity style={s.btnTentarNovamente} onPress={carregarAlunos}>
            <Text style={s.btnTentarTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Estado: sucesso — lista de alunos */}
      {!carregando && !erro && alunos.map(aluno => (
        <TouchableOpacity
          key={aluno.id}
          style={s.alunoCard}
          onPress={() => verDetalhe(aluno.id)}
          activeOpacity={0.75}
        >
          <View style={{ flex: 1 }}>
            <Text style={s.alunoNome}>{aluno.nome}</Text>
            <Text style={s.alunoSub}>{aluno.curso} · {aluno.cidade}</Text>
          </View>
          <View style={[s.notaBadge, { backgroundColor: aluno.nota >= 7 ? '#052e16' : '#450a0a' }]}>
            <Text style={[s.notaTexto, { color: aluno.nota >= 7 ? '#4ade80' : '#f87171' }]}>
              {aluno.nota.toFixed(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* ── Painel de detalhe */}
      <Secao titulo="Detalhe do Aluno (async individual)" />
      <Text style={s.desc}>Toque em um aluno acima para buscar o detalhe individualmente.</Text>

      {carregandoDet && (
        <View style={s.loading}>
          <ActivityIndicator size="small" color="#f59e0b" />
          <Text style={[s.loadingTexto, { color: '#f59e0b' }]}>Buscando aluno...</Text>
        </View>
      )}
      {erroDet && <Text style={s.erroTexto}>{erroDet}</Text>}
      {detalhe && (
        <View style={s.detalheBox}>
          <Text style={s.detalheTitulo}>{detalhe.nome}</Text>
          {Object.entries(detalhe).map(([k, v]) => (
            <View key={k} style={s.detalheRow}>
              <Text style={s.detalheKey}>{k}</Text>
              <Text style={s.detalheVal}>{String(v)}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ── Código de referência */}
      <View style={s.codeBox}>
        <Text style={s.codeTitulo}>📌 Estrutura padrão</Text>
        <Text style={s.code}>{`const buscar = async () => {\n  setCarregando(true);\n  try {\n    const dados = await minhaApi();\n    setDados(dados);\n  } catch (e) {\n    setErro(e.message);\n  } finally {\n    setCarregando(false);\n  }\n};\n\nuseEffect(() => { buscar(); }, []);`}</Text>
      </View>

    </ScrollView>
  );
}

const Secao = ({ titulo }) => <Text style={s.secao}>{titulo}</Text>;

const s = StyleSheet.create({
  container:         { flex: 1, backgroundColor: '#0f172a' },
  inner:             { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo:            { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  secao:             { color: '#f59e0b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  desc:              { color: '#64748b', fontSize: 12, marginBottom: 10 },
  diagrama:          { backgroundColor: '#020617', borderRadius: 10, padding: 14, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#a78bfa' },
  diagramaTitulo:    { color: '#a78bfa', fontWeight: 'bold', marginBottom: 8, fontSize: 12 },
  diagramaTexto:     { color: '#7dd3fc', fontFamily: 'monospace', fontSize: 11, lineHeight: 20 },
  statusBar:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTexto:       { color: '#64748b', fontSize: 12 },
  btnRecarregar:     { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnRecarregarTexto:{ color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  loading:           { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 20, justifyContent: 'center' },
  loadingTexto:      { color: '#38bdf8', fontSize: 14 },
  erroBox:           { backgroundColor: '#450a0a', borderRadius: 10, padding: 14, marginBottom: 8 },
  erroTitulo:        { color: '#f87171', fontWeight: 'bold', marginBottom: 4 },
  erroTexto:         { color: '#fca5a5', fontSize: 12, marginBottom: 10 },
  btnTentarNovamente:{ backgroundColor: '#f87171', borderRadius: 8, padding: 10, alignItems: 'center' },
  btnTentarTexto:    { color: '#fff', fontWeight: 'bold' },
  alunoCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b',
    borderRadius: 10, padding: 12, marginBottom: 6,
  },
  alunoNome:         { color: '#f8fafc', fontSize: 14, fontWeight: 'bold' },
  alunoSub:          { color: '#64748b', fontSize: 12, marginTop: 2 },
  notaBadge:         { borderRadius: 8, padding: 8, minWidth: 48, alignItems: 'center' },
  notaTexto:         { fontWeight: 'bold', fontSize: 15 },
  detalheBox:        { backgroundColor: '#1e293b', borderRadius: 10, padding: 14 },
  detalheTitulo:     { color: '#38bdf8', fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  detalheRow:        { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  detalheKey:        { color: '#64748b', fontSize: 12, fontFamily: 'monospace' },
  detalheVal:        { color: '#e2e8f0', fontSize: 12 },
  codeBox:           { backgroundColor: '#020617', borderRadius: 10, padding: 14, marginTop: 20 },
  codeTitulo:        { color: '#f59e0b', fontWeight: 'bold', marginBottom: 8, fontSize: 12 },
  code:              { color: '#7dd3fc', fontFamily: 'monospace', fontSize: 11, lineHeight: 20 },
});
