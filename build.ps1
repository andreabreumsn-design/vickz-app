#!/usr/bin/env pwsh

$ErrorActionPreference = "Continue"

Write-Host "===== VICKZ BUILD =====" -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

Write-Host "Acessando: $projectPath" -ForegroundColor Yellow
Set-Location $projectPath

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Nao conseguiu acessar o diretorio" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

Write-Host "OK - Diretorio acessado" -ForegroundColor Green
Write-Host ""

Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Node.js nao esta instalado!" -ForegroundColor Red
    Write-Host "Baixe em: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione ENTER para sair"
    exit 1
}
Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
Write-Host ""

Write-Host "Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
Write-Host "npm: $npmVersion" -ForegroundColor Green
Write-Host ""

Write-Host "===== INSTALANDO DEPENDENCIAS =====" -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao instalar" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}
Write-Host "OK - Dependencias instaladas" -ForegroundColor Green
Write-Host ""

Write-Host "===== COMPILANDO =====" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao compilar" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}
Write-Host "OK - Compilacao concluida" -ForegroundColor Green
Write-Host ""

Write-Host "===== ENVIANDO PARA GITHUB =====" -ForegroundColor Cyan
git add src/App.jsx
git commit -m "Fix: Corrigir erro NavigationBar sem props`n`n- Adicionar handleNavigate com mapeamento tab->screen`n- Passar activeTab e onNavigate props`n`nCo-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===== SUCESSO! =====" -ForegroundColor Green
    Write-Host "Site: https://vickz.com.br" -ForegroundColor Cyan
    Write-Host "Redeploy em progresso..." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "ERRO: Push falhou" -ForegroundColor Red
}

Write-Host ""
Read-Host "Pressione ENTER para sair"
