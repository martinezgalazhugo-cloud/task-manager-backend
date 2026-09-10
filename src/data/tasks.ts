import type { Task } from "../models/task.js";

// Preparar una colección en memoria con tareas que cumplan la interfaz.
export const tasks: Task[] = [
  {
    id: 1,
    title: "Configurar Express",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Probar la API con Postman",
    status: "pending",
    createdAt: new Date(),
  },
];

/*   

    id: 1,
    title: "Configurar el proyecto backend",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Practicar TypeScript",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Revisar la documentación",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "Implementar la API REST",
    status: "completed",
    createdAt: new Date(),
  },


*/
