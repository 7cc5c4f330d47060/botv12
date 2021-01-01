@echo off
:a
timeout 60
node --expose_gc --max-old-space-size=750 "C:\aa\a\b\c\d\e\run.js"
goto a