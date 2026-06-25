import { Router } from "express";
import { validation } from "../../common/middleware/validation.js";
import { registrationSchema, loginSchema } from "./Auth.validaton.js";
import {
  loginController,
  registrationController,
  verifyEmailController,
} from "./Auth.controller.js";

export const authRouter = Router();

authRouter.post(
  "/registration",
  validation(registrationSchema),
  registrationController,
);

authRouter.post("/verify_email", verifyEmailController);

authRouter.post("/login", validation(loginSchema), loginController);
