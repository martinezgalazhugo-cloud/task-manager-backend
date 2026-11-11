/**
Exponer el identificador de solicitud
Objetivo. Permitir que cliente y servidor correlacionen una respuesta sin revelar datos internos.
A9 ya generaba requestId para los errores. Ahora también se devuelve en X-Request-Id, y CORS expone ese
encabezado al origen permitido. El valor es un UUID nuevo por solicitud. 
 
 */

import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
export const requestContext = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestId = randomUUID();
  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
};
