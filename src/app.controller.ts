import express, { Express } from "express";
import { connectionDB } from "./database/databaseConnection.js";
import { globalErrorHandler } from "./common/middleware/error.middleware.js";
import { port } from "./config/env.config.js";
import { authRouter } from "./modules/Auth/Auth.routes.js";
import {projectRouter} from "./modules/Projects/Projects.routes.js";
import {connectionRedis} from './common/services/redis/redis.js'
import {taskRouter} from './modules/Tasks/Tasks.routes.js'


export const boostrap = async () => {
  const app: Express = express();

  app.use(express.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/tasks", taskRouter);
  app.use(globalErrorHandler);
  app.listen(port, () => {
    console.log(`connected on port ${port}`);
  });

  await connectionDB();
  await connectionRedis()
};
