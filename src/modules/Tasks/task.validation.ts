import { z } from "zod";
import { priorityEnum, taskStatusEnum } from "../../common/enum/tasks.enum.js";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5).optional(),
  status: z.enum(taskStatusEnum).optional(),
  priority: z.enum(priorityEnum).optional(),
  dueDate: z.string().date().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(taskStatusEnum).optional(),
  priority: z.enum(priorityEnum).optional(),
  dueDate: z.string().date().optional(),
});
