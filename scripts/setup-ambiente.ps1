# setup-ambiente.ps1
# TADS 2026.1 - Programacao para Dispositivos Moveis
# Chamado pelo INSTALAR-TUDO.bat

$ErrorActionPreference = "Continue"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$logFile   = Join-Path $scriptDir "setup-log.txt"

# Redireciona tudo para o log tambem
Start-Transcript -Path $logFile -Append | Out-Null

function Ok     { param($t) Write-Host "  [OK] $t" -ForegroundColor Green }
function Aviso  { param($t) Write-Host "  [..] $t" -ForegroundColor Yellow }
function Erro   { param($t) Write-Host "  [XX] $t" -ForegroundColor Red }
function Titulo { param($t) Write-Host "`n  === $t ===" -ForegroundColor Cyan }

function Existe { param($cmd) return [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }

function Recarregar-Path {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path","User")
}

function Instalar-Winget {
    param($nome, $id)
    Aviso "Instalando $nome ..."
    $saida = winget install --id $id --silent --accept-source-agreements --accept-package-agreements 2>&1
    Write-Host $saida
}

Clear-Host
Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host "   SETUP - Programacao para Dispositivos Moveis" -ForegroundColor Cyan
Write-Host "   TADS 2026.1" -ForegroundColor Cyan
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host "  Log: $logFile" -ForegroundColor DarkGray
Write-Host ""

$listaOk    = @()
$listaErro  = @()

# ====================================================
# 1. WINGET
# ====================================================
Titulo "1/6 - Winget"

if (Existe "winget") {
    $v = winget --version 2>&1
    Ok "Winget encontrado: $v"
    $listaOk += "Winget"
} else {
    Erro "Winget nao encontrado!"
    Aviso "Abra a Microsoft Store, instale o App Installer e execute novamente."
    $listaErro += "Winget - instalar manualmente na Microsoft Store"
    Stop-Transcript | Out-Null
    Read-Host "  Pressione ENTER para sair"
    exit 1
}

# ====================================================
# 2. NODE.JS
# ====================================================
Titulo "2/6 - Node.js"

if (Existe "node") {
    $v = node --version 2>&1
    Ok "Node.js ja instalado: $v"
    $listaOk += "Node.js $v"
} else {
    Instalar-Winget "Node.js LTS" "OpenJS.NodeJS.LTS"
    Recarregar-Path
    if (Existe "node") {
        $v = node --version 2>&1
        Ok "Node.js instalado: $v"
        $listaOk += "Node.js $v"
    } else {
        Aviso "Node.js instalado - feche e reabra o terminal para usar"
        $listaOk += "Node.js (requer novo terminal)"
    }
}

if (Existe "npm") {
    $v = npm --version 2>&1
    Ok "npm: v$v"
}

# ====================================================
# 3. GIT
# ====================================================
Titulo "3/6 - Git"

if (Existe "git") {
    $v = git --version 2>&1
    Ok "Git ja instalado: $v"
    $listaOk += "Git"
} else {
    Instalar-Winget "Git" "Git.Git"
    Recarregar-Path
    if (Existe "git") {
        Ok "Git instalado com sucesso!"
        $listaOk += "Git"
    } else {
        Aviso "Git instalado - feche e reabra o terminal para usar"
        $listaOk += "Git (requer novo terminal)"
    }
}

$gitNome  = git config --global user.name  2>$null
$gitEmail = git config --global user.email 2>$null

if (-not $gitNome) {
    Write-Host ""
    Write-Host "  Configure seu Git para usar o GitHub:" -ForegroundColor Yellow
    $n = Read-Host "  Seu nome completo (ex: Marcio Gomes)"
    $e = Read-Host "  Seu e-mail"
    if ($n) { git config --global user.name  $n }
    if ($e) { git config --global user.email $e }
    git config --global init.defaultBranch main
    git config --global core.autocrlf true
    Ok "Git configurado: $n"
} else {
    Ok "Git ja configurado: $gitNome"
}

# ====================================================
# 4. VS CODE
# ====================================================
Titulo "4/6 - VS Code"

if (Existe "code") {
    $v = (code --version 2>&1) | Select-Object -First 1
    Ok "VS Code ja instalado: $v"
    $listaOk += "VS Code"
} else {
    Instalar-Winget "VS Code" "Microsoft.VisualStudioCode"
    Recarregar-Path
    if (Existe "code") {
        Ok "VS Code instalado!"
        $listaOk += "VS Code"
    } else {
        Aviso "VS Code instalado - feche e reabra o terminal"
        $listaOk += "VS Code (requer novo terminal)"
    }
}

Write-Host ""
Aviso "Instalando extensoes do VS Code..."

$extensoes = @(
    @{ id = "dsznajder.es7-react-js-snippets"; nome = "ES7+ React Snippets"  },
    @{ id = "esbenp.prettier-vscode";          nome = "Prettier"              },
    @{ id = "dbaeumer.vscode-eslint";          nome = "ESLint"                },
    @{ id = "msjsdiag.vscode-react-native";    nome = "React Native Tools"    },
    @{ id = "formulahendry.auto-rename-tag";   nome = "Auto Rename Tag"       },
    @{ id = "eamodio.gitlens";                 nome = "GitLens"               },
    @{ id = "oderwat.indent-rainbow";          nome = "Indent Rainbow"        },
    @{ id = "naumovs.color-highlight";         nome = "Color Highlight"       },
    @{ id = "pkief.material-icon-theme";       nome = "Material Icon Theme"   },
    @{ id = "enkia.tokyo-night";               nome = "Tokyo Night Theme"     }
)

if (Existe "code") {
    foreach ($ext in $extensoes) {
        $saida = code --install-extension $ext.id --force 2>&1
        if ($LASTEXITCODE -eq 0) {
            Ok "$($ext.nome)"
        } else {
            Aviso "$($ext.nome) - instale manualmente: $($ext.id)"
            $listaErro += "Extensao: $($ext.id)"
        }
    }
} else {
    Erro "VS Code nao encontrado - execute instalar-extensoes-vscode.ps1 depois"
    $listaErro += "Extensoes VS Code - execute o script separado"
}

# ====================================================
# 5. EXPO CLI
# ====================================================
Titulo "5/6 - Expo e ferramentas npm"

if (Existe "npm") {
    Aviso "Instalando EAS CLI..."
    npm install -g eas-cli --silent 2>&1 | Out-Null
    if (Existe "eas") { Ok "EAS CLI instalado" } else { Aviso "EAS CLI - sera usado via npx" }

    Aviso "Instalando TypeScript..."
    npm install -g typescript --silent 2>&1 | Out-Null
    if (Existe "tsc") { Ok "TypeScript instalado" } else { Aviso "TypeScript - erro na instalacao" }

    $expoVer = npx expo --version 2>&1
    Ok "Expo disponivel via npx: $expoVer"
    $listaOk += "Expo (npx)"
} else {
    Erro "npm nao disponivel - feche e reabra o terminal e execute novamente"
    $listaErro += "Expo CLI - npm nao disponivel"
}

# ====================================================
# 6. PROJETO
# ====================================================
Titulo "6/6 - Projeto projaulasdm"

$pasta = "C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm"
if (Test-Path $pasta) {
    Push-Location $pasta
    if (Test-Path "package.json") {
        Aviso "Rodando npm install..."
        npm install --silent 2>&1 | Out-Null
        Ok "Dependencias instaladas"
    } else {
        Ok "Sem package.json - nada a instalar"
    }
    Pop-Location
} else {
    Aviso "Pasta do projeto nao encontrada em: $pasta"
}

# ====================================================
# RELATORIO FINAL
# ====================================================
Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host "   RELATORIO FINAL" -ForegroundColor Cyan
Write-Host "  ====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  INSTALADO COM SUCESSO ($($listaOk.Count)):" -ForegroundColor Green
foreach ($item in $listaOk) { Write-Host "    [+] $item" -ForegroundColor Green }

if ($listaErro.Count -gt 0) {
    Write-Host ""
    Write-Host "  PENDENCIAS ($($listaErro.Count)):" -ForegroundColor Yellow
    foreach ($item in $listaErro) { Write-Host "    [!] $item" -ForegroundColor Yellow }
}

Write-Host ""
Write-Host "  PROXIMOS PASSOS:" -ForegroundColor White
Write-Host "    1. FECHE e reabra este terminal" -ForegroundColor White
Write-Host "    2. Instale o Expo Go no celular (busque na Play Store)" -ForegroundColor White
Write-Host "    3. Para testar no navegador: snack.expo.dev" -ForegroundColor White
Write-Host "    4. Para criar projeto:" -ForegroundColor White
Write-Host "         npx create-expo-app meu-app" -ForegroundColor Cyan
Write-Host "         cd meu-app" -ForegroundColor Cyan
Write-Host "         npx expo start" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ====================================================" -ForegroundColor Cyan

Stop-Transcript | Out-Null
