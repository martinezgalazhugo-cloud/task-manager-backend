/**
 * Paso 14. Crear el script administrativo de roles
Objetivo. Promover o degradar cuentas sin publicar una ruta HTTP peligrosa.
El script acepta correo y rol, valida el rol con la misma función del modelo, abre la conexión, actualiza un
usuario y siempre intenta desconectarse. Los clientes nunca pueden asignar role durante el registro.
 */

import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { isUserRole } from "../models/user.js";
import { setUserRoleByEmail } from "../repositories/user.repository.js";
import { env } from "../config/env.js";
const run = async (): Promise<void> => {
  const email = process.argv[2]?.trim().toLowerCase();
  const role = process.argv[3]?.trim();
  if (!email || !role || !isUserRole(role)) {
    throw new Error("Uso: pnpm role:set <correo> <user|admin>");
  }

  //cambio de conexion a la base de datos
  await connectDatabase({
    uri: env.MONGODB_URI,
    dbName: env.MONGODB_DB_NAME,
  });

  const user = await setUserRoleByEmail(email, role);
  if (!user) throw new Error(`No existe un usuario con el correo ${email}.`);
  console.log(`Rol actualizado: ${user.email} ahora es ${user.role}.`);
};
try {
  await run();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Error desconocido.";
  console.error(`No fue posible actualizar el rol. ${message}`);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
