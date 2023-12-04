import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PPStrikeOffStatusController } from './PPStrikeOffStatus.controller';
import { ppStrikeOffStatusValidation } from './PPStrikeOffStatus.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  Strike Off Status ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ppStrikeOffStatusValidation.createPpStrikeOffStatus),
  PPStrikeOffStatusController.createNewPPStrikeOffStatus
);
// ! Get all Strike Off Status----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), PPStrikeOffStatusController.getAllPPStrikeOffStatus);

// ! Get Single Strike Off Status----------------------------------->>>
router.get(
  '/:ppStatusId',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPStrikeOffStatusController.getSinglePPStrikeOffStatus
);
// ! Update Strike Off Status----------------------------------->>>
router.patch(
  '/:PPStatusId',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ppStrikeOffStatusValidation.updatePpStrikeOffStatus),
  PPStrikeOffStatusController.updatePPStrikeOffStatusInformation
);

export const PPStrikeOffStatusRoutes = router;
