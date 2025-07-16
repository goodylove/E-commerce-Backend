import { StatusCodes } from "http-status-codes"


export class BadRequestError extends Error {
    statusCodes : number;

    constructor(message:string){
        super(message)
        this.name = "BadRequest",
        this.statusCodes = StatusCodes.BAD_REQUEST

    }
}

export class unauthorized extends Error {
        statusCodes : number;

    constructor(message:string){
        super(message)
        this.name = "unauthorized",
        this.statusCodes = StatusCodes.UNAUTHORIZED

    }

}

export class unAuthenticated extends Error {
        statusCodes : number;

    constructor(message:string){
        super(message)
        this.name = "unauthenticated",
        this.statusCodes = StatusCodes.FORBIDDEN

    }

}