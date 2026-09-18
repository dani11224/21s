@echo off
title Servidor Local - 21 de Septiembre 🌻
echo ========================================================
echo   Iniciando servidor para la experiencia 21 de Septiembre
echo ========================================================
echo.
echo Abriendo tu navegador en http://localhost:8000 ...
start "" "http://localhost:8000"

py -m http.server 8000
if %ERRORLEVEL% NEQ 0 (
    python -m http.server 8000
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo No se pudo iniciar con Python directamente.
    echo Intenta con la extension Live Server en tu editor.
    pause
)
