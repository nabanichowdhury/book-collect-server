import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../helper/jwtHelper";
import { IBook } from "../book/book.interface";
import { IUser, IWishList } from "./user.interface";
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

const wishListBook=async (token: string,payload:IWishList):Promise<IUser|null>=>{
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  const result=await User.findByIdAndUpdate(userId,{$push:{wishList:payload.bookId}},{new:true})
  return result

}
const getWishListBook=async (token: string):Promise<IBook[]>=>{
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  const result=await User.findById(userId).populate('wishList');
  return result?.wishList;

}
const readListBook=async (token: string,payload:IWishList):Promise<IUser|null>=>{
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  const result = await User.findByIdAndUpdate(
    userId,
    { $push: { readList: { bookId: payload.bookId, hasRead: false } } }, 
    { new: true }
  )
  
  
  return result;
  
}
const markReadUnreadBook=async (token: string,payload:IWishList):Promise<IUser|null>=>{
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  // const result = await User.findOneAndUpdate(
  //   { _id: userId, 'readList.bookId': payload.bookId },
  //   { $set: { 'readList.$.hasRead': { $not: '$readList.$.hasRead' } } },
  //   { new: true }
  // );
     // Find the user and the book in the readList array
     const user = await User.findOne({ _id: userId, 'readList.bookId': payload.bookId });
     if (!user) {
       throw new Error('User or Book not found');
     }
 
     // Find the bookIndex in the readList array
     const bookIndex = user.readList.findIndex((item) => item.bookId==(payload.bookId));
     if (bookIndex === -1) {
       throw new Error('Book not found in readList');
     }
 
     // Toggle the hasRead field for the book manually
     user.readList[bookIndex].hasRead = !user.readList[bookIndex].hasRead;
 
     // Update the document using updateOne method
     const result = await User.findOneAndUpdate(
       { _id: userId, 'readList.bookId': payload.bookId },
       { $set: { 'readList.$.hasRead': user.readList[bookIndex].hasRead } },
        { new: true }
     );
 
     return result;

}





const getReadListBook=async (token: string):Promise<IBook[]>=>{
  const verifyUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=verifyUser
  const result=await User.findById(userId).populate('readList.bookId');
  return result?.readList;

}


export const UserService = {
  createUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  wishListBook,
  getWishListBook,
  readListBook,
  getReadListBook,
  markReadUnreadBook
  
 
};
