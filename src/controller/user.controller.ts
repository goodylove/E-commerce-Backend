import { Request, response, Response } from "express";
import { UserPayloadTypes } from "../../interface/auth";
import { BadRequestError, unAuthenticated } from "../errors/customerErrors";
import { deleteUserService, getAllUsers, getCurrentUser, getSingleUserServices, updateUserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

interface CustomRequest extends Request {
  user: UserPayloadTypes;
}

export default async function getCurrentUserController(
  req: CustomRequest,
  res: Response
) {
  const userId = req.user.userId;

  if (!userId) {
    throw new unAuthenticated("User not authenticated");
  }

  const user = await getCurrentUser(userId);
  res.status(StatusCodes.OK).json({
    message: "Current user retrieved",
    data: user,
  });
}

export async function getAllUserController(req: CustomRequest, res: Response) {
  const user = await getAllUsers();
  res.status(StatusCodes.OK).json({
    message: "All users retrieved",
    data: user,
  });
}

export async function updateCurrentUserController(req: CustomRequest, res: Response) {
  const userId = req.params.id
  const body = req.body

  if (!userId) {
    throw new unAuthenticated('User is not authenticated')
  }
  const updateUser = await updateUserService(body, userId)
  res.status(StatusCodes.OK).json({ message: 'user updated successfully', data: updateUser })
}

export async function deleteUserController(req: CustomRequest, res: Response) {
  const { id } = req.params

  if (!id) {
    throw new BadRequestError('No user id provided')
  }


  const deletedUser = await deleteUserService(id)
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')


  res.status(StatusCodes.OK).json({ message: 'User deleted successfully', data: deletedUser })

}

export async function getSingleUserController (req:Request,res:Response){
  const {id} =req.params
  if(!id){
    throw new BadRequestError('Please provide a valid Id')
  }

  const user = await getSingleUserServices(id)
  res.status(StatusCodes.OK).json({ message: 'User retrieved successfully', data: user })
}