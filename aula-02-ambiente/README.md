# Aula 02 — Ambiente de Desenvolvimento e Ecossistema Mobile

**Disciplina:** Programação para Dispositivos Móveis  
**Professor:** Marcio Goes do Nascimento  
**Turma:** TADS 2026.1

---

## Objetivos da Aula

- Compreender como o React Native funciona internamente (Bridge, Hermes)
- Instalar e configurar o ambiente de desenvolvimento local (Node.js, VS Code, Expo CLI)
- Conhecer o app Expo Go e como conectar o celular ao projeto
- Criar o primeiro projeto React Native via terminal
- Entender a anatomia de pastas de um projeto Expo

---

## Exemplos desta Aula

| Pasta | Slides | Descrição |
|-------|--------|-----------|
| `exemplo-01-anatomia-appjs` | 17, 18, 19 | Estrutura mínima de um App.js com comentários pedagógicos em cada linha |
| `exemplo-02-bridge-fast-refresh` | 3, 4, 22 | Diagrama interativo da Bridge, stats do Hermes e comparativo de Fast Refresh vs nativo |
| `exemplo-03-desafio-pratico` | 23 | Gabarito comentado do desafio: StatusBar personalizada + nome e curso centralizados |

---

## Como Testar

1. Acesse [snack.expo.dev](https://snack.expo.dev)
2. Abra o arquivo `App.js` do exemplo desejado
3. Copie o conteúdo e cole no editor do Snack
4. Escaneie o QR Code com o app **Expo Go** no celular

### Ou rode localmente:

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/marciogoes/auladm.git
cd auladm/aula-02-ambiente/exemplo-01-anatomia-appjs

# Instale as dependências
npm install

# Inicie o servidor
npx expo start
```

---

## Comandos Importantes da Aula

```bash
# Criar um novo projeto Expo
npx create-expo-app@latest MeuApp

# Iniciar o servidor de desenvolvimento
npx expo start

# Pressione no terminal:
# a → abrir no emulador Android
# i → abrir no simulador iOS (apenas macOS)
# w → abrir no navegador web
# s → alternar modo de conexão (LAN / Tunnel)
```

---

## Referências

- [Documentação do Expo](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Download Node.js LTS](https://nodejs.org)
- [Download VS Code](https://code.visualstudio.com)
- [Expo Go — Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go — iOS](https://apps.apple.com/app/expo-go/id982107779)
