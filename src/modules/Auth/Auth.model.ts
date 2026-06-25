import mongoose, { Types } from "mongoose";
import { iAuth } from "../../common/interface/Auth.interface.js";
import bcrypt from "bcrypt";
import { salt } from "../../config/env.config.js";
import { roleEnum, providerEnum } from "../../common/enum/auth.enum.js";

const authSchema = new mongoose.Schema<iAuth>({
  userId:{
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: roleEnum.Member,
  },
  provider: {
    type: String,
    default: providerEnum.System,
  },
  isverify:{
    type: Boolean ,
    default: false
  }
});

authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, +salt);
});

export const authModel = mongoose.model("Auth", authSchema);

