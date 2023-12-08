import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BulkProductionStatusController } from './BulkProductionStatus.controller';
import { BulkProductionStatusValidation } from './BulkProductionStatus.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(BulkProductionStatusValidation.createBulkProductionStatus),
  BulkProductionStatusController.createNewBulkProductionStatus
);
// ! Get all Orders----------------------------------->>>
router.get(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.getAllBulkProductionStatus
);

// ! Get Single Order----------------------------------->>>
router.get(
  '/:bulkProductionId',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.getSingleBulkProductionStatus
);
// ! Update Order----------------------------------->>>
router.patch(
  '/:bulkProductionId',
  routeInfoMessage(),
  validateRequest(BulkProductionStatusValidation.updateBulkProductionStatus),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.updateBulkProductionStatus
);

export const BulkProductionStatusRoutes = router;
