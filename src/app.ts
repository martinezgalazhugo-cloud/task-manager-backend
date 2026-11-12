/**requestContext debe ejecutarse primero para que incluso los errores incluyan requestId. 
express.json precede a las rutas. notFound y errorHandler permanecen al final.

Objetivo. Integrar las rutas nuevas conservando health, tareas, 404 y el manejador central.
authRouter se monta antes de taskRouter y antes de notFound. No se añade un middleware de token a
/api/tasks en esta actividad.

Publicar JSON y Swagger UI desde Express
Objetivo. Hacer que la documentación viaje con la misma versión de la API.
requestContext se ejecuta primero. Después se publican /api-docs.json y /api-docs con cabeceras
específicas. Las rutas funcionales conservan Helmet global, CORS, límite de JSON, notFound y errorHandler.

*/

import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./docs/openapi.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";
import { requestContext } from "./middlewares/request-context.middleware.js";
import {
  corsPolicy,
  documentationSecurityHeaders,
  securityHeaders,
} from "./middlewares/security.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { taskRouter } from "./routes/task.routes.js";
export const app = express();
app.disable("x-powered-by");
app.use(requestContext);
app.get("/api-docs.json", documentationSecurityHeaders, (_req, res): void => {
  res.status(200).json(openApiDocument);
});
app.use(
  "/api-docs",
  documentationSecurityHeaders,
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    customSiteTitle: "Task API Express",
  }),
);
app.use(securityHeaders);
app.use(corsPolicy);
app.use(express.json({ limit: "20kb" }));
app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);
