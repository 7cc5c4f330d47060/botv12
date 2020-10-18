@echo off
:a
timeout 60
node --expose_gc "C:\aa\a\b\c\d\e\index.js"
goto a