// ============================================================
// AULA 03 - Exemplo 05: TypeScript Básico no React Native
// Programação para Dispositivos Móveis - TADS 2026.1
// Prof. Marcio Goes do Nascimento
//
// OBJETIVO: Introduzir tipagem estática com TypeScript:
//           tipos primitivos, interfaces, union types,
//           props tipadas e funções tipadas.
// SLIDES RELACIONADOS: Módulo 05 — TypeScript
//
// ⚠️  ATENÇÃO: este arquivo usa extensão .tsx (não .js)
//              No snack.expo.dev, renomeie o arquivo para App.tsx
// Como testar: cole este código em snack.expo.dev (App.tsx)
// ============================================================

import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet
} from 'react-native';

// ── INTERFACES ────────────────────────────────────────────────
// Interface define o "contrato" de formato de um objeto.
// TypeScript vai apontar ERRO em tempo de compilação se o objeto
// não respeitar a interface.

interface Aluno {
  id: number;
  nome: string;
  email: string;
  semestre: number;
  curso: 'TADS' | 'SI' | 'CC' | 'EC';  // Union type — só esses valores!
  notas: number[];
  ativo?: boolean;                        // ? = campo opcional
}

interface ResultadoCalculo {
  media: number;
  status: 'Aprovado' | 'Recuperação' | 'Reprovado';
  cor: string;
}

// ── FUNÇÕES TIPADAS ───────────────────────────────────────────
// Parâmetros e retorno anotados com tipo

const calcularResultado = (notas: number[]): ResultadoCalculo => {
  const media = notas.reduce((s, n) => s + n, 0) / notas.length;

  if (media >= 7) return { media, status: 'Aprovado',    cor: '#27AE60' };
  if (media >= 5) return { media, status: 'Recuperação', cor: '#F39C12' };
  return                  { media, status: 'Reprovado',  cor: '#E74C3C' };
};

// Função com union type no parâmetro
const formatarCurso = (curso: Aluno['curso']): string => {
  const nomes: Record<Aluno['curso'], string> = {
    TADS: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    SI:   'Sistemas de Informação',
    CC:   'Ciência da Computação',
    EC:   'Engenharia da Computação',
  };
  return nomes[curso];
};

// Generics — função que funciona com qualquer tipo
function primeiros<T>(lista: T[], quantidade: number): T[] {
  return lista.slice(0, quantidade);
}

// ── DADOS TIPADOS ─────────────────────────────────────────────
const alunosIniciais: Aluno[] = [
  { id: 1, nome: 'Ana Souza',    email: 'ana@email.com',    semestre: 3, curso: 'TADS', notas: [9.5, 8.0, 9.0], ativo: true  },
  { id: 2, nome: 'Bruno Lima',   email: 'bruno@email.com',  semestre: 3, curso: 'TADS', notas: [6.0, 7.5, 5.5], ativo: true  },
  { id: 3, nome: 'Carla Mendes', email: 'carla@email.com',  semestre: 4, curso: 'SI',   notas: [8.5, 9.0, 8.0], ativo: false },
  { id: 4, nome: 'Diego Rocha',  email: 'diego@email.com',  semestre: 3, curso: 'TADS', notas: [4.0, 5.0, 4.5], ativo: true  },
];

// ── PROPS TIPADAS ─────────────────────────────────────────────
// Definindo a interface das props do componente

interface CardAlunoProps {
  aluno: Aluno;
  onSelecionar: (id: number) => void;
  selecionado: boolean;
}

// Componente com props tipadas — o TypeScript impede passar props erradas!
const CardAluno = ({ aluno, onSelecionar, selecionado }: CardAlunoProps) => {
  const resultado = calcularResultado(aluno.notas);

  return (
    <TouchableOpacity
      style={[styles.alunoCard, selecionado && styles.alunoCardSelecionado]}
      onPress={() => onSelecionar(aluno.id)}
      activeOpacity={0.8}
    >
      <View style={styles.alunoHeader}>
        <Text style={styles.alunoNome}>{aluno.nome}</Text>
        <View style={[styles.statusBadge, { backgroundColor: resultado.cor }]}>
          <Text style={styles.statusTexto}>{resultado.status}</Text>
        </View>
      </View>
      <Text style={styles.alunoInfo}>
        {aluno.curso} • {aluno.semestre}º sem • {aluno.ativo ? '🟢' : '🔴'}
      </Text>
      <Text style={styles.alunoMedia}>
        Média: <Text style={{ color: resultado.cor, fontWeight: 'bold' }}>
          {resultado.media.toFixed(1)}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

interface BadgeProps {
  texto: string;
  cor: string;
}

const Badge = ({ texto, cor }: BadgeProps) => (
  <View style={[styles.badge, { backgroundColor: cor + '33', borderColor: cor }]}>
    <Text style={[styles.badgeTexto, { color: cor }]}>{texto}</Text>
  </View>
);

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function App() {
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState<number | null>(null);
  const [aba, setAba] = useState<'alunos' | 'tipos' | 'generics'>('alunos');

  // TypeScript infere o tipo de alunoSelecionado como Aluno | undefined
  const alunoSelecionado = alunosIniciais.find((a) => a.id === alunoSelecionadoId);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>

      <View style={styles.cabecalho}>
        <View style={styles.cabecalhoTopo}>
          <Text style={styles.titulo}>TypeScript Básico</Text>
          <Badge texto="TS" cor="#007ACC" />
        </View>
        <Text style={styles.subtitulo}>Tipagem estática no React Native</Text>
      </View>

      {/* Abas */}
      <View style={styles.tabs}>
        {([
          { key: 'alunos',   label: '👥 Alunos' },
          { key: 'tipos',    label: '🔷 Tipos' },
          { key: 'generics', label: '⚙️ Generics' },
        ] as const).map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, aba === tab.key && styles.tabAtiva]}
            onPress={() => setAba(tab.key)}
          >
            <Text style={[styles.tabTexto, aba === tab.key && styles.tabTextoAtivo]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ABA: Alunos */}
      {aba === 'alunos' && (
        <>
          <Text style={styles.secaoTitulo}>Interface Aluno tipada:</Text>
          <View style={styles.codigoBox}>
            <Text style={styles.codigo}>
              {"interface Aluno {\n  id: number;\n  nome: string;\n  email: string;\n  semestre: number;\n  curso: 'TADS' | 'SI' | 'CC' | 'EC'; // union\n  notas: number[];\n  ativo?: boolean; // opcional\n}"}
            </Text>
          </View>

          <Text style={[styles.secaoTitulo, { marginTop: 16 }]}>
            Toque em um aluno para ver detalhes:
          </Text>
          {alunosIniciais.map((aluno) => (
            <CardAluno
              key={aluno.id}
              aluno={aluno}
              onSelecionar={setAlunoSelecionadoId}
              selecionado={aluno.id === alunoSelecionadoId}
            />
          ))}

          {/* Detalhe do aluno selecionado */}
          {alunoSelecionado && (
            <View style={styles.detalheCard}>
              <Text style={styles.detalheTitle}>📋 Detalhes — Inferência de Tipo</Text>
              {/* TypeScript infere os tipos de cada campo: */}
              {Object.entries(alunoSelecionado).map(([chave, valor]) => (
                <View key={chave} style={styles.detalheRow}>
                  <Text style={styles.detalheChave}>{chave}</Text>
                  <Text style={styles.detalheTipo}>
                    {Array.isArray(valor) ? 'number[]' : typeof valor}
                  </Text>
                  <Text style={styles.detalheValor}>
                    {Array.isArray(valor) ? `[${valor.join(', ')}]` : String(valor)}
                  </Text>
                </View>
              ))}
              <Text style={styles.detalheInfo}>
                Curso completo: {formatarCurso(alunoSelecionado.curso)}
              </Text>
            </View>
          )}
        </>
      )}

      {/* ABA: Tipos */}
      {aba === 'tipos' && (
        <>
          {[
            {
              titulo: 'Tipos Primitivos',
              cor: '#00B4D8',
              codigo: "let nome: string = 'Maria';\nlet idade: number = 21;\nlet ativo: boolean = true;\nlet nulo: null = null;\nlet lista: string[] = ['a','b','c'];\nlet tupla: [string, number] = ['TADS', 3];",
            },
            {
              titulo: 'Union Types — múltiplos tipos aceitos',
              cor: '#FF6B35',
              codigo: "let id: number | string;\nid = 42;        // ✅ number\nid = 'abc123';  // ✅ string\n// id = true;   // ❌ Erro de compilação!\n\ntype Status = 'ativo' | 'inativo' | 'pendente';\nlet s: Status = 'ativo';   // ✅\n// s = 'errado'; // ❌ Erro!",
            },
            {
              titulo: 'Type Alias',
              cor: '#27AE60',
              codigo: "// type define um apelido para um tipo\ntype ID = number | string;\ntype Nota = number;\ntype ListaNotas = Nota[];\ntype Callback = (erro: Error | null) => void;\n\n// Diferença de interface:\n// type = bom para unions, primitivos, funções\n// interface = melhor para objetos (suporta extends)",
            },
            {
              titulo: 'Funções Tipadas',
              cor: '#F39C12',
              codigo: "// Parâmetros e retorno tipados:\nconst somar = (a: number, b: number): number =>\n  a + b;\n\n// void = não retorna nada\nconst logar = (msg: string): void =>\n  console.log(msg);\n\n// Promise tipada:\nconst buscar = async (url: string): Promise<Response> =>\n  fetch(url);",
            },
          ].map((item) => (
            <View key={item.titulo} style={[styles.tipoCard, { borderLeftColor: item.cor }]}>
              <Text style={[styles.tipoTitulo, { color: item.cor }]}>{item.titulo}</Text>
              <View style={styles.codigoBox}>
                <Text style={styles.codigo}>{item.codigo}</Text>
              </View>
            </View>
          ))}
        </>
      )}

      {/* ABA: Generics */}
      {aba === 'generics' && (
        <>
          <Text style={styles.descricaoTexto}>
            Generics permitem criar funções e interfaces que funcionam com qualquer tipo, mantendo a segurança de tipos.
          </Text>

          <View style={styles.codigoBox}>
            <Text style={styles.codigo}>
              {"// <T> = 'slot' para qualquer tipo\nfunction primeiros<T>(lista: T[], n: number): T[] {\n  return lista.slice(0, n);\n}\n\nprimeiros<string>(['a','b','c','d'], 2);\n// ['a', 'b']  — TypeScript sabe que retorna string[]\n\nprimeiros<number>([1,2,3,4,5], 3);\n// [1, 2, 3]  — TypeScript sabe que retorna number[]\n\nprimeiros<Aluno>(alunosIniciais, 2);\n// [Aluno, Aluno]  — TypeScript infere o tipo!"}
            </Text>
          </View>

          <Text style={[styles.secaoTitulo, { marginTop: 16 }]}>Testando a função genérica:</Text>

          {[
            { label: 'primeiros<string>(cursos, 2)',    resultado: primeiros(['TADS','SI','CC','EC'], 2).join(', ') },
            { label: 'primeiros<number>(notas, 3)',     resultado: primeiros([9.5, 7.0, 8.5, 6.0], 3).join(', ') },
            { label: 'primeiros<Aluno>(alunos, 2)',     resultado: primeiros(alunosIniciais, 2).map(a => a.nome).join(', ') },
          ].map((t) => (
            <View key={t.label} style={styles.genericoRow}>
              <Text style={styles.genericoCodigo}>{t.label}</Text>
              <Text style={styles.genericoResultado}>▶ [{t.resultado}]</Text>
            </View>
          ))}

          <View style={[styles.dicaBox, { marginTop: 16 }]}>
            <Text style={styles.dicaTexto}>
              💡  useState{'<number | null>'}(null) — você usa generics toda vez que usa hooks! React Native usa generics extensivamente no SDK do TypeScript.
            </Text>
          </View>
        </>
      )}

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Próximo: Exemplo 06 — JSX e Listas</Text>
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
    marginBottom: 16, borderLeftWidth: 5, borderLeftColor: '#007ACC',
  },
  cabecalhoTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  subtitulo: { fontSize: 11, color: '#007ACC', fontFamily: 'monospace' },

  badge: {
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1.5,
  },
  badgeTexto: { fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },

  tabs: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  tab: { flex: 1, backgroundColor: '#1A2E45', borderRadius: 8, padding: 10, alignItems: 'center' },
  tabAtiva: { backgroundColor: '#243B55', borderBottomWidth: 2, borderBottomColor: '#007ACC' },
  tabTexto: { fontSize: 11, color: '#8899AA', fontWeight: '600' },
  tabTextoAtivo: { color: '#FFFFFF' },

  secaoTitulo: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  descricaoTexto: { fontSize: 12, color: '#8899AA', marginBottom: 10, lineHeight: 18 },

  codigoBox: {
    backgroundColor: '#0A1825', borderRadius: 6, padding: 10,
    borderWidth: 1, borderColor: '#243B55', marginBottom: 8,
  },
  codigo: { fontFamily: 'monospace', fontSize: 11, color: '#7EC8A4', lineHeight: 19 },

  alunoCard: {
    backgroundColor: '#1A2E45', borderRadius: 10,
    padding: 14, marginBottom: 8,
  },
  alunoCardSelecionado: { borderWidth: 1.5, borderColor: '#007ACC' },
  alunoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  alunoNome: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  statusBadge: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  statusTexto: { fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
  alunoInfo: { fontSize: 11, color: '#8899AA', marginBottom: 2 },
  alunoMedia: { fontSize: 12, color: '#CCDDEE' },

  detalheCard: {
    backgroundColor: '#0F2535', borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: '#007ACC', marginBottom: 14,
  },
  detalheTitle: { fontSize: 13, fontWeight: 'bold', color: '#007ACC', marginBottom: 10 },
  detalheRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#1A2E45' },
  detalheChave: { width: 80, fontSize: 11, color: '#8899AA', fontFamily: 'monospace' },
  detalheTipo: { width: 80, fontSize: 11, color: '#FFD166', fontFamily: 'monospace' },
  detalheValor: { flex: 1, fontSize: 11, color: '#7EC8A4', fontFamily: 'monospace' },
  detalheInfo: { fontSize: 11, color: '#007ACC', marginTop: 8, fontStyle: 'italic' },

  tipoCard: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 12,
    marginBottom: 10, borderLeftWidth: 4,
  },
  tipoTitulo: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, fontFamily: 'monospace' },

  genericoRow: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 10, marginBottom: 6,
  },
  genericoCodigo: { fontFamily: 'monospace', fontSize: 11, color: '#FFD166', marginBottom: 4 },
  genericoResultado: { fontFamily: 'monospace', fontSize: 11, color: '#7EC8A4' },

  dicaBox: {
    backgroundColor: '#1A2E45', borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: '#007ACC',
  },
  dicaTexto: { fontSize: 12, color: '#007ACC', lineHeight: 18 },

  rodape: {
    marginTop: 24, alignItems: 'center',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#243B55',
  },
  rodapeTexto: { fontSize: 12, color: '#8899AA' },
});
