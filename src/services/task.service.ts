import { tasks } from "../data/tasks.js";

import type { Task } from "../models/task.js";

//  Concentrar las operaciones del dominio y evitar que index.ts manipule directamente la
//colección.

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
