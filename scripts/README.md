# 🛠️ Scripts de Setup — Programação para Dispositivos Móveis
## TADS 2026.1

---

## 📁 Arquivos disponíveis

| Arquivo | O que faz |
|---------|-----------|
| `INSTALAR-TUDO.bat` | **Instala tudo** com um duplo clique |
| `VERIFICAR-AMBIENTE.bat` | **Verifica** se o ambiente está ok |
| `setup-ambiente.ps1` | Script PowerShell completo (chamado pelo .bat) |
| `instalar-extensoes-vscode.ps1` | Instala só as extensões do VS Code |
| `verificar-ambiente.ps1` | Script de diagnóstico (chamado pelo .bat) |

---

## 🚀 Como usar (alunos)

### Primeira vez — instalar tudo

1. Baixe a pasta `scripts` do GitHub do professor
2. Clique com **botão direito** em `INSTALAR-TUDO.bat`
3. Selecione **"Executar como administrador"**
4. Siga as instruções na tela
5. Ao final, **feche e reabra o terminal**

### Verificar se está tudo certo

1. Clique duas vezes em `VERIFICAR-AMBIENTE.bat`
2. Todos os itens devem mostrar ✅
3. Se aparecer ❌, execute o `INSTALAR-TUDO.bat` novamente

---

## 📦 O que é instalado

### Ferramentas do sistema
- **Node.js LTS** — runtime JavaScript (base de tudo)
- **npm** — gerenciador de pacotes (vem com o Node.js)
- **Git** — controle de versão
- **VS Code** — editor de código

### Ferramentas de desenvolvimento
- **Expo CLI** — criar e rodar projetos Expo
- **EAS CLI** — build e publicação na loja
- **TypeScript** — linguagem tipada (superset do JS)
- **Prettier** — formatador de código

### Extensões do VS Code
| Extensão | Função |
|----------|--------|
| ES7+ React Snippets | Atalhos de código (`rafce`, `us`, etc.) |
| Prettier | Formata ao salvar |
| ESLint | Detecta erros em tempo real |
| React Native Tools | Debug e ferramentas RN |
| Auto Rename Tag | Renomeia tags JSX automaticamente |
| GitLens | Histórico e blame do Git |
| Indent Rainbow | Coloriza indentação |
| Color Highlight | Mostra cores hexadecimais no código |
| Thunder Client | Testa APIs REST dentro do VS Code |
| Material Icon Theme | Ícones coloridos no explorador |
| Tokyo Night | Tema escuro recomendado |

---

## ⚠️ Requisitos

- Windows 10 versão 1809 ou superior (para Winget)
- Conexão com a internet
- Permissão de administrador

---

## 🔧 Solução de problemas

### "winget não encontrado"
Instale o **App Installer** pela Microsoft Store:
```
ms-windows-store://pdp/?ProductId=9NBLGGH4NNS1
```

### "Execution Policy" bloqueado
Abra o PowerShell como Administrador e execute:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js não encontrado após instalação
Feche **todos** os terminais abertos e abra um novo.  
O PATH só é atualizado em novas sessões.

### Extensões do VS Code não aparecem
1. Feche e reabra o VS Code
2. Execute manualmente: `code --install-extension ID_DA_EXTENSAO`

---

## 📱 Próximos passos após a instalação

```bash
# 1. Criar um novo projeto Expo
npx create-expo-app meu-primeiro-app

# 2. Entrar na pasta
cd meu-primeiro-app

# 3. Iniciar o servidor de desenvolvimento
npx expo start

# 4. Escanear o QR code com o Expo Go no celular
```

**Links importantes:**
- Snack (sem instalar nada): https://snack.expo.dev
- Expo Go (Android): https://play.google.com/store/apps/details?id=host.exp.exponent
- Expo Go (iOS): https://apps.apple.com/app/expo-go/id982107779
- Documentação Expo: https://docs.expo.dev
- Documentação React Native: https://reactnative.dev

---

*Programação para Dispositivos Móveis · TADS 2026.1*
