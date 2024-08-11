declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      role: string;
      };
    }
  }
}

require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IJoin extends Document {
  name: string;
  email: string;
  phoneNumber: string
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const joinSchema: Schema<IJoin> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    
    
  },
  { timestamps: true }
);

const joinModel: Model<IJoin> = mongoose.model("Join", joinSchema);

export default joinModel;