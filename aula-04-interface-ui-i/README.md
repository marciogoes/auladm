# Aula 04 — Interface de Usuário I

**Disciplina:** Programação para Dispositivos Móveis  
**Professor:** Marcio Goes do Nascimento  
**Turma:** TADS 2026.1  
**Data:** 05 de Março de 2026  

---

## Objetivos da Aula

- Entender como o React Native renderiza componentes nativos (Bridge/JSI)
- Criar layouts responsivos com **View** e **Flexbox**
- Utilizar **StyleSheet.create()** para estilização performática
- Exibir e capturar texto com **Text** e **TextInput**
- Exibir imagens locais e remotas com **Image**
- Criar botões com **Button**, **TouchableOpacity** e **Pressable**
- Gerenciar rolagem com **ScrollView** e proteção de área com **SafeAreaView**

---

## Estrutura dos Exemplos

| # | Pasta | Conceitos Abordados |
|---|-------|---------------------|
| 01 | `exemplo-01-view-stylesheet` | View, StyleSheet.create(), backgroundColor, padding, margin, borderRadius, aninhamento |
| 02 | `exemplo-02-flexbox-layouts` | flexDirection, justifyContent, alignItems, flex, flexWrap, gap — demo interativa |
| 03 | `exemplo-03-text-textinput` | Text, aninhamento, numberOfLines, ellipsizeMode, TextInput controlled, keyboardType, secureTextEntry, multiline |
| 04 | `exemplo-04-image` | Image remota, resizeMode (cover/contain/stretch/center), borderRadius circular, onLoad, onError |
| 05 | `exemplo-05-botoes` | Button, TouchableOpacity (activeOpacity), Pressable (pressed state), disabled, Alert, onLongPress |
| 06 | `exemplo-06-scrollview-safeareaview` | SafeAreaView, ScrollView vertical, ScrollView horizontal, contentContainerStyle, onScroll, ScrollView vs FlatList |
| 07 | `exemplo-07-app-cadastro` | **GABARITO** — App completo com validação (3 níveis de desafio) |

---

## Como Testar

### Opção 1 — Snack Expo (recomendado, sem instalação)

1. Acesse [snack.expo.dev](https://snack.expo.dev)
2. Abra o arquivo `App.js` do exemplo desejado
3. Copie todo o conteúdo e cole no editor do Snack
4. Escaneie o QR Code com o **Expo Go** no celular

### Opção 2 — Repositório local

```bash
cd projaulasdm/aula-04-interface-ui-i/exemplo-07-app-cadastro
npx expo start
```

---

## Desafio Prático (Exemplo 07)

O `exemplo-07-app-cadastro` é o **gabarito** do desafio proposto em aula.  
Os alunos devem tentar construir o app por conta própria antes de consultar o gabarito.

| Nível | Requisito |
|-------|-----------|
| ⭐ Nível 1 | App funcional: 3 TextInputs (nome, e-mail, senha) + botão + exibição reativa do nome |
| ⭐⭐ Nível 2 | Validar e-mail (deve conter `@`) e exibir aviso de erro inline |
| ⭐⭐⭐ Nível 3 | Limpar campos após cadastro + mensagem de sucesso + lista de usuários cadastrados |

---

## Próxima Aula

**Aula 05 — Interface de Usuário II** (12/03/2026)  
- Listas dinâmicas com `FlatList` e `SectionList`  
- Navegação entre telas com **React Navigation**  

### Para estudar antes:
- Documentação: [reactnative.dev/docs/view](https://reactnative.dev/docs/view)
- Documentação: [reactnative.dev/docs/text](https://reactnative.dev/docs/text)
- Complete o Desafio Nível 2 do app de cadastro
