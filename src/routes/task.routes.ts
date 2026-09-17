//La ruta base /api/tasks se agregará en app.ts. Por eso aquí / representa /api/tasks y /:id representa, por
//ejemplo, /api/tasks/2. Los dos puntos declaran un parámetro variable.
/*
router.param ejecuta validateTaskId siempre que una ruta contenga :id. En POST, requireJson se ejecuta 
antes de validateTaskTitle. Si un middleware envía un error mediante next(error), Express omite el resto de la 
cadena y pasa al manejador central.
*/

import { Router } from "express";
import {
  getTask,
  getTasks,
  patchTaskComplete,
  postTask,
  removeTask,
} from "../controllers/task.controller.js";
import { requireJson } from "../middlewares/require-json.middleware.js";
import { validateTaskId } from "../middlewares/validate-task-id.middleware.js";
import { validateTaskTitle } from "../middlewares/validate-task-title.middleware.js";
export const taskRouter = Router();
taskRouter.param("id", validateTaskId);
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", requireJson, validateTaskTitle, postTask);
taskRouter.patch("/:id/complete", patchTaskComplete);
taskRouter.delete("/:id", removeTask);
