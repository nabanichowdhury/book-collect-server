import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const userData  = req.body;
      const result = await UserService.createUser( userData);
  
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user created successfully!',
        data: result,
      });
    }
  );
 
 
  const getUserProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const token=req.headers.authorization
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Access token required')
      }
      const result = await UserService.getUserProfile(token);
  
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user retrieved successfully!',
        data:result 
      });
    }
  );

  
  const updateUserProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const token=req.headers.authorization
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Access Token Required')
      }
      const updatedData=req.body
      const result = await UserService.updateUserProfile(token,updatedData);
  
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user updated successfully!',
        data:result 
      });
    }
  );
  const deleteUser:RequestHandler=catchAsync(
    async (req: Request, res: Response) => {
        const id=req.params.id
        
        const result = await UserService.deleteUser(id);
    
        sendResponse<IUser>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'user Deleted successfully!',
          data:result 
        });
      }

  )
  
  export const UserController = {
    createUser,
    deleteUser,
    getUserProfile,
    updateUserProfile
  };