import { Router } from "express";
import { validation } from "../../common/middleware/validation.js";
import { createTaskSchema, updateTaskSchema } from "./task.validation.js";
import { authMiddlware } from "../../common/middleware/Auth.js";
import {
  createTaskController,
  deleteTaskController,
  filterTasksController,
  getProjectTasksController,
  getTaskByIdController,
  updateTaskController,
} from "./Tasks.controller.js";
import { accessTo } from "../../common/middleware/role.middleware.js";

export const taskRouter = Router();

taskRouter.use(authMiddlware as any);

taskRouter.post(
  "/createTask/:projectId",
  validation(createTaskSchema),
  createTaskController,
);
 
taskRouter.get("/getProjectTasks/:id", getProjectTasksController);

taskRouter.get('/getTaskById/:id' , getTaskByIdController)

taskRouter.patch('/updateTask/:id' , validation(updateTaskSchema)  ,updateTaskController)

taskRouter.delete('/deleteTask/:id' , accessTo('Admin') ,deleteTaskController)

taskRouter.get('/filterTasks/:projectId' ,  filterTasksController)