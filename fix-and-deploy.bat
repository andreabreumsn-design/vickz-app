@echo off
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

echo.
echo ===== COMPILANDO COM VITE =====
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO NA COMPILACAO
    pause
    exit /b 1
)

echo.
echo ===== ENVIANDO CORRECAO PARA GITHUB =====
echo.

git add src/App.jsx
git commit -m "Fix: Corrigir erro 'TypeError: t is not a function' - NavigationBar sem props

- Adicionar handleNavigate com mapeamento tab->screen
- Passar activeTab e onNavigate props para NavigationBar
- Erro: NavigationBar renderizado sem props obrigatorias
- Solucao: mapear navigation corretamente entre telas

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QFXpfHnFG5HxE38k9rQFnm"

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO! =====
    echo Correcao enviada para GitHub
    echo Cloudflare Pages redeploy em progresso...
    echo.
    echo Site: https://vickz.com.br
) else (
    echo.
    echo ===== ERRO NO PUSH =====
    echo Verifique a conexao e as credenciais
)

echo.
pause
