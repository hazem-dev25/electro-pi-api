import { compare } from "bcrypt";
import { BadRequestException, NotFoundException } from "../../common/exception/application.exception.js";
import { iAuth } from "../../common/interface/Auth.interface.js";
import { DatabaseRepository } from "../../database/repository/database.repository.js";
import { loginDTO, registrationDTO, verifyDTO } from "./Auth.dto.js";
import { authModel } from "./Auth.model.js";
import token from "../../security/security.js";
import { emailEvent } from "../../common/utils/SendEmail/email.event.js";
import { HydratedDocument } from "mongoose";

class AuthService {
  repo: DatabaseRepository<iAuth>;
  constructor() {
    this.repo = new DatabaseRepository(authModel);
  }

  async registration(data: registrationDTO): Promise<iAuth> {
    let { name, email, password } = data;

    let existEmail = await this.repo.findOne({ email });

    if (existEmail) {
      throw new BadRequestException("email is already registered" , 400);
    }

    let member = await this.repo.create({ name, email, password });

    if (!member) {
      throw new BadRequestException("failed to registration", 400);
    }

    emailEvent.emit("send_email", {
      email: email,
      name: name,
      userID: (member as any)._id,
    });


    return member;
  }

  async verifyEmail(data: verifyDTO): Promise<HydratedDocument<iAuth>> {
    let Member = await this.repo.findOne({ email: data.email });
    if (!Member) {
      throw new NotFoundException("email not found" , 404);
    }
    if (Member.isverify) {
      throw new BadRequestException("email already verified" , 400);
    }
    emailEvent.emit("varify_email", {
      email: Member.email,
      code: data.code,
      userID: Member.id,
      name: Member.name,
    });

    return Member;
  }

  async login(data: loginDTO) {
    let memberDoc = await this.repo.findOne({ email: data.email });

    if (!memberDoc) {
      throw new NotFoundException("email not found" ,404);
    }

    const ismatch = await compare(data.password, memberDoc.password);
    if (!ismatch) {
      throw new BadRequestException("password is incorrect", 400);
    }
    const [acsesstoken, refreshToken] = token.genarateToken({
      _id: memberDoc._id,
      role: memberDoc.role,
    });

    let member = memberDoc.toObject();

    delete (member as any).password;

    return { member, acsesstoken, refreshToken };
  }
}

export default new AuthService();
