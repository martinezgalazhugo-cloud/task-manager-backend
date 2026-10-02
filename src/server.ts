/**dotenv/config carga .env antes de leer process.env. startServer espera la conexión; si 
falta configuración o Atlas rechaza el acceso, el bloque catch muestra un mensaje seguro y asigna un código 
de salida fallido. */

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
