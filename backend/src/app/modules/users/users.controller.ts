import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from './user.interface';
import { UserService } from './user.service';
import { userFilterableFields } from './users.constants';

const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await UserService.getAllUserService(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users retrieved successfully',
    meta: result.meta,
    data: result.data
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result
  });
});

const updateProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const payload = req.body;
  const result = await UserService.updateProfileInfo(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result
  });
});
// ! update user info
const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserService.updateUserInfo(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IRequestUser).userId;
  const result = await UserService.getMyProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result
  });
});

export const UserController = {
  getAllUsersController,
  getSingleUser,
  updateProfileInfo,
  updateUserInfo,
  getMyProfile
};
