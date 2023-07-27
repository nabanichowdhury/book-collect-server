import bcrypt from "bcrypt";
import { ObjectId, Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, IUserExist, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book',optional:true }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Book',optional:true,unique:true }],
    readList: [{ bookId:{ type: Schema.Types.ObjectId, ref: 'Book',optional:true,unique:true },hasRead:{type:Boolean,default:false} }],
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUserExist,'_id'|'password'> | null> {
  return await User.findOne({email},{_id:1,role:1,password:1})
};
userSchema.statics.isUserExistById = async function (
  _id:ObjectId
): Promise<Pick<IUserExist,'_id'|'password'> | null> {
  return await User.findById({_id},{_id:1,role:1,password:1})
};
userSchema.statics.isPasswordMatched=async function(givenPassword:string,savedPassword:string):Promise<boolean>{
  
  return await bcrypt.compare(givenPassword,savedPassword);

}

userSchema.pre('save',async function (next){
  //hash password
  this.password=await bcrypt.hash(this.password,Number(config.bcrypt_salt_round))
  next()
})
export const User = model<IUser, UserModel>('User', userSchema);
