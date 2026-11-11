//La ruta base /api/tasks se agregará en app.ts. Por eso aquí / representa /api/tasks y /:id representa, por
//ejemplo, /api/tasks/2. Los dos puntos declaran un parámetro variable.
/*
router.param ejecuta validateTaskId siempre que una ruta contenga :id. En POST, requireJson se ejecuta 
antes de validateTaskTitle. Si un middleware envía un error mediante next(error), Express omite el resto de la 
cadena y pasa al manejador central.

La persistencia se implementa detrás del servicio. El cliente no necesita rutas paralelas ni
prefijos como /mongodb. Solo cambia el valor de :id.

PATCH /:id requiere JSON y validación de cambios. taskRouter.param sigue validando
ObjectId para las rutas que contienen :id. La ruta especializada /:id/complete se conserva.
La validación de consulta pertenece a GET /. No debe aplicarse a GET /:id ni a las
operaciones que usan cuerpo JSON. La validación de id continúa mediante taskRouter.param.

Proteger todas las rutas de tareas
Objetivo. Exigir autenticación para el router y rol admin para eliminar.
taskRouter.use(authenticate) se ejecuta para cualquier operación de /api/tasks. DELETE añade
requireRole(admin). Los validadores y controladores de EC2 permanecen en el mismo orden después de la
autorización.

*/
import { Router } from "express";
import {
  getTask,
  getTasks,
  patchTask,
  patchTaskComplete,
  postTask,
  removeTask,
} from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { requireRole } from "../middlewares/authorize.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";
import { validateTaskId } from "../middlewares/validate-task-id.middleware.js";
import { validateTaskQuery } from "../middlewares/validate-task-query.middleware.js";
import { validateTaskTitle } from "../middlewares/validate-task-title.middleware.js";
import { validateTaskUpdate } from "../middlewares/validate-task-update.middleware.js";
export const taskRouter = Router();
taskRouter.use(authenticate);
taskRouter.param("id", validateTaskId);
taskRouter.get("/", validateTaskQuery, getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", requireJson, validateTaskTitle, postTask);
taskRouter.patch("/:id", requireJson, validateTaskUpdate, patchTask);
taskRouter.patch("/:id/complete", patchTaskComplete);
taskRouter.delete("/:id", requireRole("admin"), removeTask);
