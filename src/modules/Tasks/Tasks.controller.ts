import { Request, Response } from "express";
import TasksService from "./Tasks.service.js";
import { SuccessResponse } from "../../common/exception/success.responce.js";

export const createTaskController = async (req: Request, res: Response) => {
  let task = await TasksService.createTask(
    req.body,
    req.params.projectId as string,
  );
  SuccessResponse({
    res,
    message: "task created succ",
    data: task,
    status: 201,
  });
};

export const getProjectTasksController = async (
  req: Request,
  res: Response,
) => {
  let task = await TasksService.getProjectTasks(req.params.id as string , req);
  SuccessResponse({
    res,
    message: "here is all tasks of this project",
    data: task,
    status: 200,
  });
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  let task = await TasksService.getTasksById(req.params.id as string);
  SuccessResponse({
    res,
    message: "here is the task",
    data: task,
    status: 200,
  });
};

export const updateTaskController = async (req: Request, res: Response) => {
  let task = await TasksService.updateTask(req.params.id as string, req.body);
  SuccessResponse({
    res,
    message: "task updated succ",
    data: task,
    status: 200,
  });
};

export const deleteTaskController = async (req: Request, res: Response) => {
  let task = await TasksService.deleteTask(req.params.id as string);
  SuccessResponse({
    res,
    message: "task deleted succ",
    data: task,
    status: 200,
  });
};

export const filterTasksController = async (req: Request, res: Response) => {
    const { status, priority } = req.query as any;
  let task = await TasksService.filterTasks(req.params.projectId as string , status , priority);
  SuccessResponse({
    res,
    message: "here is filterd tasks",
    data: task,
    status: 200,
  });
};
