import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { UserValidation } from '../users/user.validations';
import { AuthController } from './auth.controller';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

router.post(
  '/create-user',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  routeInfoMessage(),
  FileUploadHelper.uploadProfileImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
    return AuthController.createNewUser(req, res, next);
  }
);

router.post('/login', routeInfoMessage(), AuthController.userLogin);

router.post('/refresh-token', routeInfoMessage(), AuthController.refreshToken);

export const AuthRoutes = router;
