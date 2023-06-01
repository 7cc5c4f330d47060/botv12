@echo off
:start
node index.js
if %errorlevel%==2 (
	exit
)
timeout /t 5 /nobreak > nul
goto start