//AppError distingue errores esperados, como una tarea inexistente, de fallos inesperados. statusCode
//permite responder 400 o 404 sin repetir esa decisión en todos los controladores.

/*
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}
*/

import type { FieldIssue } from "../types/api-error.js";
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details?: FieldIssue[],
  ) {
    super(message);
    this.name = "AppError";
  }
}
