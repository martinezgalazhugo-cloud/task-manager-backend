/**
 * Types.ObjectId.isValid comprueba si el texto puede representar un ObjectId. La comparación
de ida y vuelta exige exactamente 24 caracteres hexadecimales y evita aceptar valores ambiguos. Un formato
incorrecto sigue siendo un error HTTP 400.
 */

import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { AppError } from "../errors/app-error.js";
export const validateTaskId = (
  _req: Request,
  res: Response,
  next: NextFunction,
  value: string,
): void => {
  const isObjectId =
    Types.ObjectId.isValid(value) &&
    new Types.ObjectId(value).toHexString() === value.toLowerCase();
  if (!isObjectId) {
    next(new AppError("El id debe ser un ObjectId válido.", 400, "INVALID_ID"));
    return;
  }
  res.locals.taskId = value;
  next();
};
