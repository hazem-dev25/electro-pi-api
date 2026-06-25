import mongoose, { Types } from "mongoose";
import { iProject } from "../../common/interface/project.interface.js";
import { statusEnum } from "../../common/enum/project.enum.js";

const projectSchema = new mongoose.Schema<iProject>({
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
    default: statusEnum.pending,
    required: true,
  },
  userid: {
    type: String,
    ref: "Auth",
    required: true,
  },
});

export const projectModel = mongoose.model("Projects", projectSchema);
