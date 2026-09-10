/*

Un middleware de error de Express posee cuatro parámetros; aunque _next no se use, debe
conservarse para que Express reconozca su función. El detalle de un fallo inesperado se registra en el
servidor, pero el cliente recibe un mensaje seguro y general.

*/

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor." });
};
