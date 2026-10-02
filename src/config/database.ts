/**mongoose.connect devuelve una promesa. await impide continuar hasta que Atlas 
acepte la conexión. dbName mantiene el nombre fuera de la URI y serverSelectionTimeoutMS evita una 
espera indefinida durante la práctica.
 */

import mongoose from "mongoose";
export interface DatabaseConfig {
  uri: string;
  dbName: string;
}
export const connectDatabase = async (
  config: DatabaseConfig,
): Promise<void> => {
  await mongoose.connect(config.uri, {
    dbName: config.dbName,
    serverSelectionTimeoutMS: 5000,
  });
  console.log("Conexión con MongoDB establecida.");
};
