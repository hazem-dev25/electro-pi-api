import { Router } from "express";
import { authMiddlware } from "../../common/middleware/Auth.js";
import { validation } from "../../common/middleware/validation.js";
import { createProjectSchema, updateProjectSchema } from "./Projects.validation.js";
import { createProjectController, deleteProjectController, getProjectByIdController, memberProjectsController, updateProjectController } from "./Projects.controller.js";
import { accessTo } from "../../common/middleware/role.middleware.js";

export const projectRouter = Router()

projectRouter.use(authMiddlware as any)

projectRouter.post('/createProject' ,  validation(createProjectSchema) , createProjectController)

projectRouter.get('/memberProject' , memberProjectsController)

projectRouter.get('/getProjectById/:id' , getProjectByIdController)

projectRouter.patch('/updateProject/:id' , validation(updateProjectSchema) , updateProjectController)

projectRouter.delete('/daleteProject/:id' , accessTo('Admin'), deleteProjectController )

