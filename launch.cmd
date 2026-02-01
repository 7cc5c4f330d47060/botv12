@echo off

:botlaunch
	node dist/index.js
	call :err_unwrap

	timeout /nobreak /t 5 >NUL
goto botlaunch

:err_unwrap
    set _err=%ERRORLEVEL%
    if %_err% neq 0 (
        exit %_err%
    )
goto :eof
