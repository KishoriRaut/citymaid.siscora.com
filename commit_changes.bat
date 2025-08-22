@echo off
cd /d "%~dp0"
git add .
git commit -m "fix: update auth context and database triggers for signup flow"
git push
pause
