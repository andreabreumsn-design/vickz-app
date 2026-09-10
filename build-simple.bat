@echo off
REM Manter janela aberta mesmo com erro
setlocal enabledelayedexpansion

title VICKZ Build
color 0A

cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Nao conseguiu acessar o diretorio
    echo Caminho: C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app
    pause
    exit /b 1
)

echo Diretorio OK
echo.

echo Verificando Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js nao esta instalado!
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Verificando npm...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: npm nao esta funcionando
    pause
    exit /b 1
)

echo.
echo ===== INSTALANDO =====
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO na instalacao
    pause
    exit /b 1
)

echo.
echo ===== COMPILANDO =====
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO na compilacao
    pause
    exit /b 1
)

echo.
echo ===== ENVIANDO PARA GITHUB =====
git add src/App.jsx
git commit -m "Fix: Corrigir erro NavigationBar"
git push -u origin main

echo.
echo FIM
pause
