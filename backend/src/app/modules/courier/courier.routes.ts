import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourierController } from './courier.controller';
import { CourierValidation } from './courier.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(CourierValidation.createCourier),
  CourierController.createNewCourier
);
// ! Get all Orders----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), CourierController.getAllCouriers);
// ! Get all getStyleWiseNoOfCourier----------------------------------->>>
router.get(
  '/style-wise-courier',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  CourierController.getStyleWiseNoOfCourier
);

// ! Get Single Order----------------------------------->>>
router.get('/:courierId', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), CourierController.getSingleCourier);
// ! Update Order----------------------------------->>>
router.patch(
  '/update/:courierId',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(CourierValidation.updateCourier),
  CourierController.updateCourierInformation
);

export const CourierRoutes = router;
