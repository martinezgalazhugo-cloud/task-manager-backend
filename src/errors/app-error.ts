//AppError distingue errores esperados, como una tarea inexistente, de fallos inesperados. statusCode
//permite responder 400 o 404 sin repetir esa decisión en todos los controladores.

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}
