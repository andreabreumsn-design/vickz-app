@echo off
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

echo.
echo ===== VERIFICANDO NPM =====
echo.

where npm
if %ERRORLEVEL% NEQ 0 (
    echo NPM nao encontrado no PATH
    echo Procurando Node.js...

    if exist "C:\Program Files\nodejs\npm.cmd" (
        echo Encontrado em: C:\Program Files\nodejs\
        set PATH=C:\Program Files\nodejs;%PATH%
    ) else if exist "C:\Program Files (x86)\nodejs\npm.cmd" (
        echo Encontrado em: C:\Program Files (x86)\nodejs\
        set PATH=C:\Program Files (x86)\nodejs;%PATH%
    ) else (
        echo.
        echo ERRO: Node.js/NPM nao encontrado!
        echo Instale Node.js de: https://nodejs.org/
        pause
        exit /b 1
    )
)

echo.
echo NPM versao:
npm -v

echo.
echo Node versao:
node -v

echo.
echo ===== LIMPANDO E REINSTALANDO =====
echo.

if exist node_modules (
    echo Removendo node_modules...
    rmdir /s /q node_modules
)

echo.
echo Instalando dependencias...
npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo ===== COMPILANDO =====
echo.
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao compilar
    pause
    exit /b 1
)

echo.
echo ===== ENVIANDO PARA GITHUB =====
echo.

git add src/App.jsx
git commit -m "Fix: Corrigir erro 'TypeError: t is not a function' - NavigationBar sem props

- Adicionar handleNavigate com mapeamento tab->screen
- Passar activeTab e onNavigate props para NavigationBar

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QFXpfHnFG5HxE38k9rQFnm"

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO TOTAL! =====
    echo Aplicacao compilada e enviada para GitHub
    echo Cloudflare Pages redeploy em progresso...
    echo.
    echo Site: https://vickz.com.br
) else (
    echo.
    echo ERRO no push - verifique credenciais
)

echo.
pause
