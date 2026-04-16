# ============================================================
#  Instala apenas as extensões do VS Code
#  Útil para alunos que já têm o VS Code mas precisam
#  configurar as extensões corretas.
#
#  Execute no terminal:
#  > .\instalar-extensoes-vscode.ps1
# ============================================================

function Verde  { param($t) Write-Host $t -ForegroundColor Green }
function Amarelo{ param($t) Write-Host $t -ForegroundColor Yellow }
function Azul   { param($t) Write-Host $t -ForegroundColor Cyan }
function Vermelho{param($t) Write-Host $t -ForegroundColor Red }

Clear-Host
Azul "============================================================"
Azul "  Instalando extensoes do VS Code — React Native / Expo"
Azul "============================================================"
Write-Host ""

# Verificar se o VS Code está instalado
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Vermelho "VS Code nao encontrado no PATH!"
    Amarelo  "Instale o VS Code em: https://code.visualstudio.com"
    Amarelo  "Ou execute o script INSTALAR-TUDO.bat"
    Read-Host "Pressione ENTER para sair"
    exit 1
}

$extensoes = @(
    # ── Essenciais React Native
    @{ id = "dsznajder.es7-react-js-snippets";    categoria = "React Native"; nome = "ES7+ React/Redux/React-Native snippets" },
    @{ id = "esbenp.prettier-vscode";              categoria = "Formatacao";   nome = "Prettier — Code formatter" },
    @{ id = "dbaeumer.vscode-eslint";              categoria = "Qualidade";    nome = "ESLint" },
    @{ id = "msjsdiag.vscode-react-native";        categoria = "React Native"; nome = "React Native Tools" },
    @{ id = "formulahendry.auto-rename-tag";       categoria = "Produtividade";nome = "Auto Rename Tag" },

    # ── Produtividade
    @{ id = "eamodio.gitlens";                     categoria = "Git";          nome = "GitLens" },
    @{ id = "oderwat.indent-rainbow";              categoria = "Visual";       nome = "indent-rainbow" },
    @{ id = "naumovs.color-highlight";             categoria = "Visual";       nome = "Color Highlight" },
    @{ id = "rangav.vscode-thunder-client";        categoria = "API";          nome = "Thunder Client" },
    @{ id = "formulahendry.code-runner";           categoria = "Execucao";     nome = "Code Runner" },
    @{ id = "christian-kohler.path-intellisense";  categoria = "Produtividade";nome = "Path IntelliSense" },

    # ── Visual / Temas
    @{ id = "pkief.material-icon-theme";           categoria = "Tema";         nome = "Material Icon Theme" },
    @{ id = "enkia.tokyo-night";                   categoria = "Tema";         nome = "Tokyo Night" },
    @{ id = "dracula-theme.theme-dracula";         categoria = "Tema";         nome = "Dracula Official" },
    @{ id = "zhuangtongfa.material-theme";         categoria = "Tema";         nome = "One Dark Pro" }
)

$ok    = 0
$falha = 0
$catAtual = ""

foreach ($ext in $extensoes) {
    # Separador de categoria
    if ($ext.categoria -ne $catAtual) {
        $catAtual = $ext.categoria
        Write-Host ""
        Amarelo "  ── $catAtual"
    }

    try {
        $resultado = code --install-extension $ext.id --force 2>&1
        if ($LASTEXITCODE -eq 0 -or $resultado -match "already installed") {
            Verde   "    [OK] $($ext.nome)"
            $ok++
        } else {
            Amarelo "    [??] $($ext.nome) — verifique manualmente"
            $falha++
        }
    } catch {
        Vermelho "    [ERRO] $($ext.nome)"
        $falha++
    }
}

Write-Host ""
Azul "============================================================"
Verde  "  Resultado: $ok extensao(oes) instalada(s)"
if ($falha -gt 0) { Vermelho "  Falhas: $falha (instale manualmente via Ctrl+Shift+X)" }
Azul "============================================================"
Write-Host ""
Amarelo "  Reinicie o VS Code para ativar todas as extensoes."
Write-Host ""
Read-Host "  Pressione ENTER para fechar"
