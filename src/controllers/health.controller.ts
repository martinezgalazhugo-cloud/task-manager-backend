/**
 * getHealth conserva la respuesta anterior. getDatabaseHealth es async porque espera el 
ping. En Express 5, si la promesa se rechaza o AppError se lanza dentro de la función async, Express envía el 
error automáticamente al manejador central.
 */

import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { getDatabaseStatus } from "../services/database.service.js";
export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    data: {
      //se cambio up por connected para que coincida con el estado de la base de datos
      status: "connected",
      version: env.APP_VERSION,
      environment: env.NODE_ENV,
    },
  });
};
export const getDatabaseHealth = (_req: Request, res: Response): void => {
  const data = getDatabaseStatus();
  res.status(data.status === "connected" ? 200 : 503).json({ data });
};
