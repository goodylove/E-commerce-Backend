export interface RegisterTypes {
    name:string
    email:string
    password:string
    role?: "USER" | "ADMIN"
    verificationToken? :string
}


export  interface EmailServicesTypes {
    to:string,
    subject:string
    message:string

}

export interface VerifyUserTokenTypes {
    email:string,
    token:string
}

export interface UserPayloadTypes {
    email?:string,
    name?:string,
    role:"USER" | "ADMIN"
    userId:string

}