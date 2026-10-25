/**
 * El servicio es la frontera entre la aplicación y Mongoose. toTask transforma _id en id. Cada
función espera la consulta con await y convierte las fallas conocidas en AppError. Migrar también completeTask y
deleteTask evita que la API dependa de dos almacenamientos incompatibles.

updateTask usa $set para modificar solo los campos validados. new true devuelve el
documento actualizado y runValidators true aplica el esquema. completeTask delega en updateTask para
evitar dos implementaciones distintas.

El servicio ya no importa TaskModel ni construye consultas. Convierte documentos a la
respuesta pública, calcula totalPages y decide cuándo una ausencia es TASK_NOT_FOUND. El repositorio
maneja los errores técnicos; el servicio conserva las reglas del módulo.
 */

import type { HydratedDocument } from "mongoose";
import { AppError } from "../errors/app-error.js";
import {
  type Task,
  type TaskPersistence,
  type TaskUpdate,
} from "../models/task.js";
import {
  createTaskDocument,
  deleteTaskDocument,
  findTaskDocumentById,
  findTaskDocuments,
  updateTaskDocument,
} from "../repositories/task.repository.js";
import type { TaskListQuery, TaskListResult } from "../types/task-query.js";
const toTask = (document: HydratedDocument<TaskPersistence>): Task => ({
  id: document._id.toString(),
  title: document.title,
  status: document.status,
  createdAt: document.createdAt,
  updatedAt: document.updatedAt,
});
export const listTasks = async (
  query: TaskListQuery,
): Promise<TaskListResult> => {
  const { documents, total } = await findTaskDocuments(query);
  const totalPages = Math.ceil(total / query.limit);
  return {
    data: documents.map(toTask),
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1 && totalPages > 0,
    },
  };
};
export const findTaskById = async (id: string): Promise<Task> => {
  const document = await findTaskDocumentById(id);
  if (!document) {
    throw new AppError(
      `No existe una tarea con el id ${id}.`,
      404,
      "TASK_NOT_FOUND",
    );
  }
  return toTask(document);
};
export const createTask = async (title: string): Promise<Task> => {
  const document = await createTaskDocument(title);
  return toTask(document);
};
export const updateTask = async (
  id: string,
  changes: TaskUpdate,
): Promise<Task> => {
  const document = await updateTaskDocument(id, changes);
  if (!document) {
    throw new AppError(
      `No existe una tarea con el id ${id}.`,
      404,
      "TASK_NOT_FOUND",
    );
  }
  return toTask(document);
};
export const completeTask = async (id: string): Promise<Task> =>
  updateTask(id, { status: "completed" });
export const deleteTask = async (id: string): Promise<void> => {
  const document = await deleteTaskDocument(id);
  if (!document) {
    throw new AppError(
      `No existe una tarea con el id ${id}.`,
      404,
      "TASK_NOT_FOUND",
    );
  }
};
