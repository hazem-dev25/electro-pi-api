import mongoose from "mongoose";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/exception/application.exception.js";
import { iTasks } from "../../common/interface/Tasks.interface.js";
import { DatabaseRepository } from "../../database/repository/database.repository.js";
import { createTaskDTO, updateTaskDTO } from "./task.dto.js";
import { taskModel } from "./Tasks.model.js";

class TaskService {
  repo: DatabaseRepository<iTasks>;
  constructor() {
    this.repo = new DatabaseRepository(taskModel);
  }

  async createTask(data: createTaskDTO, projectId: string): Promise<iTasks> {
    let { title, description } = data;

    let createProject = await this.repo.create({
      title,
      description,
      projectId,
    });

    if (!createProject) {
      throw new BadRequestException("failed to create project", 400);
    }

    return createProject;
  }

  async getProjectTasks(projectId: string, req: any) {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;
    let skip = (page - 1) * limit;

    let tasks = await this.repo.find({ projectId }).skip(skip).limit(limit);

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException("project is not found", 404);
    }
    return tasks;
  }

  async getTasksById(taskId: string) {
    let task = await this.repo.findById(taskId);
    if (!task) {
      throw new NotFoundException("task is not found", 404);
    }
    return task;
  }

  async updateTask(taskId: string, data: updateTaskDTO) {
    let { title, description, status, priority, dueDate } = data;
    let updateTask = await this.repo.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status,
        priority,
        dueDate,
      },
      { new: 1 },
    );
    if (!updateTask) {
      throw new NotFoundException("task is not found", 404);
    }

    return updateTask;
  }

  async deleteTask(taskId: string) {
    let task = await this.repo.findByIdAndDelete(taskId);
    if (!task) {
      throw new BadRequestException("failed to delete task", 404);
    }
    return task;
  }

  async filterTasks(
    projectId: string,
    status?: string,
    priority?: string,
  ): Promise<any[]> {
    let matchStage: any = { projectId: projectId };

    if (status) {
      matchStage.status = status;
    }

    if (priority) {
      matchStage.priority = priority;
    }

    return await taskModel.aggregate([
      {
        $match: matchStage,
      },
    ]);
  }
}

export default new TaskService();
