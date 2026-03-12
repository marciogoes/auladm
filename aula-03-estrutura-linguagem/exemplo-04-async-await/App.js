// ============================================================
// AULA 03 - Exemplo 04: Programação Assíncrona com Async/Await
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Demonstrar o fluxo síncrono vs assíncrono,
//           Promises, async/await e consumo de API real
//           com tratamento de erros (try/catch/finally).
// SLIDES RELACIONADOS: Módulo 04 — Programação Assíncrona
//
// API usada: https://jsonplaceholder.typicode.com (gratuita, sem auth)
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StyleSheet
} from 'react-native';

// ── CONSTANTES ────────────────────────────────────────────────
// URL base da API de exemplo — retorna dados fictícios para prática
const API_BASE = 'https://jsonplaceholder.typicode.com';

// ── FUNÇÕES ASSÍNCRONAS ───────────────────────────────────────

/**
 * Busca um usuário pelo ID.
 * async/await: a função "pausa" no await e retorna ao fluxo principal
 * quando a Promise se resolver.
 *
 * @param {number} id - ID do usuário (1 a 10)
 * @returns {Promise<Object>} dados do usuário
 * @throws {Error} se a resposta HTTP não for OK
 */
const buscarUsuario = async (id) => {
  // fetch() retorna uma Promise — precisamos de await para aguardar
  const resposta = await fetch(`${API_BASE}/users/${id}`);

  // ⚠️  fetch NÃO lança erro em status 404/500 — precisamos checar manualmente!
  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
  }

  // .json() também é assíncrono — converte o texto JSON em objeto JavaScript
  const dados = await resposta.json();
  return dados;
};

/**
 * Busca posts de um usuário específico.
 * Demonstra encadeamento de chamadas assíncronas.
 */
const buscarPostsDoUsuario = async (userId) => {
  const resposta = await fetch(`${API_BASE}/posts?userId=${userId}&_limit=3`);
  if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
  return resposta.json();
};

/**
 * Simula um delay — como uma operação lenta (banco de dados, GPS, etc.)
 * Promise.resolve() + setTimeout simulam código assíncrono real
 */
const simularOperacaoLenta = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  // Estado do usuário buscado
  const [usuario, setUsuario]     = useState(null);
  const [posts, setPosts]         = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro]           = useState(null);
  const [userId, setUserId]       = useState(1);

  // Estado da demo de timing
  const [timingLog, setTimingLog]   = useState([]);
  const [timingAtivo, setTimingAtivo] = useState(false);

  // ── BUSCA COM ASYNC/AWAIT + try/catch/finally ───────────────
  const buscarDados = useCallback(async () => {
    // Resetar estado antes da nova busca
    setCarregando(true);
    setErro(null);
    setUsuario(null);
    setPosts([]);

    try {
      // Passo 1: buscar usuário
      const user = await buscarUsuario(userId);
      setUsuario(user);

      // Passo 2: buscar posts (só roda se o passo 1 funcionou)
      const userPosts = await buscarPostsDoUsuario(userId);
      setPosts(userPosts);

    } catch (e) {
      // Qualquer erro nos dois awaits cai aqui
      setErro(`❌ Falha: ${e.message}`);
    } finally {
      // SEMPRE executado — erro ou não
      setCarregando(false);
    }
  }, [userId]);

  // ── DEMO VISUAL DE TIMING ASSÍNCRONO ───────────────────────
  const demonstrarTiming = async () => {
    setTimingAtivo(true);
    setTimingLog([]);

    const log = (msg) =>
      setTimingLog((prev) => [...prev, `${new Date().toLocaleTimeString('pt-BR', { hour12: false })} ${msg}`]);

    log('🚀 App iniciado — UI responsiva!');
    log('📡 Buscando dados em segundo plano...');

    // await "pausa" esta função, mas NÃO bloqueia a UI
    await simularOperacaoLenta(1000);
    log('✅ Dados do servidor chegaram!');

    await simularOperacaoLenta(500);
    log('🗄️ Salvando no banco de dados local...');

    await simularOperacaoLenta(700);
    log('🎉 Tudo pronto! Exibindo resultado.');

    setTimingAtivo(false);
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Async / Await</Text>
        <Text style={styles.subtitulo}>
          Chamadas de API com jsonplaceholder.typicode.com
        </Text>
      </View>

      {/* Seletor de usuário */}
      <Text style={styles.secaoTitulo}>🔢 Escolha o ID do Usuário (1–10)</Text>
      <View style={styles.seletorContainer}>
        {[1, 2, 3, 4, 5].map((id) => (
          <TouchableOpacity
            key={id}
            style={[styles.idBtn, userId === id && styles.idBtnAtivo]}
            onPress={() => setUserId(id)}
          >
            <Text style={[styles.idBtnTexto, userId === id && styles.idBtnTextoAtivo]}>
              {id}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de busca */}
      <TouchableOpacity
        style={[styles.botaoBuscar, carregando && styles.botaoBuscarDesabilitado]}
        onPress={buscarDados}
        disabled={carregando}
        activeOpacity={0.8}
      >
        {carregando
          ? <ActivityIndicator color="#FFFFFF" />
          : <Text style={styles.botaoBuscarTexto}>📡 Buscar Usuário #{userId}</Text>
        }
      </TouchableOpacity>

      {/* Erro */}
      {erro && (
        <View style={styles.erroBox}>
          <Text style={styles.erroTexto}>{erro}</Text>
          <Text style={styles.erroSubTexto}>
            Verifique sua conexão com a internet e tente novamente.
          </Text>
        </View>
      )}

      {/* Resultado: Usuário */}
      {usuario && (
        <View style={styles.resultadoCard}>
          <Text style={styles.resultadoTitulo}>👤 Usuário Encontrado</Text>

          {/* Destructuring do objeto usuario */}
          {(() => {
            const { name, username, email, phone, website, address, company } = usuario;
            return (
              <>
                <View style={styles.campoRow}>
                  <Text style={styles.campoLabel}>Nome</Text>
                  <Text style={styles.campoValor}>{name}</Text>
                </View>
                <View style={styles.campoRow}>
                  <Text style={styles.campoLabel}>Login</Text>
                  <Text style={styles.campoValor}>@{username}</Text>
                </View>
                <View style={styles.campoRow}>
                  <Text style={styles.campoLabel}>Email</Text>
                  <Text style={styles.campoValor}>{email}</Text>
                </View>
                <View style={styles.campoRow}>
                  <Text style={styles.campoLabel}>Cidade</Text>
                  {/* Optional chaining — caso address seja undefined */}
                  <Text style={styles.campoValor}>{address?.city ?? 'N/A'}</Text>
                </View>
                <View style={styles.campoRow}>
                  <Text style={styles.campoLabel}>Empresa</Text>
                  {/* Optional chaining encadeado */}
                  <Text style={styles.campoValor}>{company?.name ?? 'N/A'}</Text>
                </View>
              </>
            );
          })()}

          {/* Posts do usuário */}
          {posts.length > 0 && (
            <>
              <Text style={[styles.resultadoTitulo, { marginTop: 16 }]}>
                📝 Posts Recentes ({posts.length})
              </Text>
              {posts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                  <Text style={styles.postTitulo}>{post.title}</Text>
                  <Text style={styles.postBody} numberOfLines={2}>{post.body}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      )}

      {/* Demo visual de timing */}
      <Text style={styles.secaoTitulo}>⏱️ Demo: Timing Assíncrono</Text>
      <Text style={styles.descricaoTexto}>
        Veja como o await "pausa" a função sem travar a UI. Você pode rolar a tela enquanto espera!
      </Text>

      <TouchableOpacity
        style={[styles.botaoDemo, timingAtivo && styles.botaoBuscarDesabilitado]}
        onPress={demonstrarTiming}
        disabled={timingAtivo}
        activeOpacity={0.8}
      >
        {timingAtivo
          ? <><ActivityIndicator color="#FFFFFF" size="small" /><Text style={styles.botaoDemoTexto}>  Executando...</Text></>
          : <Text style={styles.botaoDemoTexto}>▶ Executar Demo</Text>
        }
      </TouchableOpacity>

      {timingLog.length > 0 && (
        <View style={styles.logBox}>
          {timingLog.map((linha, i) => (
            <Text key={i} style={styles.logLinha}>{linha}</Text>
          ))}
          {timingAtivo && (
            <View style={styles.logLinhaAtiva}>
              <ActivityIndicator color="#00B4D8" size="small" />
              <Text style={styles.logLinhaAtivaTexto}> aguardando...</Text>
            </View>
          )}
        </View>
      )}

      {/* Resumo do padrão */}
      <Text style={styles.secaoTitulo}>📋 Padrão Async/Await</Text>
      <View style={styles.codigoBox}>
        <Text style={styles.codigo}>
          {'const buscarDados = async () => {\n  setCarregando(true);\n  setErro(null);\n\n  try {\n    const resp = await fetch(url);\n    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);\n    const dados = await resp.json();\n    setDados(dados);\n\n  } catch (e) {\n    setErro(e.message);   // exibe para o usuário\n    console.error(e);     // log para o dev\n\n  } finally {\n    setCarregando(false); // SEMPRE executado\n  }\n};'}
        </Text>
      </View>

      <View style={styles.dicaBox}>
        <Text style={styles.dicaTexto}>
          💡  Na Aula 08 (Integração com APIs) usaremos este padrão com axios e dados reais de APIs públicas!
        </Text>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Próximo: Exemplo 05 — TypeScript Básico</Text>
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
    marginBottom: 16, borderLeftWidth: 5, borderLeftColor: '#27AE60',
  },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subtitulo: { fontSize: 11, color: '#27AE60', fontFamily: 'monospace' },

  secaoTitulo: {
    fontSize: 15, fontWeight: 'bold', color: '#FFFFFF',
    marginTop: 20, marginBottom: 8,
  },
  descricaoTexto: { fontSize: 12, color: '#8899AA', marginBottom: 10, lineHeight: 18 },

  seletorContainer: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  idBtn: {
    flex: 1, backgroundColor: '#1A2E45', borderRadius: 8,
    padding: 12, alignItems: 'center',
  },
  idBtnAtivo: { backgroundColor: '#00B4D8' },
  idBtnTexto: { fontSize: 18, fontWeight: 'bold', color: '#8899AA' },
  idBtnTextoAtivo: { color: '#FFFFFF' },

  botaoBuscar: {
    backgroundColor: '#00B4D8', borderRadius: 10,
    padding: 14, alignItems: 'center', marginBottom: 14,
  },
  botaoBuscarDesabilitado: { opacity: 0.5 },
  botaoBuscarTexto: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' },

  erroBox: {
    backgroundColor: '#2D1B1B', borderRadius: 8, padding: 14,
    borderWidth: 1, borderColor: '#E74C3C', marginBottom: 14,
  },
  erroTexto: { fontSize: 14, color: '#E74C3C', fontWeight: 'bold', marginBottom: 4 },
  erroSubTexto: { fontSize: 12, color: '#997788' },

  resultadoCard: {
    backgroundColor: '#1A2E45', borderRadius: 10,
    padding: 16, marginBottom: 14,
  },
  resultadoTitulo: {
    fontSize: 14, fontWeight: 'bold', color: '#00B4D8', marginBottom: 12,
  },
  campoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#243B55',
  },
  campoLabel: { fontSize: 12, color: '#8899AA', width: 70 },
  campoValor: { fontSize: 12, color: '#FFFFFF', flex: 1, textAlign: 'right' },

  postCard: {
    backgroundColor: '#243B55', borderRadius: 8, padding: 10, marginBottom: 6,
  },
  postTitulo: { fontSize: 12, fontWeight: 'bold', color: '#FFD166', marginBottom: 4 },
  postBody: { fontSize: 11, color: '#8899AA', lineHeight: 16 },

  botaoDemo: {
    backgroundColor: '#FF6B35', borderRadius: 10,
    padding: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  botaoDemoTexto: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },

  logBox: {
    backgroundColor: '#0A1825', borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: '#243B55', marginBottom: 14,
  },
  logLinha: { fontFamily: 'monospace', fontSize: 12, color: '#7EC8A4', marginBottom: 4 },
  logLinhaAtiva: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  logLinhaAtivaTexto: { fontFamily: 'monospace', fontSize: 12, color: '#00B4D8' },

  codigoBox: {
    backgroundColor: '#0A1825', borderRadius: 6, padding: 12,
    borderWidth: 1, borderColor: '#243B55',
  },
  codigo: { fontFamily: 'monospace', fontSize: 11, color: '#7EC8A4', lineHeight: 19 },

  dicaBox: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: '#27AE60', marginTop: 12,
  },
  dicaTexto: { fontSize: 12, color: '#27AE60', lineHeight: 18 },

  rodape: {
    marginTop: 24, alignItems: 'center',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#243B55',
  },
  rodapeTexto: { fontSize: 12, color: '#8899AA' },
});
