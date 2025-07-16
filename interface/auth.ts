export interface RegisterTypes {
    name:string
    email:string
    password:string
    role: "USER" | "ADMIN"
    verificationToken :string
}


export  interface EmailServicesTypes {
    to:string,
    subject:string
    message:string

}