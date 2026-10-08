//Interpretar las solicitudes y construir respuestas HTTP.

/* 

Lectura del código: req.params.id llega como texto; parseId lo convierte y valida. req.body contiene el
JSON recibido. next(error) transfiere el problema al middleware central. El prefijo _req indica que ese
parámetro es obligatorio en la firma, pero no se utiliza.

Las operaciones de Mongoose devuelven promesas. Cada controlador usa async y await.
En Express 5, si una promesa rechaza o una función asíncrona lanza AppError, Express entrega el error al
manejador central registrado al final de app.ts.

*/

import type { Request, Response } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
} from "../services/task.service.js";
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ data: await listTasks() });
};
export const getTask = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ data: await findTaskById(res.locals.taskId) });
};
export const postTask = async (_req: Request, res: Response): Promise<void> => {
  const task = await createTask(res.locals.taskTitle);
  res.status(201).json({ data: task });
};
export const patchTaskComplete = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const task = await completeTask(res.locals.taskId);
  res.status(200).json({ data: task });
};
export const removeTask = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  await deleteTask(res.locals.taskId);
  res.status(204).send();
};
