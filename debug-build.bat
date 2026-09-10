@echo off
setlocal enabledelayedexpansion

cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

echo.
echo ===== VERIFICACAO INICIAL =====
echo.

echo Diretorio atual:
cd
echo.

echo Listando arquivos do projeto:
dir /B
echo.

echo Procurando npm...
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] npm encontrado
    npm -v
) else (
    echo [ERRO] npm nao encontrado no PATH
    echo.
    echo Tentando PATH padrao do Node.js...
)

echo.
echo Verificando se Node.js esta instalado:
node -v >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js instalado:
    node -v
) else (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo SOLUCAO: Instale Node.js de https://nodejs.org/
    echo Escolha versão LTS (recomendado)
    pause
    exit /b 1
)

echo.
echo ===== TENTANDO INSTALAR =====
echo.

if exist node_modules (
    echo Limpando node_modules anterior...
    rmdir /s /q node_modules
    echo [OK] Removido
)

echo.
echo Executando: npm install
npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Dependencias instaladas
echo.

echo ===== COMPILANDO =====
echo.
echo Verificando vite...
dir node_modules\.bin\vite.cmd >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Vite encontrado
) else (
    echo [ERRO] Vite nao foi instalado
    pause
    exit /b 1
)

echo.
echo Executando: npm run build
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Compilacao falhou
    pause
    exit /b 1
)

echo.
echo [OK] Compilacao concluida
echo.

echo ===== ENVIANDO PARA GITHUB =====
echo.

git status
echo.

git add src/App.jsx
git commit -m "Fix: Corrigir erro 'TypeError: t is not a function'"

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO! =====
    echo Site redeploy em progresso: https://vickz.com.br
) else (
    echo.
    echo [ERRO] Push falhou
)

echo.
pause
