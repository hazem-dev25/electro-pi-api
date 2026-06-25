import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const url: any = process.env.URL;

const port: string | undefined = process.env.PORT;

const mode: string | undefined = process.env.MODE;

const ADMIN_JWT: string | undefined = process.env.ADMIN_JWT;

const USER_JWT: string | undefined = process.env.USER_JWT;

const REFRESH_ADMIN_JWT: string | undefined = process.env.REFRESH_ADMIN_JWT;

const REFRESH_USER_JWT: string | undefined = process.env.REFRESH_USER_JWT;

const salt: any = process.env.SALT

const APP_EMAIL: string | undefined = process.env.APP_EMAIL

const APP_PASSWORD: string | undefined = process.env.APP_PASSWORD

const redisUrl : any = process.env.REDIS_URL

export {
  url,
  port,
  mode,
  ADMIN_JWT,
  USER_JWT,
  REFRESH_ADMIN_JWT,
  REFRESH_USER_JWT,
  salt,
  APP_PASSWORD ,
  APP_EMAIL ,
  redisUrl
};
