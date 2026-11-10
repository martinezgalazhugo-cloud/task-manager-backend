/**
 * 
 * Objetivo. Separar datos recibidos, resultados públicos y sujeto del token.
Estos tipos evitan que el servicio acepte objetos abiertos y hacen visible qué datos pueden salir de cada
operación. El límite de 72 bytes coincide con bcrypt.
 */

import type { User, UserRole } from "../models/user.js";
export const MIN_PASSWORD_CHARACTERS = 15;
export const MAX_PASSWORD_BYTES = 72;
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterResult {
  user: User;
}
export interface LoginResult {
  user: User;
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
}
export interface AccessTokenSubject {
  userId: string;
  role: UserRole;
}
