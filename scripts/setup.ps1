# setup.ps1
# Programacao para Dispositivos Moveis - TADS 2026.1
#
# COMO USAR — abra o PowerShell e rode:
#   cd "C:\Users\marci\OneDrive\Documentos\Projetos\projaulasdm\scripts"
#   powershell -ExecutionPolicy Bypass -File setup.ps1

$log = "$PSScriptRoot\setup-log.txt"
Start-Transcript $log | Out-Null

function info  { Write-Host "[INFO] $args" -ForegroundColor Cyan }
function ok    { Write-Host "[ OK ] $args" -ForegroundColor Green }
function aviso { Write-Host "[WARN] $args" -ForegroundColor Yellow }
function erro  { Write-Host "[ERRO] $args" -ForegroundColor Red }
function existe { Get-Command $args[0] -ErrorAction SilentlyContinue }

function recarregar-path {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path","User")
}

function instalar {
    param($nome, $id)
    info "Instalando $nome..."
    winget install --id $id --silent --accept-source-agreements --accept-package-agreements
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Setup Mobile - TADS 2026.1"            -ForegroundColor Cyan
Write-Host " Log: $log"                              -ForegroundColor DarkGray
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# --- winget ---
info "Verificando winget..."
if (-not (existe winget)) {
    erro "Winget nao encontrado. Instale o App Installer pela Microsoft Store."
    Stop-Transcript | Out-Null
    exit 1
}
ok "Winget: $(winget --version)"

# --- Node.js ---
info "Verificando Node.js..."
if (existe node) {
    ok "Node.js ja instalado: $(node --version)"
} else {
    instalar "Node.js LTS" "OpenJS.NodeJS.LTS"
    recarregar-path
    if (existe node) { ok "Node.js instalado: $(node --version)" }
    else { aviso "Node.js instalado. Feche e reabra o terminal." }
}

# --- Git ---
info "Verificando Git..."
if (existe git) {
    ok "Git ja instalado: $(git --version)"
} else {
    instalar "Git" "Git.Git"
    recarregar-path
    if (existe git) { ok "Git instalado: $(git --version)" }
    else { aviso "Git instalado. Feche e reabra o terminal." }
}

# Configurar Git
$gNome  = git config --global user.name  2>$null
$gEmail = git config --global user.email 2>$null
if (-not $gNome) {
    Write-Host ""
    $n = Read-Host "[GIT] Seu nome completo"
    $e = Read-Host "[GIT] Seu e-mail"
    git config --global user.name  $n
    git config --global user.email $e
    git config --global init.defaultBranch main
    git config --global core.autocrlf true
    ok "Git configurado: $n <$e>"
} else {
    ok "Git configurado: $gNome <$gEmail>"
}

# --- VS Code ---
info "Verificando VS Code..."
if (existe code) {
    ok "VS Code ja instalado: $((code --version)[0])"
} else {
    instalar "VS Code" "Microsoft.VisualStudioCode"
    recarregar-path
    if (existe code) { ok "VS Code instalado." }
    else { aviso "VS Code instalado. Feche e reabra o terminal." }
}

# --- Extensoes VS Code ---
info "Instalando extensoes do VS Code..."
$extensoes = @(
    "dsznajder.es7-react-js-snippets"
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "msjsdiag.vscode-react-native"
    "formulahendry.auto-rename-tag"
    "eamodio.gitlens"
    "oderwat.indent-rainbow"
    "naumovs.color-highlight"
    "pkief.material-icon-theme"
    "enkia.tokyo-night"
)
if (existe code) {
    foreach ($e in $extensoes) {
        code --install-extension $e --force 2>&1 | Out-Null
        ok "Extensao: $e"
    }
} else {
    aviso "VS Code nao disponivel agora. Rode o script novamente apos reabrir o terminal."
}

# --- Expo / npm globais ---
info "Instalando ferramentas npm globais..."
if (existe npm) {
    npm install -g eas-cli  --silent 2>&1 | Out-Null ; ok "eas-cli instalado"
    npm install -g typescript --silent 2>&1 | Out-Null ; ok "typescript instalado"
    ok "Expo disponivel via: npx expo"
} else {
    aviso "npm nao disponivel nesta sessao. Feche e reabra o terminal e rode novamente."
}

# --- Resumo ---
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Concluido! Log salvo em:"             -ForegroundColor Green
Write-Host " $log"                                  -ForegroundColor DarkGray
Write-Host ""
Write-Host " Proximos passos:"                      -ForegroundColor White
Write-Host "  1. Feche e reabra o terminal"         -ForegroundColor White
Write-Host "  2. Instale o Expo Go no celular"      -ForegroundColor White
Write-Host "  3. Para criar um projeto:"            -ForegroundColor White
Write-Host "     npx create-expo-app meu-app"       -ForegroundColor Cyan
Write-Host "     cd meu-app"                        -ForegroundColor Cyan
Write-Host "     npx expo start"                    -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Stop-Transcript | Out-Null
