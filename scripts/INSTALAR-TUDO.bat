@echo off
title Setup Mobile TADS 2026.1

echo.
echo  ====================================================
echo   SETUP - Programacao para Dispositivos Moveis
echo   React Native + Expo + VS Code
echo   TADS 2026.1
echo  ====================================================
echo.
echo  Este script instalara Node.js, Git, VS Code e Expo.
echo  Um arquivo setup-log.txt sera criado nesta pasta.
echo.
echo  Pressione qualquer tecla para comecar...
pause > nul

net session > nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo  ERRO: Execute como ADMINISTRADOR!
    echo.
    echo  Como resolver:
    echo    1. Clique com BOTAO DIREITO neste arquivo
    echo    2. Selecione "Executar como administrador"
    echo    3. Clique em Sim
    echo.
    pause
    exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-ambiente.ps1"

echo.
echo  Log salvo em: %~dp0setup-log.txt
echo.
pause
