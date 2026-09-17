//Interpretar las solicitudes y construir respuestas HTTP.

/* 

Lectura del código: req.params.id llega como texto; parseId lo convierte y valida. req.body contiene el
JSON recibido. next(error) transfiere el problema al middleware central. El prefijo _req indica que ese
parámetro es obligatorio en la firma, pero no se utiliza.

*/
import type { NextFunction, Request, Response } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
} from "../services/task.service.js";
import { AppError } from "../errors/app-error.js";

export const getTasks = (_req: Request, res: Response): void => {
  res.status(200).json({ data: listTasks() });
};

type TaskParams = {
  id: string;
};

export const getTask = (_req: Request, res: Response): void => {
  res.status(200).json({ data: findTaskById(res.locals.taskId) });
};
export const postTask = (_req: Request, res: Response): void => {
  const task = createTask(res.locals.taskTitle);
  res.status(201).json({ data: task });
};
export const patchTaskComplete = (_req: Request, res: Response): void => {
  const task = completeTask(res.locals.taskId);
  res.status(200).json({ data: task });
};
export const removeTask = (_req: Request, res: Response): void => {
  deleteTask(res.locals.taskId);
  res.status(204).send();
};
