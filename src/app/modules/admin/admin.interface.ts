import { Model, ObjectId } from "mongoose";

export type IAdmin={
    
    role:'admin';
    password:string;
    name:{
        firstName:string;
        lastName:string;
    };
    phoneNumber:string;
    address:string
    
}
export type ILogin={
    phoneNumber:string,
    password:string
}
export type ILoginResponse={
    accessToken:string
    refreshToken:string
}
export type IAdminExist={
    _id:ObjectId,
    role:string,
    password:string

}

export type AdminModel={
    isAdminExist(phoneNumber:string):Promise<Pick<IAdminExist,'_id'|'password'|'role'>>
    isAdminExistById(_id:ObjectId):Promise<Pick<IAdminExist,'_id'|'password'|'role'>>
    isPasswordMatched(givenPassword:string,savedPassword:string):Promise<boolean>
   }&Model<IAdmin>
// export type AdminModel = Model<IAdmin,Record<string, unknown>>;