import { Request } from "express";
import { IUser } from "../models/join.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
