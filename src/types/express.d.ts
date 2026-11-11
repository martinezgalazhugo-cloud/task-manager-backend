/**
Tipar la identidad de la solicitud
Objetivo. Extender Express para que res.locals.auth tenga un tipo conocido.
Este archivo de declaración no genera JavaScript. TypeScript combina la interfaz Locals de Express con una
propiedad auth opcional que contiene el userId y role verificados.
 */

import type { AccessTokenSubject } from "./auth.js";
declare global {
  namespace Express {
    interface Locals {
      auth?: AccessTokenSubject;
    }
  }
}
export {};
