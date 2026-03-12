// ============================================================
// AULA 03 - Exemplo 06: JSX Avançado — Listas e Renderização
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Demonstrar expressões JSX, renderização condicional
//           (ternário, &&), listas com .map() e FlatList,
//           e regras fundamentais do JSX.
// SLIDES RELACIONADOS: Módulo 06 — JSX e Componentes
//
// Como testar: cole este código em snack.expo.dev
// ============================================================

import { useState } from 'react';
import {
  View, Text, ScrollView, FlatList,
  TouchableOpacity, Switch, StyleSheet
} from 'react-native';

// ── DADOS ─────────────────────────────────────────────────────
const tecnologias = [
  { id: '1', nome: 'JavaScript',  icon: '🟨', nivel: 'Iniciante',   descricao: 'Base de tudo no React Native' },
  { id: '2', nome: 'TypeScript',  icon: '🔷', nivel: 'Intermediário', descricao: 'JS com tipagem estática' },
  { id: '3', nome: 'React Native', icon: '📱', nivel: 'Iniciante',   descricao: 'Framework principal do curso' },
  { id: '4', nome: 'Expo',        icon: '⚡', nivel: 'Iniciante',   descricao: 'Plataforma que facilita o RN' },
  { id: '5', nome: 'Node.js',     icon: '🟢', nivel: 'Intermediário', descricao: 'Ambiente de execução JS no servidor' },
  { id: '6', nome: 'Git',         icon: '🌿', nivel: 'Iniciante',   descricao: 'Controle de versão' },
  { id: '7', nome: 'AsyncStorage',icon: '💾', nivel: 'Intermediário', descricao: 'Persistência local no RN' },
  { id: '8', nome: 'Firebase',    icon: '🔥', nivel: 'Avançado',    descricao: 'Backend-as-a-Service (Aula 13)' },
];

// ── SUBCOMPONENTES ────────────────────────────────────────────

// Regra JSX: componentes sempre iniciam com MAIÚSCULA
const NivelBadge = ({ nivel }) => {
  const config = {
    'Iniciante':    { cor: '#27AE60', emoji: '🌱' },
    'Intermediário':{ cor: '#F39C12', emoji: '🔧' },
    'Avançado':     { cor: '#E74C3C', emoji: '🚀' },
  };
  const c = config[nivel] || config['Iniciante'];

  // Retorno JSX — um único elemento raiz
  return (
    <View style={[styles.nivelBadge, { backgroundColor: c.cor + '25', borderColor: c.cor }]}>
      <Text style={[styles.nivelTexto, { color: c.cor }]}>{c.emoji} {nivel}</Text>
    </View>
  );
};

// Props desestruturadas diretamente nos parâmetros
const CardTecnologia = ({ item, onFavoritar, favoritada }) => (
  // Fragment <> </> quando não quer View extra (mas aqui usamos View com estilo)
  <View style={[styles.tecCard, favoritada && styles.tecCardFav]}>
    <View style={styles.tecHeader}>
      <Text style={styles.tecIcon}>{item.icon}</Text>
      <View style={styles.tecInfos}>
        <Text style={styles.tecNome}>{item.nome}</Text>
        <NivelBadge nivel={item.nivel} />
      </View>

      {/* Renderização condicional com ternário */}
      <TouchableOpacity onPress={() => onFavoritar(item.id)} activeOpacity={0.7}>
        <Text style={styles.favIcon}>{favoritada ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </View>

    {/* && renderiza apenas se a condição for verdadeira */}
    {item.descricao && (
      <Text style={styles.tecDesc}>{item.descricao}</Text>
    )}
  </View>
);

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  const [favoritas, setFavoritas]   = useState(new Set(['1', '3', '4']));
  const [modoFlatList, setModoFlatList] = useState(false);
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [contadorCliques, setContadorCliques] = useState(0);

  const toggleFavorita = (id) => {
    setFavoritas((prev) => {
      const nova = new Set(prev);
      if (nova.has(id)) nova.delete(id);
      else nova.add(id);
      return nova;
    });
  };

  // .filter() para o filtro de nível
  const tecsFiltradas = tecnologias.filter(
    (t) => filtroNivel === 'Todos' || t.nivel === filtroNivel
  );

  // Contagem das favoritas (operação derivada do estado — sem useEffect)
  const qtdFavoritas = [...favoritas].filter((id) =>
    tecsFiltradas.find((t) => t.id === id)
  ).length;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>JSX e Renderização de Listas</Text>
        <Text style={styles.subtitulo}>Módulo 06 — Aula 03</Text>
      </View>

      {/* Demo: expressão JSX com { } ──────────────────────── */}
      <View style={styles.secaoCard}>
        <Text style={styles.secaoTitulo}>1. Expressões dentro de {'{ }'}</Text>
        <Text style={styles.descricaoTexto}>
          Qualquer expressão JavaScript pode ir entre chaves no JSX:
          variáveis, chamadas de função, ternários, operações matemáticas.
        </Text>

        <TouchableOpacity
          style={styles.botaoContador}
          onPress={() => setContadorCliques((c) => c + 1)}
          activeOpacity={0.8}
        >
          {/* Expressões JS dentro de { } */}
          <Text style={styles.botaoContadorTexto}>
            Você clicou {contadorCliques}{' '}
            {/* Ternário para singular/plural */}
            {contadorCliques === 1 ? 'vez' : 'vezes'}
          </Text>
        </TouchableOpacity>

        {/* && (short-circuit) — só renderiza se > 5 */}
        {contadorCliques > 5 && (
          <Text style={styles.bonusTexto}>
            🎉 Você descobriu o easter egg com {'contadorCliques > 5 && <Text>'}!
          </Text>
        )}

        {/* Ternário para mensagem de motivação */}
        <Text style={styles.motivacaoTexto}>
          {contadorCliques === 0
            ? '👆 Toque no botão para ver expressões JSX em ação!'
            : contadorCliques < 5
              ? `Mais ${5 - contadorCliques} cliques para o bônus...`
              : '✅ Você dominou expressões JSX!'
          }
        </Text>
      </View>

      {/* Demo: renderização condicional ───────────────────── */}
      <View style={styles.secaoCard}>
        <Text style={styles.secaoTitulo}>2. Renderização Condicional</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mostrar exemplos de código</Text>
          {/* Switch é um componente RN — onValueChange recebe boolean */}
          <Switch
            value={mostrarCodigo}
            onValueChange={setMostrarCodigo}
            trackColor={{ false: '#243B55', true: '#00B4D8' }}
            thumbColor={mostrarCodigo ? '#FFFFFF' : '#8899AA'}
          />
        </View>

        {/* Condicional com &&  */}
        {mostrarCodigo && (
          <View style={styles.codigoBox}>
            <Text style={styles.codigoTitulo}>Três formas de condicional em JSX:</Text>
            <Text style={styles.codigo}>
              {'// 1. Ternário — quando tem dois casos:\n{logado\n  ? <TelaInicio />\n  : <TelaLogin />\n}\n\n// 2. && — quando só tem o caso "true":\n{pontos > 100 && <BadgeVIP />}\n\n// 3. Variável — para lógica mais complexa:\nconst conteudo = carregando\n  ? <Spinner />\n  : erro ? <MsgErro /> : <Lista />\nreturn <View>{conteudo}</View>'}
            </Text>
          </View>
        )}
      </View>

      {/* Demo: listas ──────────────────────────────────────── */}
      <View style={styles.secaoCard}>
        <Text style={styles.secaoTitulo}>3. Listas: .map() vs FlatList</Text>

        {/* Toggle entre map e FlatList */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {modoFlatList ? 'FlatList (otimizado para listas grandes)' : '.map() (listas pequenas)'}
          </Text>
          <Switch
            value={modoFlatList}
            onValueChange={setModoFlatList}
            trackColor={{ false: '#243B55', true: '#FF6B35' }}
            thumbColor={modoFlatList ? '#FFFFFF' : '#8899AA'}
          />
        </View>

        {/* Filtro por nível */}
        <View style={styles.filtros}>
          {['Todos', 'Iniciante', 'Intermediário', 'Avançado'].map((nivel) => (
            <TouchableOpacity
              key={nivel}  // ⚠️ key é OBRIGATÓRIO em listas
              style={[styles.filtroBtn, filtroNivel === nivel && styles.filtroBtnAtivo]}
              onPress={() => setFiltroNivel(nivel)}
            >
              <Text style={[styles.filtroBtnTexto, filtroNivel === nivel && styles.filtroBtnTextoAtivo]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contador de favoritas — expressão JSX com chamada de função */}
        <Text style={styles.contadorFav}>
          ⭐ {qtdFavoritas} de {tecsFiltradas.length} favoritas neste filtro
        </Text>

        {/* Condicional: lista vazia */}
        {tecsFiltradas.length === 0 ? (
          <Text style={styles.listaVazia}>Nenhuma tecnologia neste nível.</Text>
        ) : modoFlatList ? (
          // FlatList — virtualiza o DOM, melhor para centenas de itens
          <FlatList
            data={tecsFiltradas}
            keyExtractor={(item) => item.id}  // key obrigatória
            scrollEnabled={false}             // desabilitamos pois estamos dentro de ScrollView
            renderItem={({ item }) => (
              <CardTecnologia
                item={item}
                onFavoritar={toggleFavorita}
                favoritada={favoritas.has(item.id)}
              />
            )}
          />
        ) : (
          // .map() — direto e simples para listas pequenas
          tecsFiltradas.map((item) => (
            <CardTecnologia
              key={item.id}               // ⚠️ key OBRIGATÓRIA e ÚNICA
              item={item}
              onFavoritar={toggleFavorita}
              favoritada={favoritas.has(item.id)}
            />
          ))
        )}

        {/* Comparativo map vs FlatList */}
        {mostrarCodigo && (
          <View style={styles.codigoBox}>
            <Text style={styles.codigoTitulo}>.map() vs FlatList:</Text>
            <Text style={styles.codigo}>
              {'// .map() — simples, renderiza tudo de uma vez:\n{lista.map((item) => (\n  <Card key={item.id} item={item} />\n))}\n\n// FlatList — virtualiza, renderiza sob demanda:\n<FlatList\n  data={lista}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Card item={item} />}\n/>'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Próximo: Exemplo 07 — Exercício Gabarito</Text>
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
    marginBottom: 16, borderLeftWidth: 5, borderLeftColor: '#FF6B35',
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subtitulo: { fontSize: 12, color: '#FF6B35', fontFamily: 'monospace' },

  secaoCard: {
    backgroundColor: '#1A2E45', borderRadius: 10,
    padding: 14, marginBottom: 14,
  },
  secaoTitulo: {
    fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10,
  },
  descricaoTexto: { fontSize: 12, color: '#8899AA', lineHeight: 18, marginBottom: 10 },

  botaoContador: {
    backgroundColor: '#243B55', borderRadius: 10,
    padding: 16, alignItems: 'center', marginBottom: 8,
  },
  botaoContadorTexto: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  bonusTexto: { fontSize: 12, color: '#FFD166', textAlign: 'center', marginBottom: 6, lineHeight: 18 },
  motivacaoTexto: { fontSize: 12, color: '#8899AA', textAlign: 'center', fontStyle: 'italic' },

  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  switchLabel: { fontSize: 13, color: '#CCDDEE', flex: 1, marginRight: 8 },

  codigoBox: {
    backgroundColor: '#0A1825', borderRadius: 6, padding: 10,
    borderWidth: 1, borderColor: '#243B55', marginTop: 8,
  },
  codigoTitulo: { fontSize: 11, color: '#8899AA', marginBottom: 6, fontWeight: 'bold' },
  codigo: { fontFamily: 'monospace', fontSize: 11, color: '#7EC8A4', lineHeight: 19 },

  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  filtroBtn: { backgroundColor: '#243B55', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5 },
  filtroBtnAtivo: { backgroundColor: '#FF6B35' },
  filtroBtnTexto: { fontSize: 11, color: '#8899AA' },
  filtroBtnTextoAtivo: { color: '#FFFFFF', fontWeight: 'bold' },

  contadorFav: { fontSize: 12, color: '#FFD166', marginBottom: 10 },
  listaVazia: { textAlign: 'center', color: '#8899AA', padding: 20 },

  tecCard: {
    backgroundColor: '#243B55', borderRadius: 8, padding: 12, marginBottom: 8,
  },
  tecCardFav: { borderWidth: 1.5, borderColor: '#FFD166' },
  tecHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tecIcon: { fontSize: 24, width: 32 },
  tecInfos: { flex: 1, gap: 4 },
  tecNome: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  tecDesc: { fontSize: 11, color: '#8899AA', marginTop: 6, lineHeight: 16 },
  favIcon: { fontSize: 22 },

  nivelBadge: {
    borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, alignSelf: 'flex-start',
  },
  nivelTexto: { fontSize: 10, fontWeight: 'bold' },

  rodape: {
    marginTop: 8, alignItems: 'center',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#243B55',
  },
  rodapeTexto: { fontSize: 12, color: '#8899AA' },
});
