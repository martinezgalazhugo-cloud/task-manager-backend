//La ruta base /api/tasks se agregará en app.ts. Por eso aquí / representa /api/tasks y /:id representa, por
//ejemplo, /api/tasks/2. Los dos puntos declaran un parámetro variable.

import { Router } from "express";
import {
  getTask,
  getTasks,
  patchTaskComplete,
  postTask,
  removeTask,
} from "../controllers/task.controller.js";
export const taskRouter = Router();
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", postTask);
taskRouter.patch("/:id/complete", patchTaskComplete);
taskRouter.delete("/:id", removeTask);
