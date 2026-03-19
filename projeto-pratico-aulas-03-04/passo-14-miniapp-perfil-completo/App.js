// ============================================================
// PASSO 14 — Mini-App Final: Perfil de Aluno Completo
// Disciplina: Programação para Dispositivos Móveis
// Aulas 03 + 04 — PROJETO INTEGRADOR FINAL
// ============================================================
//
// INTEGRA TUDO que foi ensinado nas aulas 03 e 04:
//   ✅ Variáveis (const, let)
//   ✅ Arrow functions e funções puras
//   ✅ Arrays (.map, .filter, .reduce)
//   ✅ Objetos e destructuring
//   ✅ Template literals
//   ✅ useState com múltiplos estados
//   ✅ View, Text, TextInput, Image
//   ✅ Flexbox completo (row, column, flex, justify, align)
//   ✅ TouchableOpacity e Pressable
//   ✅ ScrollView
//   ✅ StyleSheet
//
// NÍVEL: ⭐⭐⭐ App completo de produção
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  ScrollView, StyleSheet, Pressable,
} from 'react-native';

// ── Dados do perfil (objeto com propriedades variadas)
const PERFIL_INICIAL = {
  nome: 'Ana Paula Costa',
  matricula: 'MAT-00042',
  curso: 'TADS',
  semestre: 4,
  email: 'ana.costa@aluno.ifam.edu.br',
  cidade: 'Manaus, AM',
  bio: 'Apaixonada por tecnologia mobile e UI/UX. Desenvolvendo meu primeiro app com React Native!',
  avatar: 'https://i.pravatar.cc/150?img=47',
  redes: [
    { rede: 'GitHub',   handle: '@ana-costa',   emoji: '🐙' },
    { rede: 'LinkedIn', handle: 'Ana Paula C.', emoji: '💼' },
    { rede: 'Snack',    handle: 'anapaula.dev', emoji: '📱' },
  ],
};

const DISCIPLINAS = [
  { nome: 'Prog. Mobile',       nota: 9.2, faltas: 1, cor: '#38bdf8' },
  { nome: 'Banco de Dados',     nota: 7.8, faltas: 2, cor: '#a78bfa' },
  { nome: 'Engenharia de Soft.', nota: 8.5, faltas: 0, cor: '#4ade80' },
  { nome: 'Redes',              nota: 6.4, faltas: 4, cor: '#fbbf24' },
  { nome: 'IA Aplicada',        nota: 9.8, faltas: 0, cor: '#f472b6' },
];

const CONQUISTAS = [
  { emoji: '🏆', titulo: 'Nota 10',       desc: 'Máximo em IA Aplicada'  },
  { emoji: '🎯', titulo: '0 Faltas',      desc: 'Presença perfeita'      },
  { emoji: '⚡', titulo: 'Maratona',      desc: '5 apps em 30 dias'      },
  { emoji: '🌟', titulo: 'Top Aluno',     desc: 'Melhor média da turma'  },
];

// ── Funções puras (Aula 03)
const calcularMedia = (disciplinas) => {
  const soma = disciplinas.reduce((acc, d) => acc + d.nota, 0);
  return (soma / disciplinas.length).toFixed(1);
};

const totalFaltas   = (disciplinas) => disciplinas.reduce((acc, d) => acc + d.faltas, 0);
const aprovadas     = (disciplinas) => disciplinas.filter(d => d.nota >= 7).length;
const formatarNota  = (nota) => nota.toFixed(1);
const corDaNota     = (nota) => nota >= 9 ? '#4ade80' : nota >= 7 ? '#fbbf24' : '#f87171';

// ────────────────────────────────────────────────────────────

export default function App() {
  const [perfil,       setPerfil]       = useState(PERFIL_INICIAL);
  const [editando,     setEditando]     = useState(false);
  const [abaBio,       setAbaBio]       = useState('notas'); // 'notas' | 'conquistas' | 'sobre'
  const [nomeTmp,      setNomeTmp]      = useState(perfil.nome);
  const [bioTmp,       setBioTmp]       = useState(perfil.bio);
  const [curtidas,     setCurtidas]     = useState({ 0: false, 1: false, 2: false, 3: false });

  const media        = calcularMedia(DISCIPLINAS);
  const faltas       = totalFaltas(DISCIPLINAS);
  const qtdAprovadas = aprovadas(DISCIPLINAS);

  const salvarEdicao = () => {
    setPerfil(prev => ({ ...prev, nome: nomeTmp, bio: bioTmp })); // spread sem mutar
    setEditando(false);
  };

  const curtirConquista = (i) =>
    setCurtidas(prev => ({ ...prev, [i]: !prev[i] }));

  const ABAS = ['notas', 'conquistas', 'sobre'];

  return (
    <ScrollView style={s.container} contentContainerStyle={s.inner}>

      {/* ── HEADER: Capa + Avatar */}
      <View style={s.capa}>
        <View style={s.capaGradiente} />
        <Text style={s.capaEmoji}>🎓</Text>
      </View>

      <View style={s.avatarRow}>
        <View style={s.avatarWrap}>
          <Image
            source={{ uri: perfil.avatar }}
            style={s.avatar}
            resizeMode="cover"
          />
          <View style={s.avatarBadge}>
            <Text style={{ fontSize: 12 }}>⭐</Text>
          </View>
        </View>
        <TouchableOpacity style={s.btnEditar} onPress={() => setEditando(v => !v)} activeOpacity={0.8}>
          <Text style={s.btnEditarTexto}>{editando ? '✕' : '✏️ Editar'}</Text>
        </TouchableOpacity>
      </View>

      {/* ── Nome e info */}
      {editando ? (
        <View style={s.editForm}>
          <TextInput style={s.editInput} value={nomeTmp} onChangeText={setNomeTmp} placeholder="Nome" placeholderTextColor="#475569" />
          <TextInput style={[s.editInput, { height: 80 }]} value={bioTmp} onChangeText={setBioTmp} placeholder="Biografia" placeholderTextColor="#475569" multiline />
          <TouchableOpacity style={s.btnSalvar} onPress={salvarEdicao} activeOpacity={0.8}>
            <Text style={s.btnSalvarTexto}>💾 Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={s.infoBloco}>
          <Text style={s.nomeTexto}>{perfil.nome}</Text>
          <Text style={s.subTexto}>{perfil.curso} · {perfil.semestre}º Semestre · {perfil.cidade}</Text>
          <Text style={s.matriculaTexto}>{perfil.matricula}</Text>
        </View>
      )}

      {/* ── Estatísticas rápidas */}
      <View style={s.statsRow}>
        <StatCard valor={media}           label="Média"    cor="#4ade80" />
        <StatCard valor={String(faltas)}  label="Faltas"   cor="#f87171" />
        <StatCard valor={`${qtdAprovadas}/${DISCIPLINAS.length}`} label="Aprovadas" cor="#38bdf8" />
      </View>

      {/* ── Abas */}
      <View style={s.abas}>
        {ABAS.map(aba => (
          <TouchableOpacity
            key={aba}
            style={[s.abaItem, abaBio === aba && s.abaAtiva]}
            onPress={() => setAbaBio(aba)}
          >
            <Text style={[s.abaTexto, abaBio === aba && s.abaTextoAtivo]}>
              {aba === 'notas' ? '📊 Notas' : aba === 'conquistas' ? '🏆 Badges' : '👤 Sobre'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Aba: Notas */}
      {abaBio === 'notas' && DISCIPLINAS.map((d, i) => (
        <View key={i} style={s.disciplinaCard}>
          <View style={[s.disciplinaBar, { backgroundColor: d.cor + '33' }]}>
            <View style={[s.disciplinaFill, { width: `${d.nota * 10}%`, backgroundColor: d.cor }]} />
          </View>
          <View style={s.disciplinaRow}>
            <Text style={s.disciplinaNome} numberOfLines={1}>{d.nome}</Text>
            <Text style={s.disciplinaFaltas}>{d.faltas} falta(s)</Text>
            <Text style={[s.disciplinaNota, { color: corDaNota(d.nota) }]}>{formatarNota(d.nota)}</Text>
          </View>
        </View>
      ))}

      {/* ── Aba: Conquistas */}
      {abaBio === 'conquistas' && (
        <View style={s.conquistasGrid}>
          {CONQUISTAS.map((c, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [s.conquistaCard, pressed && { opacity: 0.8 }, curtidas[i] && s.conquistaCurtida]}
              onPress={() => curtirConquista(i)}
            >
              <Text style={{ fontSize: 32 }}>{c.emoji}</Text>
              <Text style={s.conquTitulo}>{c.titulo}</Text>
              <Text style={s.conquDesc}>{c.desc}</Text>
              <Text style={[s.conquCurtir, curtidas[i] && { color: '#f87171' }]}>
                {curtidas[i] ? '❤️' : '🤍'}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* ── Aba: Sobre */}
      {abaBio === 'sobre' && (
        <View style={s.sobreBloco}>
          <Text style={s.bioTexto}>{perfil.bio}</Text>
          <Text style={s.sobreLabel}>Redes & Contatos</Text>
          {perfil.redes.map((r, i) => (
            <View key={i} style={s.redesRow}>
              <Text style={s.redesEmoji}>{r.emoji}</Text>
              <Text style={s.redesNome}>{r.rede}</Text>
              <Text style={s.redesHandle}>{r.handle}</Text>
            </View>
          ))}
          <Text style={s.sobreLabel}>E-mail institucional</Text>
          <Text style={s.emailTexto}>{perfil.email}</Text>
        </View>
      )}

    </ScrollView>
  );
}

const StatCard = ({ valor, label, cor }) => (
  <View style={s.statCard}>
    <Text style={[s.statValor, { color: cor }]}>{valor}</Text>
    <Text style={s.statLabel}>{label}</Text>
  </View>
);

const s = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#0f172a' },
  inner:            { paddingBottom: 50 },
  capa:             { height: 120, backgroundColor: '#0c4a6e', justifyContent: 'center', alignItems: 'center' },
  capaGradiente:    { ...StyleSheet.absoluteFillObject, backgroundColor: '#0ea5e9', opacity: 0.3 },
  capaEmoji:        { fontSize: 48 },
  avatarRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, marginTop: -40, marginBottom: 8 },
  avatarWrap:       { position: 'relative' },
  avatar:           { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: '#0f172a' },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#fbbf24', borderRadius: 10, padding: 2,
  },
  btnEditar:        { backgroundColor: '#1e293b', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  btnEditarTexto:   { color: '#38bdf8', fontSize: 13, fontWeight: 'bold' },
  editForm:         { padding: 20, gap: 10 },
  editInput: {
    backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 10,
    padding: 12, fontSize: 14, borderWidth: 1.5, borderColor: '#334155',
  },
  btnSalvar:        { backgroundColor: '#0ea5e9', borderRadius: 10, padding: 12, alignItems: 'center' },
  btnSalvarTexto:   { color: '#fff', fontWeight: 'bold' },
  infoBloco:        { paddingHorizontal: 20, marginBottom: 16 },
  nomeTexto:        { color: '#f8fafc', fontSize: 22, fontWeight: 'bold' },
  subTexto:         { color: '#64748b', fontSize: 13, marginTop: 2 },
  matriculaTexto:   { color: '#38bdf8', fontSize: 11, fontFamily: 'monospace', marginTop: 4 },
  statsRow:         { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  statCard:         { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 12, alignItems: 'center' },
  statValor:        { fontSize: 22, fontWeight: 'bold' },
  statLabel:        { color: '#64748b', fontSize: 10, marginTop: 2 },
  abas:             { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1e293b', marginHorizontal: 20, marginBottom: 16 },
  abaItem:          { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  abaAtiva:         { borderBottomColor: '#38bdf8' },
  abaTexto:         { color: '#64748b', fontSize: 12 },
  abaTextoAtivo:    { color: '#38bdf8', fontWeight: 'bold' },
  disciplinaCard:   { marginHorizontal: 20, marginBottom: 8, backgroundColor: '#1e293b', borderRadius: 10, padding: 10, gap: 6 },
  disciplinaBar:    { height: 6, borderRadius: 3, overflow: 'hidden' },
  disciplinaFill:   { height: '100%', borderRadius: 3 },
  disciplinaRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  disciplinaNome:   { color: '#e2e8f0', fontSize: 13, flex: 1 },
  disciplinaFaltas: { color: '#64748b', fontSize: 11, marginHorizontal: 8 },
  disciplinaNota:   { fontWeight: 'bold', fontSize: 16, minWidth: 32, textAlign: 'right' },
  conquistasGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  conquistaCard: {
    width: '47%', backgroundColor: '#1e293b', borderRadius: 12, padding: 14,
    alignItems: 'center', gap: 4,
  },
  conquistaCurtida: { backgroundColor: '#1c1428' },
  conquTitulo:      { color: '#f8fafc', fontSize: 13, fontWeight: 'bold' },
  conquDesc:        { color: '#64748b', fontSize: 11, textAlign: 'center' },
  conquCurtir:      { fontSize: 18 },
  sobreBloco:       { paddingHorizontal: 20 },
  bioTexto:         { color: '#94a3b8', fontSize: 13, lineHeight: 22, marginBottom: 16 },
  sobreLabel:       { color: '#f59e0b', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  redesRow:         { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, backgroundColor: '#1e293b', borderRadius: 8, padding: 10 },
  redesEmoji:       { fontSize: 18 },
  redesNome:        { color: '#94a3b8', fontSize: 12, width: 70 },
  redesHandle:      { color: '#38bdf8', fontSize: 12, fontFamily: 'monospace' },
  emailTexto:       { color: '#38bdf8', fontSize: 12, fontFamily: 'monospace', backgroundColor: '#1e293b', padding: 10, borderRadius: 8 },
});
