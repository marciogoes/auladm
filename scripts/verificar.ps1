# verificar.ps1
# Programacao para Dispositivos Moveis - TADS 2026.1
#
# COMO USAR:
#   powershell -ExecutionPolicy Bypass -File verificar.ps1

function ok    { Write-Host "[ OK ] $args" -ForegroundColor Green }
function erro  { Write-Host "[ XX ] $args" -ForegroundColor Red }
function titulo{ Write-Host "`n--- $args ---" -ForegroundColor Cyan }
function existe { Get-Command $args[0] -ErrorAction SilentlyContinue }

$pass = 0
$fail = 0

function checar {
    param($nome, $cmd, $dica = "")
    try {
        $v = Invoke-Expression "$cmd 2>&1" | Select-Object -First 1
        ok "$nome : $v"
        $script:pass++
    } catch {
        erro "$nome nao encontrado  ->  $dica"
        $script:fail++
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Verificar Ambiente - TADS 2026.1"     -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

titulo "Sistema"
checar "node"   "node --version"  "rode setup.ps1"
checar "npm"    "npm --version"   "vem com o Node.js"
checar "git"    "git --version"   "rode setup.ps1"
checar "code"   "code --version"  "rode setup.ps1"

titulo "Expo"
checar "expo"   "npx expo --version 2>&1" "npm install -g expo-cli"
checar "eas"    "eas --version 2>&1"      "npm install -g eas-cli"

titulo "TypeScript"
checar "tsc"    "tsc --version"   "npm install -g typescript"

titulo "Git Config"
$n = git config --global user.name  2>$null
$e = git config --global user.email 2>$null
if ($n -and $e) {
    ok "user.name  : $n"
    ok "user.email : $e"
    $pass += 2
} else {
    erro "Git sem nome/email. Configure com:"
    Write-Host '       git config --global user.name "Seu Nome"'  -ForegroundColor Yellow
    Write-Host '       git config --global user.email "email@x.com"' -ForegroundColor Yellow
    $fail++
}

titulo "Extensoes VS Code"
$necessarias = @(
    "dsznajder.es7-react-js-snippets"
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "msjsdiag.vscode-react-native"
    "formulahendry.auto-rename-tag"
    "eamodio.gitlens"
)
if (existe code) {
    $instaladas = code --list-extensions 2>&1
    foreach ($e in $necessarias) {
        if ($instaladas -contains $e) {
            ok $e ; $pass++
        } else {
            erro "$e  ->  code --install-extension $e"
            $fail++
        }
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
if ($fail -eq 0) {
    Write-Host " TUDO OK! ($pass itens)" -ForegroundColor Green
} else {
    Write-Host " $pass OK  |  $fail problema(s)" -ForegroundColor Yellow
    Write-Host " Rode: powershell -ExecutionPolicy Bypass -File setup.ps1" -ForegroundColor Yellow
}
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
