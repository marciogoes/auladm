@echo off
title Verificar Ambiente TADS 2026.1

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0verificar-ambiente.ps1"

echo.
echo  Log salvo em: %~dp0verificar-log.txt
echo.
pause
