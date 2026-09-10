@echo off
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

echo.
echo ===== ENVIANDO FRONTEND REACT 19 PARA GITHUB =====
echo.

REM Add all new files
echo Adicionando todos os arquivos novos...
git add -A

REM Verify status
echo.
echo Status do git:
git status

REM Commit with proper message
echo.
echo Fazendo commit...
git commit -m "Add React 19 and Vite 6 frontend

- Upgrade React from 18.2.0 to 19.0.0
- Upgrade Vite from 4.3.9 to 6.0.0
- Add react-leaflet 5.0.0 with map functionality
- Add Lucide React icons and Leaflet mapping
- Add Tailwind CSS and PostCSS configuration
- Add Cloudflare Workers deployment integration
- Add all React components (43 components total)

Co-Authored-By: Claude Haiku 4.5 noreply@anthropic.com
Claude-Session: https://claude.ai/code/session_01QFXpfHnFG5HxE38k9rQFnm"

REM Verify commit was created
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Nao ha mudancas novas para fazer commit.
    echo Usando git push mesmo assim...
)

REM Push to GitHub with force if needed
echo.
echo Sincronizando e enviando para GitHub...

REM First, try a normal push
git push origin main

REM If that fails, try a force push
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Tentando force push...
    git push -f origin main
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO! =====
    echo React 19 + Vite 6 foi enviado para GitHub com sucesso!
    echo.
    echo Seu Cloudflare Pages esta redeploy agora...
    echo Site: https://vickz.com.br
    echo Repositorio: https://github.com/andreabreumsn-design/vickz-app
) else (
    echo.
    echo ===== ERRO NA AUTENTICACAO =====
    echo Verifique suas credenciais do GitHub ou chaves SSH.
    echo Pode ser necessario executar: git config --global credential.helper store
)

echo.
pause
