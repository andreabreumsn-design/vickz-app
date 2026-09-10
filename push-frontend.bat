@echo off
REM Navigate to the vickz-app directory
cd /d "C:\Users\Andre\Desktop\HOLDING\ViziqTech\VICKZ-mvp (11)\vickz-app"

REM Check if .git exists, if not initialize
if not exist .git (
    echo Initializing git repository...
    git init
    git config user.name "Claude"
    git config user.email "noreply@anthropic.com"
    git remote add origin https://github.com/andreabreumsn-design/vickz-app.git
)

REM Add all files
echo Adding files...
git add -A

REM Check git status
echo.
echo Current git status:
git status

REM Commit the changes
echo.
echo Committing changes...
git commit -m "Update frontend to React 19 and Vite 6 - Upgrade React from 18.2.0 to 19.0.0 - Upgrade Vite from 4.3.9 to 6.0.0 - Add react-leaflet 5.0.0 with map functionality - Add Lucide React icons and Leaflet mapping - Add Tailwind CSS and PostCSS configuration - Add Cloudflare Workers deployment integration Co-Authored-By: Claude Haiku 4.5 noreply@anthropic.com Claude-Session: https://claude.ai/code/session_01QFXpfHnFG5HxE38k9rQFnm"

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Done!
pause
