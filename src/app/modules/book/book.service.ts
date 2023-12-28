import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { SortOrder } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../helper/jwtHelper";
import { paginationHelper } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { User } from "../user/user.model";
import { BookSearchableFields } from "./book.constants";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (book: IBook,token:string): Promise<IBook |null> => {
    const verifyOwner=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
    const {userId}=verifyOwner
    book.owner=userId
  
    const result = await Book.create(book);
    await User.findByIdAndUpdate(userId, { $push: { books: result._id } }, { new: true })
    console.log(result)
    return result;  
  };

  const getAllBooks = async (
    filters: IBookFilters,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IBook[]>> => {
    const { searchTerm, ...filteredData } = filters;
  
    
 
    const andConditions = [];
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      andConditions.push({
        $or: BookSearchableFields.map(field => ({
          [field]: {
            $regex: regex,
          },
        })),
      });
    }
  
    if (Object.keys(filteredData).length) {
      andConditions.push({
        $and: Object.entries(filteredData).map(([field, value]) => (
          console.log(field,value),
          {
          
          [field]: value,

        })),
      });
    }
   
   
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper.calculatePagination(paginationOptions);
  
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
  
    const result = await Book.find(whereCondition)
      .populate('owner')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = await Book.countDocuments(whereCondition);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  token:string 
): Promise<IBook | null> => {


  const selectedUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
 
  const {userId}=selectedUser;
  const verifiedSeller=await Book.findOne({_id:id,owner:userId})
  if(!verifiedSeller){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Invalid seller')
  }
  
  const updatedBookData  = payload;
  const result = await Book.findOneAndUpdate({ _id: id,owner:userId }, updatedBookData, {
    new: true,
  });
  return result;
};
const deleteBook = async (id: string,token:string): Promise<IBook | null> => {

  // console.log("book id",JSON.stringify(id))
  
  const isExist = await Book.findById({_id:id});
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found !");
  }
  const selectedUser=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  const {userId}=selectedUser;
  const verifiedSeller=await Book.findOne({_id:id,owner:userId})
  if(!verifiedSeller){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Invalid seller')
  }
  const result = await Book.findOneAndDelete({_id:id,owner:userId});
  await User.findByIdAndUpdate(userId, { $pull: { books: result?._id } }, { new: true })
  return result;
};
export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
