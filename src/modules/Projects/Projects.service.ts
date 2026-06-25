import {
  BadRequestException,
  NotFoundException,
} from "../../common/exception/application.exception.js";
import { iProject } from "../../common/interface/project.interface.js";
import { DatabaseRepository } from "../../database/repository/database.repository.js";
import { createProjectDTO, updateProjectDTO } from "./Projects.dto.js";
import { projectModel } from "./Projects.model.js";

class ProjectService {
  repo: DatabaseRepository<iProject>;
  constructor() {
    this.repo = new DatabaseRepository(projectModel);
  }

  async createProject(
    data: createProjectDTO,
    userid: string,
  ): Promise<iProject> {
    let { title, description, status } = data;

    let project = await this.repo.create({
      title,
      description,
      status,
      userid,
    });

    if (!project) {
      throw new BadRequestException("failed to create project" ,400);
    }

    return project;
  }

  async memberProject(userId: string, req: any) {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;
    let skip = (page - 1) * limit;
    let project = await this.repo
      .find({ userid: userId } ,{} ,undefined ,{} , limit ,skip)
      
    if (!project || project.length === 0) {
      throw new NotFoundException("project is not found" ,404);
    }
    return project;
  }

  async getProjectByID(projectID: string): Promise<iProject> {
    let project = await this.repo.findById(projectID);
    if (!project) {
      throw new NotFoundException(
        `project with this id: ${projectID} is not found`,
      404);
    }
    return project;
  }

  async updateProject(
    projectId: string,
    data: updateProjectDTO,
  ): Promise<iProject> {
    let { title, description, status } = data;
    let updateProject = await this.repo.findByIdAndUpdate(
      projectId,
      { title, description, status },
      { new: 1 },
    );
    if (!updateProject) {
      throw new NotFoundException(
        `project with this id: ${projectId} is not found`,
      404);
    }

    return updateProject;
  }

  async deleteProject(projectId: string) {
    let deteleProject = await this.repo.findByIdAndDelete(projectId);
    if (!deteleProject) {
      throw new NotFoundException(
        `project with this id: ${projectId} is not found`,
      404);
    }

    return deteleProject;
  }
}

export default new ProjectService();
