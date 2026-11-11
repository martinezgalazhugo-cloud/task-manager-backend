/**
 process.env entrega string o undefined. La función comprueba los valores antes de 
usarlos y devuelve un objeto tipado, sin any. La lectura se realiza dentro del arranque para que los errores 
sean controlados.

Objetivo. Evitar que valores faltantes o inválidos lleguen a los middleware.
env.ts continúa validando Atlas y JWT, y ahora exige CORS_ORIGIN. La función parsePositiveInteger rechaza
cero, negativos, decimales y texto para impedir límites ambiguos.
 */
/** 
const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}.`);
  }
  return value;
};
const readPort = (): number => {
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT debe ser un entero positivo.");
  }
  return port;
};
export interface EnvironmentConfig {
  port: number;
  mongodbUri: string;
  mongodbDbName: string;
}
export const loadEnvironment = (): EnvironmentConfig => {
  return {
    port: readPort(),
    mongodbUri: requireEnvironmentVariable("MONGODB_URI"),
    mongodbDbName: requireEnvironmentVariable("MONGODB_DB_NAME"),
  };
};

import "dotenv/config";
const requireValue = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
};
const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT debe ser un número entero entre 1 y 65535.");
  }
  return port;
};
const parseJwtSecret = (): string => {
  const secret = requireValue("JWT_SECRET");
  if (Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET debe contener al menos 32 bytes.");
  }
  return secret;
};
const parseExpiration = (): string => {
  const value = process.env.JWT_EXPIRES_IN?.trim() || "1h";
  if (!/^\d+[smhd]$/.test(value)) {
    throw new Error("JWT_EXPIRES_IN debe usar un formato como 15m, 1h o 7d.");
  }
  return value;
};
export const env = Object.freeze({
  PORT: parsePort(process.env.PORT),
  MONGODB_URI: requireValue("MONGODB_URI"),
  MONGODB_DB_NAME: requireValue("MONGODB_DB_NAME"),
  JWT_SECRET: parseJwtSecret(),
  JWT_EXPIRES_IN: parseExpiration(),
  JWT_ISSUER: process.env.JWT_ISSUER?.trim() || "task-api-express",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE?.trim() || "task-api-client",
});
*/

import "dotenv/config";
const requireValue = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
};
const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT debe ser un número entero entre 1 y 65535.");
  }
  return port;
};
const parseJwtSecret = (): string => {
  const secret = requireValue("JWT_SECRET");
  if (Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET debe contener al menos 32 bytes.");
  }
  return secret;
};
const parseExpiration = (): string => {
  const value = process.env.JWT_EXPIRES_IN?.trim() || "1h";
  if (!/^\d+[smhd]$/.test(value)) {
    throw new Error("JWT_EXPIRES_IN debe usar un formato como 15m, 1h o 7d.");
  }
  return value;
};
const parsePositiveInteger = (name: string, fallback: string): number => {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} debe ser un número entero mayor que cero.`);
  }
  return value;
};
export const env = Object.freeze({
  PORT: parsePort(process.env.PORT),
  MONGODB_URI: requireValue("MONGODB_URI"),
  MONGODB_DB_NAME: requireValue("MONGODB_DB_NAME"),
  JWT_SECRET: parseJwtSecret(),
  JWT_EXPIRES_IN: parseExpiration(),
  JWT_ISSUER: process.env.JWT_ISSUER?.trim() || "task-api-express",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE?.trim() || "task-api-client",
  CORS_ORIGIN: requireValue("CORS_ORIGIN"),
  AUTH_RATE_LIMIT_WINDOW_MS: parsePositiveInteger(
    "AUTH_RATE_LIMIT_WINDOW_MS",
    "900000",
  ),
  AUTH_RATE_LIMIT_MAX: parsePositiveInteger("AUTH_RATE_LIMIT_MAX", "10"),
});
