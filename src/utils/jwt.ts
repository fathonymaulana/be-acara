import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { SECRET } from "./env";
import { Types } from "mongoose";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken) => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as User;
  return user;
};
