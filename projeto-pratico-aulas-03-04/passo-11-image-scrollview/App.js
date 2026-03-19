// ============================================================
// PASSO 11 — Image, ScrollView e Lista com .map()
// Disciplina: Programação para Dispositivos Móveis
// Aula 04 — Interface de Usuário I
// ============================================================
//
// OBJETIVO: Exibir imagens com o componente Image, criar
//           listas com ScrollView + .map() e construir
//           cards completos combinando vários componentes.
//
// CONCEITOS: Image (uri, require, resizeMode), ScrollView
//            horizontal, .map() na interface, onError de Image
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, TouchableOpacity,
} from 'react-native';

// ── Dados (simulando o que viria de uma API)
const TECNOLOGIAS = [
  {
    id: 1,
    nome: 'React Native',
    categoria: 'Mobile',
    descricao: 'Framework JavaScript para apps nativos iOS e Android.',
    cor: '#61dafb',
    emoji: '⚛️',
    nivel: 'Intermediário',
    logo: 'https://reactnative.dev/img/header_logo.svg',
  },
  {
    id: 2,
    nome: 'TypeScript',
    categoria: 'Linguagem',
    descricao: 'Superset de JavaScript com tipagem estática.',
    cor: '#3178c6',
    emoji: '🔷',
    nivel: 'Intermediário',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
  },
  {
    id: 3,
    nome: 'Expo',
    categoria: 'Plataforma',
    descricao: 'Ecossistema para desenvolver apps React Native rapidamente.',
    cor: '#ffffff',
    emoji: '📱',
    nivel: 'Iniciante',
    logo: 'https://static.expo.dev/static/brand/expo-icon.png',
  },
  {
    id: 4,
    nome: 'Node.js',
    categoria: 'Backend',
    descricao: 'Runtime JavaScript no servidor, base do ecossistema.',
    cor: '#6da55f',
    emoji: '🟢',
    nivel: 'Iniciante',
    logo: 'https://nodejs.org/static/images/logo.svg',
  },
  {
    id: 5,
    nome: 'Firebase',
    categoria: 'Backend',
    descricao: 'Plataforma do Google para auth, banco e armazenamento.',
    cor: '#ffca28',
    emoji: '🔥',
    nivel: 'Avançado',
    logo: 'https://www.gstatic.com/devrel-devsite/prod/v0/firebase/logo.svg',
  },
];

const NOTICIAS = [
  { id: 1, titulo: 'Expo SDK 52 lançado', tempo: '2h', lida: false },
  { id: 2, titulo: 'React Native 0.73 traz melhorias de performance', tempo: '5h', lida: true },
  { id: 3, titulo: 'TypeScript 5.4 com novos recursos de inferência', tempo: '1d', lida: false },
  { id: 4, titulo: 'Node.js 22 se torna LTS em outubro', tempo: '2d', lida: true },
];

// ── Componente de imagem com fallback (emoji) em caso de erro
const ImagemComFallback = ({ uri, fallback, size, borderColor }) => {
  const [erro, setErro] = useState(false);
  return erro ? (
    <View style={[estilos.imgFallback, { width: size, height: size, borderColor: borderColor || '#334155' }]}>
      <Text style={{ fontSize: size * 0.4 }}>{fallback}</Text>
    </View>
  ) : (
    <Image
      source={{ uri }}
      style={[estilos.imgTech, { width: size, height: size }]}
      resizeMode="contain"
      onError={() => setErro(true)}
    />
  );
};

// ────────────────────────────────────────────────────────────

export default function App() {
  const [tecSelecionada, setTecSelecionada] = useState(TECNOLOGIAS[0]);
  const [noticiasLidas, setNoticiasLidas]   = useState(
    NOTICIAS.filter(n => n.lida).map(n => n.id)
  );

  const marcarLida = (id) => {
    setNoticiasLidas(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.inner}>
      <Text style={estilos.titulo}>🖼️ Passo 11 — Image & ScrollView</Text>

      {/* ── Seção 1: Image com URI remota */}
      <Secao titulo="1. Image — resizeMode" />
      <Text style={estilos.desc}>O mesmo recurso com 4 modos de redimensionamento:</Text>
      <View style={estilos.modoRow}>
        {['cover', 'contain', 'stretch', 'center'].map(modo => (
          <View key={modo} style={estilos.modoItem}>
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              style={estilos.modoImg}
              resizeMode={modo}
            />
            <Text style={estilos.modoLabel}>{modo}</Text>
          </View>
        ))}
      </View>

      {/* ── Seção 2: ScrollView horizontal — carrossel */}
      <Secao titulo="2. ScrollView horizontal — carrossel de tecnologias" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.carrossel}>
        {TECNOLOGIAS.map(tec => (
          <TouchableOpacity
            key={tec.id}
            style={[
              estilos.cardCarrossel,
              tecSelecionada.id === tec.id && { borderColor: tec.cor, borderWidth: 2 },
            ]}
            onPress={() => setTecSelecionada(tec)}
            activeOpacity={0.8}
          >
            <ImagemComFallback uri={tec.logo} fallback={tec.emoji} size={48} borderColor={tec.cor} />
            <Text style={estilos.cardCarrosselNome} numberOfLines={1}>{tec.nome}</Text>
            <Text style={[estilos.cardCarrosselCat, { color: tec.cor }]}>{tec.categoria}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Detalhe da tecnologia selecionada */}
      <View style={[estilos.detalhe, { borderTopColor: tecSelecionada.cor }]}>
        <View style={estilos.detalheHeader}>
          <ImagemComFallback uri={tecSelecionada.logo} fallback={tecSelecionada.emoji} size={56} borderColor={tecSelecionada.cor} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={estilos.detalheNome}>{tecSelecionada.nome}</Text>
            <Text style={[estilos.detalheCat, { color: tecSelecionada.cor }]}>{tecSelecionada.categoria}</Text>
            <View style={[estilos.nivelBadge, { backgroundColor: tecSelecionada.cor + '22' }]}>
              <Text style={[estilos.nivelTexto, { color: tecSelecionada.cor }]}>{tecSelecionada.nivel}</Text>
            </View>
          </View>
        </View>
        <Text style={estilos.detalheDesc}>{tecSelecionada.descricao}</Text>
      </View>

      {/* ── Seção 3: Lista vertical com .map() */}
      <Secao titulo="3. Lista vertical com .map() — feed de notícias" />
      {NOTICIAS.map(noticia => {
        const lida = noticiasLidas.includes(noticia.id);
        return (
          <TouchableOpacity
            key={noticia.id}
            style={[estilos.noticiaCard, lida && estilos.noticiaLida]}
            onPress={() => marcarLida(noticia.id)}
            activeOpacity={0.75}
          >
            <View style={{ flex: 1 }}>
              <Text style={[estilos.noticiaTitulo, lida && { color: '#64748b' }]}>
                {!lida && '🔵 '}{noticia.titulo}
              </Text>
              <Text style={estilos.noticiaTexto}>{noticia.tempo} atrás</Text>
            </View>
            <Text style={estilos.noticiaCheck}>{lida ? '✅' : '○'}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={estilos.desc}>
        {noticiasLidas.length}/{NOTICIAS.length} lidas · Toque para marcar
      </Text>

      {/* ── Seção 4: Grid com imagens aleatórias */}
      <Secao titulo="4. Grid de imagens (ScrollView + .map())" />
      <View style={estilos.grid}>
        {Array.from({ length: 6 }, (_, i) => i + 10).map(n => (
          <Image
            key={n}
            source={{ uri: `https://picsum.photos/seed/${n}/200/200` }}
            style={estilos.gridImg}
            resizeMode="cover"
          />
        ))}
      </View>

    </ScrollView>
  );
}

const Secao = ({ titulo }) => <Text style={estilos.secao}>{titulo}</Text>;

const estilos = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#0f172a' },
  inner:            { padding: 20, paddingTop: 50, paddingBottom: 40 },
  titulo:           { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  secao:            { color: '#f59e0b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 24, marginBottom: 10 },
  desc:             { color: '#64748b', fontSize: 12, marginBottom: 8, lineHeight: 18 },
  modoRow:          { flexDirection: 'row', gap: 8, marginBottom: 4 },
  modoItem:         { flex: 1, alignItems: 'center' },
  modoImg:          { width: '100%', height: 70, backgroundColor: '#1e293b', borderRadius: 6 },
  modoLabel:        { color: '#64748b', fontSize: 9, marginTop: 4, fontFamily: 'monospace' },
  carrossel:        { marginBottom: 12 },
  cardCarrossel: {
    width: 100, backgroundColor: '#1e293b', borderRadius: 10, padding: 12,
    alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#334155',
  },
  cardCarrosselNome: { color: '#f8fafc', fontSize: 11, fontWeight: 'bold', marginTop: 6, textAlign: 'center' },
  cardCarrosselCat:  { fontSize: 9, marginTop: 2, textAlign: 'center' },
  imgTech:          { borderRadius: 6 },
  imgFallback: {
    borderRadius: 8, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1e293b',
  },
  detalhe: {
    backgroundColor: '#1e293b', borderRadius: 10, padding: 14,
    borderTopWidth: 3, marginBottom: 4,
  },
  detalheHeader:    { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detalheNome:      { color: '#f8fafc', fontSize: 18, fontWeight: 'bold' },
  detalheCat:       { fontSize: 12, marginTop: 2 },
  nivelBadge:       { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4, alignSelf: 'flex-start' },
  nivelTexto:       { fontSize: 10, fontWeight: 'bold' },
  detalheDesc:      { color: '#94a3b8', fontSize: 13, lineHeight: 20 },
  noticiaCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b',
    borderRadius: 10, padding: 12, marginBottom: 6,
  },
  noticiaLida:      { opacity: 0.5 },
  noticiaTitulo:    { color: '#e2e8f0', fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
  noticiaTexto:     { color: '#64748b', fontSize: 11 },
  noticiaCheck:     { fontSize: 18, marginLeft: 10 },
  grid:             { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  gridImg: {
    width: '31%', aspectRatio: 1, borderRadius: 8, backgroundColor: '#1e293b',
  },
});
