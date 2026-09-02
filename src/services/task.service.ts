import { tasks } from "../data/tasks.js";

import type { Task } from "../models/task.js";

//  Concentrar las operaciones del dominio y evitar que index.ts manipule directamente la
//colección.

export const listTasks = (): readonly Task[] => tasks;

export const findTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

export const createTask = (title: string): Task => {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("El titulo de la tarea no puede estar vacío");
  }

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

export const completeTask = (id: number): Task => {
  const task = findTaskById(id);
  if (!task) {
    throw new Error(`No exite una tarea con el id ${id}`);
  }
  task.status = "completed";
  return task;
};
