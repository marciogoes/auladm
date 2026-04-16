# verificar-ambiente.ps1
# TADS 2026.1 - Programacao para Dispositivos Moveis

$ErrorActionPreference = "Continue"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$logFile   = Join-Path $scriptDir "verificar-log.txt"

Start-Transcript -Path $logFile -Append | Out-Null

function Ok    { param($t) Write-Host "  [OK] $t" -ForegroundColor Green }
function Falha { param($t) Write-Host "  [XX] $t" -ForegroundColor Red }
function Dica  { param($t) Write-Host "       --> $t" -ForegroundColor Yellow }
function Titulo{ param($t) Write-Host "`n  === $t ===" -ForegroundColor Cyan }

$qtdOk   = 0
$qtdFail = 0

function Testar {
    param($nome, $cmd, $dica = "")
    try {
        $v = Invoke-Expression "$cmd 2>&1" | Select-Object -First 1
        Ok "$nome : $v"
        $script:qtdOk++
    } catch {
        Falha "$nome nao encontrado"
        if ($dica) { Dica $dica }
        $script:qtdFail++
    }
}

Clear-Host
Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host "   VERIFICACAO DO AMBIENTE - TADS 2026.1" -ForegroundColor Cyan
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host ""

Titulo "Ferramentas do Sistema"
Testar "Node.js"  "node --version"  "Execute INSTALAR-TUDO.bat"
Testar "npm"      "npm --version"   "Vem com o Node.js"
Testar "Git"      "git --version"   "Execute INSTALAR-TUDO.bat"
Testar "VS Code"  "code --version"  "https://code.visualstudio.com"

Titulo "Expo"
Testar "Expo (npx)" "npx expo --version" "npm install -g expo-cli"
Testar "EAS CLI"    "eas --version"      "npm install -g eas-cli"

Titulo "TypeScript"
Testar "tsc"  "tsc --version"  "npm install -g typescript"

Titulo "Extensoes do VS Code"

$exts = @(
    @{ id = "dsznajder.es7-react-js-snippets"; nome = "ES7+ React Snippets" },
    @{ id = "esbenp.prettier-vscode";          nome = "Prettier"             },
    @{ id = "dbaeumer.vscode-eslint";          nome = "ESLint"               },
    @{ id = "msjsdiag.vscode-react-native";    nome = "React Native Tools"   },
    @{ id = "formulahendry.auto-rename-tag";   nome = "Auto Rename Tag"      },
    @{ id = "eamodio.gitlens";                 nome = "GitLens"              }
)

try {
    $instaladas = code --list-extensions 2>&1
    foreach ($e in $exts) {
        if ($instaladas -match [regex]::Escape($e.id)) {
            Ok $e.nome
            $qtdOk++
        } else {
            Falha $e.nome
            Dica "code --install-extension $($e.id)"
            $qtdFail++
        }
    }
} catch {
    Write-Host "  Nao foi possivel listar extensoes" -ForegroundColor Yellow
}

Titulo "Git - Configuracao"

$gNome  = git config --global user.name  2>$null
$gEmail = git config --global user.email 2>$null

if ($gNome -and $gEmail) {
    Ok "Nome:  $gNome"
    Ok "Email: $gEmail"
    $qtdOk += 2
} else {
    Falha "Git sem nome/email configurado"
    Dica 'git config --global user.name "Seu Nome"'
    Dica 'git config --global user.email "email@exemplo.com"'
    $qtdFail++
}

Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan

if ($qtdFail -eq 0) {
    Write-Host "  TUDO OK! ($qtdOk itens) - Ambiente pronto!" -ForegroundColor Green
} else {
    Write-Host "  $qtdOk OK  |  $qtdFail problema(s)" -ForegroundColor Yellow
    Write-Host "  Execute INSTALAR-TUDO.bat para corrigir." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "  Links:" -ForegroundColor White
Write-Host "    snack.expo.dev   - testar no navegador" -ForegroundColor DarkGray
Write-Host "    docs.expo.dev    - documentacao Expo"   -ForegroundColor DarkGray
Write-Host "    reactnative.dev  - documentacao RN"     -ForegroundColor DarkGray
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host ""

Stop-Transcript | Out-Null
