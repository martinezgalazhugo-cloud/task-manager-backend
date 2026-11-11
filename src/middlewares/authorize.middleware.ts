/*
Crear la fábrica de autorización por roles
Objetivo. Permitir que cada ruta declare los roles aceptados.
requireRole recibe uno o más roles y devuelve un RequestHandler. Primero confirma que authenticate dejó una
identidad; después comprueba el rol. Esta separación permite reutilizar autenticación sin asignar el mismo
permiso a todas las operaciones.
 */

import type { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../errors/app-error.js";
import type { UserRole } from "../models/user.js";
export const requireRole =
  (...allowedRoles: UserRole[]): RequestHandler =>
  (_req: Request, res: Response, next: NextFunction): void => {
    const auth = res.locals.auth;
    if (!auth) {
      next(
        new AppError(
          "No existe una identidad autenticada en la solicitud.",
          401,
          "AUTHENTICATION_REQUIRED",
        ),
      );
      return;
    }
    if (!allowedRoles.includes(auth.role)) {
      next(
        new AppError(
          "No tienes permiso para realizar esta operación.",
          403,
          "FORBIDDEN",
        ),
      );
      return;
    }
    next();
  };
