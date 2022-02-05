echo .
echo copy dts dari halib ke demo:
echo ============================
copy ..\halib\web\libjs\*.d.ts .\demo\collision\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\tile\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\snow\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\rot\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\expl\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\doodle\dts\
echo .
echo copy halib.js dari halib ke demo:
echo =================================
copy ..\halib\web\libjs\*.js .\demo\collision\web\js\
copy ..\halib\web\libjs\*.js .\demo\tile\web\js\
copy ..\halib\web\libjs\*.js .\demo\snow\web\js\
copy ..\halib\web\libjs\*.js .\demo\rot\web\js\
copy ..\halib\web\libjs\*.js .\demo\expl\web\js\
copy ..\halib\web\libjs\*.js .\demo\doodle\web\js\

cd demo
call .\update.bat
pause
cd ..