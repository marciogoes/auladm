/**
 * AULA 04 — Interface de Usuário I
 * Exemplo 04 — Componente Image
 *
 * Conceitos:
 *   - Image com source remoto (uri)
 *   - Obrigatoriedade de width/height para imagens remotas
 *   - resizeMode: cover | contain | stretch | center
 *   - borderRadius para avatares circulares
 *   - ActivityIndicator como loading placeholder
 *   - onLoad e onError callbacks
 *
 * 📱 Teste em: https://snack.expo.dev
 */

import { useState } from 'react';
import {
  View, Text, Image, ScrollView,
  ActivityIndicator, TouchableOpacity, StyleSheet,
} from 'react-native';

// ── URLs de imagens para demonstração (Picsum Photos) ──────
const IMAGENS = {
  paisagem: 'https://picsum.photos/seed/landscape/600/300',
  retrato:  'https://picsum.photos/seed/portrait/300/400',
  avatar1:  'https://picsum.photos/seed/person1/200/200',
  avatar2:  'https://picsum.photos/seed/person2/200/200',
  avatar3:  'https://picsum.photos/seed/person3/200/200',
  quebrada: 'https://url-que-nao-existe.com/erro.jpg',   // propositalmente inválida
};

// ── Modos de resizeMode disponíveis ────────────────────────
const RESIZE_MODES = ['cover', 'contain', 'stretch', 'center'];

export default function App() {
  const [resizeMode, setResizeMode] = useState('cover');

  return (
    <ScrollView style={styles.tela}>

      {/* ── Cabeçalho ──────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Componente Image</Text>
        <Text style={styles.headerSub}>Imagens remotas, avatares e modos de redimensionamento</Text>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 1 — Imagem básica remota
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>1. Imagem remota básica</Text>
        <Text style={styles.obs}>
          ⚠️ Imagens remotas SEMPRE precisam de width e height no estilo!
        </Text>

        <ImageComLoading
          source={{ uri: IMAGENS.paisagem }}
          style={styles.imagemPaisagem}
          resizeMode={resizeMode}
        />

        {/* Seletor de resizeMode */}
        <Text style={styles.labelCampo}>resizeMode:</Text>
        <View style={styles.chipRow}>
          {RESIZE_MODES.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.chip, resizeMode === m && styles.chipAtivo]}
              onPress={() => setResizeMode(m)}
            >
              <Text style={[styles.chipTexto, resizeMode === m && styles.chipTextoAtivo]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.dica}>
          {resizeMode === 'cover'   && '"cover": Preenche a área. Pode cortar as bordas.'}
          {resizeMode === 'contain' && '"contain": Cabe inteira. Pode deixar espaço vazio.'}
          {resizeMode === 'stretch' && '"stretch": Estica exatamente para preencher (distorce).'}
          {resizeMode === 'center'  && '"center": Centraliza sem escalar.'}
        </Text>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 2 — Avatares circulares
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>2. Avatares circulares</Text>
        <Text style={styles.obs}>
          borderRadius: metade do tamanho → círculo perfeito
        </Text>
        <View style={styles.avatarRow}>
          {[IMAGENS.avatar1, IMAGENS.avatar2, IMAGENS.avatar3].map((uri, i) => (
            <View key={i} style={styles.avatarContainer}>
              <ImageComLoading
                source={{ uri }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <Text style={styles.avatarLabel}>Usuário {i + 1}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 3 — Tratamento de erro (onError)
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>3. Tratamento de erro</Text>
        <Text style={styles.obs}>
          Quando a URL está inválida, onError é chamado e exibimos um placeholder.
        </Text>
        <ImageComLoading
          source={{ uri: IMAGENS.quebrada }}
          style={styles.imagemMedia}
          resizeMode="cover"
        />
      </View>

      {/* ════════════════════════════════════════════
          SEÇÃO 4 — Diferentes tamanhos
      ════════════════════════════════════════════ */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>4. Diferentes tamanhos com flex</Text>
        <View style={styles.gridImagens}>
          {['seed/cat1', 'seed/cat2', 'seed/cat3', 'seed/cat4'].map((seed, i) => (
            <ImageComLoading
              key={i}
              source={{ uri: `https://picsum.photos/${seed}/150/150` }}
              style={styles.gridItem}
              resizeMode="cover"
            />
          ))}
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ── Componente auxiliar: Image com loading e erro ──────────
function ImageComLoading({ source, style, resizeMode }) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro]             = useState(false);

  if (erro) {
    return (
      <View style={[style, styles.erroContainer]}>
        <Text style={styles.erroEmoji}>🖼️</Text>
        <Text style={styles.erroTexto}>Falha ao carregar</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {carregando && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color="#00B4D8"
          size="large"
        />
      )}
      <Image
        source={source}
        style={[style, { position: carregando ? 'absolute' : 'relative', opacity: carregando ? 0 : 1 }]}
        resizeMode={resizeMode}
        onLoad={() => setCarregando(false)}
        onError={() => { setCarregando(false); setErro(true); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela:       { flex: 1, backgroundColor: '#0D1B2A' },

  header: {
    backgroundColor: '#1B2E45',
    paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20,
  },
  headerTitulo: { fontSize: 22, fontWeight: 'bold', color: '#00B4D8' },
  headerSub:    { fontSize: 13, color: '#8CA0B3', marginTop: 4 },

  secao:       { marginTop: 20, paddingHorizontal: 16 },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#F4793B', marginBottom: 8 },
  obs:         { fontSize: 12, color: '#F59E0B', marginBottom: 10, lineHeight: 18 },
  labelCampo:  { fontSize: 13, color: '#CBD5E1', marginTop: 10, marginBottom: 6 },
  dica:        { fontSize: 12, color: '#4EC994', marginTop: 6, fontStyle: 'italic' },

  // imagem principal
  imagemPaisagem: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#1B2E45',
    overflow: 'hidden',
  },
  imagemMedia: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#1B2E45',
    overflow: 'hidden',
  },

  // chips de resizeMode
  chipRow:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip:          { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#1B2E45', borderWidth: 1, borderColor: '#243B55' },
  chipAtivo:     { backgroundColor: '#00B4D8', borderColor: '#00B4D8' },
  chipTexto:     { fontSize: 12, color: '#8CA0B3' },
  chipTextoAtivo:{ fontSize: 12, color: '#0D1B2A', fontWeight: 'bold' },

  // avatares
  avatarRow:      { flexDirection: 'row', justifyContent: 'space-around' },
  avatarContainer:{ alignItems: 'center', gap: 6 },
  avatar:         { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1B2E45', overflow: 'hidden' },
  avatarLabel:    { fontSize: 12, color: '#8CA0B3' },

  // erro
  erroContainer:  { backgroundColor: '#1B2E45', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F97316' },
  erroEmoji:      { fontSize: 32 },
  erroTexto:      { fontSize: 12, color: '#F97316', marginTop: 4 },

  // grid
  gridImagens:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridItem:       { width: '47%', height: 100, borderRadius: 8, backgroundColor: '#1B2E45', overflow: 'hidden' },
});
