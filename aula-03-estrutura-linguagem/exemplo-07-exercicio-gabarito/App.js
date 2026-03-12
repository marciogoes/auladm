// ============================================================
// AULA 03 - Exemplo 07: Exercício Completo — GABARITO
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Gabarito comentado do exercício da aula.
//           Integra todos os conceitos da Aula 03:
//           const/let, arrow functions, destructuring, .map(),
//           .filter(), .reduce(), async/await, TypeScript e JSX.
//
// ENUNCIADO:
//   Crie um app "Diário de Turma" que exibe uma lista de alunos,
//   permite filtrar por status, calcular estatísticas e buscar
//   dados de uma API externa para enriquecer os perfis.
//
// SLIDES RELACIONADOS: Módulo 07 — Exercícios Práticos
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, StyleSheet, Alert
} from 'react-native';

// ── 1. CONSTANTES E DADOS INICIAIS ───────────────────────────
// const para dados que não mudam — padrão ES6+
const TURMA = 'TADS 2026.1';
const MEDIA_APROVACAO = 6.0;
const MEDIA_RECUPERACAO = 4.0;
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// ── 2. INTERFACE TYPESCRIPT ───────────────────────────────────
// TypeScript: interface define o "contrato" do objeto Aluno
// (No snack.expo.dev em modo .js, isso funciona como comentário JSDoc)

/**
 * @typedef {Object} Aluno
 * @property {number} id
 * @property {string} nome
 * @property {string} email
 * @property {number[]} notas
 * @property {boolean} ativo
 * @property {string} [cidade] - opcional, vem da API
 */

// Dados iniciais da turma
const alunosIniciais = [
  { id: 1, nome: 'Ana Souza',      email: 'ana@tads.edu',    notas: [9.5, 8.0, 9.0, 8.5], ativo: true  },
  { id: 2, nome: 'Bruno Lima',     email: 'bruno@tads.edu',  notas: [6.0, 7.5, 5.5, 6.5], ativo: true  },
  { id: 3, nome: 'Carla Mendes',   email: 'carla@tads.edu',  notas: [8.5, 9.0, 8.0, 9.5], ativo: true  },
  { id: 4, nome: 'Diego Rocha',    email: 'diego@tads.edu',  notas: [3.5, 4.0, 5.0, 4.5], ativo: true  },
  { id: 5, nome: 'Eva Castro',     email: 'eva@tads.edu',    notas: [7.0, 7.5, 8.0, 7.0], ativo: false },
  { id: 6, nome: 'Felipe Neto',    email: 'felipe@tads.edu', notas: [5.0, 4.5, 5.5, 6.0], ativo: true  },
];

// ── 3. FUNÇÕES PURAS (ARROW FUNCTIONS) ───────────────────────

// Calcula média de um array de notas usando .reduce()
const calcularMedia = (notas) =>
  notas.reduce((soma, nota) => soma + nota, 0) / notas.length;

// Retorna status e cor baseado na média
const obterStatus = (media) => {
  if (media >= MEDIA_APROVACAO)    return { texto: 'Aprovado',    emoji: '✅', cor: '#27AE60' };
  if (media >= MEDIA_RECUPERACAO)  return { texto: 'Recuperação', emoji: '⚠️', cor: '#F39C12' };
  return                                  { texto: 'Reprovado',   emoji: '❌', cor: '#E74C3C' };
};

// Formata número com 1 casa decimal
const fmt = (n) => n.toFixed(1);

// ── 4. ENRIQUECIMENTO COM .map() ──────────────────────────────
// .map() retorna um novo array — nunca muta o original
const alunosComMedia = alunosIniciais.map((aluno) => ({
  ...aluno,                              // spread: copia todas as propriedades
  media: calcularMedia(aluno.notas),     // adiciona campo calculado
}));

// ── 5. SUBCOMPONENTE: CARTÃO DO ALUNO ─────────────────────────
const CartaoAluno = ({ aluno, cidadeExtra, onVerDetalhes }) => {
  // Destructuring das props — extrai campos diretamente
  const { nome, email, notas, media, ativo } = aluno;
  const status = obterStatus(media);

  return (
    <TouchableOpacity
      style={[styles.cartao, !ativo && styles.cartaoInativo]}
      onPress={() => onVerDetalhes(aluno)}
      activeOpacity={0.8}
    >
      {/* Header do cartão */}
      <View style={styles.cartaoHeader}>
        <View style={styles.avatarCircle}>
          {/* Expressão JSX: pega a inicial do nome */}
          <Text style={styles.avatarLetra}>{nome.charAt(0)}</Text>
        </View>
        <View style={styles.cartaoInfo}>
          <Text style={styles.cartaoNome}>{nome}</Text>
          <Text style={styles.cartaoEmail}>{email}</Text>
        </View>
        {/* Condicional JSX: badge de inativo */}
        {!ativo && (
          <View style={styles.inativoBadge}>
            <Text style={styles.inativoTexto}>Inativo</Text>
          </View>
        )}
      </View>

      {/* Notas e média */}
      <View style={styles.cartaoRodape}>
        <Text style={styles.notasTexto}>
          {/* Template string + .join() */}
          {notas.join(' · ')}
        </Text>
        <View style={[styles.mediaBadge, { backgroundColor: status.cor }]}>
          <Text style={styles.mediaTexto}>
            {status.emoji} {fmt(media)}
          </Text>
        </View>
      </View>

      {/* Optional chaining: cidadeExtra pode ser undefined */}
      {cidadeExtra && (
        <Text style={styles.cidadeTexto}>📍 {cidadeExtra}</Text>
      )}
    </TouchableOpacity>
  );
};

// ── 6. COMPONENTE PRINCIPAL ───────────────────────────────────
export default function App() {
  // Estado da lista com os alunos enriquecidos
  const [alunos, setAlunos] = useState(alunosComMedia);

  // Estado dos filtros
  const [filtro, setFiltro]       = useState('todos'); // 'todos'|'ativos'|'aprovados'|'recuperacao'
  const [busca, setBusca]         = useState('');

  // Estado da API
  const [cidadesAPI, setCidadesAPI] = useState({});      // { userId: city }
  const [carregandoAPI, setCarregandoAPI] = useState(false);

  // Estado do modal de detalhe
  const [alunoDetalhe, setAlunoDetalhe] = useState(null);

  // ── 7. ASYNC/AWAIT — BUSCA DE DADOS NA API ─────────────────
  // useCallback evita recriar a função a cada render
  const buscarCidadesAPI = useCallback(async () => {
    setCarregandoAPI(true);
    try {
      // await pausa esta função sem bloquear a UI
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

      const usuarios = await resposta.json();

      // .reduce() para criar um mapa id → cidade
      const mapa = usuarios.reduce((acc, user, index) => ({
        ...acc,
        [index + 1]: user.address?.city ?? 'Cidade desconhecida',
      }), {});

      setCidadesAPI(mapa);
    } catch (erro) {
      Alert.alert('Erro', `Não foi possível carregar cidades:\n${erro.message}`);
    } finally {
      // always executes — erro ou não
      setCarregandoAPI(false);
    }
  }, []);

  // useEffect executa buscarCidadesAPI uma vez ao montar o componente
  useEffect(() => {
    buscarCidadesAPI();
  }, [buscarCidadesAPI]);

  // ── 8. FILTRAGEM COM .filter() ──────────────────────────────
  // Encadeamento de .filter() — cada um reduz o array
  const alunosFiltrados = alunos
    .filter((a) => {
      if (filtro === 'ativos')      return a.ativo;
      if (filtro === 'aprovados')   return a.media >= MEDIA_APROVACAO;
      if (filtro === 'recuperacao') return a.media >= MEDIA_RECUPERACAO && a.media < MEDIA_APROVACAO;
      return true; // 'todos'
    })
    .filter((a) =>
      // busca por nome ou email — case-insensitive
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.email.toLowerCase().includes(busca.toLowerCase())
    );

  // ── 9. ESTATÍSTICAS COM .reduce() ───────────────────────────
  const stats = alunosFiltrados.reduce(
    (acc, a) => ({
      total:     acc.total + 1,
      aprovados: acc.aprovados + (a.media >= MEDIA_APROVACAO ? 1 : 0),
      mediaSum:  acc.mediaSum + a.media,
    }),
    { total: 0, aprovados: 0, mediaSum: 0 }
  );
  const mediaGeral = stats.total > 0 ? stats.mediaSum / stats.total : 0;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* ── CABEÇALHO ──────────────────────────────────────── */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>📚 Diário de Turma</Text>
        <Text style={styles.subtitulo}>{TURMA}</Text>
        {carregandoAPI && (
          <View style={styles.apiRow}>
            <ActivityIndicator color="#00B4D8" size="small" />
            <Text style={styles.apiTexto}> Buscando cidades da API...</Text>
          </View>
        )}
        {!carregandoAPI && Object.keys(cidadesAPI).length > 0 && (
          <Text style={styles.apiSucesso}>
            ✅ Cidades carregadas via async/await!
          </Text>
        )}
      </View>

      {/* ── ESTATÍSTICAS ───────────────────────────────────── */}
      <View style={styles.statsRow}>
        {[
          { label: 'Exibindo',   valor: alunosFiltrados.length,  cor: '#00B4D8' },
          { label: 'Aprovados',  valor: stats.aprovados,         cor: '#27AE60' },
          { label: 'Média Geral',valor: fmt(mediaGeral),         cor: '#FF6B35' },
        ].map((s) => (
          <View key={s.label} style={[styles.statCard, { borderTopColor: s.cor }]}>
            <Text style={[styles.statValor, { color: s.cor }]}>{s.valor}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* ── BUSCA ──────────────────────────────────────────── */}
      <TextInput
        style={styles.buscaInput}
        value={busca}
        onChangeText={setBusca}
        placeholder="🔍 Buscar por nome ou email..."
        placeholderTextColor="#557"
      />

      {/* ── FILTROS ────────────────────────────────────────── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
        {[
          { key: 'todos',       label: 'Todos' },
          { key: 'ativos',      label: '🟢 Ativos' },
          { key: 'aprovados',   label: '✅ Aprovados' },
          { key: 'recuperacao', label: '⚠️ Recuperação' },
        ].map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filtroBtn, filtro === f.key && styles.filtroBtnAtivo]}
            onPress={() => setFiltro(f.key)}
          >
            <Text style={[styles.filtroBtnTexto, filtro === f.key && styles.filtroBtnTextoAtivo]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── LISTA DE ALUNOS ────────────────────────────────── */}
      {/* Renderização condicional: lista vazia */}
      {alunosFiltrados.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>😔 Nenhum aluno encontrado</Text>
          <Text style={styles.vazioSubTexto}>Tente mudar o filtro ou a busca</Text>
        </View>
      ) : (
        // .map() com destructuring inline e key obrigatória
        alunosFiltrados.map((aluno) => (
          <CartaoAluno
            key={aluno.id}                     // ⚠️ key ÚNICA e ESTÁVEL
            aluno={aluno}
            cidadeExtra={cidadesAPI[aluno.id]} // optional — pode ser undefined
            onVerDetalhes={setAlunoDetalhe}
          />
        ))
      )}

      {/* ── MODAL DE DETALHE (condicional) ─────────────────── */}
      {alunoDetalhe && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Destructuring do alunoDetalhe */}
            {(() => {
              const { nome, email, notas, media, id } = alunoDetalhe;
              const status = obterStatus(media);
              const melhorNota = Math.max(...notas);
              const piorNota   = Math.min(...notas);
              const tendencia  = notas[notas.length - 1] >= notas[0] ? '📈 Melhorando' : '📉 Queda';

              return (
                <>
                  <Text style={styles.modalTitulo}>{nome}</Text>
                  <Text style={styles.modalEmail}>{email}</Text>
                  {cidadesAPI[id] && (
                    <Text style={styles.modalCidade}>📍 {cidadesAPI[id]}</Text>
                  )}

                  <View style={[styles.modalStatusCard, { borderColor: status.cor }]}>
                    <Text style={[styles.modalStatus, { color: status.cor }]}>
                      {status.emoji} {status.texto} — Média: {fmt(media)}
                    </Text>
                  </View>

                  <View style={styles.modalStats}>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Melhor</Text>
                      <Text style={[styles.modalStatValor, { color: '#27AE60' }]}>{melhorNota}</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Pior</Text>
                      <Text style={[styles.modalStatValor, { color: '#E74C3C' }]}>{piorNota}</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Tendência</Text>
                      <Text style={styles.modalStatValor}>{tendencia}</Text>
                    </View>
                  </View>

                  <Text style={styles.modalNotasLabel}>Notas individuais:</Text>
                  <View style={styles.modalNotasRow}>
                    {notas.map((nota, i) => (
                      <View key={i} style={[styles.notaBolinha, { backgroundColor: obterStatus(nota).cor }]}>
                        <Text style={styles.notaBolinhaTexto}>{nota}</Text>
                      </View>
                    ))}
                  </View>
                </>
              );
            })()}

            <TouchableOpacity style={styles.modalFecharBtn} onPress={() => setAlunoDetalhe(null)}>
              <Text style={styles.modalFecharTexto}>✕ Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── RODAPÉ COM CONCEITOS USADOS ────────────────────── */}
      <View style={styles.rodapeConceitos}>
        <Text style={styles.rodapeTitulo}>✅ Conceitos da Aula 03 aplicados:</Text>
        {[
          'const/let — MEDIA_APROVACAO, alunosIniciais, etc.',
          '.map() — alunosComMedia, lista de cartões',
          '.filter() — filtros de status e busca',
          '.reduce() — calcularMedia, estatísticas gerais',
          'Destructuring — const { nome, email } = aluno',
          'Spread operator — { ...aluno, media: ... }',
          'Arrow functions — calcularMedia, obterStatus, fmt',
          'async/await — buscarCidadesAPI com fetch',
          'JSX condicional — ternário, &&, variável',
          'Optional chaining — cidadesAPI[id], address?.city',
        ].map((c, i) => (
          <Text key={i} style={styles.rodapeItem}>• {c}</Text>
        ))}
      </View>

    </ScrollView>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0D1B2A' },
  conteudo: { padding: 16, paddingBottom: 40 },

  cabecalho: {
    backgroundColor: '#1A2E45', borderRadius: 12, padding: 20,
    marginBottom: 14, borderLeftWidth: 5, borderLeftColor: '#00B4D8',
  },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 2 },
  subtitulo: { fontSize: 12, color: '#00B4D8', fontFamily: 'monospace', marginBottom: 6 },
  apiRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  apiTexto: { fontSize: 11, color: '#8899AA' },
  apiSucesso: { fontSize: 11, color: '#27AE60', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: {
    flex: 1, backgroundColor: '#1A2E45', borderRadius: 8,
    padding: 10, alignItems: 'center', borderTopWidth: 3,
  },
  statValor: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 10, color: '#8899AA', marginTop: 2 },

  buscaInput: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 10,
    color: '#FFFFFF', fontSize: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#243B55',
  },

  filtroBtn: {
    backgroundColor: '#1A2E45', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 7, marginRight: 6,
  },
  filtroBtnAtivo: { backgroundColor: '#00B4D8' },
  filtroBtnTexto: { fontSize: 12, color: '#8899AA' },
  filtroBtnTextoAtivo: { color: '#FFFFFF', fontWeight: 'bold' },

  cartao: {
    backgroundColor: '#1A2E45', borderRadius: 10,
    padding: 14, marginBottom: 10,
  },
  cartaoInativo: { opacity: 0.6 },
  cartaoHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  avatarCircle: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#00B4D8', alignItems: 'center', justifyContent: 'center',
  },
  avatarLetra: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  cartaoInfo: { flex: 1 },
  cartaoNome: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 2 },
  cartaoEmail: { fontSize: 11, color: '#8899AA' },
  inativoBadge: {
    backgroundColor: '#E74C3C22', borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: '#E74C3C',
  },
  inativoTexto: { fontSize: 9, color: '#E74C3C', fontWeight: 'bold' },
  cartaoRodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notasTexto: { fontSize: 12, color: '#8899AA', fontFamily: 'monospace', flex: 1 },
  mediaBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  mediaTexto: { fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' },
  cidadeTexto: { fontSize: 11, color: '#8899AA', marginTop: 6 },

  vazioContainer: { alignItems: 'center', padding: 30 },
  vazioTexto: { fontSize: 16, color: '#8899AA', marginBottom: 4 },
  vazioSubTexto: { fontSize: 12, color: '#557' },

  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000000BB', justifyContent: 'center', padding: 16,
    zIndex: 100,
  },
  modalCard: {
    backgroundColor: '#1A2E45', borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: '#00B4D8',
  },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  modalEmail: { fontSize: 12, color: '#8899AA', marginBottom: 2 },
  modalCidade: { fontSize: 12, color: '#8899AA', marginBottom: 12 },
  modalStatusCard: {
    borderRadius: 8, padding: 10, borderWidth: 1.5, marginBottom: 14,
  },
  modalStatus: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  modalStats: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  modalStat: {
    flex: 1, backgroundColor: '#243B55', borderRadius: 8,
    padding: 10, alignItems: 'center',
  },
  modalStatLabel: { fontSize: 10, color: '#8899AA', marginBottom: 4 },
  modalStatValor: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  modalNotasLabel: { fontSize: 12, color: '#8899AA', marginBottom: 8 },
  modalNotasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  notaBolinha: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
  },
  notaBolinhaTexto: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' },
  modalFecharBtn: {
    backgroundColor: '#243B55', borderRadius: 8, padding: 12, alignItems: 'center',
  },
  modalFecharTexto: { fontSize: 14, color: '#FFFFFF', fontWeight: 'bold' },

  rodapeConceitos: {
    backgroundColor: '#0F2535', borderRadius: 10, padding: 14,
    marginTop: 8, borderWidth: 1, borderColor: '#243B55',
  },
  rodapeTitulo: { fontSize: 13, fontWeight: 'bold', color: '#00B4D8', marginBottom: 8 },
  rodapeItem: { fontSize: 11, color: '#7EC8A4', lineHeight: 20, fontFamily: 'monospace' },
});
