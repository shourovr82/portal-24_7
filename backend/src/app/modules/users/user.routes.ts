import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import { UserController } from './users.controller';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// !  get all Users ------------------------------>>>
router.get('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), routeInfoMessage(), UserController.getAllUsersController);

// !  get My Profile ------------------------------>>>
router.get('/my-profile', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), routeInfoMessage(), UserController.getMyProfile);
// !  Update  User data ------------------------------>>>
router.patch(
  '/update-user/:userId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  routeInfoMessage(),
  validateRequest(UserValidation.updateUser),
  UserController.updateUserInfo
);
// !  Update  Profile data ------------------------------>>>
router.patch(
  '/update-profile/:profileId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  routeInfoMessage(),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfileInfo
);
// !  get single user ------------------------------>>>
router.get('/:userId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), routeInfoMessage(), UserController.getSingleUser);

export const UserRoutes = router;
