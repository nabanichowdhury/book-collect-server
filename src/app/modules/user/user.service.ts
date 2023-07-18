import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../helper/jwtHelper";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};


const getUserProfile = async (token: string): Promise<IUser | null> => {
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  const result = await User.findById(userId);
  return result;
};
 
  


const updateUserProfile = async (
  token: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const verifiedUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifiedUser
  const isExist = await User.findById(userId);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found !");
  }
  const updatedUserData  = payload;

  const result = await User.findOneAndUpdate({ _id: userId }, updatedUserData, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found !");
  }

  const result = await User.findByIdAndDelete(id);
  return result;
};
export const UserService = {
  createUser,
  deleteUser,
  getUserProfile,
  updateUserProfile
};
