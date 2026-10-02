/**
 * El router se montará sobre /health. Por eso / representa /health y /database representa 
/health/database.
 */

import { Router } from "express";
import {
  getDatabaseHealth,
  getHealth,
} from "../controllers/health.controller.js";
export const healthRouter = Router();
healthRouter.get("/", getHealth);
healthRouter.get("/database", getDatabaseHealth);
