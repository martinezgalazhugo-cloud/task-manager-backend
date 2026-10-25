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
import { requireJson } from "../middlewares/require-json.middleware.js";
import { validateTaskId } from "../middlewares/validate-task-id.middleware.js";
import { validateTaskQuery } from "../middlewares/validate-task-query.middleware.js";
import { validateTaskTitle } from "../middlewares/validate-task-title.middleware.js";
import { validateTaskUpdate } from "../middlewares/validate-task-update.middleware.js";
export const taskRouter = Router();
taskRouter.param("id", validateTaskId);
taskRouter.get("/", validateTaskQuery, getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", requireJson, validateTaskTitle, postTask);
taskRouter.patch("/:id", requireJson, validateTaskUpdate, patchTask);
taskRouter.patch("/:id/complete", patchTaskComplete);
taskRouter.delete("/:id", removeTask);
