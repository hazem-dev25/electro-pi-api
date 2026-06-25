import mongoose from "mongoose";
import { iTasks } from "../../common/interface/Tasks.interface.js";
import { priorityEnum, taskStatusEnum } from "../../common/enum/tasks.enum.js";

const taskSchema = new mongoose.Schema<iTasks>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: taskStatusEnum.pending,
      required: true,
    },
    projectId: {
      type: String,
      ref: "Projects",
      required: true,
    },
    priority: {
      type: String,
      default: priorityEnum.Medium,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);


export const taskModel = mongoose.model('Tasks' , taskSchema)


