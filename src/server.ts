/**dotenv/config carga .env antes de leer process.env. startServer espera la conexión; si 
falta configuración o Atlas rechaza el acceso, el bloque catch muestra un mensaje seguro y asigna un código 
de salida fallido. */

/** 
import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { loadEnvironment } from "./config/env.js";
const startServer = async (): Promise<void> => {
  try {
    const env = loadEnvironment();
    await connectDatabase({
      uri: env.mongodbUri,
      dbName: env.mongodbDbName,
    });
    app.listen(env.port, () => {
      console.log(`API disponible en http://localhost:${env.port}`);
    });
  } catch {
    console.error(
      "No fue posible iniciar la API. Revise MONGODB_URI, " +
        "el usuario y la lista de acceso de red.",
    );
    process.exitCode = 1;
  }
};
void startServer();
*/

import type { Server } from "node:http";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
let server: Server | undefined;
const start = async (): Promise<void> => {
  try {
    await connectDatabase({
      uri: env.MONGODB_URI,
      dbName: env.MONGODB_DB_NAME,
    });
    server = app.listen(env.PORT, () => {
      console.log(`API disponible en http://localhost:${env.PORT}`);
    });
  } catch {
    console.error(
      "No fue posible iniciar la API. Revisa la configuración y la conexión.",
    );
    process.exitCode = 1;
  }
};
const shutdown = async (signal: string): Promise<void> => {
  console.log(`Se recibió ${signal}. Cerrando la API.`);
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server?.close((error) => (error ? reject(error) : resolve()));
    });
  }
  await disconnectDatabase();
};
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void shutdown(signal).catch(() => {
      console.error("No fue posible cerrar la API correctamente.");
      process.exitCode = 1;
    });
  });
}
await start();
