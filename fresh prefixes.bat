@echo off
del .\log1prefix >> C:\aa\a\b\c\log.exe
del .\log1prefixfixed  >> C:\aa\a\b\c\log.exe
cd Chat Logs
for %%i in (*) do (
node --max-old-space-size=5250 ../prefix.js %%i >> ../log1prefix
)
cd..
node --max-old-space-size=5250 prefix.js ./log1prefix >> ./log1prefixfixed