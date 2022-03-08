echo .
echo copy dts dari halib ke demo:
echo ============================
copy ..\halib\web\libjs\*.d.ts .\demo\collision\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\tile\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\snow\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\rot\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\expl\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\doodle\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\drag\dts\
copy ..\halib\web\libjs\*.d.ts .\demo\drag_multiple\dts\

echo .
echo copy js dari halib ke demo:
echo =================================
copy ..\halib\web\libjs\*.js .\demo\collision\web\js\
copy ..\halib\web\libjs\*.js .\demo\tile\web\js\
copy ..\halib\web\libjs\*.js .\demo\snow\web\js\
copy ..\halib\web\libjs\*.js .\demo\rot\web\js\
copy ..\halib\web\libjs\*.js .\demo\expl\web\js\
copy ..\halib\web\libjs\*.js .\demo\doodle\web\js\
copy ..\halib\web\libjs\*.js .\demo\drag\web\js\
copy ..\halib\web\libjs\*.js .\demo\drag_multiple\js\

echo .
echo copy dts dari js ke demo:
echo ============================
copy js\*.d.ts .\demo\collision\dts\
copy js\*.d.ts .\demo\tile\dts\
copy js\*.d.ts .\demo\snow\dts\
copy js\*.d.ts .\demo\rot\dts\
copy js\*.d.ts .\demo\expl\dts\
copy js\*.d.ts .\demo\doodle\dts\
copy js\*.d.ts .\demo\drag\dts\
copy js\*.d.ts .\demo\drag_multiple\dts\

echo .
echo copy js dari js ke demo:
echo =================================
copy js\*.js .\demo\collision\web\js\
copy js\*.js .\demo\tile\web\js\
copy js\*.js .\demo\snow\web\js\
copy js\*.js .\demo\rot\web\js\
copy js\*.js .\demo\expl\web\js\
copy js\*.js .\demo\doodle\web\js\
copy js\*.js .\demo\drag\web\js\
copy js\*.js .\demo\drag_multiple\web\js\

pause