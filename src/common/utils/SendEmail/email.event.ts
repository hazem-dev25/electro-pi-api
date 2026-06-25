import { EventEmitter } from "events";
import emailService from "./email.service.js";
import redisService from "../../services/redis/redis.service.js";
import bcrypt from "bcrypt";
import {
  BadRequestException,
  NotFoundException,
} from "../../exception/application.exception.js";
import { authModel } from "../../../modules/Auth/Auth.model.js";

export const emailEvent = new EventEmitter();

emailEvent.on("send_email", async (data) => {
  const { email, name, userID } = data;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  let Hashcode = await bcrypt.hash(code, 10);
  await redisService.set({
    key: `key::${userID}`,
    value: Hashcode,
    ttl: 500,
  });
  console.log(userID , "from set")
  let html = `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
      <h2>Hello ${name},</h2>
      <p>Your verification code is: <strong style="font-size: 24px; color: #2563eb;">${code}</strong></p>
      <p style="color: #666; font-size: 14px;">This code is valid for 8 minutes.</p>
    </div>
  `;

  emailService.sendEmail(email, "Your Verification Code", html);
});

emailEvent.on("varify_email", async (data) => {
  const { email, code, userID, name } = data;
  console.log(userID , "from get")
  let rediscode = await redisService.get(`key::${userID}`);
  if (!rediscode) {
    console.error(`Verification failed: No OTP found in Redis for user ${userID}`);
    return; 
  }
  let compareCode = await bcrypt.compare(code, rediscode.toString());
  if (!compareCode) {
    throw new NotFoundException("OTP is Expired");
  } else {
    let verifyUser = await authModel.findByIdAndUpdate(
      userID,
      { isverify: true },
      { new: true },
    );
    if (!verifyUser) {
      throw new BadRequestException("failed to varify user");
    }

    await redisService.del(`key::${userID}`);
  }

  let html = `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
      <h2 style="color: #10b981;">Account Verified Successfully! 🎉</h2>
      <p>Hello ${name},</p>
      <p>Your email has been successfully verified. Your account is now fully active and ready to use.</p>
      <p style="color: #666; font-size: 14px;">Thank you for joining Electro Pi!</p>
    </div>
  `;

  emailService.sendEmail(email, "Your Verification Code", html);
});
