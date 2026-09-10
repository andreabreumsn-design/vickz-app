@echo off
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

echo.
echo ===== SINCRONIZANDO COM GITHUB =====
echo.

REM Pull remote changes first
echo Puxando mudancas do GitHub...
git pull origin main --allow-unrelated-histories

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Erro ao fazer pull. Tentando pull do branch master...
    git pull origin master --allow-unrelated-histories
)

echo.
echo Status atual:
git status

REM Push to GitHub
echo.
echo Fazendo push para GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===== SUCESSO! =====
    echo O codigo foi enviado para GitHub com sucesso!
    echo O Cloudflare Pages ira redeploy automaticamente em alguns minutos.
    echo.
    echo Verifique em: https://github.com/andreabreumsn-design/vickz-app
    echo Seu site ira atualizar em: https://vickz.com.br
) else (
    echo.
    echo ===== ERRO NO PUSH =====
    echo Pode haver conflitos ou problemas de autenticacao.
)

echo.
pause
