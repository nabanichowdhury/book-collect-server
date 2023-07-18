import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.service";

const createAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const AdminData  = req.body;
      const result = await AdminService.createAdmin( AdminData);
  
      sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully!',
        data: result,
      });
    }
  );
  const getAdminProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const token=req.headers.authorization
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Access Token Needed')
      }
      const result = await AdminService.getAdminProfile( token);
  
      sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin data retrived!',
        data: result,
      });
    }
  );
  const updateAdminProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const token=req.headers.authorization
      const payload=req.body
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Access Token Needed')
      }
      const result = await AdminService.updateAdminProfile( payload,token);
  
      sendResponse<IAdmin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin data updated!',
        data: result,
      });
    }
  );
  const loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AdminService.loginAdmin(loginData)
    const { refreshToken, ...others } = result;
  
    // set refresh token into cookie
  
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin loggedIn successfully !',
      data: others,
    });
  });
  
  
  export const AdminController = {
    createAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile
    
  };