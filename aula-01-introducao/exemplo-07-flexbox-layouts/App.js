/**
 * Exemplo 07 — Flexbox no Mobile
 * 
 * Conceitos: flexDirection, justifyContent, alignItems, flex, gap.
 * 
 * Referência: Slide 8 — "Estilização no Mobile"
 * Ponto principal: flexDirection padrão no mobile é COLUMN (vertical),
 *                  enquanto na web é ROW (horizontal).
 * 
 * Pontos de atenção para os alunos:
 * - Flexbox no React Native funciona como na web, com uma diferença:
 *   O padrão é column (vertical), não row (horizontal)
 * - StyleSheet.create() para definir estilos
 * - Todos os layouts mobile são construídos com Flexbox
 */

import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Componente auxiliar: Caixa colorida
const Caixa = ({ cor, label, tamanho = 60 }) => (
  <View style={[styles.caixa, { backgroundColor: cor, width: tamanho, height: tamanho }]}>
    <Text style={styles.caixaTexto}>{label}</Text>
  </View>
);

const App = () => {
  const [exemploAtual, setExemploAtual] = useState(0);

  const exemplos = [
    {
      titulo: 'flexDirection: column (PADRÃO mobile)',
      descricao: 'Itens empilhados verticalmente — diferente da web!',
      estilo: { flexDirection: 'column' },
    },
    {
      titulo: 'flexDirection: row',
      descricao: 'Itens lado a lado — padrão na web, explícito no mobile',
      estilo: { flexDirection: 'row' },
    },
    {
      titulo: 'justifyContent: center',
      descricao: 'Centraliza no eixo principal',
      estilo: { flexDirection: 'row', justifyContent: 'center' },
    },
    {
      titulo: 'justifyContent: space-between',
      descricao: 'Distribui espaço entre os itens',
      estilo: { flexDirection: 'row', justifyContent: 'space-between' },
    },
    {
      titulo: 'justifyContent: space-around',
      descricao: 'Espaço igual ao redor de cada item',
      estilo: { flexDirection: 'row', justifyContent: 'space-around' },
    },
    {
      titulo: 'alignItems: center',
      descricao: 'Centraliza no eixo cruzado',
      estilo: { flexDirection: 'row', alignItems: 'center', minHeight: 120 },
    },
    {
      titulo: 'flex: 1, 2, 1 (proporções)',
      descricao: 'Distribui espaço proporcionalmente',
      estilo: { flexDirection: 'row' },
      usarFlex: true,
    },
    {
      titulo: 'Layout completo: Header + Content + Footer',
      descricao: 'Combinando flex para layout de app real',
      layoutCompleto: true,
    },
  ];

  const exemplo = exemplos[exemploAtual];

  const renderExemplo = () => {
    if (exemplo.layoutCompleto) {
      return (
        <View style={styles.layoutCompleto}>
          <View style={styles.header}>
            <Text style={styles.headerTexto}>🔝 Header (fixo)</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTexto}>📄 Conteúdo (flex: 1)</Text>
            <Text style={styles.contentSub}>Ocupa todo o espaço disponível</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerTexto}>🔽 Footer (fixo)</Text>
          </View>
        </View>
      );
    }

    if (exemplo.usarFlex) {
      return (
        <View style={[styles.demoArea, exemplo.estilo]}>
          <View style={[styles.caixa, { backgroundColor: '#F44336', flex: 1 }]}>
            <Text style={styles.caixaTexto}>flex:1</Text>
          </View>
          <View style={[styles.caixa, { backgroundColor: '#4CAF50', flex: 2 }]}>
            <Text style={styles.caixaTexto}>flex:2</Text>
          </View>
          <View style={[styles.caixa, { backgroundColor: '#2196F3', flex: 1 }]}>
            <Text style={styles.caixaTexto}>flex:1</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.demoArea, exemplo.estilo]}>
        <Caixa cor="#F44336" label="A" />
        <Caixa cor="#4CAF50" label="B" />
        <Caixa cor="#2196F3" label="C" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📐 Flexbox Mobile</Text>
      <Text style={styles.subtitulo}>
        ⚠️ Padrão: column (vertical), não row!
      </Text>

      {/* Área de demonstração */}
      <View style={styles.demoContainer}>
        <Text style={styles.exemploTitulo}>{exemplo.titulo}</Text>
        <Text style={styles.exemploDesc}>{exemplo.descricao}</Text>
        {renderExemplo()}
      </View>

      {/* Navegação entre exemplos */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navBtn, exemploAtual === 0 && styles.navBtnDisabled]}
          onPress={() => setExemploAtual(Math.max(0, exemploAtual - 1))}
          disabled={exemploAtual === 0}
        >
          <Text style={styles.navBtnTexto}>◀ Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.navCount}>
          {exemploAtual + 1}/{exemplos.length}
        </Text>

        <TouchableOpacity
          style={[styles.navBtn, exemploAtual === exemplos.length - 1 && styles.navBtnDisabled]}
          onPress={() => setExemploAtual(Math.min(exemplos.length - 1, exemploAtual + 1))}
          disabled={exemploAtual === exemplos.length - 1}
        >
          <Text style={styles.navBtnTexto}>Próximo ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F0F4F8',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  subtitulo: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
    marginBottom: 16,
  },
  demoContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exemploTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    fontFamily: 'monospace',
  },
  exemploDesc: {
    fontSize: 13,
    color: '#777',
    marginBottom: 16,
  },
  demoArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  caixa: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  caixaTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Layout completo
  layoutCompleto: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    backgroundColor: '#1976D2',
    padding: 16,
    alignItems: 'center',
  },
  headerTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  contentSub: {
    fontSize: 13,
    color: '#64B5F6',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#333',
    padding: 16,
    alignItems: 'center',
  },
  footerTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Navegação
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  navBtn: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navBtnDisabled: {
    backgroundColor: '#CCC',
  },
  navBtnTexto: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  navCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default App;
