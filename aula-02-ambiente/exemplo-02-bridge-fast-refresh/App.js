// ============================================================
// AULA 02 - Exemplo 02: A Bridge e o Fast Refresh na Prática
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Demonstrar o conceito de Bridge e Fast Refresh
//           de forma visual e interativa
// SLIDES RELACIONADOS: 3, 4, 21, 22
//
// EXPERIMENTO: Altere qualquer texto neste arquivo e salve (Ctrl+S).
// Observe como o app atualiza em < 1 segundo no Expo Go!
// Isso é o FAST REFRESH em ação (Slide 22)!
// ============================================================

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  // useState: hook para guardar e atualizar dados na tela
  // Cada clique no botão incrementa o contador
  const [contador, setContador] = useState(0);
  const [mensagem, setMensagem] = useState('Nenhuma ação ainda');

  // Demonstração da "Bridge": nosso JS envia comandos para o nativo
  function demonstrarBridge() {
    setContador(prev => prev + 1);
    const msgs = [
      '🟢 JS enviou comando → View nativa atualizada!',
      '🔵 Bridge traduziu: setContador → repaint nativo',
      '🟡 Motor Hermes executou o JavaScript',
      '🟠 Componente React re-renderizou',
      '🔴 Layout calculado pelo Yoga Engine',
      '✅ Frame exibido na tela pelo SO!',
    ];
    setMensagem(msgs[contador % msgs.length]);
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {/* Cabeçalho da aula */}
      <View style={styles.header}>
        <Text style={styles.headerTag}>AULA 02 · SLIDE 3-4 e 22</Text>
        <Text style={styles.headerTitle}>A Bridge & Fast Refresh</Text>
        <Text style={styles.headerSub}>Como o React Native realmente funciona</Text>
      </View>

      {/* ── SEÇÃO: BRIDGE ───────────────────────────────────── */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🌉 O que é a Bridge?</Text>
        <Text style={styles.sectionText}>
          Seu código JavaScript NÃO vira Java ou Swift.{'\n'}
          Em vez disso, a Bridge traduz os comandos JS para
          componentes nativos reais do Android/iOS.
        </Text>

        {/* Diagrama visual da bridge */}
        <View style={styles.bridgeDiagram}>
          <View style={[styles.bridgeBox, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.bridgeBoxText}>⚡ SEU CÓDIGO</Text>
            <Text style={styles.bridgeBoxSub}>JavaScript (Hermes)</Text>
          </View>

          <View style={styles.bridgeArrow}>
            <Text style={styles.bridgeArrowText}>Bridge</Text>
            <Text style={styles.bridgeArrowIcon}>⟷</Text>
          </View>

          <View style={[styles.bridgeBox, { backgroundColor: '#10B981' }]}>
            <Text style={styles.bridgeBoxText}>📱 NATIVO</Text>
            <Text style={styles.bridgeBoxSub}>Android / iOS</Text>
          </View>
        </View>

        {/* Botão demonstração */}
        <TouchableOpacity
          style={styles.bridgeBtn}
          onPress={demonstrarBridge}
          activeOpacity={0.7}
        >
          <Text style={styles.bridgeBtnText}>
            Enviar Comando pela Bridge #{contador}
          </Text>
        </TouchableOpacity>

        {/* Mensagem de estado */}
        <View style={styles.mensagemBox}>
          <Text style={styles.mensagemTexto}>{mensagem}</Text>
        </View>
      </View>

      {/* ── SEÇÃO: HERMES ───────────────────────────────────── */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🚀 Motor Hermes (Slide 4)</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>2x</Text>
            <Text style={styles.statLabel}>Inicialização{'\n'}mais rápida</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>↓40%</Text>
            <Text style={styles.statLabel}>Uso de{'\n'}memória RAM</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>AOT</Text>
            <Text style={styles.statLabel}>Compilação{'\n'}antecipada</Text>
          </View>
        </View>

        <Text style={styles.sectionText}>
          Hermes pré-compila seu JS para bytecode antes de chegar
          ao dispositivo. O app inicia sem precisar compilar nada!
        </Text>
      </View>

      {/* ── SEÇÃO: FAST REFRESH ─────────────────────────────── */}
      <View style={[styles.sectionCard, styles.fastCard]}>
        <Text style={[styles.sectionTitle, { color: '#00C6AE' }]}>
          ⚡ Fast Refresh (Slide 22)
        </Text>
        <View style={styles.compareRow}>
          <View style={styles.compareBox}>
            <Text style={styles.compareTitle}>Nativo Clássico</Text>
            <Text style={styles.compareTime}>~30 seg</Text>
            <Text style={styles.compareDesc}>
              Compilar → Instalar APK → Abrir app
            </Text>
          </View>
          <Text style={styles.compareVs}>VS</Text>
          <View style={[styles.compareBox, styles.compareBoxWin]}>
            <Text style={styles.compareTitle}>React Native</Text>
            <Text style={[styles.compareTime, { color: '#00C6AE' }]}>&lt;1 seg</Text>
            <Text style={styles.compareDesc}>
              Salvar arquivo → Ver mudança
            </Text>
          </View>
        </View>
        <Text style={styles.dica}>
          🔥 EXPERIMENTO: Altere o texto "Nenhuma ação ainda" {'\n'}
          na linha 21 deste arquivo e salve. Veja o Fast Refresh!
        </Text>
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: '#0D1B2A' },
  container: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    backgroundColor: '#1B2A3B',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 4,
    borderTopColor: '#00C6AE',
  },
  headerTag: {
    color: '#00C6AE', fontSize: 11, fontWeight: 'bold',
    letterSpacing: 2, marginBottom: 6,
  },
  headerTitle: {
    color: '#FFFFFF', fontSize: 26, fontWeight: 'bold', textAlign: 'center',
  },
  headerSub: {
    color: '#8CA0B3', fontSize: 14, marginTop: 4, textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#1B2A3B',
    borderRadius: 14, padding: 18, gap: 12,
  },
  fastCard: {
    borderWidth: 1, borderColor: '#00C6AE22',
  },
  sectionTitle: {
    color: '#FF6B35', fontSize: 18, fontWeight: 'bold',
  },
  sectionText: {
    color: '#C5D5E5', fontSize: 14, lineHeight: 20,
  },
  // Bridge diagram
  bridgeDiagram: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    gap: 8,
  },
  bridgeBox: {
    flex: 1, borderRadius: 10, padding: 12, alignItems: 'center',
  },
  bridgeBoxText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  bridgeBoxSub: { color: '#FFF', fontSize: 10, marginTop: 2, opacity: 0.8 },
  bridgeArrow: { alignItems: 'center' },
  bridgeArrowText: { color: '#8CA0B3', fontSize: 10 },
  bridgeArrowIcon: { color: '#00C6AE', fontSize: 22, fontWeight: 'bold' },
  bridgeBtn: {
    backgroundColor: '#00C6AE', borderRadius: 10,
    padding: 14, alignItems: 'center',
  },
  bridgeBtnText: { color: '#0D1B2A', fontWeight: 'bold', fontSize: 15 },
  mensagemBox: {
    backgroundColor: '#0D2137', borderRadius: 8, padding: 12,
    borderLeftWidth: 3, borderLeftColor: '#00C6AE',
  },
  mensagemTexto: { color: '#A8D8FF', fontSize: 13, lineHeight: 18 },
  // Stats
  statsRow: { flexDirection: 'row', gap: 8 },
  statBox: {
    flex: 1, backgroundColor: '#0D2137', borderRadius: 10,
    padding: 12, alignItems: 'center',
  },
  statNum: { color: '#FF6B35', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#8CA0B3', fontSize: 11, textAlign: 'center', marginTop: 4 },
  // Compare
  compareRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  compareBox: {
    flex: 1, backgroundColor: '#0D2137', borderRadius: 10,
    padding: 12, alignItems: 'center', gap: 4,
  },
  compareBoxWin: { borderWidth: 1, borderColor: '#00C6AE' },
  compareTitle: { color: '#8CA0B3', fontSize: 12, fontWeight: 'bold' },
  compareTime: { color: '#FF6B35', fontSize: 28, fontWeight: 'bold' },
  compareDesc: { color: '#C5D5E5', fontSize: 11, textAlign: 'center', lineHeight: 16 },
  compareVs: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  dica: {
    backgroundColor: '#0A1929', borderRadius: 8, padding: 12,
    color: '#00C6AE', fontSize: 13, lineHeight: 18,
    borderStyle: 'dashed', borderWidth: 1, borderColor: '#00C6AE',
  },
});
