import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../common/exception/application.exception.js";
import {
  ADMIN_JWT,
  REFRESH_ADMIN_JWT,
  REFRESH_USER_JWT,
  USER_JWT,
} from "../config/env.config.js";
import { userToken } from "../common/interface/Auth.interface.js";

class Token {
  constructor() {}
  genarateToken(userID: userToken): string[] {
    let signature: string | undefined;
    let refreshSignature: string | undefined;
    let audience: string;

    switch (userID.role) {
      case "admin":
        signature = ADMIN_JWT;
        refreshSignature = REFRESH_ADMIN_JWT;
        audience = "admin";
        break;
      case "Member":
        signature = USER_JWT;
        refreshSignature = REFRESH_USER_JWT;
        audience = "Member";
        break;
      default:
        throw new UnauthorizedException("invalid user role");
    }

    const acsesstoken = jwt.sign({ _id: userID._id }, signature!, {
      expiresIn: "30m",
      audience: audience,
    });
    const refreshToken = jwt.sign({ _id: userID._id }, refreshSignature!, {
      expiresIn: "1y",
      audience,
    });

    return [acsesstoken, refreshToken];
  }

  decodeToken(decode: { aud: string }, token: string) {
    let signature: string | undefined = undefined;
    switch (decode.aud) {
      case "admin":
        signature = ADMIN_JWT;
        break;
      case "Member":
        signature = USER_JWT;
        break;

      default:
        throw new UnauthorizedException("invalid Member role");
    }
    let verify = jwt.verify(token, signature!);
    return verify;
  }

  decodeRefreshToken(token: string) {
    let decode: any = jwt.decode(token);
    let refreshSignature: string | undefined = undefined;
    switch (decode.aud) {
      case "admin":
        refreshSignature = REFRESH_ADMIN_JWT;
        break;

      case "Member":
        refreshSignature = REFRESH_USER_JWT;
        break;

      default:
        throw new UnauthorizedException("invalid user Member");
    }
    let verify_refresh = jwt.verify(token, refreshSignature!);
    return verify_refresh;
  }
}

export default new Token();
