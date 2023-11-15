import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { UserValidation } from '../users/user.validations';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/create-user',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProfileImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
    return AuthController.createNewUser(req, res, next);
  }
);

router.post('/login', AuthController.userLogin);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;