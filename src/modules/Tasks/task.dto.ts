export interface createTaskDTO {
  title: string;
  description?: string;
  status?: string
  priority?: string
  dueDate?: Date;
}

export interface updateTaskDTO {
  title?: string;
  description?: string;
  status?: string
  priority?: string
  dueDate?: Date;
}