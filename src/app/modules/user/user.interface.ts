import { Model, ObjectId } from "mongoose";

export type IUser = {
  email: string;
  password: string;
  books?: ObjectId[];
};
export type IUserExist={
  _id:ObjectId,
  password:string,
  

}

export type UserModel={
  isUserExist(phoneNumber:string):Promise<Pick<IUserExist,'_id'|'password'>>
  isUserExistById(_id:ObjectId):Promise<Pick<IUserExist,'_id'|'password'>>
  isPasswordMatched(givenPassword:string,savedPassword:string):Promise<boolean>
 }&Model<IUser>

