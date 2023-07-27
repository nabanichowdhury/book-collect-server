import { Model, ObjectId } from "mongoose";
export type IReadingList={
  bookId:ObjectId,
  hasRead:boolean;
}
export type IUser = {
  email: string;
  password: string;
  books?: ObjectId[];
  wishList?: ObjectId[];
  
  readList?: IReadingList[];
  
  
};
export type IUserExist={
  _id:ObjectId,
  password:string,
  

}
export type IWishList={
  bookId:ObjectId
}

export type UserModel={
  isUserExist(phoneNumber:string):Promise<Pick<IUserExist,'_id'|'password'>>
  isUserExistById(_id:ObjectId):Promise<Pick<IUserExist,'_id'|'password'>>
  isPasswordMatched(givenPassword:string,savedPassword:string):Promise<boolean>
 }&Model<IUser>

