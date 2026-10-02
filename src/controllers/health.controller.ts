/**
 * getHealth conserva la respuesta anterior. getDatabaseHealth es async porque espera el 
ping. En Express 5, si la promesa se rechaza o AppError se lanza dentro de la función async, Express envía el 
error automáticamente al manejador central.
 */

import type { Request, Response } from "express";
import { checkDatabaseHealth } from "../services/database.service.js";
export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({ status: "ok" });
};
export const getDatabaseHealth = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const database = await checkDatabaseHealth();
  res.status(200).json({ data: { database } });
};
