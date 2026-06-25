import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validation = (zodSchema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = zodSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "fail",
        message: "Validation Error",
        errors: result.error
      });
    }

    next();
  };
};