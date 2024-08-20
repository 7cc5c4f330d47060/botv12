@echo off
:botlaunch
node index.mjs
if %errorlevel%==1 (
	exit
)
timeout /nobreak /t 5 > nul
goto botlaunch