/**requestContext debe ejecutarse primero para que incluso los errores incluyan requestId. 
express.json precede a las rutas. notFound y errorHandler permanecen al final.

Objetivo. Integrar las rutas nuevas conservando health, tareas, 404 y el manejador central.
authRouter se monta antes de taskRouter y antes de notFound. No se añade un middleware de token a
/api/tasks en esta actividad.

*/

/** 
import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import { requestContext } from "./middlewares/request-context.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
export const app = express();
app.use(requestContext);
app.use(express.json());
app.use("/health", healthRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

Montar los controles globales en el orden correcto
Objetivo. Aplicar requestId, cabeceras y CORS antes de procesar JSON y rutas.
app.ts conserva /health, /api/auth y /api/tasks. Los controles globales se colocan antes del parser y las rutas;
notFound y errorHandler continúan al final.
*/
import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";
import { requestContext } from "./middlewares/request-context.middleware.js";
import {
  corsPolicy,
  securityHeaders,
} from "./middlewares/security.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { taskRouter } from "./routes/task.routes.js";
export const app = express();
app.disable("x-powered-by");
app.use(requestContext);
app.use(securityHeaders);
app.use(corsPolicy);
app.use(express.json({ limit: "20kb" }));
app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);
