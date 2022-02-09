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

echo .
echo copy halib.js dari halib ke demo:
echo =================================
copy ..\halib\web\libjs\*.js .\demo\collision\web\js\
copy ..\halib\web\libjs\*.js .\demo\tile\web\js\
copy ..\halib\web\libjs\*.js .\demo\snow\web\js\
copy ..\halib\web\libjs\*.js .\demo\rot\web\js\
copy ..\halib\web\libjs\*.js .\demo\expl\web\js\
copy ..\halib\web\libjs\*.js .\demo\doodle\web\js\
copy ..\halib\web\libjs\*.js .\demo\drag\web\js\

echo .
echo copy dts dari blijs ke demo:
echo ============================
copy libjsprod\*.d.ts .\demo\collision\dts\
copy libjsprod\*.d.ts .\demo\tile\dts\
copy libjsprod\*.d.ts .\demo\snow\dts\
copy libjsprod\*.d.ts .\demo\rot\dts\
copy libjsprod\*.d.ts .\demo\expl\dts\
copy libjsprod\*.d.ts .\demo\doodle\dts\
copy libjsprod\*.d.ts .\demo\drag\dts\

echo .
echo copy js dari blijs ke demo:
echo =================================
copy libjsprod\*.js .\demo\collision\web\js\
copy libjsprod\*.js .\demo\tile\web\js\
copy libjsprod\*.js .\demo\snow\web\js\
copy libjsprod\*.js .\demo\rot\web\js\
copy libjsprod\*.js .\demo\expl\web\js\
copy libjsprod\*.js .\demo\doodle\web\js\
copy libjsprod\*.js .\demo\drag\web\js\

pause