import { Request } from "express";
import { Types } from "mongoose";

export interface userToken {
    _id: Types.ObjectId; 
    role: string | undefined;
}



export interface AuthenticatedRequest extends Request {
    userid?: string | Types.ObjectId;
    Token?: string;
    decode?: any 
}


export interface iAuth{
    userId: Types.ObjectId
    name: string
    email: string
    password: string 
    role?: string
    provider?: string
    isverify?:boolean
}

