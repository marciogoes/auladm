# Configurador de VS Code — Programação para Dispositivos Móveis

Pacote PowerShell que deixa o **VS Code totalmente pronto** para trabalhar na disciplina (TADS 2026.1) seguindo o stack **React Native + Expo (Snack/Expo Go)**.

---

## Conteúdo desta pasta

| Arquivo | Função |
|---|---|
| `configurar-vscode-dm.ps1` | Script principal — roda uma vez e configura tudo |
| `.prettierrc` | Template de formatação (aspas simples, tab 2, 100 cols) |
| `.eslintrc.json` | Template de regras de lint |
| `jsconfig.json` | Template para IntelliSense em JS/JSX |
| `.gitignore` | Ignora `node_modules/`, `.expo/`, etc. |
| `README.md` | Este arquivo |

---

## O que o script faz

1. **Verifica pré-requisitos** — VS Code, Node.js e Git no PATH.
2. **Instala 19 extensões essenciais:**
   - **Core:** ESLint, Prettier, React Native Tools, Expo Tools, ES7+ snippets
   - **Produtividade:** Path/npm IntelliSense, Auto Rename/Close Tag, Color Highlight, Material Icon Theme, Error Lens
   - **Git:** GitLens, GitHub Pull Requests
   - **PT-BR:** pacote de idioma + corretor em português
   - **Markdown:** All in One, markdownlint (útil para roteiros práticos)
   - **Utilitários:** TODO Highlight
3. **Aplica `settings.json` global** com:
   - Format on Save + ESLint auto-fix
   - Tab de 2 espaços, aspas simples, Prettier como default
   - Emmet em JSX, auto-imports, sticky scroll
   - Terminal PowerShell, ícones Material, tema PT-BR
   - Dicionário já com palavras da disciplina (`Marcio`, `Expo`, `FlatList`, `TADS`, `Ionicons`, etc.)
4. **Instala snippets personalizados** usados no seu fluxo:

   | Prefixo | O que gera |
   |---|---|
   | `rnapp` | App.js básico com StyleSheet (paleta navy/orange) |
   | `rnstate` | Componente com `useState` |
   | `rnasync` | `async/await` com `try/catch` |
   | `rnmap` | FlatList básica |
   | `rneffect` | `useEffect` com cleanup |
   | `rnscreen` | Tela com `navigation` |
   | `rnicon` | Import + uso de Ionicons |
   | `rnstyle` | `StyleSheet.create` vazio |
   | `clg` | `console.log` com rótulo |

5. **Cria pasta de templates reutilizáveis** em `%USERPROFILE%\vscode-dm-base\`.

---

## Como usar

### 1. Liberar execução de scripts (só precisa uma vez)

Abra o **PowerShell** e rode:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 2. Executar o script

```powershell
cd "C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\configurar-vscode"
.\configurar-vscode-dm.ps1
```

### 3. Parâmetros opcionais

```powershell
# Pula extensões (se já estão instaladas)
.\configurar-vscode-dm.ps1 -PularExtensoes

# Pula verificação do Node.js
.\configurar-vscode-dm.ps1 -PularNode

# Saída detalhada
.\configurar-vscode-dm.ps1 -Verboso
```

---

## Depois de executar

1. **Feche e reabra o VS Code** (para o pacote PT-BR aplicar).
2. **Teste um snippet:** crie `App.js`, digite `rnapp`, pressione `Tab`.
3. **Em uma aula nova**, copie os templates base para o projeto:

   ```powershell
   Copy-Item "$env:USERPROFILE\vscode-dm-base\*" -Destination . -Recurse -Force
   ```

   Ou, direto desta pasta:

   ```powershell
   Copy-Item "C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\configurar-vscode\.prettierrc","C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\configurar-vscode\.eslintrc.json","C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\configurar-vscode\jsconfig.json","C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\configurar-vscode\.gitignore" -Destination . -Force
   ```

---

## Backup automático

O script faz backup com timestamp antes de sobrescrever:

- `settings.json` → `settings.json.backup_AAAAMMDD_HHMMSS`
- `react-native-dm.code-snippets` → mesmo padrão

Se algo der errado, basta renomear o backup de volta.

---

## Requisitos

- Windows 10/11
- PowerShell 5.1+ (já vem no Windows)
- VS Code com `code` no PATH
- Node.js LTS (recomendado, opcional se só usa Snack)

---

**Professor Marcio Goes** — TADS 2026.1
