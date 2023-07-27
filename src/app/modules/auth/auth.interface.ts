import { ObjectId } from "mongoose"

export type ILogin={
    email:string,
    password:string
}
export type ILoginResponse={
    accessToken:string,
    refreshToken:string
    id:ObjectId
}

export type IRefreshTokenResponse={
    accessToken:string
    id:ObjectId
}


