import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  BadRequestException,
  UnauthorizedException,
} from "../exception/application.exception.js";
import { AuthenticatedRequest } from "../interface/Auth.interface.js";
import token from "../../security/security.js";

export const authMiddlware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  let { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedException("you are not authorized");
  }

  let [flag, Token]: any = authorization.split(" ");
  switch (flag) {
    case "Basic":
      let data = Buffer.from(Token, "base64").toString();
      let [email, password] = data.split(":");
      break;
    case "Bearer":
      const decode = jwt.decode(Token) as {
        _id: string;
        aud: string;
        [key: string]: any;
      };

      const verify = token.decodeToken(decode, Token) as {
        _id: string;
        [key: string]: any;
      };

      req.userid = verify._id;
      req.Token = Token;
      req.decode = decode;
      break;

    default:
      throw new BadRequestException("Unsupported authorization method");
  }
  next();
};
