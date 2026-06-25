import { Request, Response } from "express";
import { SuccessResponse } from "../../common/exception/success.responce.js";
import AuthService from "./Auth.service.js";

export const registrationController = async (req: Request, res: Response) => {
  let Member = await AuthService.registration(req.body);

  SuccessResponse({
    res,
    message: "Member registration succ",
    data: Member,
    status: 201,
  });
};


export const verifyEmailController = async (req: Request , res: Response)=>{
  let email = await AuthService.verifyEmail(req.body)

  SuccessResponse({
    res,
    message: "email is verifyed",
    data: email,
    status: 200,
  });
}


export const loginController = async (req: Request, res: Response) => {
  let Member = await AuthService.login(req.body);

  SuccessResponse({
    res,
    message: "Member login succ",
    data: Member,
    status: 200,
  });
};
