//Separar la configuración del código fuente.

export const getAppName = (): string =>
  process.env.APP_NAME?.trim() || "Task Manager Backend";
