// ============================================================
// AULA 03 - Exemplo 03: JavaScript ES6+ Moderno
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Demonstrar destructuring, spread/rest, template
//           strings, optional chaining e métodos de array
//           essenciais (map, filter, reduce) de forma prática.
// SLIDES RELACIONADOS: Módulo 03 — JavaScript Moderno (ES6+)
//
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, FlatList
} from 'react-native';

// ── DADOS DE EXEMPLO ──────────────────────────────────────────
// Uma lista de alunos — simula dados que viriam de uma API
const alunosInicial = [
  { id: 1, nome: 'Ana Souza',    curso: 'TADS', semestre: 3, notas: [9.5, 8.0, 9.0], ativo: true  },
  { id: 2, nome: 'Bruno Lima',   curso: 'TADS', semestre: 3, notas: [6.0, 7.5, 5.5], ativo: true  },
  { id: 3, nome: 'Carla Mendes', curso: 'SI',   semestre: 4, notas: [8.5, 9.0, 8.0], ativo: false },
  { id: 4, nome: 'Diego Rocha',  curso: 'TADS', semestre: 3, notas: [4.0, 5.0, 6.0], ativo: true  },
  { id: 5, nome: 'Eva Castro',   curso: 'CC',   semestre: 2, notas: [7.0, 7.5, 8.0], ativo: true  },
];

// ── DESTRUCTURING — EXTRAINDO VALORES ────────────────────────

// Destructuring de objeto — retira campos pelo nome
const { nome: nomeApp, versao = '1.0.0', autor = 'Prof. Marcio' } = {
  nome: 'ES6+ Demo',
};
// nomeApp = 'ES6+ Demo', versao = '1.0.0' (default), autor = 'Prof. Marcio' (default)

// Destructuring de array — retira valores pela posição
const [primeiroCurso, segundoCurso, ...outrosCursos] = ['TADS', 'SI', 'CC', 'EC', 'ADS'];

// ── SPREAD OPERATOR ───────────────────────────────────────────

// Copiar e mesclar objetos — NÃO modifica o original
const alunoBase   = { nome: 'Novo Aluno', ativo: true };
const alunoTADS   = { ...alunoBase, curso: 'TADS', semestre: 1 };
// alunoBase continua intacto!

// ── MÉTODOS DE ARRAY ESSENCIAIS ───────────────────────────────

// Calcula a média de notas de um aluno
const calcularMedia = (notas) =>
  notas.reduce((soma, nota) => soma + nota, 0) / notas.length;

// Retorna o status do aluno com base na média
const classificar = (media) => {
  if (media >= 7) return { label: '✅ Aprovado',     cor: '#27AE60' };
  if (media >= 5) return { label: '⚠️ Recuperação',  cor: '#F39C12' };
  return             { label: '❌ Reprovado',         cor: '#E74C3C' };
};

// Enriquece cada aluno com a média e classificação calculadas
// .map() transforma cada item do array em um novo objeto
const alunosEnriquecidos = alunosInicial.map((aluno) => ({
  ...aluno,                              // copia todas as propriedades
  media: calcularMedia(aluno.notas),     // adiciona campo 'media'
  status: classificar(calcularMedia(aluno.notas)), // adiciona campo 'status'
}));

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  const [filtro, setFiltro] = useState('todos');    // 'todos' | 'ativos' | 'aprovados'
  const [busca, setBusca]   = useState('');
  const [abaAtiva, setAbaAtiva] = useState('lista'); // 'lista' | 'metodos' | 'destr'

  // .filter() — retorna subconjunto do array que satisfaz a condição
  const alunosFiltrados = alunosEnriquecidos
    .filter((a) => {
      if (filtro === 'ativos') return a.ativo;
      if (filtro === 'aprovados') return a.media >= 7;
      return true; // 'todos'
    })
    .filter((a) =>
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );

  // .reduce() — calcula estatísticas globais em uma única passagem
  const estatisticas = alunosEnriquecidos.reduce(
    (acc, aluno) => ({
      total:     acc.total + 1,
      aprovados: acc.aprovados + (aluno.media >= 7 ? 1 : 0),
      mediaGeral: acc.mediaGeral + aluno.media,
    }),
    { total: 0, aprovados: 0, mediaGeral: 0 }
  );
  const mediaGeral = (estatisticas.mediaGeral / estatisticas.total).toFixed(1);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>{nomeApp}</Text>
        <Text style={styles.subtitulo}>
          v{versao} • {autor}
        </Text>
      </View>

      {/* Abas de navegação */}
      <View style={styles.tabs}>
        {[
          { key: 'lista',   label: '📋 Lista' },
          { key: 'metodos', label: '⚙️ Métodos' },
          { key: 'destr',   label: '📦 Destructuring' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, abaAtiva === tab.key && styles.tabAtiva]}
            onPress={() => setAbaAtiva(tab.key)}
          >
            <Text style={[styles.tabTexto, abaAtiva === tab.key && styles.tabTextoAtivo]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ABA: Lista de Alunos */}
      {abaAtiva === 'lista' && (
        <View>
          {/* Estatísticas */}
          <View style={styles.statsContainer}>
            {[
              { label: 'Total',      valor: estatisticas.total,     cor: '#00B4D8' },
              { label: 'Aprovados',  valor: estatisticas.aprovados, cor: '#27AE60' },
              { label: 'Média Geral',valor: mediaGeral,             cor: '#FF6B35' },
            ].map((s) => (
              <View key={s.label} style={[styles.statCard, { borderTopColor: s.cor }]}>
                <Text style={[styles.statValor, { color: s.cor }]}>{s.valor}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Busca */}
          <TextInput
            style={styles.buscaInput}
            value={busca}
            onChangeText={setBusca}
            placeholder="🔍 Buscar por nome..."
            placeholderTextColor="#557"
          />

          {/* Filtros */}
          <View style={styles.filtros}>
            {['todos', 'ativos', 'aprovados'].map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filtroBtn, filtro === f && styles.filtroBtnAtivo]}
                onPress={() => setFiltro(f)}
              >
                <Text style={[styles.filtroBtnTexto, filtro === f && styles.filtroBtnTextoAtivo]}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cards de alunos */}
          {alunosFiltrados.length === 0 ? (
            <Text style={styles.vazioTexto}>Nenhum aluno encontrado.</Text>
          ) : (
            alunosFiltrados.map((aluno) => (
              <View key={aluno.id} style={styles.alunoCard}>
                {/* Destructuring do aluno dentro do .map() */}
                {(() => {
                  const { nome, curso, semestre, notas, media, status, ativo } = aluno;
                  return (
                    <>
                      <View style={styles.alunoHeader}>
                        <Text style={styles.alunoNome}>{nome}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: status.cor }]}>
                          <Text style={styles.statusTexto}>{status.label}</Text>
                        </View>
                      </View>
                      <Text style={styles.alunoInfo}>
                        {curso} • {semestre}º sem • {ativo ? '🟢 Ativo' : '🔴 Inativo'}
                      </Text>
                      <Text style={styles.alunoNotas}>
                        Notas: {notas.join(' | ')} → Média:{' '}
                        <Text style={{ color: status.cor, fontWeight: 'bold' }}>
                          {media.toFixed(1)}
                        </Text>
                      </Text>
                    </>
                  );
                })()}
              </View>
            ))
          )}
        </View>
      )}

      {/* ABA: Métodos de Array */}
      {abaAtiva === 'metodos' && (
        <View>
          {[
            {
              nome: '.map()',
              cor: '#00B4D8',
              descricao: 'Transforma cada item — retorna um novo array de mesmo tamanho',
              codigo: 'alunosInicial.map(a => ({\n  ...a,\n  media: calcularMedia(a.notas)\n}))',
              resultado: `${alunosEnriquecidos.length} alunos enriquecidos com média`,
            },
            {
              nome: '.filter()',
              cor: '#FF6B35',
              descricao: 'Filtra por condição — retorna novo array menor (ou igual)',
              codigo: 'alunosEnriquecidos.filter(\n  a => a.media >= 7\n)',
              resultado: `${alunosEnriquecidos.filter(a => a.media >= 7).length} alunos aprovados`,
            },
            {
              nome: '.reduce()',
              cor: '#27AE60',
              descricao: 'Acumula valores — retorna um único resultado',
              codigo: 'alunos.reduce(\n  (acc, a) => acc + a.media, 0\n) / alunos.length',
              resultado: `Média geral: ${mediaGeral}`,
            },
            {
              nome: '.find()',
              cor: '#F39C12',
              descricao: 'Retorna o 1º item que satisfaz a condição (ou undefined)',
              codigo: 'alunos.find(a => a.id === 1)',
              resultado: `Encontrado: ${alunosInicial.find(a => a.id === 1)?.nome}`,
            },
            {
              nome: '.some() / .every()',
              cor: '#9B59B6',
              descricao: 'some: algum satisfaz? | every: todos satisfazem?',
              codigo: 'alunos.some(a => a.media >= 9)\nalunos.every(a => a.ativo)',
              resultado: `Algum nota ≥9: ${alunosEnriquecidos.some(a => a.media >= 9)} | Todos ativos: ${alunosEnriquecidos.every(a => a.ativo)}`,
            },
          ].map((m) => (
            <View key={m.nome} style={[styles.metodoCard, { borderLeftColor: m.cor }]}>
              <Text style={[styles.metodoNome, { color: m.cor }]}>{m.nome}</Text>
              <Text style={styles.metodoDescricao}>{m.descricao}</Text>
              <View style={styles.codigoBox}>
                <Text style={styles.codigo}>{m.codigo}</Text>
              </View>
              <Text style={styles.metodoResultado}>▶ {m.resultado}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ABA: Destructuring e Spread */}
      {abaAtiva === 'destr' && (
        <View>

          <View style={styles.metodoCard}>
            <Text style={[styles.metodoNome, { color: '#00B4D8' }]}>Destructuring de Objeto</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>
                {"const { nome, curso, semestre } = aluno;\n// Extrai 3 campos em 3 variáveis\n\n// Com renomeação e default:\nconst { nome: n, turma = 'A' } = aluno;\n// n = aluno.nome, turma = 'A' (default)"}
              </Text>
            </View>
            <Text style={styles.metodoResultado}>
              ▶ Primeiro curso: "{primeiroCurso}", Segundo: "{segundoCurso}"
            </Text>
          </View>

          <View style={styles.metodoCard}>
            <Text style={[styles.metodoNome, { color: '#FF6B35' }]}>Destructuring de Array</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>
                {"const [primeiro, segundo, ...resto] =\n  ['TADS','SI','CC','EC','ADS'];\n\n// primeiro = 'TADS'\n// segundo  = 'SI'\n// resto    = ['CC','EC','ADS']"}
              </Text>
            </View>
            <Text style={styles.metodoResultado}>
              ▶ Outros cursos: {outrosCursos.join(', ')}
            </Text>
          </View>

          <View style={styles.metodoCard}>
            <Text style={[styles.metodoNome, { color: '#27AE60' }]}>Spread Operator</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>
                {"const base = { nome: 'Novo', ativo: true };\nconst tads = { ...base, curso: 'TADS' };\n// tads = { nome:'Novo', ativo:true, curso:'TADS' }\n// base não foi modificado!"}
              </Text>
            </View>
            <Text style={styles.metodoResultado}>
              ▶ alunoTADS.curso = "{alunoTADS.curso}", base ainda tem: {Object.keys(alunoBase).join(', ')}
            </Text>
          </View>

          <View style={styles.metodoCard}>
            <Text style={[styles.metodoNome, { color: '#F39C12' }]}>Optional Chaining (?.)</Text>
            <View style={styles.codigoBox}>
              <Text style={styles.codigo}>
                {"// Sem optional chaining (pode lançar erro):\n// const cidade = aluno.endereco.cidade; ← TypeError!\n\n// Com optional chaining (seguro):\nconst cidade = aluno?.endereco?.cidade;\n// undefined em vez de erro\n\n// Combinado com nullish coalescing (??):\nconst cep = aluno?.endereco?.cep ?? '00000-000';"}
              </Text>
            </View>
            <Text style={styles.metodoResultado}>
              ▶ Evita crashes ao acessar propriedades aninhadas opcionais
            </Text>
          </View>

        </View>
      )}

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Próximo: Exemplo 04 — Async/Await</Text>
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
  subtitulo: { fontSize: 12, color: '#27AE60', fontFamily: 'monospace' },

  tabs: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  tab: {
    flex: 1, backgroundColor: '#1A2E45', borderRadius: 8,
    padding: 10, alignItems: 'center',
  },
  tabAtiva: { backgroundColor: '#243B55', borderBottomWidth: 2, borderBottomColor: '#00B4D8' },
  tabTexto: { fontSize: 11, color: '#8899AA', fontWeight: '600' },
  tabTextoAtivo: { color: '#FFFFFF' },

  statsContainer: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  statCard: {
    flex: 1, backgroundColor: '#1A2E45', borderRadius: 8,
    padding: 12, alignItems: 'center', borderTopWidth: 3,
  },
  statValor: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 11, color: '#8899AA', marginTop: 2 },

  buscaInput: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 10,
    color: '#FFFFFF', fontSize: 14, marginBottom: 8,
    borderWidth: 1, borderColor: '#243B55',
  },
  filtros: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filtroBtn: { flex: 1, backgroundColor: '#1A2E45', borderRadius: 20, padding: 8, alignItems: 'center' },
  filtroBtnAtivo: { backgroundColor: '#00B4D8' },
  filtroBtnTexto: { fontSize: 12, color: '#8899AA' },
  filtroBtnTextoAtivo: { color: '#FFFFFF', fontWeight: 'bold' },

  vazioTexto: { textAlign: 'center', color: '#8899AA', marginTop: 20, fontSize: 14 },

  alunoCard: {
    backgroundColor: '#1A2E45', borderRadius: 10,
    padding: 14, marginBottom: 8,
  },
  alunoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  alunoNome: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  statusBadge: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 },
  statusTexto: { fontSize: 11, color: '#FFFFFF', fontWeight: 'bold' },
  alunoInfo: { fontSize: 12, color: '#8899AA', marginBottom: 4 },
  alunoNotas: { fontSize: 12, color: '#CCDDEE', fontFamily: 'monospace' },

  metodoCard: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 14,
    marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#243B55',
  },
  metodoNome: { fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 4 },
  metodoDescricao: { fontSize: 12, color: '#8899AA', marginBottom: 8, lineHeight: 18 },
  metodoResultado: { fontSize: 12, color: '#FFD166', marginTop: 8, fontFamily: 'monospace' },

  codigoBox: {
    backgroundColor: '#0A1825', borderRadius: 6, padding: 10,
    borderWidth: 1, borderColor: '#243B55',
  },
  codigo: { fontFamily: 'monospace', fontSize: 11.5, color: '#7EC8A4', lineHeight: 20 },

  rodape: {
    marginTop: 24, alignItems: 'center',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#243B55',
  },
  rodapeTexto: { fontSize: 12, color: '#8899AA' },
});
