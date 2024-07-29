@echo off
:botlaunch
node index.js
timeout /nobreak /t 5 > nul
goto botlaunch