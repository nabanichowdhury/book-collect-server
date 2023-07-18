import bcrypt from 'bcrypt';
import { ObjectId, Schema, model } from "mongoose";
import config from "../../../config";
import { AdminModel, IAdmin, IAdminExist } from "./admin.interface";

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    
    role: {
      type: String,
      enum: ["admin"],
      required: true,
    },
    password: {
        type: String,
        required: true,
        select:false
      },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
        
      },

    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
AdminSchema.statics.isAdminExist = async function (
    phoneNumber: string
  ): Promise<Pick<IAdminExist,'_id'|'password'|'role'> | null> {
    return await Admin.findOne({phoneNumber},{_id:1,role:1,password:1})
  };
AdminSchema.statics.isAdminExistById = async function (
    _id:ObjectId
  ): Promise<Pick<IAdminExist,'_id'|'password'|'role'> | null> {
    return await Admin.findById({_id},{_id:1,role:1,password:1})
  };
  AdminSchema.statics.isPasswordMatched=async function(givenPassword:string,savedPassword:string):Promise<boolean>{
    console.log(givenPassword,savedPassword)
    return await bcrypt.compare(givenPassword,savedPassword);
  
  }
  
  AdminSchema.pre('save',async function (next){
    //hash password
    this.password=await bcrypt.hash(this.password,Number(config.bcrypt_salt_round))
    next()
  })
export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
