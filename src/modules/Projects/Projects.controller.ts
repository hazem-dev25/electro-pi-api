import { Request, Response } from "express";
import { SuccessResponse } from "../../common/exception/success.responce.js";
import ProjectsService from "./Projects.service.js";
import { AuthenticatedRequest } from "../../common/interface/Auth.interface.js";



export const createProjectController = async (req: AuthenticatedRequest,res: Response)=>{
    let project = await ProjectsService.createProject(req.body , req.userid as string)
    SuccessResponse({res , message: 'Project created succ' ,data: project , status: 201})
}


export const memberProjectsController = async (req: AuthenticatedRequest ,res: Response) =>{
    let member = await ProjectsService.memberProject(req.userid as string , req)
    SuccessResponse({res , message: 'here all projects' , data: member , status: 200})
}


export const getProjectByIdController = async (req: AuthenticatedRequest , res: Response) =>{
    let project = await ProjectsService.getProjectByID(req.params.id as string)
    SuccessResponse({res , message: 'here all projects' , data: project , status: 200})
}


export const updateProjectController = async (req: AuthenticatedRequest , res: Response)=>{
    let project = await ProjectsService.updateProject(req.params.id as string , req.body)
    SuccessResponse({res , message: 'project is updated succ' , data: project , status: 200})
}


export const deleteProjectController = async (req: AuthenticatedRequest , res: Response)=>{
    let project = await ProjectsService.deleteProject(req.params.id as string)
    SuccessResponse({res , message: 'project is deleted succ' , data: project , status: 200})
}