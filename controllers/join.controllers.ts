require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import joinModel, { IJoin } from "../models/join.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  phoneNumber: string;
}

export const join = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phoneNumber } = req.body;

      const isEmailExist = await joinModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("User already exist", 400));
      } else {
        const user = await joinModel.create({
          name,
          email,
          phoneNumber,
        });

        const data = { user: { name: user.name } };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/welcome-mail.ejs"),
          data
        );

        try {
          await sendMail({
            email: user.email,
            subject: "Welcome to NaijaPunter",
            template: "welcome-mail.ejs",
            data,
          });

          res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to see your welcome message`,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
