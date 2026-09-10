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

1. ¿Cuál es la función de Node.js en este proyecto?
   Ejecuta JavaScript fuera del navegador y proporciona APIs del entorno del
   servidor.
2. ¿Qué errores ayuda a detectar TypeScript antes de ejecutar la aplicación?
   TypeScript permite detectar principalmente errores relacionados con los tipos de datos antes de ejecutar el programa.
3. ¿Por qué se separaron models, data, services y utils?
   Para una mejor organizacion del proyecto principal.
4. ¿Qué diferencia existe entre una función síncrona y una función async?
   Una función síncrona ejecuta sus instrucciones de manera secuencial y espera a que cada operación termine antes de continuar. Una función async permite trabajar con operaciones asíncronas y devuelve una Promise.
5. ¿Por qué findTaskById devuelve Task | undefined?
   Porque no siempre existe una tarea con el ID que se está buscando.
6. ¿Qué ventaja aporta leer APP_NAME desde process.env?
   Permite configurar el nombre de la aplicación mediante una variable de entorno, sin tener que modificar directamente el código fuente.
7. ¿Qué diferencia observó entre pnpm start y la secuencia pnpm build + pnpm serve?
   npm start normalmente ejecuta directamente el comando configurado como start en package.json. Dependiendo del proyecto, puede ejecutar el código mediante tsx, node u otra herramienta.
8. ¿Qué parte de este proyecto podrá reutilizarse cuando se construya la API con Express?
   Principalmente se podrá reutilizar la lógica de negocio y la estructura interna del proyecto.
