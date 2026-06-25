import { Response, NextFunction } from "express";
import { authModel } from "../../modules/Auth/Auth.model.js";

export const accessTo = (...allowedRoles: string[]) => {
  return async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.userid) {
         res.status(401).json({
          status: "fail",
          message: "You are not authenticated"
        });
         return;
      }

      const user = await authModel.findById(req.userid);

      if (!user || !allowedRoles.includes(user.role as string)) {
         res.status(403).json({
          status: "fail",
          message: "You do not have permission to perform this action"
        });
         return;
      }

      next();
    } catch (error) {
       res.status(500).json({
        status: "error",
        message: "Internal server error during authorization"
      });
    }
  };
};