//Interpretar las solicitudes y construir respuestas HTTP.

/* 

Lectura del código: req.params.id llega como texto; parseId lo convierte y valida. req.body contiene el
JSON recibido. next(error) transfiere el problema al middleware central. El prefijo _req indica que ese
parámetro es obligatorio en la firma, pero no se utiliza.

Las operaciones de Mongoose devuelven promesas. Cada controlador usa async y await.
En Express 5, si una promesa rechaza o una función asíncrona lanza AppError, Express entrega el error al
manejador central registrado al final de app.ts.

patchTask no vuelve a validar ni conoce Mongoose. Espera updateTask y responde 200
con la tarea actualizada. Si la promesa falla, Express 5 envía el error al manejador central.
getTasks toma TaskListQuery de res.locals y responde directamente con TaskListResult.
Los demás controladores permanecen iguales; no deben conocer filtros de MongoDB ni calcular skip.
*/

import type { Request, Response } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
  updateTask,
} from "../services/task.service.js";
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json(await listTasks(res.locals.taskQuery));
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
export const patchTask = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const task = await updateTask(res.locals.taskId, res.locals.taskUpdate);
  res.status(200).json({ data: task });
};
export const removeTask = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  await deleteTask(res.locals.taskId);
  res.status(204).send();
};
