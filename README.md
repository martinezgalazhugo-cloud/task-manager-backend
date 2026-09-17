dev: ejecuta el programa y vuelve a iniciarlo cuando cambia un archivo;
start: ejecuta una sola vez el archivo TypeScript;
check: revisa los tipos sin generar archivos JavaScript;
build: compila el contenido de src y lo guarda en dist;
serve: ejecuta con Node.js el JavaScript previamente compilado.

Crear el archivo package.json que identifica y configura el proyecto: pnpm init

"start": "tsx src/index.ts" (este comando era de la act2, cambiadio por node dist/server.js)
"dev": "tsx watch src/index.ts",

##app.ts configura Express sin abrir el puerto. server.ts inicia la escucha. Esta separación facilita
posteriormente las pruebas automatizadas porque la aplicación puede importarse sin arrancar un
servidor adicional.

Agregar TypeScript, el ejecutor TSX y los tipos de Node.js como dependencias de desarrollo: pnpm add -D typescript tsx @types/node

400 INVALID_ID o INVALID_JSON La sintaxis o el identificador no puede interpretarse.
404 TASK_NOT_FOUND o
ROUTE_NOT_FOUND El recurso o la ruta no existe.
415 UNSUPPORTED_MEDIA_TYPE Una ruta con cuerpo no declara application/json.
422 VALIDATION_ERROR El JSON es válido, pero sus campos no cumplen las reglas.
500 INTERNAL_ERROR Ocurrió un fallo no previsto
