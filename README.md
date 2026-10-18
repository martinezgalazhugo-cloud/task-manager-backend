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

1. ¿Qué operación de Mongoose corresponde a cada letra de CRUD?
   CRUD en Mongoose:

Create: TaskModel.create()
Read: TaskModel.find() y TaskModel.findById()
Update: TaskModel.findByIdAndUpdate()
Delete: TaskModel.findByIdAndDelete()
Estas operaciones se usan en el servicio de tareas: task.service.ts.

2. ¿Por qué se usa PATCH y no un reemplazo completo del documento?
   Se usa PATCH porque se actualizan solo los campos enviados, como title o status. Un reemplazo completo exigiría enviar todo el documento y podría sobrescribir campos que el cliente no quería cambiar.

3. ¿Qué problema evita $set?
$set limita la actualización a los campos proporcionados. Así se evita reemplazar accidentalmente el documento completo y perder otros datos.

4. ¿Qué efecto tienen new true y runValidators true?
   new: true hace que la operación devuelva el documento después de actualizarlo. runValidators: true aplica a la actualización las validaciones del esquema de Mongoose, definido en task.ts.

5. ¿Por qué un cuerpo vacío debe rechazarse?
   Se rechaza un cuerpo vacío porque no contiene ningún cambio que aplicar. Aceptarlo podría aparentar una actualización válida aunque no cambie ningún campo. La validación está en validate-task-update.middleware.ts.

6. ¿Qué diferencia existe entre INVALID_ID y TASK_NOT_FOUND?
   INVALID_ID frente a TASK_NOT_FOUND: INVALID_ID significa que el identificador tiene un formato no válido; TASK_NOT_FOUND significa que el ID es válido, pero no corresponde a ninguna tarea existente.

7. ¿Qué responsabilidad cumple validateTaskUpdate y cuál cumple TaskModel?
   validateTaskUpdate valida la solicitud: comprueba que el cuerpo sea un objeto, que no esté vacío, que solo incluya campos permitidos y que sus valores tengan el formato esperado. TaskModel define las reglas del documento persistido, como título obligatorio, longitud máxima, estados válidos y fechas de creación y actualización. El servicio aplica ambas capas al guardar.

8. ¿Cómo llega un error de updateTask al errorHandler de Express 5?
   Un error de updateTask se propaga desde el servicio al controlador, que lo espera con await. Express 5 reenvía automáticamente al middleware de errores las excepciones o promesas rechazadas por controladores asíncronos. El errorHandler convierte los AppError en respuestas HTTP: task.controller.ts y error.middleware.ts.

9. ¿Por qué DELETE responde 204 sin cuerpo?
   DELETE responde 204 No Content para indicar que la eliminación fue exitosa y que no hay contenido que devolver. La ruta envía la respuesta sin cuerpo después de completar la eliminación, en task.controller.ts.

10. ¿Qué prueba demuestra que el CRUD es persistente y no solo funcional en memoria?
    La prueba de persistencia debe crear una tarea, reiniciar la API y después consultarla para comprobar que sigue en MongoDB; también puede verificar una actualización y una eliminación. El reinicio distingue la persistencia real de datos guardados solo en la memoria del proceso. En este repositorio no encontré pruebas automatizadas y el script test de package.json aún es un marcador de posición.
