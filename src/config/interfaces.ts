import { Document } from "mongoose";
import { Response, Request } from "express";

export interface IResponse extends Response {
  error?: any;
}

export interface IRequest extends Request {
  files?: any;
  user?: any;
  isAllowed?: boolean;
  role?: string;
}


export interface IUser extends Document {
  user_id: number;
  user_name: string;
  user_email: string;
  is_active: boolean;
  count: number;
}
