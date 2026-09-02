dev: ejecuta el programa y vuelve a iniciarlo cuando cambia un archivo;
start: ejecuta una sola vez el archivo TypeScript;
check: revisa los tipos sin generar archivos JavaScript;
build: compila el contenido de src y lo guarda en dist;
serve: ejecuta con Node.js el JavaScript previamente compilado.

Crear el archivo package.json que identifica y configura el proyecto: pnpm init

Agregar TypeScript, el ejecutor TSX y los tipos de Node.js como dependencias de desarrollo: pnpm add -D typescript tsx @types/node
