/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 06 — ScrollView e SafeAreaView
 *
 * Conceitos:
 *   - SafeAreaView: evita sobreposição com notch, barra de status e
 *     barra de navegação do iOS e Android
 *   - ScrollView: rolagem vertical (e horizontal) para conteúdo longo
 *   - contentContainerStyle: estiliza o container INTERNO do ScrollView
 *   - showsVerticalScrollIndicator: ocultar/exibir barra de rolagem
 *   - horizontal: rolagem horizontal (carrossel)
 *   - keyboardShouldPersistTaps: comportamento ao tocar com teclado aberto
 *   - onScroll + scrollEventThrottle: detectar posição do scroll
 *   - ScrollView vs FlatList: quando usar cada um
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState, useRef } from 'react';
import {
  View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, StyleSheet, Animated,
} from 'react-native';

// ── Dados de demonstração ──────────────────────────────────
const ITENS_VERTICAIS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  titulo: `Item ${i + 1}`,
  cor: ['#00B4D8', '#F4793B', '#4ADE80', '#818CF8', '#F97316'][i % 5],
}));

const ITENS_HORIZONTAIS = [
  { id: 1, emoji: '🏖️', label: 'Praia' },
  { id: 2, emoji: '🏔️', label: 'Montanha' },
  { id: 3, emoji: '🌆', label: 'Cidade' },
  { id: 4, emoji: '🌳', label: 'Floresta' },
  { id: 5, emoji: '🏜️', label: 'Deserto' },
  { id: 6, emoji: '🌊', label: 'Oceano' },
  { id: 7, emoji: '❄️', label: 'Ártico' },
];

export default function App() {
  const [aba, setAba]           = useState('vertical');
  const [posScroll, setPosScroll] = useState(0);
  const scrollRef               = useRef(null);

  return (
    // SafeAreaView: envolve TUDO para proteger das bordas do dispositivo
    <SafeAreaView style={styles.safe}>

      {/* ── Cabeçalho fixo ─────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>ScrollView & SafeAreaView</Text>
        <Text style={styles.headerSub}>
          SafeAreaView ativo — conteúdo protegido do notch/barra de status
        </Text>
      </View>

      {/* ── Abas ───────────────────────────────────── */}
      <View style={styles.abas}>
        {['vertical', 'horizontal', 'info'].map((a) => (
          <TouchableOpacity
            key={a}
            style={[styles.aba, aba === a && styles.abaAtiva]}
            onPress={() => setAba(a)}
          >
            <Text style={[styles.abaTexto, aba === a && styles.abaTextoAtivo]}>
              {a === 'vertical'   ? 'Vertical'   :
               a === 'horizontal' ? 'Horizontal' : 'Comparativo'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ════════════════════════════════════════════
          ABA 1 — Scroll Vertical
      ════════════════════════════════════════════ */}
      {aba === 'vertical' && (
        <View style={{ flex: 1 }}>
          {/* Indicador de posição */}
          <View style={styles.barraInfo}>
            <Text style={styles.barraTexto}>
              Posição Y: {Math.round(posScroll)}px
            </Text>
            <TouchableOpacity
              onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
            >
              <Text style={styles.btnTopo}>↑ Voltar ao topo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.scrollVertical}
            contentContainerStyle={styles.scrollConteudo}
            showsVerticalScrollIndicator={false}    // oculta barra visual
            onScroll={(e) => setPosScroll(e.nativeEvent.contentOffset.y)}
            scrollEventThrottle={16}                // atualiza a cada ~16ms (60fps)
          >
            {ITENS_VERTICAIS.map((item) => (
              <View
                key={item.id}
                style={[styles.itemVertical, { borderLeftColor: item.cor }]}
              >
                <View style={[styles.itemNumero, { backgroundColor: item.cor }]}>
                  <Text style={styles.itemNumeroTexto}>{item.id + 1}</Text>
                </View>
                <View style={styles.itemConteudo}>
                  <Text style={styles.itemTitulo}>{item.titulo}</Text>
                  <Text style={styles.itemSub}>
                    Role para ver mais {20 - item.id} itens abaixo...
                  </Text>
                </View>
              </View>
            ))}

            {/* Rodapé da lista */}
            <View style={styles.rodapeLista}>
              <Text style={styles.rodapeTexto}>
                ✅ Fim da lista — 20 itens renderizados
              </Text>
              <Text style={styles.rodapeObs}>
                ⚠️ ScrollView renderiza TODOS os filhos de uma vez.{'\n'}
                Para listas longas (100+ itens), use FlatList!
              </Text>
            </View>
          </ScrollView>
        </View>
      )}

      {/* ════════════════════════════════════════════
          ABA 2 — Scroll Horizontal (carrossel)
      ════════════════════════════════════════════ */}
      {aba === 'horizontal' && (
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.secaoTitulo}>Carrossel Horizontal</Text>
          <Text style={styles.obs}>
            Use <Text style={{ color: '#00B4D8' }}>horizontal={'{true}'}</Text> no ScrollView
            para rolagem lateral. Ideal para categorias, banners e galerias.
          </Text>

          <ScrollView
            horizontal                             // ← aqui está a mágica
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
          >
            {ITENS_HORIZONTAIS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.cardHorizontal}>
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.secaoTitulo} style={{ marginTop: 24 }}>
            Grade com scroll vertical
          </Text>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.grade}
          >
            {ITENS_VERTICAIS.slice(0, 12).map((item) => (
              <View key={item.id} style={[styles.gradeItem, { borderColor: item.cor }]}>
                <Text style={[styles.gradeNumero, { color: item.cor }]}>
                  {item.id + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ════════════════════════════════════════════
          ABA 3 — ScrollView vs FlatList
      ════════════════════════════════════════════ */}
      {aba === 'info' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.secaoTitulo}>ScrollView vs FlatList</Text>

          {[
            {
              titulo: 'ScrollView',
              cor: '#00B4D8',
              pros: [
                'Renderização simples',
                'Suporta conteúdo misto (não apenas listas)',
                'scroll horizontal fácil com horizontal={true}',
                'Ideal para formulários e páginas de detalhes',
              ],
              contras: [
                'Renderiza TODOS os filhos de uma vez',
                'Consumo alto de memória para listas longas',
                'Lento com 50+ itens complexos',
              ],
              quando: 'Páginas de formulário, telas de detalhes, conteúdo fixo',
            },
            {
              titulo: 'FlatList',
              cor: '#F4793B',
              pros: [
                'Renderiza apenas itens visíveis (virtualização)',
                'Alta performance com centenas de itens',
                'Suporte a pull-to-refresh (onRefresh)',
                'onEndReached para carregar mais dados (paginação)',
              ],
              contras: [
                'Requer keyExtractor obrigatório',
                'Apenas listas uniformes (mesmo tipo de item)',
                'Configuração um pouco mais complexa',
              ],
              quando: 'Feeds, listas de produtos, contatos, histórico — qualquer lista longa',
            },
          ].map((c) => (
            <View key={c.titulo} style={[styles.comparativoCard, { borderColor: c.cor }]}>
              <Text style={[styles.comparativoTitulo, { color: c.cor }]}>{c.titulo}</Text>
              <Text style={styles.comparativoSub}>✅ Vantagens:</Text>
              {c.pros.map((p, i) => (
                <Text key={i} style={styles.comparativoItem}>  • {p}</Text>
              ))}
              <Text style={[styles.comparativoSub, { marginTop: 8 }]}>❌ Desvantagens:</Text>
              {c.contras.map((p, i) => (
                <Text key={i} style={styles.comparativoItem}>  • {p}</Text>
              ))}
              <Text style={[styles.comparativoSub, { marginTop: 8 }]}>📌 Use quando:</Text>
              <Text style={styles.comparativoWhen}>{c.quando}</Text>
            </View>
          ))}
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: '#0D1B2A' },

  header: {
    backgroundColor: '#1B2E45',
    paddingBottom: 12, paddingHorizontal: 20, paddingTop: 8,
  },
  headerTitulo: { fontSize: 20, fontWeight: 'bold', color: '#00B4D8' },
  headerSub:    { fontSize: 12, color: '#4ADE80', marginTop: 2 },

  // abas
  abas: {
    flexDirection: 'row',
    backgroundColor: '#1B2E45',
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 8,
  },
  aba: {
    flex: 1, paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#243B55',
  },
  abaAtiva:      { backgroundColor: '#00B4D8' },
  abaTexto:      { fontSize: 12, color: '#8CA0B3' },
  abaTextoAtivo: { color: '#0D1B2A', fontWeight: 'bold' },

  // barra de info scroll
  barraInfo: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#1B2E45',
  },
  barraTexto: { fontSize: 12, color: '#8CA0B3' },
  btnTopo:    { fontSize: 12, color: '#00B4D8' },

  // scroll vertical
  scrollVertical: { flex: 1 },
  scrollConteudo: { padding: 16, gap: 8 },

  itemVertical: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1B2E45', borderRadius: 8,
    borderLeftWidth: 4, overflow: 'hidden',
  },
  itemNumero: {
    width: 48, height: 48,
    justifyContent: 'center', alignItems: 'center',
  },
  itemNumeroTexto: { fontSize: 16, fontWeight: 'bold', color: '#0D1B2A' },
  itemConteudo:    { flex: 1, padding: 12 },
  itemTitulo:      { fontSize: 14, fontWeight: 'bold', color: '#F0F4F8' },
  itemSub:         { fontSize: 12, color: '#64748B', marginTop: 2 },

  rodapeLista: {
    backgroundColor: '#1B2E45', borderRadius: 8,
    padding: 16, marginTop: 8, alignItems: 'center', gap: 8,
  },
  rodapeTexto: { fontSize: 13, color: '#4ADE80', fontWeight: 'bold' },
  rodapeObs:   { fontSize: 12, color: '#F59E0B', textAlign: 'center', lineHeight: 18 },

  // horizontal
  cardHorizontal: {
    width: 90, height: 90,
    backgroundColor: '#1B2E45', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1, borderColor: '#243B55',
  },
  cardEmoji: { fontSize: 28 },
  cardLabel: { fontSize: 12, color: '#CBD5E1' },

  grade:          { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gradeItem:      { width: '30%', aspectRatio: 1, backgroundColor: '#1B2E45', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5 },
  gradeNumero:    { fontSize: 20, fontWeight: 'bold' },

  // comparativo
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#F4793B', marginBottom: 8 },
  obs:         { fontSize: 12, color: '#94A3B8', marginBottom: 12, lineHeight: 18 },
  comparativoCard:  { backgroundColor: '#1B2E45', borderRadius: 10, padding: 14, marginBottom: 16, borderWidth: 1.5 },
  comparativoTitulo:{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  comparativoSub:   { fontSize: 13, color: '#CBD5E1', fontWeight: 'bold' },
  comparativoItem:  { fontSize: 12, color: '#94A3B8', lineHeight: 20 },
  comparativoWhen:  { fontSize: 12, color: '#4ADE80', fontStyle: 'italic', lineHeight: 18 },
});
