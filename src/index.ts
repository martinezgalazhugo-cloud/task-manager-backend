//Coordinar los módulos, aplicar async/await y capturar errores.

import { title } from "node:process";
import {
  createTask,
  completeTask,
  listTasks,
} from "./services/task.service.js";
import { delay } from "./utils/delay.js";
import { getAppName } from "./utils/env.js";

const showTasks = (): void => {
  const rows = listTasks().map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString(),
  }));

  console.table(rows);
};

const main = async (): Promise<void> => {
  console.log(`\n${getAppName()}`);
  console.log("Iniciando aplicacion...");
  await delay(300);

  console.log("\nTareas iniciales");
  showTasks();

  const newTask = createTask("Construir mi primer servicio");
  console.log(`Tarea ${newTask.id} completada.`);

  console.log("\nTareas finales");
  showTasks();

  try {
    completeTask(999);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";

    console.error(`Error controlado: ${message}`);
  }
};

main().catch((error: unknown) => {
  console.error("Error no controlado:", error);
  process.exitCode = 1;
});

//main se declara async porque utiliza await. El primer try/catch demuestra un error esperado y controlado. El catch
//final evita que una promesa rechazada termine silenciosamente; además, process.exitCode = 1 comunica al sistema
//operativo que la ejecución falló.
