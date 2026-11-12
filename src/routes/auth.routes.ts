/**
Limitar las rutas públicas de autenticación
Objetivo. Aplicar el control de frecuencia antes de registro y login.
authRouter.use coloca el limitador delante de ambas rutas. Cuando una IP supera el máximo configurado
dentro de la ventana, el error central responde 429. Las rutas permanecen públicas porque el usuario todavía
no posee un token.
 */

import { Router } from "express";
import {
  getMe,
  postLogin,
  postRegister,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";
import { authRateLimiter } from "../middlewares/security.middleware.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validate-auth.middleware.js";
export const authRouter = Router();
authRouter.post(
  "/register",
  authRateLimiter,
  requireJson,
  validateRegister,
  postRegister,
);
authRouter.post(
  "/login",
  authRateLimiter,
  requireJson,
  validateLogin,
  postLogin,
);
authRouter.get("/me", authenticate, getMe);
