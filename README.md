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

INVALID_ID con 400 significa que la URL contiene un formato no utilizable.
TASK_NOT_FOUND con 404 significa que el ObjectId es válido, pero no existe una tarea.
PERSISTENCE_VALIDATION_ERROR con 422 significa que el modelo rechazó un documento.
DATABASE_UNAVAILABLE con 503 significa que la operación no pudo usar el almacenamiento.
El errorHandler conserva message, code, details y requestId, pero no devuelve stack ni la URI.

6. ¿Qué diferencia existe entre un documento, un esquema y un modelo?
   Documento, esquema y modelo: el esquema define la estructura y las reglas de validación; el modelo (TaskModel) se crea a partir del esquema y permite consultar o modificar la colección; un documento es un registro concreto leído o creado mediante ese modelo.

7. ¿Por qué la API devuelve id en lugar de \_id?
   id en lugar de \_id: el servicio convierte el \_id de MongoDB a un id de texto para no acoplar la respuesta pública a Mongoose ni al formato interno de la base de datos. Esa conversión está en task.service.ts.

8. ¿Qué problema evita migrar todas las operaciones a una sola fuente de datos?
   Una sola fuente de datos: evita que unas operaciones creen o lean tareas en un almacenamiento y otras intenten actualizarlas o borrarlas en otro. Todas las operaciones sobre tareas pasan por el mismo servicio y almacenamiento.

9. ¿Qué reglas aplica el middleware y cuáles repite el esquema?
   Middleware y esquema: el middleware valida la entrada HTTP: que title sea texto no vacío y no supere 120 caracteres, y la recorta. El esquema vuelve a proteger las reglas de persistencia —título obligatorio, recorte y límite de 120— y valida status contra los valores permitidos. Así, esas reglas también se aplican si el modelo se usa desde otro punto del código. Ver validate-task-title.middleware.ts y task.ts.

10. ¿Qué diferencia existe entre INVALID_ID y TASK_NOT_FOUND?
    INVALID_ID frente a TASK_NOT_FOUND: INVALID_ID (400) significa que el identificador de la URL no tiene un formato válido. TASK_NOT_FOUND (404) significa que el identificador sí es válido, pero no corresponde a ninguna tarea.

11. ¿Qué hacen timestamps y versionKey false?
    timestamps y versionKey: false: timestamps: true agrega y mantiene createdAt y updatedAt. versionKey: false evita que Mongoose agregue \_\_v, que esta API no utiliza para control de versiones de documentos.

12. ¿Por qué los controladores deben usar async y await?
    Por qué usar async y await: las operaciones de Mongoose son asíncronas. await permite esperar su resultado antes de responder y propaga los rechazos como errores, en vez de dejar operaciones pendientes o fallos sin manejar.

13. ¿Cómo llega un AppError asíncrono al errorHandler de Express 5?
    Cómo llega AppError al manejador en Express 5: si el controlador async espera una operación que lanza un AppError, su promesa se rechaza. Express 5 pasa ese error automáticamente al middleware central de errores, que genera la respuesta HTTP. En este proyecto, ese flujo se ve en task.controller.ts y error.middleware.ts.

14. ¿Qué prueba demuestra realmente que una tarea es persistente?
    Prueba de persistencia: una prueba de integración puede crear una tarea con POST, tomar el id devuelto y recuperarla en una solicitud HTTP posterior con GET, comprobando que conserva sus datos. Para demostrar que sobrevive al reinicio del servidor, la recuperación debe hacerse después del reinicio y contra la misma base de datos real. La respuesta del POST por sí sola no prueba persistencia: podría limitarse a devolver lo recibido.

15. ¿Qué información de Mongoose o Atlas nunca debe aparecer en la respuesta HTTP?
    Información de Mongoose o Atlas que no debe exponerse: URI de conexión y credenciales, detalles del clúster o servidor, trazas (stack) y errores internos sin filtrar del driver o de Mongoose. El manejador debe devolver el formato público de error de la API, no los detalles internos de infraestructura.
