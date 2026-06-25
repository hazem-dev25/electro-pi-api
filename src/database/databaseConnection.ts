import mongoose from "mongoose";
import { url } from "../config/env.config.js";
export const connectionDB = async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("DB is Connected Successfully");
    })
    .catch((error) => {
      console.log("failed to conntect DB", error);
    });
};
