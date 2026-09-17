/*

Un middleware de error de Express posee cuatro parámetros; aunque _next no se use, debe
conservarse para que Express reconozca su función. El detalle de un fallo inesperado se registra en el
servidor, pero el cliente recibe un mensaje seguro y general.

*/
/*
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
*/
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";
import type { ApiErrorPayload } from "../types/api-error.js";
const isInvalidJson = (error: unknown): boolean => {
  if (!(error instanceof SyntaxError)) return false;
  return (
    "status" in error &&
    typeof error.status === "number" &&
    error.status === 400
  );
};
const sendError = (
  res: Response,
  status: number,
  payload: ApiErrorPayload,
): void => {
  res.status(status).json({ error: payload });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }
  const requestId: string | undefined = res.locals.requestId;
  if (error instanceof AppError) {
    sendError(res, error.statusCode, {
      code: error.code,
      message: error.message,
      details: error.details,
      requestId,
    });
    return;
  }
  if (isInvalidJson(error)) {
    sendError(res, 400, {
      code: "INVALID_JSON",
      message: "El cuerpo contiene JSON inválido.",
      requestId,
    });
    return;
  }
  console.error({ requestId, error });
  sendError(res, 500, {
    code: "INTERNAL_ERROR",
    message: "Ocurrió un error interno.",
    requestId,
  });
};
