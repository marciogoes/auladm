# ============================================================================
#  CONFIGURADOR AUTOMATICO DE VS CODE
#  Disciplina: Programacao para Dispositivos Moveis - TADS 2026.1
#  Professor : Marcio Goes
#  Stack     : React Native + Expo (Snack/Expo Go)
# ----------------------------------------------------------------------------
#  Este script deixa o VS Code pronto para:
#    - Editar projetos React Native / Expo com lint, format e IntelliSense
#    - Usar snippets personalizados (rnapp, rnstate, rnasync, rnmap, etc.)
#    - Integrar com Git/GitHub (repo auladm)
#    - Gerar materiais programaticamente (pptxgenjs, docx, etc.)
#    - Desenvolver nas aulas sem friccao de setup entre maquinas
# ============================================================================

#Requires -Version 5.1

[CmdletBinding()]
param(
    [switch]$PularExtensoes,
    [switch]$PularNode,
    [switch]$Verboso
)

$ErrorActionPreference = "Stop"
if ($Verboso) { $VerbosePreference = "Continue" }

# ---------------------------------------------------------------------------
# Utilidades de saida colorida
# ---------------------------------------------------------------------------
function Write-Titulo {
    param([string]$Texto)
    Write-Host ""
    Write-Host ("=" * 70) -ForegroundColor DarkCyan
    Write-Host (" " + $Texto) -ForegroundColor Cyan
    Write-Host ("=" * 70) -ForegroundColor DarkCyan
}

function Write-Passo  { param([string]$t) Write-Host "[PASSO] $t" -ForegroundColor Yellow }
function Write-Ok     { param([string]$t) Write-Host "  [OK]  $t" -ForegroundColor Green }
function Write-Info   { param([string]$t) Write-Host "  [..]  $t" -ForegroundColor Gray }
function Write-Aviso  { param([string]$t) Write-Host "  [!!]  $t" -ForegroundColor Yellow }
function Write-Erro   { param([string]$t) Write-Host "  [ERRO]$t" -ForegroundColor Red }

# ---------------------------------------------------------------------------
# 0. Verificacoes iniciais
# ---------------------------------------------------------------------------
Write-Titulo "Configurador VS Code - Programacao para Dispositivos Moveis"
Write-Host " Professor Marcio Goes  |  TADS 2026.1  |  React Native + Expo" -ForegroundColor DarkGray
Write-Host ""

Write-Passo "Verificando pre-requisitos..."

# VS Code
try {
    $codeVersion = & code --version 2>$null
    if ($LASTEXITCODE -ne 0) { throw "code nao encontrado" }
    Write-Ok "VS Code detectado: v$($codeVersion[0])"
} catch {
    Write-Erro "VS Code nao esta no PATH. Instale em: https://code.visualstudio.com/"
    Write-Aviso "Apos instalar, marque a opcao 'Adicionar ao PATH'."
    exit 1
}

# Node.js
if (-not $PularNode) {
    try {
        $nodeVersion = & node --version 2>$null
        if ($LASTEXITCODE -ne 0) { throw "node nao encontrado" }
        Write-Ok "Node.js detectado: $nodeVersion"
    } catch {
        Write-Aviso "Node.js nao encontrado. Instale LTS em: https://nodejs.org/"
        Write-Aviso "Prosseguindo mesmo assim (use -PularNode para silenciar)."
    }

    try {
        $npmVersion = & npm --version 2>$null
        if ($LASTEXITCODE -eq 0) { Write-Ok "npm detectado: v$npmVersion" }
    } catch { }
}

# Git
try {
    $gitVersion = & git --version 2>$null
    if ($LASTEXITCODE -eq 0) { Write-Ok "Git detectado: $gitVersion" }
} catch {
    Write-Aviso "Git nao encontrado. Recomendado instalar: https://git-scm.com/"
}

# ---------------------------------------------------------------------------
# 1. Instalar extensoes do VS Code
# ---------------------------------------------------------------------------
if (-not $PularExtensoes) {
    Write-Titulo "1. Instalando extensoes do VS Code"

    $extensoes = @(
        # --- Core React Native / JS ---
        @{ id = "dbaeumer.vscode-eslint";              nome = "ESLint" }
        @{ id = "esbenp.prettier-vscode";              nome = "Prettier" }
        @{ id = "msjsdiag.vscode-react-native";        nome = "React Native Tools" }
        @{ id = "expo.vscode-expo-tools";              nome = "Expo Tools" }
        @{ id = "dsznajder.es7-react-js-snippets";     nome = "ES7+ React/Redux snippets" }

        # --- Auto-complete / produtividade ---
        @{ id = "christian-kohler.npm-intellisense";   nome = "npm Intellisense" }
        @{ id = "christian-kohler.path-intellisense";  nome = "Path Intellisense" }
        @{ id = "formulahendry.auto-rename-tag";       nome = "Auto Rename Tag" }
        @{ id = "formulahendry.auto-close-tag";        nome = "Auto Close Tag" }
        @{ id = "naumovs.color-highlight";             nome = "Color Highlight" }
        @{ id = "pkief.material-icon-theme";           nome = "Material Icon Theme" }

        # --- Git / colaboracao ---
        @{ id = "eamodio.gitlens";                     nome = "GitLens" }
        @{ id = "github.vscode-pull-request-github";   nome = "GitHub Pull Requests" }

        # --- Portugues ---
        @{ id = "ms-ceintl.vscode-language-pack-pt-br";nome = "Pacote de Idioma PT-BR" }

        # --- Markdown / documentacao (slides e roteiros) ---
        @{ id = "yzhang.markdown-all-in-one";          nome = "Markdown All in One" }
        @{ id = "davidanson.vscode-markdownlint";      nome = "markdownlint" }

        # --- Utilitarios ---
        @{ id = "streetsidesoftware.code-spell-checker";               nome = "Code Spell Checker" }
        @{ id = "streetsidesoftware.code-spell-checker-portuguese-brazilian"; nome = "Spell Checker PT-BR" }
        @{ id = "wayou.vscode-todo-highlight";         nome = "TODO Highlight" }
        @{ id = "usernamehw.errorlens";                nome = "Error Lens" }
    )

    $total = $extensoes.Count
    $i = 0
    foreach ($ext in $extensoes) {
        $i++
        Write-Host ("  [{0:D2}/{1:D2}] " -f $i, $total) -NoNewline -ForegroundColor DarkGray
        Write-Host "$($ext.nome)" -ForegroundColor White -NoNewline
        Write-Host "  ($($ext.id))" -ForegroundColor DarkGray

        $null = & code --install-extension $ext.id --force 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Ok "Instalada / ja presente"
        } else {
            Write-Aviso "Falha ao instalar. Tente manualmente depois."
        }
    }
} else {
    Write-Aviso "Etapa de extensoes pulada (-PularExtensoes)."
}

# ---------------------------------------------------------------------------
# 2. Configurar settings.json global (User)
# ---------------------------------------------------------------------------
Write-Titulo "2. Aplicando settings.json global"

$settingsDir  = Join-Path $env:APPDATA "Code\User"
$settingsPath = Join-Path $settingsDir "settings.json"
if (-not (Test-Path $settingsDir)) {
    New-Item -ItemType Directory -Path $settingsDir -Force | Out-Null
}

# Backup se existir
if (Test-Path $settingsPath) {
    $backup = "$settingsPath.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Copy-Item $settingsPath $backup -Force
    Write-Ok "Backup do settings.json criado: $backup"
}

$settingsConteudo = @'
{
  "// --- Editor ---": "",
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.fontLigatures": false,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.linkedEditing": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.stickyScroll.enabled": true,
  "editor.suggestSelection": "first",
  "editor.quickSuggestions": {
    "other": "on",
    "comments": "off",
    "strings": "on"
  },

  "// --- Files ---": "",
  "files.autoSave": "onFocusChange",
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.expo": true,
    "**/.expo-shared": true
  },
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.expo/**": true,
    "**/.git/**": true
  },

  "// --- Terminal ---": "",
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.cursorBlinking": true,

  "// --- Explorer ---": "",
  "explorer.confirmDelete": true,
  "explorer.confirmDragAndDrop": true,
  "explorer.compactFolders": false,

  "// --- Workbench ---": "",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editor.enablePreview": false,
  "workbench.startupEditor": "none",

  "// --- JavaScript / TypeScript ---": "",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.suggest.autoImports": true,
  "typescript.suggest.autoImports": true,
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single",

  "// --- Prettier ---": "",
  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 100,
  "prettier.tabWidth": 2,
  "prettier.arrowParens": "always",

  "// --- ESLint ---": "",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.run": "onType",

  "// --- Formatadores por linguagem ---": "",
  "[javascript]":       { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]":  { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]":       { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]":  { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]":             { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[jsonc]":            { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[markdown]":         { "editor.defaultFormatter": "esbenp.prettier-vscode", "editor.wordWrap": "on" },

  "// --- Emmet em JSX ---": "",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },

  "// --- Spell Checker ---": "",
  "cSpell.language": "en,pt-BR",
  "cSpell.enabledLanguageIds": [
    "javascript","javascriptreact","typescript","typescriptreact","markdown","plaintext","json","jsonc"
  ],
  "cSpell.words": [
    "Aula","aulas","Asyncstorage","Classroom","Expo","Flexbox","FlatList","Goes","Ionicons",
    "Marcio","npx","pptxgenjs","RNASYNC","RNAPP","roteiro","snack","TADS","Touchables","TSX"
  ],

  "// --- GitLens / Git ---": "",
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "gitlens.codeLens.enabled": false,

  "// --- Error Lens ---": "",
  "errorLens.enabledDiagnosticLevels": ["error","warning"],
  "errorLens.excludeBySource": ["cSpell"],

  "// --- TODO Highlight ---": "",
  "todohighlight.keywords": [
    { "text": "TODO:",  "color": "#fff", "backgroundColor": "#F59E0B" },
    { "text": "FIXME:", "color": "#fff", "backgroundColor": "#EF4444" },
    { "text": "NOTA:",  "color": "#fff", "backgroundColor": "#3B82F6" },
    { "text": "AULA:",  "color": "#fff", "backgroundColor": "#0F766E" }
  ],

  "// --- Telemetria ---": "",
  "telemetry.telemetryLevel": "off",
  "redhat.telemetry.enabled": false
}
'@

Set-Content -Path $settingsPath -Value $settingsConteudo -Encoding UTF8
Write-Ok "settings.json salvo em: $settingsPath"

# ---------------------------------------------------------------------------
# 3. Snippets personalizados para React Native
# ---------------------------------------------------------------------------
Write-Titulo "3. Instalando snippets de React Native"

$snippetsDir  = Join-Path $env:APPDATA "Code\User\snippets"
if (-not (Test-Path $snippetsDir)) {
    New-Item -ItemType Directory -Path $snippetsDir -Force | Out-Null
}

$snippetsPath = Join-Path $snippetsDir "react-native-dm.code-snippets"
if (Test-Path $snippetsPath) {
    Copy-Item $snippetsPath "$snippetsPath.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')" -Force
}

$snippetsConteudo = @'
{
  "RN: App funcional basico": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnapp",
    "description": "Estrutura inicial de App.js React Native com StyleSheet",
    "body": [
      "import React from 'react';",
      "import { StyleSheet, Text, View } from 'react-native';",
      "",
      "export default function App() {",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text style={styles.titulo}>${1:Ola, React Native!}</Text>",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "    backgroundColor: '#0F172A',",
      "    alignItems: 'center',",
      "    justifyContent: 'center',",
      "    padding: 24,",
      "  },",
      "  titulo: {",
      "    color: '#F97316',",
      "    fontSize: 22,",
      "    fontWeight: 'bold',",
      "  },",
      "});",
      ""
    ]
  },

  "RN: Componente com useState": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnstate",
    "description": "Componente com gerenciamento de estado (useState)",
    "body": [
      "import React, { useState } from 'react';",
      "import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';",
      "",
      "export default function ${1:Contador}() {",
      "  const [${2:valor}, set${2/(.*)/${1:/capitalize}/}] = useState(${3:0});",
      "",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text style={styles.texto}>{${2:valor}}</Text>",
      "      <TouchableOpacity",
      "        style={styles.botao}",
      "        onPress={() => set${2/(.*)/${1:/capitalize}/}(${2:valor} + 1)}",
      "      >",
      "        <Text style={styles.botaoTexto}>Incrementar</Text>",
      "      </TouchableOpacity>",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A' },",
      "  texto: { color: '#F8FAFC', fontSize: 48, marginBottom: 24 },",
      "  botao: { backgroundColor: '#F97316', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },",
      "  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },",
      "});",
      ""
    ]
  },

  "RN: Requisicao async com fetch": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnasync",
    "description": "Funcao async/await com tratamento de erro",
    "body": [
      "async function ${1:buscarDados}() {",
      "  try {",
      "    const resposta = await fetch('${2:https://api.exemplo.com/endpoint}');",
      "    if (!resposta.ok) {",
      "      throw new Error('Erro HTTP: ' + resposta.status);",
      "    }",
      "    const dados = await resposta.json();",
      "    console.log(dados);",
      "    return dados;",
      "  } catch (erro) {",
      "    console.error('Falha na requisicao:', erro);",
      "    return null;",
      "  }",
      "}",
      ""
    ]
  },

  "RN: FlatList basica": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnmap",
    "description": "Renderizacao de lista com FlatList",
    "body": [
      "<FlatList",
      "  data={${1:dados}}",
      "  keyExtractor={(item) => String(item.${2:id})}",
      "  renderItem={({ item }) => (",
      "    <View style={styles.item}>",
      "      <Text style={styles.itemTexto}>{item.${3:nome}}</Text>",
      "    </View>",
      "  )}",
      "  ItemSeparatorComponent={() => <View style={styles.separador} />}",
      "/>"
    ]
  },

  "RN: StyleSheet vazio": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnstyle",
    "description": "Bloco StyleSheet.create",
    "body": [
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "    backgroundColor: '#0F172A',",
      "    padding: 16,",
      "  },$0",
      "});"
    ]
  },

  "RN: useEffect com cleanup": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rneffect",
    "description": "Hook useEffect com funcao de limpeza",
    "body": [
      "useEffect(() => {",
      "  ${1:// efeito inicial}",
      "",
      "  return () => {",
      "    ${2:// limpeza}",
      "  };",
      "}, [${3:dependencias}]);"
    ]
  },

  "RN: Tela com Navigation": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnscreen",
    "description": "Tela com props de navegacao (Stack Navigator)",
    "body": [
      "import React from 'react';",
      "import { StyleSheet, Text, View, Button } from 'react-native';",
      "",
      "export default function ${1:TelaInicial}({ navigation }) {",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text style={styles.titulo}>${1:TelaInicial}</Text>",
      "      <Button",
      "        title=\"Ir para Detalhes\"",
      "        onPress={() => navigation.navigate('${2:Detalhes}')}",
      "      />",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A' },",
      "  titulo: { color: '#F8FAFC', fontSize: 24, marginBottom: 16 },",
      "});",
      ""
    ]
  },

  "RN: Import Ionicons": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "rnicon",
    "description": "Import e uso basico de Ionicons",
    "body": [
      "import { Ionicons } from '@expo/vector-icons';",
      "",
      "<Ionicons name=\"${1:home}\" size={${2:24}} color=\"${3:#F97316}\" />"
    ]
  },

  "RN: console.log com rotulo": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "clg",
    "description": "console.log com rotulo",
    "body": [
      "console.log('${1:rotulo}:', ${2:valor});"
    ]
  }
}
'@

Set-Content -Path $snippetsPath -Value $snippetsConteudo -Encoding UTF8
Write-Ok "Snippets salvos em: $snippetsPath"

# ---------------------------------------------------------------------------
# 4. Arquivos base de projeto (para qualquer aula nova)
# ---------------------------------------------------------------------------
Write-Titulo "4. Arquivos base reutilizaveis (opcional)"

$baseDir = Join-Path $env:USERPROFILE "vscode-dm-base"
if (-not (Test-Path $baseDir)) {
    New-Item -ItemType Directory -Path $baseDir -Force | Out-Null
    Write-Ok "Pasta de templates criada em: $baseDir"
} else {
    Write-Info "Pasta ja existe, atualizando conteudo: $baseDir"
}

# .prettierrc
@'
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
'@ | Set-Content -Path (Join-Path $baseDir ".prettierrc") -Encoding UTF8

# .eslintrc.json
@'
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
'@ | Set-Content -Path (Join-Path $baseDir ".eslintrc.json") -Encoding UTF8

# jsconfig.json
@'
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "baseUrl": "."
  },
  "include": ["**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"]
}
'@ | Set-Content -Path (Join-Path $baseDir "jsconfig.json") -Encoding UTF8

# .gitignore
@'
# Dependencies
node_modules/

# Expo
.expo/
.expo-shared/
dist/
web-build/

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/*.local
*.log

# Env
.env
.env.local
'@ | Set-Content -Path (Join-Path $baseDir ".gitignore") -Encoding UTF8

# README com instrucoes
@'
# Templates base para Programacao para Dispositivos Moveis

Copie estes arquivos para a raiz de qualquer aula/projeto:

- `.prettierrc`     -> formatacao consistente
- `.eslintrc.json`  -> regras de lint basicas
- `jsconfig.json`   -> IntelliSense em JS/JSX
- `.gitignore`      -> ignora node_modules, .expo, etc.

Uso rapido (PowerShell, na pasta da aula):

    Copy-Item "$env:USERPROFILE\vscode-dm-base\*" -Destination . -Recurse -Force
'@ | Set-Content -Path (Join-Path $baseDir "LEIAME.md") -Encoding UTF8

Write-Ok "Templates copiados para: $baseDir"

# ---------------------------------------------------------------------------
# 5. Task de workspace (opcional - criada na pasta atual se solicitado)
# ---------------------------------------------------------------------------
Write-Titulo "5. Resumo final"

Write-Host ""
Write-Host " Configuracao concluida!" -ForegroundColor Green
Write-Host ""
Write-Host " O que foi feito:" -ForegroundColor Cyan
Write-Host "   - Extensoes do VS Code instaladas (ESLint, Prettier, React Native Tools, etc.)"
Write-Host "   - settings.json global aplicado (formatacao, tema, PT-BR)"
Write-Host "   - Snippets personalizados instalados (rnapp, rnstate, rnasync, rnmap, rneffect, rnscreen, rnicon, rnstyle)"
Write-Host "   - Templates de projeto em: $baseDir"
Write-Host ""
Write-Host " Proximos passos:" -ForegroundColor Yellow
Write-Host "   1. Feche e reabra o VS Code para aplicar todas as extensoes."
Write-Host "   2. Em uma aula nova, execute na pasta do projeto:"
Write-Host "        Copy-Item `"`$env:USERPROFILE\vscode-dm-base\*`" -Destination . -Recurse -Force" -ForegroundColor DarkGray
Write-Host "   3. Teste um snippet: crie App.js, digite 'rnapp' e pressione Tab."
Write-Host ""
Write-Host " Bons codigos! - Configurador DM 2026.1" -ForegroundColor DarkCyan
Write-Host ""
