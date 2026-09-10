@echo off
REM Navigate to the vickz-app directory
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

REM Check if .git exists, if not initialize
if not exist .git (
    echo Inicializando repositorio git...
    git init
    git config user.name "Claude"
    git config user.email "noreply@anthropic.com"
    git remote add origin https://github.com/andreabreumsn-design/vickz-app.git
)

REM Add all files
echo.
echo Adicionando arquivos...
git add -A

REM Check git status
echo.
echo Status atual do git:
git status

REM Commit the changes
echo.
echo Fazendo commit das mudancas...
git commit -m "Update frontend to React 19 and Vite 6 - Upgrade React from 18.2.0 to 19.0.0 - Upgrade Vite from 4.3.9 to 6.0.0 - Add react-leaflet 5.0.0 with map functionality - Add Lucide React icons and Leaflet mapping - Add Tailwind CSS and PostCSS configuration - Add Cloudflare Workers deployment integration Co-Authored-By: Claude Haiku 4.5 noreply@anthropic.com Claude-Session: https://claude.ai/code/session_01QFXpfHnFG5HxE38k9rQFnm"

REM Check current branch
echo.
echo Verificando branch atual...
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i
echo Branch atual: %CURRENT_BRANCH%

REM Rename master to main if needed
if "%CURRENT_BRANCH%"=="master" (
    echo.
    echo Renomeando branch master para main...
    git branch -M main
    set CURRENT_BRANCH=main
)

REM Push to GitHub
echo.
echo Fazendo push para GitHub no branch %CURRENT_BRANCH%...
git push -u origin %CURRENT_BRANCH%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO! =====
    echo O codigo foi enviado para GitHub com sucesso!
    echo O Cloudflare Pages ira redeploy automaticamente.
) else (
    echo.
    echo ===== ERRO NO PUSH =====
    echo Verifique a conexao com GitHub e as credenciais.
    echo Talvez seja necessario configurar as chaves SSH ou token de acesso.
)

echo.
pause
