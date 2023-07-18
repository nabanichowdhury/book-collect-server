
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../helper/jwtHelper";
import { IAdmin, ILogin, ILoginResponse } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
 

  const output = (await Admin.create(admin));
  const{phoneNumber}=output
  const result=await Admin.findOne({phoneNumber})
  return result;
};

const getAdminProfile=async(token:string):Promise<IAdmin | null>=>{
  const admin=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  if(!admin){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
  }
  const {userId}=admin
  const result=await Admin.findById(userId)
  return result;
}
const updateAdminProfile=async(payload:Partial<IAdmin>,token:string):Promise<IAdmin | null>=>{
  const admin=jwtHelper.verifyToken(token,config.jwt.secret as Secret)
  if(!admin){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
  }
  if(payload?.role!='admin'){
    throw new ApiError(httpStatus.NOT_ACCEPTABLE,'Admin cannot update his/her role to other')

  }
  const {userId}=admin
  const result = await Admin.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
  });
  return result;
}

const loginAdmin=async(loginData:ILogin) :Promise<ILoginResponse>=>{
    const{password,phoneNumber}=loginData
    const isAdminExist=await Admin.isAdminExist(phoneNumber)
    if(!isAdminExist){
        throw new ApiError(httpStatus.NOT_FOUND,'Admin Does not exist')
    }
    const isPasswordMatched=await Admin.isPasswordMatched(password,(await isAdminExist).password)
    if(isAdminExist && !isPasswordMatched){
        throw new ApiError(httpStatus.UNAUTHORIZED,'Invalid Password')
    }

    

    const {_id,role}=await isAdminExist
    const accessToken = jwtHelper.createToken(
      { _id,role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelper.createToken(
      { _id, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
    
    






    return{
      accessToken,
      refreshToken
    }

    


}


export const AdminService = {
  createAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile
  
};
