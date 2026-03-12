/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 05 — Botões e Interação
 *
 * Conceitos:
 *   - Button: componente nativo simples, pouco customizável
 *   - TouchableOpacity: wrapper transparente — reduz opacidade ao toque
 *   - Pressable: componente moderno com acesso ao estado de pressão
 *   - Alert: caixa de diálogo nativa do sistema
 *   - disabled: desabilitar interação
 *   - Feedback visual: cores e opacidade no estado pressionado
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState } from 'react';
import {
  View, Text, Button, TouchableOpacity, Pressable,
  Alert, ScrollView, StyleSheet,
} from 'react-native';

export default function App() {
  const [contadorTO,  setContadorTO]  = useState(0);
  const [contadorP,   setContadorP]   = useState(0);
  const [pressionado, setPressionado] = useState(false);
  const [historico,   setHistorico]   = useState([]);

  const adicionarHistorico = (msg) =>
    setHistorico((h) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...h].slice(0, 6));

  return (
    <ScrollView style={styles.tela}>

      {/* ── Cabeçalho ──────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Botões e Interação</Text>
        <Text style={styles.headerSub}>Button • TouchableOpacity • Pressable</Text>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 1 — Button nativo
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>1. Button (componente nativo)</Text>
        <Text style={styles.obs}>
          Prós: simples e rápido.{'\n'}
          Contras: difícil de customizar (estilo varia por plataforma).
        </Text>

        <Button
          title="Clique aqui (Button nativo)"
          color="#00B4D8"
          onPress={() => {
            Alert.alert('Button', 'Você pressionou o Button nativo!');
            adicionarHistorico('Button pressionado');
          }}
        />

        <View style={{ marginTop: 10 }}>
          <Button
            title="Botão desabilitado"
            color="#64748B"
            disabled        // ← propriedade que desabilita
            onPress={() => {}}
          />
        </View>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 2 — TouchableOpacity
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>2. TouchableOpacity</Text>
        <Text style={styles.obs}>
          Wrapper personalizável. Ao pressionar, reduz a opacidade (activeOpacity).{'\n'}
          Ideal para a maioria dos botões em produção.
        </Text>

        {/* Botão primário */}
        <TouchableOpacity
          style={styles.btnPrimario}
          activeOpacity={0.7}
          onPress={() => {
            setContadorTO((c) => c + 1);
            adicionarHistorico(`TouchableOpacity → contador: ${contadorTO + 1}`);
          }}
        >
          <Text style={styles.btnPrimarioTexto}>
            Contar  ({contadorTO})
          </Text>
        </TouchableOpacity>

        {/* Botão secundário (outline) */}
        <TouchableOpacity
          style={styles.btnOutline}
          activeOpacity={0.6}
          onPress={() => {
            setContadorTO(0);
            adicionarHistorico('TouchableOpacity → contador resetado');
          }}
        >
          <Text style={styles.btnOutlineTexto}>Resetar contador</Text>
        </TouchableOpacity>

        {/* Botão desabilitado */}
        <TouchableOpacity
          style={[styles.btnPrimario, styles.btnDesabilitado]}
          activeOpacity={1}
          disabled
        >
          <Text style={styles.btnPrimarioTexto}>Desabilitado</Text>
        </TouchableOpacity>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 3 — Pressable
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>3. Pressable (moderno)</Text>
        <Text style={styles.obs}>
          Acessa o estado de pressão via callback de estilo.{'\n'}
          Permite animações e feedback visual preciso.
        </Text>

        {/* Estilo muda quando pressionado */}
        <Pressable
          style={({ pressed }) => [
            styles.btnPressable,
            pressed && styles.btnPressableAtivo,    // muda quando pressionado
          ]}
          onPressIn={()  => setPressionado(true)}
          onPressOut={()  => setPressionado(false)}
          onPress={() => {
            setContadorP((c) => c + 1);
            adicionarHistorico(`Pressable → contador: ${contadorP + 1}`);
          }}
        >
          {({ pressed }) => (
            // Também podemos renderizar conteúdo diferente baseado em pressed
            <Text style={styles.btnPressableTexto}>
              {pressed ? '🔵 Pressionando...' : `🟢 Pressable  (${contadorP})`}
            </Text>
          )}
        </Pressable>

        <Text style={styles.statusPressable}>
          Estado atual: {pressionado ? '⬇️ Pressionado' : '⬆️ Solto'}
        </Text>

        {/* Pressable com onLongPress */}
        <Pressable
          style={styles.btnLongPress}
          onPress={() => adicionarHistorico('LongPress → toque curto')}
          onLongPress={() => {
            Alert.alert('Long Press!', 'Você manteve pressionado por mais de 500ms.');
            adicionarHistorico('LongPress → toque longo detectado!');
          }}
          delayLongPress={500}
        >
          <Text style={styles.btnPressableTexto}>Segure para LongPress</Text>
        </Pressable>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 4 — Histórico de eventos
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>4. Log de eventos</Text>
        {historico.length === 0 ? (
          <Text style={styles.logVazio}>Pressione um botão acima...</Text>
        ) : (
          historico.map((item, i) => (
            <Text key={i} style={[styles.logItem, i === 0 && styles.logItemRecente]}>
              {item}
            </Text>
          ))
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#0D1B2A' },

  header: {
    backgroundColor: '#1B2E45',
    paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20,
  },
  headerTitulo: { fontSize: 22, fontWeight: 'bold', color: '#00B4D8' },
  headerSub:    { fontSize: 13, color: '#8CA0B3', marginTop: 4 },

  secao:       { marginTop: 20, paddingHorizontal: 16, gap: 10 },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#F4793B', marginBottom: 4 },
  obs:         { fontSize: 12, color: '#94A3B8', lineHeight: 18 },

  // ── TouchableOpacity buttons ────────────────────────────
  btnPrimario: {
    backgroundColor: '#00B4D8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPrimarioTexto: { fontSize: 15, fontWeight: 'bold', color: '#0D1B2A' },

  btnOutline: {
    borderWidth: 1.5,
    borderColor: '#00B4D8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnOutlineTexto: { fontSize: 15, color: '#00B4D8' },

  btnDesabilitado: { backgroundColor: '#2D3D50', opacity: 0.5 },

  // ── Pressable buttons ────────────────────────────────────
  btnPressable: {
    backgroundColor: '#1B2E45',
    borderWidth: 2,
    borderColor: '#00B4D8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPressableAtivo: {
    backgroundColor: '#00B4D8',    // muda fundo quando pressionado
    transform: [{ scale: 0.97 }],  // leve encolhimento
  },
  btnPressableTexto:  { fontSize: 15, fontWeight: 'bold', color: '#00B4D8' },

  btnLongPress: {
    backgroundColor: '#2D1B45',
    borderWidth: 2,
    borderColor: '#818CF8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  statusPressable: { fontSize: 13, color: '#94A3B8', textAlign: 'center' },

  // ── Log ─────────────────────────────────────────────────
  logVazio:      { fontSize: 13, color: '#475569', fontStyle: 'italic' },
  logItem:       { fontSize: 12, color: '#94A3B8', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#1B2E45' },
  logItemRecente:{ color: '#4EC994', fontWeight: 'bold' },
});
