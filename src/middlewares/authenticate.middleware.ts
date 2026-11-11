/**
 * 
Crear el middleware de autenticación
Objetivo. Verificar el formato Bearer y convertir el JWT en identidad.
getBearerToken distingue ausencia de credencial y formato inválido. authenticate reutiliza verifyAccessToken
de A9; si el token es correcto, almacena únicamente userId y role en res.locals.auth.
 * 
• AUTHENTICATION_REQUIRED corresponde a un encabezado ausente.
• INVALID_AUTHORIZATION_HEADER corresponde a un esquema, token o número de partes incorrecto.
• INVALID_TOKEN continúa siendo responsabilidad de verifyAccessToken.
• La función es async. En Express 5 una promesa rechazada llega al errorHandler.
 */

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";
import { verifyAccessToken } from "../services/token.service.js";
const getBearerToken = (authorization: string | undefined): string => {
  if (!authorization) {
    throw new AppError(
      "Debes enviar un token de acceso.",
      401,
      "AUTHENTICATION_REQUIRED",
    );
  }
  const parts = authorization.trim().split(/\s+/);
  const scheme = parts[0];
  const token = parts[1];
  if (parts.length !== 2 || scheme?.toLowerCase() !== "bearer" || !token) {
    throw new AppError(
      "El encabezado Authorization debe usar el formato Bearer <token>.",
      401,
      "INVALID_AUTHORIZATION_HEADER",
    );
  }
  return token;
};
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = getBearerToken(req.header("authorization"));
  res.locals.auth = await verifyAccessToken(token);
  next();
};
