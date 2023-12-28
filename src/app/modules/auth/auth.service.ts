/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helper/jwtHelper';

import { User } from '../user/user.model';
import { ILogin, ILoginResponse, IRefreshTokenResponse } from './auth.interface';


const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload;


  const isUserExist = await User.isUserExist(email) 

  console.log(isUserExist)
  

  if (!isUserExist ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  

  if (
    isUserExist.password &&
    !((await User.isPasswordMatched(password, isUserExist.password)  ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id: userId } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { userId  },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  

  return {
    accessToken,
    refreshToken,
    id:userId
    
  };
};

const refreshToken = async (token:string):Promise<IRefreshTokenResponse> => {
 let verifiedToken=null;
  try{
    verifiedToken=jwtHelper.verifyToken(token,config.jwt.refresh_secret as Secret)

  }catch(err){
    throw new ApiError(httpStatus.FORBIDDEN,'Invalid Refresh Token')
  }
  const {userId}=verifiedToken


  const isUserExist=await User.isUserExistById(userId)
  console.log(isUserExist)
  if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND,'User Does not exist')
  }

  //create Access token
  

  const newAccessToken=jwtHelper.createToken({userId},config.jwt.secret as Secret,config.jwt.expires_in as string)

  return{ accessToken:newAccessToken,id:userId}

  

 
};





export const AuthService = {
  loginUser,
  refreshToken
};
