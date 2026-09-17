import { tasks } from "../data/tasks.js";
import { AppError } from "../errors/app-error.js";
import type { Task } from "../models/task.js";

//  Concentrar las operaciones del dominio y evitar que index.ts manipule directamente la
//colección.

/*
 El parámetro title se recibe como unknown porque un cliente externo puede enviar cualquier tipo. El
servicio valida antes de utilizar trim. La función deleteTask devuelve void porque una eliminación
correcta no necesita producir un objeto nuevo. 
 
 */

export const listTasks = (): readonly Task[] => tasks;

//Buscar una tarea por su id y devolverla. Si no existe, devolver undefined.
export const findTaskById = (id: number): Task => {
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    throw new AppError(
      `No existe una tarea con el id ${id}.`,
      404,
      "TASK_NOT_FOUND",
    );
  }
  return task;
};

// Crear una nueva tarea con el título proporcionado y agregarla a la colección.
export const createTask = (title: unknown): Task => {
  if (typeof title !== "string" || !title.trim()) {
    throw new AppError(
      "La solicitud contiene datos inválidos.",
      422,
      "VALIDATION_ERROR",
      [{ field: "title", message: "Debe ser texto no vacío." }],
    );
  }
  if (title.trim().length > 120) {
    throw new AppError(
      "La solicitud contiene datos inválidos.",
      422,
      "VALIDATION_ERROR",
      [{ field: "title", message: "No debe superar 120 caracteres." }],
    );
  }

  const task: Task = {
    id: Math.max(0, ...tasks.map((item) => item.id)) + 1,
    title: title.trim(),
    status: "pending",
    createdAt: new Date(),
  };
  tasks.push(task);
  return task;
};

export const completeTask = (id: number): Task => {
  const task = findTaskById(id);
  task.status = "completed";
  return task;
};

export const deleteTask = (id: number): void => {
  const index = tasks.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new AppError(
      `No existe una tarea con el id ${id}.`,
      404,
      "TASK_NOT_FOUND",
    );
  }
  tasks.splice(index, 1);
};

/*
export const listTasks = (): readonly Task[] => tasks;

//Buscar una tarea por su id y devolverla. Si no existe, devolver undefined.
export const findTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

// Crear una nueva tarea con el título proporcionado y agregarla a la colección.
export const createTask = (title: string): Task => {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("El titulo de la tarea no puede estar vacío");
  }

  // Calcular el id de la nueva tarea como el máximo id existente + 1.
  const nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;
  const newTask: Task = {
    id: nextId,
    title: cleanTitle,
    status: "pending",
    createdAt: new Date(),
  };

  tasks.push(newTask);
  return newTask;
};

//Buscar una tarea por su id y cambiar su estado a "completed". Si no existe, lanzar un error.
export const completeTask = (id: number): Task => {
  const task = findTaskById(id);
  if (!task) {
    throw new Error(`No existe una tarea con el id ${id}`);
  }
  task.status = "completed";
  return task;
};

//Eliminar una tarea por su id y devolverla. Si no existe, lanzar un error.
export const deleteTask = (id: number): Task => {
  const task1 = findTaskById(id);
  if (!task1) {
    throw new Error(`No existe una tarea con el id ${id}`);
  }
  const index = tasks.indexOf(task1);
  tasks.splice(index, 1);
  return task1;
};

//Buscar todas las tareas con estado "pending" y devolverlas.
export const listPendingTasks = (): readonly Task[] =>
  tasks.filter((task) => task.status === "pending");
*/
