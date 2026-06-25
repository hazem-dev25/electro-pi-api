import { z } from "zod";

export const registrationSchema = z
  .strictObject({
    name: z.string().min(2).max(20),
    email: z.email().trim(),
    password: z.string().min(8).max(15),
    confirmPassword: z.string().min(8).max(15),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
      });
    }
  });

export const loginSchema = z.strictObject({
  email: z.email().trim(),
  password: z.string().min(8).max(15),
});
