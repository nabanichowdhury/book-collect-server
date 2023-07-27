import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { paginationField } from "../../../constants/pagination";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookFilterableFields } from "./book.constants";
import { IBook } from "./book.interface";
import { BookService } from "./book.service";

const createBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const BookData  = req.body;
      const token=req.headers.authorization
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Access Token Needed')
      }
      const result = await BookService.createBook(BookData,token)
  
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully!',
        data: result,
      });
    }
  );
  const getBooks: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const filters = pick(req.query, BookFilterableFields);
        console.log(filters)

        const paginationOptions = pick(req.query, paginationField);
      const result = await BookService.getAllBooks(filters,paginationOptions)
  
      sendResponse<IBook[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully!',
        meta:result.meta,
        data:result.data 
      });
    }
  );
  const getSingleBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const id=req.params.id
      const result = await BookService.getSingleBook(id);
  
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data:result 
      });
    }
  );
  const updateBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const id=req.params.id
      const token=req.headers.authorization
      const updatedData=req.body
     if(!token){
      throw new ApiError(httpStatus.UNAUTHORIZED,'Access token needed')
     }
      const result = await BookService.updateBook(id,updatedData,token);
  
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully!',
        data:result 
      });
    }
  );
  const deleteBook:RequestHandler=catchAsync(
    async (req: Request, res: Response) => {
        const id=req.params.id
        console.log("book id",JSON.stringify(id))
        const token=req.headers.authorization
        if(!token){
          throw new ApiError(httpStatus.UNAUTHORIZED,'Access token needed')
         }
        
        const result = await BookService.deleteBook(id,token);
        
    
        sendResponse<IBook>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Book Deleted successfully!',
          data:result 
        });
      }

  )
  
  export const BookController = {
    createBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook
  };