import express, { NextFunction, Request, Response } from 'express';

import { UserRoles } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StylesController } from './styles.controller';
import { StylesValidation } from './styles.validation';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! all routes=---------
router.post(
  '/create-style',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadStylesImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StylesValidation.createStyle.parse(JSON.parse(req.body.data));
    return StylesController.createNewStyle(req, res, next);
  }
);
// ! get all styles (not for use others)
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), StylesController.getAllStyles);

// ! factory style assign
router.post(
  '/factory-style-assign',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(StylesValidation.factoryStyleAssign),
  StylesController.factoryStyleAssign
);
// ! get all style no for select picker
router.get('/get-all-style-no', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), StylesController.getAllStyleNumbers);
// ! get recent comments
router.get(
  '/get-recent-comments',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StylesController.getAllStylesRecentComments
);

// ! Get all Style Length----------------------------------->>>
router.get('/count', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), StylesController.getAllStylishLength);
// ! single style info
router.get(
  '/single-style/:styleNo',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  StylesController.getSingleStyle
);
// ! update style info
router.patch(
  '/update/:styleNo',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.updateStylesImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StylesValidation.updateStyle.parse(JSON.parse(req.body.data));
    return StylesController.updateStyleInformation(req, res, next);
  }
);

export const StyleRoutes = router;
