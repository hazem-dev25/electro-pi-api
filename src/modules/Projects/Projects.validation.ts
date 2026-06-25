import { z } from "zod";
import { statusEnum } from "../../common/enum/project.enum.js";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(statusEnum).optional()
});

export const updateProjectSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(statusEnum).optional()
});